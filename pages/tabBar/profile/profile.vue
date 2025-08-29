<template>
	<view class="content">
		<view class="user-info">
			<view class="avatar-section">
				<image :src="userInfo.avatar" class="avatar" @click="changeAvatar"></image>
				<view class="user-details">
					<text class="username">{{userInfo.name}}</text>
					<text class="user-level">{{userInfo.level}}</text>
				</view>
			</view>
			<view class="stats-section">
				<view class="stat-item" v-for="(item, index) in stats" :key="index">
					<text class="stat-number">{{item.number}}</text>
					<text class="stat-label">{{item.label}}</text>
				</view>
			</view>
		</view>
		
		<view class="menu-section">
			<view class="menu-group">
				<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
					<view class="menu-icon">
						<text class="iconfont" :class="item.icon"></text>
					</view>
					<text class="menu-text">{{item.text}}</text>
					<text class="menu-arrow">></text>
				</view>
			</view>
		</view>
		
		<view class="quick-actions">
			<view class="action-item" v-for="(item, index) in quickActions" :key="index" @click="handleQuickAction(item)">
				<view class="action-icon">
					<text class="iconfont" :class="item.icon"></text>
				</view>
				<text class="action-text">{{item.text}}</text>
			</view>
		</view>
		
		<view class="logout-section">
			<button class="logout-btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					name: '张三',
					level: '黄金会员',
					avatar: '/static/image/avatar.jpg'
				},
				stats: [
					{ number: '12', label: '收藏' },
					{ number: '8', label: '优惠券' },
					{ number: '1560', label: '积分' },
					{ number: '3', label: '待评价' }
				],
				menuItems: [
					{ text: '我的订单', icon: 'icon-order', action: 'orders' },
					{ text: '我的收藏', icon: 'icon-favorite', action: 'favorites' },
					{ text: '优惠券', icon: 'icon-coupon', action: 'coupons' },
					{ text: '积分商城', icon: 'icon-points', action: 'points' },
					{ text: '客服中心', icon: 'icon-service', action: 'service' },
					{ text: '设置', icon: 'icon-settings', action: 'settings' }
				],
				quickActions: [
					{ text: '意见反馈', icon: 'icon-feedback', action: 'feedback' },
					{ text: '关于我们', icon: 'icon-about', action: 'about' },
					{ text: '帮助中心', icon: 'icon-help', action: 'help' },
					{ text: '分享应用', icon: 'icon-share', action: 'share' }
				]
			}
		},
		methods: {
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.userInfo.avatar = res.tempFilePaths[0];
						uni.showToast({
							title: '头像更新成功',
							icon: 'success'
						});
					}
				});
			},
			handleMenuClick(item) {
				switch(item.action) {
					case 'orders':
						uni.navigateTo({ url: '/pages/tabBar/booking/booking' });
						break;
					case 'favorites':
						uni.showToast({ title: '我的收藏', icon: 'none' });
						break;
					case 'coupons':
						uni.showToast({ title: '优惠券', icon: 'none' });
						break;
					case 'points':
						uni.showToast({ title: '积分商城', icon: 'none' });
						break;
					case 'service':
						uni.showToast({ title: '客服中心', icon: 'none' });
						break;
					case 'settings':
						uni.showToast({ title: '设置', icon: 'none' });
						break;
				}
			},
			handleQuickAction(item) {
				switch(item.action) {
					case 'feedback':
						uni.showToast({ title: '意见反馈', icon: 'none' });
						break;
					case 'about':
						uni.showToast({ title: '关于我们', icon: 'none' });
						break;
					case 'help':
						uni.showToast({ title: '帮助中心', icon: 'none' });
						break;
					case 'share':
						uni.share({
							provider: 'weixin',
							scene: 'WXSceneSession',
							type: 0,
							href: 'https://uniapp.dcloud.io',
							title: '天天体验馆',
							summary: '发现美好生活',
							success: function (res) {
								console.log('分享成功');
							},
							fail: function (err) {
								console.log('分享失败');
							}
						});
						break;
				}
			},
			logout() {
				uni.showModal({
					title: '确认退出',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '已退出登录',
								icon: 'success'
							});
						}
					}
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
	
	.user-info {
		background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
		padding: 60rpx 40rpx 40rpx;
		color: #fff;
		
		.avatar-section {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			
			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 4rpx solid rgba(255, 255, 255, 0.3);
				margin-right: 30rpx;
			}
			
			.user-details {
				.username {
					font-size: 36rpx;
					font-weight: bold;
					display: block;
					margin-bottom: 10rpx;
				}
				
				.user-level {
					font-size: 26rpx;
					opacity: 0.8;
				}
			}
		}
		
		.stats-section {
			display: flex;
			justify-content: space-around;
			
			.stat-item {
				text-align: center;
				
				.stat-number {
					font-size: 32rpx;
					font-weight: bold;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.stat-label {
					font-size: 24rpx;
					opacity: 0.8;
				}
			}
		}
	}
	
	.menu-section {
		margin: 20rpx;
		
		.menu-group {
			background-color: #fff8fa;
			border-radius: 16rpx;
			overflow: hidden;
			border: 1rpx solid #ffe4e8;
			
			.menu-item {
				display: flex;
				align-items: center;
				padding: 30rpx;
				border-bottom: 1rpx solid #ffe4e8;
				
				&:last-child {
					border-bottom: none;
				}
				
				.menu-icon {
					width: 60rpx;
					height: 60rpx;
					background-color: #fff0f5;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;
					
					.iconfont {
						color: #FF69B4;
						font-size: 32rpx;
					}
				}
				
				.menu-text {
					flex: 1;
					font-size: 30rpx;
					color: #333;
				}
				
				.menu-arrow {
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
	
	.quick-actions {
		margin: 20rpx;
		background-color: #fff8fa;
		border-radius: 16rpx;
		padding: 30rpx;
		border: 1rpx solid #ffe4e8;
		
		.action-item {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #ffe4e8;
			
			&:last-child {
				border-bottom: none;
			}
			
			.action-icon {
				width: 50rpx;
				height: 50rpx;
				background-color: #fff0f5;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;
				
				.iconfont {
					color: #FF69B4;
					font-size: 28rpx;
				}
			}
			
			.action-text {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
	
	.logout-section {
		margin: 40rpx 20rpx;
		
		.logout-btn {
			width: 100%;
			height: 88rpx;
			background-color: #fff8fa;
			color: #ff6b35;
			border: 1rpx solid #ff6b35;
			border-radius: 16rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style> 