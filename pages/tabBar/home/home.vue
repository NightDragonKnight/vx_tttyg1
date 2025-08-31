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
				<swiper-item v-for="(item, index) in banners" :key="index">
					<image :src="item.image" mode="aspectFill" class="swiper-image"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 主要功能区域 -->
		<view class="main-functions">
			<!-- 体验馆大功能 -->
			<view class="main-function" @click="navigateToMainFunction">
				<view class="main-function-icon">
					<text class="iconfont">🏠</text>
				</view>
				<text class="main-function-text">体验馆</text>
			</view>
			
			<!-- 爆款推荐功能 -->
			<view class="hot-recommend">
				<view class="recommend-function" @click="navigateToHotRecommend">
					<view class="recommend-function-icon">
						<text class="iconfont">🔥</text>
					</view>
					<text class="recommend-function-text">爆款推荐</text>
				</view>
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
				<view class="product-item" v-for="(item, index) in products" :key="index">
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
				banners: [
					{ image: '/static/image/day/轮播图1.jpg' },
					{ image: '/static/image/day/轮播图2.jpg' },
					{ image: '/static/image/day/轮播图3.jpg' }
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
		},
		methods: {
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
			navigateToHotRecommend() {
				uni.showToast({
					title: '进入爆款推荐',
					icon: 'none'
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
		background-color: #fef5f7;
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
		background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
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
			background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 50rpx;
			font-size: 28rpx;
			font-weight: bold;
			border: none;
			box-shadow: 0 6rpx 15rpx rgba(255, 105, 180, 0.3);
			transition: all 0.2s ease;
		}
		
		.read-btn:active {
			transform: scale(0.95);
			box-shadow: 0 3rpx 8rpx rgba(255, 105, 180, 0.4);
		}
	}
	
	/* 轮播图样式 */
	.swiper-section {
		.swiper {
			height: 400rpx;
			
			.swiper-image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
			/* 主要功能区域样式 */
	.main-functions {
		padding: 30rpx 20rpx;
		background-color: #fff8fa;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
		
		/* 体验馆大功能 */
		.main-function {
			display: flex;
			align-items: center;
			padding: 30rpx;
			background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
			border-radius: 16rpx;
			margin-bottom: 30rpx;
			
			.main-function-icon {
				width: 100rpx;
				height: 100rpx;
				background-color: rgba(255, 255, 255, 0.2);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 30rpx;
				
				.iconfont {
					color: #fff;
					font-size: 60rpx;
				}
			}
			
			.main-function-text {
				font-size: 36rpx;
				font-weight: bold;
				color: #fff;
			}
		}
		
		/* 爆款推荐功能 */
		.hot-recommend {
			.recommend-function {
				display: flex;
				align-items: center;
				padding: 30rpx;
				background: linear-gradient(135deg, #FF6347 0%, #FF4500 100%);
				border-radius: 16rpx;
				
				.recommend-function-icon {
					width: 100rpx;
					height: 100rpx;
					background-color: rgba(255, 255, 255, 0.2);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 30rpx;
					
					.iconfont {
						color: #fff;
						font-size: 60rpx;
					}
				}
				
				.recommend-function-text {
					font-size: 36rpx;
					font-weight: bold;
					color: #fff;
				}
			}
		}
	}
	
	/* 热门推荐样式 */
	.section {
		background-color: #fff8fa;
		border-radius: 16rpx;
		padding: 30rpx;
		margin: 20rpx;
		border: 1rpx solid #ffe4e8;
		
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
				background-color: rgba(255, 105, 180, 0.1);
				border-radius: 50%;
				color: #FF69B4;
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
				background-color: #fff0f5;
				border: 1rpx solid #ffe4e8;
				
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
						color: #ff6b35;
						font-weight: bold;
					}
				}
			}
		}
	}
</style> 