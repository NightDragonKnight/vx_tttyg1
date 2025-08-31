<template>
	<view class="content">
		<!-- 搜索和区域选择 -->
		<view class="search-section">
			<!-- 搜索框 -->
			<view class="search-bar">
				<input 
					type="text" 
					placeholder="搜索区域" 
					class="search-input"
					v-model="searchKeyword"
					@input="onSearchInput"
				/>
				<button class="search-btn" @click="search">搜索</button>
			</view>
			
			<!-- 多级地区选择 -->
			<view class="area-selector">
				<picker :value="selectedProvinceIndex" :range="provinces" range-key="name" @change="onProvinceChange">
					<view class="area-picker province-picker">
						<text class="area-label">省份：</text>
						<text class="area-text">{{selectedProvince.name}}</text>
						<text class="area-arrow">▼</text>
					</view>
				</picker>
				
				<picker v-if="currentCities.length > 1" :value="selectedCityIndex" :range="currentCities" range-key="name" @change="onCityChange">
					<view class="area-picker city-picker">
						<text class="area-label">城市：</text>
						<text class="area-text">{{selectedCity.name}}</text>
						<text class="area-arrow">▼</text>
					</view>
				</picker>
				
				<picker v-if="currentDistricts.length > 1" :value="selectedDistrictIndex" :range="currentDistricts" range-key="name" @change="onDistrictChange">
					<view class="area-picker district-picker">
						<text class="area-label">区县：</text>
						<text class="area-text">{{selectedDistrict.name}}</text>
						<text class="area-arrow">▼</text>
					</view>
				</picker>
			</view>
		</view>
		
		<!-- 门店列表 -->
		<view class="store-list">
			<view class="store-item" v-for="(store, index) in filteredStores" :key="index" @click="viewStoreDetail(store)">
				<view class="store-image">
					<image :src="store.image" mode="aspectFill"></image>
					<view class="store-status" :class="store.status">{{store.statusText}}</view>
				</view>
				<view class="store-info">
					<text class="store-name">{{store.name}}</text>
					<text class="store-address">📍 {{store.address}}</text>
					<view class="store-details">
						<text class="business-hours">🕐 {{store.businessHours}}</text>
						<text class="phone">📞 {{store.phone}}</text>
						<text class="services">🎮 {{store.services.join('、')}}</text>
					</view>
					<view class="store-footer">
						<view class="price-range">
							<text class="price-text">¥{{store.priceRange.min}}-{{store.priceRange.max}}</text>
						</view>
						<view class="store-actions">
							<button class="action-btn call-btn" @click.stop="callStore(store)">电话</button>
							<button class="action-btn navigate-btn" @click.stop="navigateToStore(store)">导航</button>
							<button 
								class="action-btn book-btn" 
								:class="{ disabled: store.status === 'renovation' || store.status === 'closed' }"
								@click.stop="bookStore(store)"
								:disabled="store.status === 'renovation' || store.status === 'closed'"
							>预订</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredStores.length === 0">
			<text class="empty-text">{{searchKeyword ? '未找到该地区的门店' : '该地区暂无门店'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				selectedProvinceIndex: 0,
				selectedCityIndex: 0,
				selectedDistrictIndex: 0,
				provinces: [
					{
						name: '全国',
						cities: [{ name: '全部城市', districts: [{ name: '全部区域' }] }]
					},
					{
						name: '北京市',
						cities: [
							{ 
								name: '全部区域',
								districts: [{ name: '全部区县' }]
							},
							{
								name: '朝阳区',
								districts: [
									{ name: '全部区域' },
									{ name: '国贸' },
									{ name: '三里屯' },
									{ name: '望京' },
									{ name: '酒仙桥' }
								]
							},
							{
								name: '海淀区',
								districts: [
									{ name: '全部区域' },
									{ name: '中关村' },
									{ name: '五道口' },
									{ name: '西二旗' },
									{ name: '公主坟' }
								]
							},
							{
								name: '西城区',
								districts: [
									{ name: '全部区域' },
									{ name: '西单' },
									{ name: '金融街' },
									{ name: '新街口' }
								]
							}
						]
					},
					{
						name: '上海市',
						cities: [
							{ 
								name: '全部区域',
								districts: [{ name: '全部区县' }]
							},
							{
								name: '浦东新区',
								districts: [
									{ name: '全部区域' },
									{ name: '陆家嘴' },
									{ name: '张江' },
									{ name: '世纪公园' },
									{ name: '川沙' }
								]
							},
							{
								name: '黄浦区',
								districts: [
									{ name: '全部区域' },
									{ name: '外滩' },
									{ name: '南京路' },
									{ name: '人民广场' }
								]
							},
							{
								name: '徐汇区',
								districts: [
									{ name: '全部区域' },
									{ name: '徐家汇' },
									{ name: '田子坊' },
									{ name: '衡山路' }
								]
							}
						]
					},
					{
						name: '广东省',
						cities: [
							{ 
								name: '全部城市',
								districts: [{ name: '全部区域' }]
							},
							{
								name: '广州市',
								districts: [
									{ name: '全部区域' },
									{ name: '天河区' },
									{ name: '越秀区' },
									{ name: '海珠区' },
									{ name: '荔湾区' }
								]
							},
							{
								name: '深圳市',
								districts: [
									{ name: '全部区域' },
									{ name: '南山区' },
									{ name: '福田区' },
									{ name: '罗湖区' },
									{ name: '宝安区' }
								]
							}
						]
					}
				],
				stores: [
					{
						id: 1,
						name: '天天体验馆（国贸店）',
						address: '北京市朝阳区国贸CBD核心区建国门外大街1号',
						province: '北京市',
						city: '朝阳区',
						district: '国贸',
						image: '/static/image/day/VR体验馆.jpg',
						businessHours: '09:00-22:00',
						phone: '010-85991234',
						status: 'open',
						statusText: '营业中',
						services: ['VR体验', '密室逃脱', '电玩城', '按摩椅'],
						priceRange: { min: 50, max: 200 },
						facilities: ['免费WiFi', '空调', '停车场', '休息区']
					},
					{
						id: 2,
						name: '天天体验馆（中关村店）',
						address: '北京市海淀区中关村大街27号中关村科技园区',
						province: '北京市',
						city: '海淀区',
						district: '中关村',
						image: '/static/templateIndex.png',
						businessHours: '10:00-23:00',
						phone: '010-62751234',
						status: 'open',
						statusText: '营业中',
						services: ['VR体验', '赛车模拟', '射击游戏', '棋牌室'],
						priceRange: { min: 40, max: 150 },
						facilities: ['免费WiFi', '空调', '地铁直达', '24小时营业']
					},
					{
						id: 3,
						name: '天天体验馆（陆家嘴店）',
						address: '上海市浦东新区陆家嘴金融贸易区世纪大道100号',
						province: '上海市',
						city: '浦东新区',
						district: '陆家嘴',
						image: '/static/extuiIndex.png',
						businessHours: '09:00-22:00',
						phone: '021-68881234',
						status: 'open',
						statusText: '营业中',
						services: ['VR体验', '飞行模拟', '太空漫步', '深海探险'],
						priceRange: { min: 60, max: 250 },
						facilities: ['免费WiFi', '空调', '停车场', '咖啡厅']
					},
					{
						id: 4,
						name: '天天体验馆（外滩店）',
						address: '上海市黄浦区外滩中山东一路18号外滩18号',
						province: '上海市',
						city: '黄浦区',
						district: '外滩',
						image: '/static/componentIndex.png',
						businessHours: '09:30-21:30',
						phone: '021-63211234',
						status: 'renovation',
						statusText: '装修中',
						services: ['VR体验', '密室逃脱', '剧本杀', 'KTV'],
						priceRange: { min: 80, max: 300 },
						facilities: ['免费WiFi', '空调', '江景', '高端设备']
					},
					{
						id: 5,
						name: '天天体验馆（天河店）',
						address: '广东省广州市天河区天河北路233号中信广场',
						province: '广东省',
						city: '广州市',
						district: '天河区',
						image: '/static/templateIndex.png',
						businessHours: '10:00-22:30',
						phone: '020-38881234',
						status: 'busy',
						statusText: '火爆',
						services: ['VR体验', '太空漫步', '电玩城', '台球'],
						priceRange: { min: 45, max: 180 },
						facilities: ['免费WiFi', '空调', '停车场', '美食城']
					},
					{
						id: 6,
						name: '天天体验馆（南山店）',
						address: '广东省深圳市南山区深南大道9689号恒兴广场',
						province: '广东省',
						city: '深圳市',
						district: '南山区',
						image: '/static/extuiIndex.png',
						businessHours: '09:00-23:00',
						phone: '0755-86881234',
						status: 'closed',
						statusText: '休息中',
						services: ['VR体验', '深海探险', '赛车模拟', '密室逃脱'],
						priceRange: { min: 55, max: 220 },
						facilities: ['免费WiFi', '空调', '地铁直达', '儿童区']
					}
				]
			}
		},
		computed: {
			selectedProvince() {
				return this.provinces[this.selectedProvinceIndex] || this.provinces[0];
			},
			currentCities() {
				return this.selectedProvince.cities || [];
			},
			selectedCity() {
				return this.currentCities[this.selectedCityIndex] || this.currentCities[0];
			},
			currentDistricts() {
				return this.selectedCity.districts || [];
			},
			selectedDistrict() {
				return this.currentDistricts[this.selectedDistrictIndex] || this.currentDistricts[0];
			},
			filteredStores() {
				let filtered = this.stores;
				
				// 先按地区筛选
				if (this.selectedProvinceIndex > 0) {
					const provinceName = this.selectedProvince.name;
					filtered = filtered.filter(item => item.province === provinceName);
					
					if (this.selectedCityIndex > 0) {
						const cityName = this.selectedCity.name;
						filtered = filtered.filter(item => item.city === cityName);
						
						if (this.selectedDistrictIndex > 0) {
							const districtName = this.selectedDistrict.name;
							filtered = filtered.filter(item => item.district === districtName);
						}
					}
				}
				
				// 再按地区搜索关键词筛选
				if (this.searchKeyword.trim()) {
					const keyword = this.searchKeyword.toLowerCase();
					filtered = filtered.filter(item => 
						item.address.toLowerCase().includes(keyword) ||
						item.province.toLowerCase().includes(keyword) ||
						item.city.toLowerCase().includes(keyword) ||
						item.district.toLowerCase().includes(keyword) ||
						item.name.toLowerCase().includes(keyword)
					);
				}
				
				return filtered;
			}
		},
		methods: {
			onProvinceChange(e) {
				this.selectedProvinceIndex = e.detail.value;
				this.selectedCityIndex = 0;
				this.selectedDistrictIndex = 0;
			},
			onCityChange(e) {
				this.selectedCityIndex = e.detail.value;
				this.selectedDistrictIndex = 0;
			},
			onDistrictChange(e) {
				this.selectedDistrictIndex = e.detail.value;
			},
			onSearchInput() {
				// 实时搜索
			},
			search() {
				// 执行搜索
				console.log('搜索关键词:', this.searchKeyword);
			},
			viewStoreDetail(store) {
				uni.showToast({
					title: `查看${store.name}详情`,
					icon: 'none'
				});
			},
			callStore(store) {
				uni.makePhoneCall({
					phoneNumber: store.phone,
					success: () => {
						console.log('拨打电话成功');
					},
					fail: () => {
						uni.showToast({
							title: '拨打电话失败',
							icon: 'none'
						});
					}
				});
			},
			navigateToStore(store) {
				uni.showToast({
					title: '正在打开导航...',
					icon: 'none'
				});
			},
			bookStore(store) {
				// 检查门店状态
				if (store.status === 'renovation') {
					uni.showToast({
						title: '该门店正在装修中，暂无法预订',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				if (store.status === 'closed') {
					uni.showToast({
						title: '该门店正在休息中，暂无法预订',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				
				// 正常营业状态，可以预订
				uni.navigateTo({
					url: `/pages/tabBar/booking-detail/booking-detail?store=${encodeURIComponent(JSON.stringify(store))}`
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fef5f7;
		min-height: 100vh;
	}
	
	/* 搜索和区域选择样式 */
	.search-section {
		padding: 20rpx;
	}
	
	.search-bar {
		display: flex;
		gap: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.search-input {
		flex: 1;
		height: 80rpx;
		background-color: #fff8fa;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
	}
	
	.search-btn {
		background-color: #FF69B4;
		color: #fff;
		padding: 16rpx 32rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
	}
	
	.area-selector {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.area-picker {
		height: 70rpx;
		background-color: #fff8fa;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	
	.area-label {
		font-size: 26rpx;
		color: #666;
		font-weight: 500;
		margin-right: 10rpx;
		min-width: 80rpx;
	}
	
	.area-text {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}
	
	.area-arrow {
		font-size: 20rpx;
		color: #999;
		transition: transform 0.3s ease;
		margin-left: 10rpx;
	}
	
	/* 门店列表样式 */
	.store-list {
		padding: 0 20rpx;
	}
	
	.store-item {
		background-color: #fff8fa;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		border: 1rpx solid #ffe4e8;
		padding: 20rpx;
	}
	
	.store-image {
		position: relative;
		width: 100%;
		height: 250rpx;
		margin-bottom: 20rpx;
	}
	
	.store-image image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	.store-status {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		background-color: #FF69B4;
		color: #fff;
		padding: 6rpx 12rpx;
		border-radius: 15rpx;
		font-size: 20rpx;
		font-weight: bold;
	}
	
	.store-status.open {
		background-color: #4CAF50; /* 营业中 - 绿色 */
	}
	
	.store-status.busy {
		background-color: #FF9800; /* 火爆 - 橙色 */
	}
	
	.store-status.renovation {
		background-color: #F44336; /* 装修中 - 红色 */
	}
	
	.store-status.closed {
		background-color: #9E9E9E; /* 休息中 - 灰色 */
	}
	
	.store-info {
		width: 100%;
	}
	
	.store-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.store-address {
		font-size: 26rpx;
		color: #666;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.store-details {
		margin-bottom: 15rpx;
	}
	
	.store-details text {
		font-size: 24rpx;
		color: #999;
		display: block;
		margin-bottom: 5rpx;
	}
	
	.store-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.price-range {
		background-color: #FFE4E8;
		border-radius: 20rpx;
		padding: 8rpx 15rpx;
		font-size: 26rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	
	.price-text {
		font-size: 26rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	
	.store-actions {
		display: flex;
		gap: 15rpx;
	}
	
	.action-btn {
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		font-weight: bold;
	}
	
	.action-btn.call-btn {
		background-color: #4CAF50;
		color: #fff;
	}
	
	.action-btn.navigate-btn {
		background-color: #2196F3;
		color: #fff;
	}
	
	.action-btn.book-btn {
		background-color: #FF69B4;
		color: #fff;
	}
	
	.action-btn.book-btn.disabled {
		background-color: #CCCCCC;
		color: #999999;
		cursor: not-allowed;
	}
	
	/* 空状态样式 */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
</style> 