<template>
	<view class="content">
		<!-- 搜索区域 -->
		<view class="search-section">
			<view class="search-bar">
				<input 
					type="text" 
					placeholder="搜索体验项目" 
					class="search-input"
					v-model="searchKeyword"
					@input="onSearchInput"
				/>
				<button class="search-btn" @click="search">搜索</button>
			</view>
		</view>
		
		<!-- 体验项目列表 -->
		<view class="experience-list">
			<view class="experience-item" v-for="(item, index) in filteredExperiences" :key="index" @click="viewDetail(item)">
				<view class="experience-image">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="experience-tag" v-if="item.tag">{{item.tag}}</view>
				</view>
				<view class="experience-info">
					<text class="experience-name">{{item.name}}</text>
					<text class="experience-desc">{{item.description}}</text>
					<view class="experience-details">
						<text class="location">📍 {{item.location}}</text>
						<text class="duration">⏱️ {{item.duration}}</text>
						<text class="capacity">👥 {{item.capacity}}人</text>
					</view>
					<view class="experience-footer">
						<view class="price-info">
							<text class="current-price">¥{{item.price}}</text>
							<text class="original-price" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
						</view>
						<button class="book-btn" @click.stop="bookExperience(item)">立即预订</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredExperiences.length === 0">
			<text class="empty-text">暂无相关体验项目</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				experiences: [
					{
						id: 1,
						name: 'VR虚拟现实体验',
						description: '沉浸式虚拟现实体验，带你进入全新的数字世界',
						image: '/static/image/day/VR体验馆.jpg',
						location: '朝阳店',
						duration: '30分钟',
						capacity: '1-2',
						price: '80',
						originalPrice: '100',
						tag: '热门'
					},
					{
						id: 2,
						name: 'VR赛车体验',
						description: '虚拟赛车游戏，体验速度与激情',
						image: '/static/templateIndex.png',
						location: '西城店',
						duration: '20分钟',
						capacity: '1-2',
						price: '40',
						originalPrice: '60',
						tag: '刺激'
					},
					{
						id: 3,
						name: 'VR射击游戏',
						description: '虚拟射击游戏，考验反应和技巧',
						image: '/static/extuiIndex.png',
						location: '海淀店',
						duration: '25分钟',
						capacity: '1-4',
						price: '50',
						originalPrice: '70',
						tag: '推荐'
					},
					{
						id: 4,
						name: 'VR飞行体验',
						description: '虚拟飞行体验，感受翱翔蓝天的快感',
						image: '/static/componentIndex.png',
						location: '朝阳店',
						duration: '35分钟',
						capacity: '1-2',
						price: '90',
						originalPrice: '120',
						tag: '新项目'
					}
				]
			}
		},
		computed: {
			filteredExperiences() {
				if (!this.searchKeyword.trim()) {
					return this.experiences;
				}
				
				const keyword = this.searchKeyword.toLowerCase();
				return this.experiences.filter(item => 
					item.name.toLowerCase().includes(keyword) ||
					item.description.toLowerCase().includes(keyword) ||
					item.location.toLowerCase().includes(keyword)
				);
			}
		},
		methods: {
			onSearchInput() {
				// 实时搜索
			},
			search() {
				// 执行搜索
				console.log('搜索关键词:', this.searchKeyword);
			},
			viewDetail(item) {
				uni.showToast({
					title: `查看${item.name}详情`,
					icon: 'none'
				});
			},
			bookExperience(item) {
				uni.navigateTo({
					url: `/pages/tabBar/booking-detail/booking-detail?item=${encodeURIComponent(JSON.stringify(item))}`
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
	
	/* 搜索区域样式 */
	.search-section {
		padding: 20rpx;
	}
	
	.search-bar {
		display: flex;
		background-color: #fff8fa;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
		overflow: hidden;
	}
	
	.search-input {
		flex: 1;
		height: 80rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		background-color: transparent;
	}
	
	.search-btn {
		width: 120rpx;
		height: 80rpx;
		background-color: #FF69B4;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	/* 体验项目列表样式 */
	.experience-list {
		padding: 0 20rpx;
	}
	
	.experience-item {
		background-color: #fff8fa;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		border: 1rpx solid #ffe4e8;
	}
	
	.experience-image {
		position: relative;
	}
	
	.experience-image image {
		width: 100%;
		height: 300rpx;
	}
	
	.experience-tag {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		background-color: #FF69B4;
		color: #fff;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
	}
	
	.experience-info {
		padding: 30rpx;
	}
	
	.experience-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 16rpx;
	}
	
	.experience-desc {
		font-size: 26rpx;
		color: #666;
		display: block;
		margin-bottom: 20rpx;
		line-height: 1.5;
	}
	
	.experience-details {
		margin-bottom: 20rpx;
	}
	
	.experience-details text {
		font-size: 24rpx;
		color: #999;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.experience-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.price-info {
		display: flex;
		align-items: center;
	}
	
	.current-price {
		font-size: 36rpx;
		color: #FF69B4;
		font-weight: bold;
		margin-right: 16rpx;
	}
	
	.original-price {
		font-size: 26rpx;
		color: #999;
		text-decoration: line-through;
	}
	
	.book-btn {
		background-color: #FF69B4;
		color: #fff;
		padding: 16rpx 32rpx;
		border-radius: 30rpx;
		font-size: 26rpx;
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