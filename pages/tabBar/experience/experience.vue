<template>
	<view class="content">
		<!-- 搜索和区域选择 -->
		<view class="search-section">
			<!-- 区域选择按钮 -->
			<view class="area-selector" @click="goToAreaSelection">
				<view class="area-icon">
					<text class="icon">🗺️</text>
				</view>
			</view>
			
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
		</view>
		
		<!-- 门店列表 -->
		<view class="store-list">
			<view class="store-item" v-for="(store, index) in filteredStores" :key="index">
				<view class="store-content">
					<view class="store-image" @click="bookStore(store)">
						<image :src="store.image" mode="aspectFill"></image>
						<view class="store-status" :class="store.status">{{store.statusText}}</view>
					</view>
					<view class="store-info">
						<text class="store-name">{{store.name}}</text>
						<text class="store-address">📍 {{store.address}}</text>
						
						<!-- 每小时体验价格 -->
						<view class="price-hour">
							<text class="price-hour-label">每小时：</text>
							<text class="price-hour-value">¥199</text>
						</view>
						
						<!-- 三个套餐价格 -->
						<view class="packages">
							<view class="package">
								<text class="package-label">套餐一：</text>
								<text class="package-price">¥299</text>
							</view>
							<view class="package">
								<text class="package-label">套餐二：</text>
								<text class="package-price">¥399</text>
							</view>
							<view class="package">
								<text class="package-label">套餐三：</text>
								<text class="package-price">¥499</text>
							</view>
						</view>
						
						<view class="store-footer">
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
			filteredStores() {
				let filtered = this.stores;
				
				// 按搜索关键词筛选
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
			// 跳转到区域选择页面
			goToAreaSelection() {
				uni.navigateTo({
					url: '/pages/area-selection/area-selection'
				});
			},
			
			onSearchInput() {
				// 实时搜索
			},
			search() {
				// 执行搜索
				console.log('搜索关键词:', this.searchKeyword);
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
		display: flex;
		gap: 20rpx;
		align-items: center;
	}
	
	.search-bar {
		flex: 1;
		display: flex;
		gap: 20rpx;
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
		white-space: nowrap;
	}
	
	.area-selector {
		flex-shrink: 0;
		width: 80rpx;
	}
	
	.area-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80rpx;
		height: 80rpx;
		background-color: #fff8fa;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
		transition: all 0.3s ease;
	}
	
	.area-icon:active {
		transform: scale(0.95);
		background-color: #ffe4e8;
	}
	
	.area-icon .icon {
		font-size: 34rpx;
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
	
	/* 门店列表样式（精简） */
	.store-list { padding: 0 20rpx; }
	.store-item { background-color: #fff8fa; border-radius: 16rpx; margin-bottom: 20rpx; overflow: hidden; border: 1rpx solid #ffe4e8; padding: 20rpx; }
	
	.store-content {
		display: flex;
		gap: 20rpx;
		align-items: flex-start;
	}
	
	.store-image { 
		position: relative; 
		width: 400rpx; 
		height: 350rpx; 
		flex-shrink: 0;
		cursor: pointer;
		transition: transform 0.2s ease;
		overflow: hidden;
	}
	
	.store-image:active {
		transform: scale(0.98);
	}
	
	.store-image::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 70%, rgba(255, 105, 180, 0.1) 100%);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	
	.store-image:hover::after {
		opacity: 1;
	}
	.store-image image { width: 100%; height: 100%; border-radius: 12rpx; }
	.store-status { position: absolute; top: 10rpx; right: 10rpx; background-color: #FF69B4; color: #fff; padding: 6rpx 12rpx; border-radius: 15rpx; font-size: 20rpx; font-weight: bold; }
	.store-status.open { background-color: #4CAF50; }
	.store-status.busy { background-color: #FF9800; }
	.store-status.renovation { background-color: #F44336; }
	.store-status.closed { background-color: #9E9E9E; }
	
	.store-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 350rpx;
	}
	
	.store-name { font-size: 28rpx; font-weight: bold; color: #333; display: block; margin-bottom: 4rpx; }
	.store-address { font-size: 22rpx; color: #666; display: block; margin-bottom: 8rpx; }
	
	.price-hour { display: flex; align-items: baseline; gap: 8rpx; margin: 4rpx 0 8rpx; }
	.price-hour-label { font-size: 22rpx; color: #666; }
	.price-hour-value { font-size: 26rpx; color: #FF69B4; font-weight: bold; }
	
	.packages { 
		display: flex; 
		flex-wrap: wrap; 
		gap: 8rpx; 
		margin-bottom: 8rpx; 
	}
	.package { 
		background: #fff; 
		border: 1rpx solid #ffe4e8; 
		border-radius: 16rpx; 
		padding: 6rpx 12rpx; 
		display: flex; 
		align-items: center; 
		gap: 6rpx; 
	}
	.package-label { font-size: 20rpx; color: #666; }
	.package-price { font-size: 22rpx; color: #FF69B4; font-weight: bold; }
	
	.store-footer { display: flex; justify-content: flex-end; }
	.store-actions { display: flex; gap: 12rpx; }
	.action-btn { padding: 8rpx 16rpx; border-radius: 24rpx; font-size: 22rpx; font-weight: bold; }
	.action-btn.call-btn { background-color: #4CAF50; color: #fff; }
	.action-btn.navigate-btn { background-color: #2196F3; color: #fff; }
	.action-btn.book-btn { background-color: #FF69B4; color: #fff; }
	.action-btn.book-btn.disabled { background-color: #CCCCCC; color: #999999; }
	
	/* 空状态 */
	.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100rpx 0; }
	.empty-text { font-size: 28rpx; color: #999; }
</style> 