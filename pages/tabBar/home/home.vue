<template>
	<view class="content">
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
			
			<!-- 三个小功能 -->
			<view class="sub-functions">
				<view class="sub-function" v-for="(item, index) in subFunctions" :key="index" @click="navigateToSubFunction(item)">
					<view class="sub-function-icon">
						<text class="iconfont">{{item.icon}}</text>
					</view>
					<text class="sub-function-text">{{item.text}}</text>
				</view>
			</view>
		</view>
		
		<!-- 热门推荐 -->
		<view class="section">
			<view class="section-title">
				<text>热门推荐</text>
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
				banners: [
					{ image: '/static/image/day/轮播图1.jpg' },
					{ image: '/static/image/day/轮播图2.jpg' },
					{ image: '/static/image/day/轮播图3.jpg' }
				],
				subFunctions: [
					{ text: '棋牌', icon: '🃏', path: '/pages/tabBar/discount/discount' },
					{ text: '台球', icon: '🎱', path: '/pages/tabBar/discount/discount' },
					{ text: 'KTV', icon: '🎤', path: '/pages/tabBar/discount/discount' }
				],
				products: [
					{ name: 'VR体验馆', price: '80', image: '/static/image/day/VR体验馆.jpg' },
					{ name: '棋牌室', price: '60', image: '/static/image/day/棋牌1.jpg' },
					{ name: '台球室', price: '50', image: '/static/image/day/台球1.png' },
					{ name: '密室逃脱', price: '120', image: '/static/image/day/密室逃脱.jpg' }
				]
			}
		},
		methods: {
			navigateToMainFunction() {
				uni.navigateTo({
					url: '/pages/tabBar/experience/experience'
				});
			},
			navigateToSubFunction(item) {
				uni.showToast({
					title: `进入${item.text}`,
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fef5f7;
		min-height: 100vh;
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
		
		/* 三个小功能 */
		.sub-functions {
			display: flex;
			justify-content: space-between;
			
							.sub-function {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 20rpx;
					background-color: #fff0f5;
					border-radius: 12rpx;
					margin: 0 10rpx;
					border: 1rpx solid #ffe4e8;
				
				&:first-child {
					margin-left: 0;
				}
				
				&:last-child {
					margin-right: 0;
				}
				
				.sub-function-icon {
					width: 80rpx;
					height: 80rpx;
					background-color: #FF69B4;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 16rpx;
					
					.iconfont {
						color: #fff;
						font-size: 50rpx;
					}
				}
				
				.sub-function-text {
					font-size: 26rpx;
					color: #333;
					font-weight: 500;
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