<template>
	<view class="content">
		<!-- 公告栏弹窗 -->
		<view class="announcement-overlay" v-if="showAnnouncement">
			<view class="announcement-popup" @click.stop>
				<view class="announcement-header">
					<text class="announcement-title">📢 公告通知</text>
				</view>
				<view class="announcement-content">
					<text class="announcement-text">{{announcementContent}}</text>
				</view>
				<view class="announcement-footer">
					<button class="read-btn" @click="closeAnnouncement">我已阅读</button>
				</view>
			</view>
		</view>
		
		<!-- 轮播图 -->
		<view class="swiper-section">
			<swiper class="swiper" circular autoplay interval="3000" duration="500">
				<swiper-item v-for="(item, index) in banners" :key="index" @click="onBannerClick(item)">
					<image :src="item.image" mode="aspectFill" class="swiper-image"></image>
					<!-- 轮播图标题和描述 -->
					<view class="banner-info" v-if="item.title || item.description">
						<text class="banner-title" v-if="item.title">{{item.title}}</text>
						<text class="banner-desc" v-if="item.description">{{item.description}}</text>
					</view>
				</swiper-item>
			</swiper>
			<!-- 轮播图指示器 -->
			<view class="swiper-indicator">
				<view 
					class="indicator-dot" 
					v-for="(item, index) in banners" 
					:key="index"
					:class="{ active: currentBannerIndex === index }"
				></view>
			</view>
		</view>
		
		<!-- 主要功能区域 -->
		<view class="main-functions">
			<!-- 商品出售功能 -->
			<view class="shop-section">
				<view class="category-grid">
					<view class="category-item" @click="navigateToShop('clothing')">
						<view class="category-icon">👕</view>
						<text class="category-text">服装</text>
					</view>
					<view class="category-item" @click="navigateToShop('electronics')">
						<view class="category-icon">📱</view>
						<text class="category-text">数码</text>
					</view>
					<view class="category-item" @click="navigateToShop('beauty')">
						<view class="category-icon">💄</view>
						<text class="category-text">美妆</text>
					</view>
					<view class="category-item" @click="navigateToShop('home')">
						<view class="category-icon">🏠</view>
						<text class="category-text">家居</text>
					</view>
					<view class="category-item" @click="navigateToShop('food')">
						<view class="category-icon">🍎</view>
						<text class="category-text">食品</text>
					</view>
					<view class="category-item" @click="navigateToShop('sports')">
						<view class="category-icon">⚽</view>
						<text class="category-text">运动</text>
					</view>
					<view class="category-item" @click="navigateToShop('books')">
						<view class="category-icon">📚</view>
						<text class="category-text">图书</text>
					</view>
					<view class="category-item" @click="navigateToShop('all')">
						<view class="category-icon">🛍️</view>
						<text class="category-text">全部</text>
					</view>
				</view>
			</view>
			
			<!-- 体验馆大功能 -->
			<view class="main-function" @click="navigateToMainFunction">
				<image src="/static/image/day/体验馆.png" class="function-bg-image" mode="aspectFill"></image>
			</view>
		</view>
		
		<!-- 热门推荐 -->
		<view class="section">
			<view class="section-title">
				<text>热门推荐</text>
				<!-- 开发测试按钮 (生产环境可删除) -->
				<text class="test-btn" @click="showTestAnnouncement">📢</text>
			</view>
			<view class="product-list">
				<view class="product-item" v-for="(item, index) in products" :key="index" @click="viewProduct(item)">
					<image :src="item.image" mode="aspectFill" class="product-image"></image>
					<view class="product-info">
						<text class="product-name">{{item.name}}</text>
						<text class="product-price">¥{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAnnouncement: false, // 控制公告显示
				currentBannerIndex: 0, // 当前轮播图索引
				announcementContent: `欢迎来到天天体验馆！

📢 重要公告：
------------------------
   本处后台维护即可
   样例如下：
------------------------

• 营业时间：每日 09:00-22:00
• 请提前预约，避免排队等候
• 体验过程中请遵守安全规定
• 如有疑问请联系客服：400-123-4567


🎯 最新活动：
• 周末体验享9折优惠
• 生日当月免费体验一次
• 连续签到7天送神秘礼品

祝您体验愉快！`,
				// 轮播图数据 - 后台可维护
				banners: [
					{ 
						id: 1,
						image: '/static/image/day/轮播图1.jpg',
						title: '新店开业大酬宾',
						description: '全场8折优惠，新用户首次体验更享特价！',
						linkType: 'activity', // 链接类型：activity-活动, product-商品, url-外部链接
						linkData: 'new_store_promotion' // 链接数据
					},
					{ 
						id: 2,
						image: '/static/image/day/轮播图2.jpg',
						title: 'VR体验专区',
						description: '沉浸式虚拟现实体验，带你进入全新世界',
						linkType: 'product',
						linkData: 'vr_experience'
					},
					{ 
						id: 3,
						image: '/static/image/day/轮播图3.jpg',
						title: '密室逃脱挑战',
						description: '惊险刺激的解密游戏，考验你的智慧',
						linkType: 'product',
						linkData: 'escape_room'
					},
					{ 
						id: 4,
						image: '/static/image/day/VR体验馆.jpg',
						title: '周末狂欢夜',
						description: '每周末特色体验项目限时开放',
						linkType: 'activity',
						linkData: 'weekend_party'
					}
				],

				products: [
					{ name: 'VR体验馆', price: '80', image: '/static/image/day/VR体验馆.jpg' },
					{ name: '棋牌室', price: '60', image: '/static/image/day/棋牌1.jpg' },
					{ name: '台球室', price: '50', image: '/static/image/day/台球1.png' },
					{ name: '密室逃脱', price: '120', image: '/static/image/day/密室逃脱.jpg' }
				]
			}
		},
		onLoad() {
			// 页面加载时检查是否需要显示公告
			this.checkAndShowAnnouncement();
			// 加载轮播图数据
			this.loadBanners();
		},
		methods: {
			// 加载轮播图数据（从后台获取）
			loadBanners() {
				// 导入API接口
				import('@/api/banner.js').then(module => {
					const { getHomeBanners, getMockBanners } = module;
					
					// 判断是否为开发环境
					const isDev = process.env.NODE_ENV === 'development';
					
					if (isDev) {
						// 开发环境使用模拟数据
						getMockBanners().then(res => {
							if (res.success) {
								this.banners = res.data;
							}
						}).catch(err => {
							console.error('加载模拟轮播图失败:', err);
							// 使用默认数据
						});
					} else {
						// 生产环境使用真实API
						getHomeBanners().then(res => {
							if (res.success) {
								this.banners = res.data;
							}
						}).catch(err => {
							console.error('加载轮播图失败:', err);
							// 使用默认数据
						});
					}
				}).catch(err => {
					console.error('导入API模块失败:', err);
					// 使用默认数据
				});
			},
			
			// 轮播图点击事件
			onBannerClick(banner) {
				console.log('点击轮播图:', banner);
				
				switch(banner.linkType) {
					case 'activity':
						// 跳转到活动页面
						this.navigateToActivity(banner.linkData);
						break;
					case 'product':
						// 跳转到商品详情
						this.navigateToProduct(banner.linkData);
						break;
					case 'url':
						// 打开外部链接
						this.openExternalUrl(banner.linkData);
						break;
					default:
						// 默认跳转到体验馆
						this.navigateToMainFunction();
						break;
				}
			},
			
			// 跳转到活动页面
			navigateToActivity(activityId) {
				uni.navigateTo({
					url: `/pages/tabBar/discount/discount?activity=${activityId}`
				});
			},
			
			// 跳转到商品详情
			navigateToProduct(productId) {
				uni.navigateTo({
					url: `/pages/tabBar/booking-detail/booking-detail?product=${productId}`
				});
			},
			
			// 打开外部链接
			openExternalUrl(url) {
				// #ifdef H5
				window.open(url, '_blank');
				// #endif
				
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				// #endif
				
				// #ifdef MP
				uni.showToast({
					title: '请在浏览器中打开',
					icon: 'none'
				});
				// #endif
			},
			
			checkAndShowAnnouncement() {
				// 检查本次会话是否已经显示过公告
				const app = getApp();
				if (!app.globalData.hasShownAnnouncement) {
					// 标记已显示，确保本次会话只显示一次
					app.globalData.hasShownAnnouncement = true;
					
					setTimeout(() => {
						this.showAnnouncement = true;
					}, 800); // 延迟800ms显示，让页面先渲染完成
				}
			},
			closeAnnouncement() {
				// 关闭公告
				this.showAnnouncement = false;
			},
			navigateToMainFunction() {
				uni.navigateTo({
					url: '/pages/tabBar/experience/experience'
				});
			},
			// 跳转到商品出售页面
			navigateToShop(category) {
				uni.navigateTo({
					url: `/pages/shop/shop?category=${category}`
				});
			},
			// 查看商品详情
			viewProduct(product) {
				uni.navigateTo({
					url: `/pages/shop/product-detail?product=${encodeURIComponent(JSON.stringify(product))}`
				});
			},
			// 测试方法：重新显示公告（开发调试用）
			showTestAnnouncement() {
				this.showAnnouncement = true;
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fef8fa; // 更淡的浅粉色背景
		min-height: 100vh;
	}
	
	/* 公告弹窗样式 */
	.announcement-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: overlayShow 0.3s ease-out;
	}
	
	@keyframes overlayShow {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	.announcement-popup {
		width: 90%;
		max-width: 600rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
		z-index: 1000;
		overflow: hidden;
		animation: popupShow 0.3s ease-out;
	}
	
	@keyframes popupShow {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	
	.announcement-header {
		background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%); // 更淡的粉色渐变
		padding: 30rpx;
		text-align: center;
		
		.announcement-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #fff;
		}
	}
	
	.announcement-content {
		padding: 30rpx;
		max-height: 500rpx;
		overflow-y: auto;
		
		.announcement-text {
			font-size: 28rpx;
			color: #333;
			line-height: 1.8;
			white-space: pre-line;
		}
	}
	
	.announcement-footer {
		padding: 20rpx 30rpx 30rpx;
		text-align: center;
		border-top: 1rpx solid #f0f0f0;
		background-color: #fafafa;
		
		.read-btn {
			background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%); // 更淡的粉色渐变
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 50rpx;
			font-size: 28rpx;
			font-weight: bold;
			border: none;
			box-shadow: 0 6rpx 15rpx rgba(255, 182, 193, 0.3); // 更淡的阴影
			transition: all 0.2s ease;
		}
		
		.read-btn:active {
			transform: scale(0.95);
			box-shadow: 0 3rpx 8rpx rgba(255, 182, 193, 0.4);
		}
	}
	
	/* 轮播图样式 */
	.swiper-section {
		position: relative;
		
		.swiper {
			height: 400rpx;
			
			.swiper-image {
				width: 100%;
				height: 100%;
			}
		}
		
		/* 轮播图信息覆盖层 */
		.banner-info {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
			padding: 40rpx 30rpx 30rpx;
			color: #fff;
			
			.banner-title {
				font-size: 32rpx;
				font-weight: bold;
				display: block;
				margin-bottom: 8rpx;
			}
			
			.banner-desc {
				font-size: 24rpx;
				opacity: 0.9;
				display: block;
			}
		}
		
		/* 轮播图指示器 */
		.swiper-indicator {
			position: absolute;
			bottom: 20rpx;
			right: 30rpx;
			display: flex;
			gap: 12rpx;
			
			.indicator-dot {
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.5);
				transition: all 0.3s ease;
				
				&.active {
					background-color: #FFB6C1; // 更淡的粉色
					transform: scale(1.2);
				}
			}
		}
	}
	
	/* 主要功能区域样式 */
	.main-functions {
		padding: 30rpx 20rpx;
		background-color: #fef8fa; // 更淡的浅粉色背景
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe8ec; // 更淡的边框色
		
		/* 商品出售功能 */
		.shop-section {
			margin-bottom: 40rpx;
			background-color: #f0f8ff;
			border-radius: 16rpx;
			padding: 30rpx 0;
			border: 2rpx solid #FFB6C1;
			
			.category-grid {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 15rpx;
				padding: 0 20rpx;
			}
			.category-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 25rpx 15rpx;
				background-color: transparent;
				border-radius: 8rpx;
				box-shadow: none;
				transition: all 0.3s ease;
				aspect-ratio: 1;
				
				&:active {
					transform: scale(0.95);
					background-color: rgba(255, 255, 255, 0.3);
				}
				
				.category-icon {
					font-size: 50rpx;
					color: #FFB6C1;
					margin-bottom: 8rpx;
				}
				.category-text {
					font-size: 24rpx;
					color: #333;
					text-align: center;
					font-weight: 500;
				}
			}
		}
		
		/* 体验馆大功能 */
		.main-function {
			position: relative;
			width: 100%;
			height: 300rpx;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 30rpx;
			border: 2rpx solid #FFB6C1;
			
			.function-bg-image {
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
			}
		}
	}
	
	/* 热门推荐样式 */
	.section {
		background-color: #fef8fa; // 更淡的浅粉色背景
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 20rpx;
		border: 1rpx solid #ffe8ec; // 更淡的边框色
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.test-btn {
				font-size: 24rpx;
				padding: 10rpx;
				background-color: rgba(255, 182, 193, 0.1); // 更淡的背景色
				border-radius: 50%;
				color: #FFB6C1; // 更淡的粉色
			}
		}
		
		.product-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.product-item {
				width: 48%;
				margin-bottom: 20rpx;
				border-radius: 12rpx;
				overflow: hidden;
				background-color: #fef8fa; // 更淡的浅粉色背景
				border: 1rpx solid #ffe8ec; // 更淡的边框色
				transition: all 0.3s ease;
				
				&:active {
					transform: scale(0.95);
				}
				
				.product-image {
					width: 100%;
					height: 200rpx;
				}
				
				.product-info {
					padding: 20rpx;
					
					.product-name {
						font-size: 28rpx;
						color: #333;
						display: block;
						margin-bottom: 10rpx;
					}
					
					.product-price {
						font-size: 32rpx;
						color: #FFB6C1; // 更淡的粉色
						font-weight: bold;
					}
				}
			}
		}
	}
</style> 