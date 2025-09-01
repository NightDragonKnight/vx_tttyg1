<template>
	<view class="content">
		<!-- 用户信息头部 -->
		<view class="user-info">
			<view class="avatar-section" @click="getUserInfo">
				<image :src="userInfo.avatarUrl" class="avatar"></image>
				<view class="user-details">
					<text class="username">{{userInfo.nickName}}</text>
					<text class="user-level">{{userInfo.level}}</text>
				</view>
				<view class="login-tip" v-if="!userInfo.isLogin">
					<text>点击登录</text>
				</view>
				<button class="share-commission-btn" v-if="userInfo.isLogin" @click.stop="shareCommission">
					<text class="btn-icon">🎁</text>
					<text class="btn-text">分享分佣</text>
				</button>
			</view>
		</view>
		
		<!-- 账户信息卡片 -->
		<view class="account-section">
			<view class="account-card">
				<view class="card-header">
					<text class="card-title">我的账户</text>
				</view>
				<view class="account-stats">
					<view class="stat-item" @click="handleAccountAction('recharge')">
						<text class="stat-number">¥{{accountInfo.balance}}</text>
						<text class="stat-label">储值余额</text>
						<text class="stat-action">充值</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item" @click="handleAccountAction('points')">
						<text class="stat-number">{{accountInfo.points}}</text>
						<text class="stat-label">积分</text>
						<text class="stat-action">兑换</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item" @click="handleAccountAction('reviews')">
						<text class="stat-number">{{accountInfo.pendingReviews}}</text>
						<text class="stat-label">待评价</text>
						<text class="stat-action">去评价</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 快捷操作 -->
		<view class="quick-services">
			<view class="service-title">快捷操作</view>
			
			<!-- 第一行：储值充值、分佣收入、我的评价 -->
			<view class="service-grid">
				<view class="service-item" @click="handleServiceClick(quickServices[0])">
					<view class="service-icon" :style="{backgroundColor: quickServices[0].bgColor}">
						<text class="icon-text">{{quickServices[0].icon}}</text>
					</view>
					<text class="service-text">{{quickServices[0].text}}</text>
				</view>
				<view class="service-item" @click="handleMenuClick(menuItems[2])">
					<view class="service-icon" :style="{backgroundColor: menuItems[2].bgColor}">
						<text class="icon-text">{{menuItems[2].icon}}</text>
					</view>
					<text class="service-text">{{menuItems[2].text}}</text>
				</view>
				<view class="service-item" @click="handleServiceClick(quickServices[1])">
					<view class="service-icon" :style="{backgroundColor: quickServices[1].bgColor}">
						<text class="icon-text">{{quickServices[1].icon}}</text>
					</view>
					<text class="service-text">{{quickServices[1].text}}</text>
				</view>
			</view>
			
			<!-- 第二行：意见反馈、关于我们、加盟我们、保洁专区 -->
			<view class="service-grid">
				<view class="service-item" v-for="(item, index) in [menuItems[0], menuItems[1], menuItems[3], menuItems[4]]" :key="index" @click="handleMenuClick(item)">
					<view class="service-icon" :style="{backgroundColor: item.bgColor}">
						<text class="icon-text">{{item.icon}}</text>
					</view>
					<text class="service-text">{{item.text}}</text>
				</view>
			</view>
		</view>
		
		<!-- 退出登录 -->
		<view class="logout-section" v-if="userInfo.isLogin">
			<button class="logout-btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickName: '微信用户',
					avatarUrl: '/static/image/default-avatar.png',
					level: '普通会员',
					isLogin: false
				},
				accountInfo: {
					balance: '268.00',
					points: 1560,
					pendingReviews: 3
				},
				quickServices: [
					{
						icon: '💰',
						text: '储值充值',
						action: 'recharge',
						bgColor: '#E8F5E8'
					},
					{
						icon: '⭐',
						text: '我的评价',
						action: 'reviews',
						bgColor: '#F0F9FF'
					}
				],
				menuItems: [
					{ 
						text: '意见反馈', 
						icon: '💬', 
						action: 'feedback',
						bgColor: '#FFF0F5'
					},
					{ 
						text: '关于我们', 
						icon: 'ℹ️', 
						action: 'about',
						bgColor: '#F0F8FF'
					},
					{ 
						text: '分佣收入', 
						icon: '💎', 
						action: 'commission',
						bgColor: '#FFF8DC'
					},
					{ 
						text: '加盟我们', 
						icon: '🤝', 
						action: 'franchise',
						bgColor: '#F0FFF0'
					},
					{ 
						text: '保洁专区', 
						icon: '🧽', 
						action: 'cleaning',
						bgColor: '#F5F5DC'
					}
				]
			}
		},
		onShow() {
			this.loadUserInfo();
			this.loadAccountInfo();
		},
		methods: {
			// 获取微信用户信息
			getUserInfo() {
				if (this.userInfo.isLogin) {
					return;
				}
				
				uni.getUserProfile({
					desc: '用于完善个人资料',
					success: (res) => {
						console.log('获取用户信息成功', res);
						this.userInfo = {
							nickName: res.userInfo.nickName,
							avatarUrl: res.userInfo.avatarUrl,
							level: '黄金会员',
							isLogin: true
						};
						
						// 保存用户信息到本地
						uni.setStorageSync('userInfo', this.userInfo);
						
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						console.log('获取用户信息失败', err);
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
					}
				});
			},
			
			// 加载用户信息
			loadUserInfo() {
				const savedUserInfo = uni.getStorageSync('userInfo');
				if (savedUserInfo) {
					this.userInfo = savedUserInfo;
				}
			},
			
			// 加载账户信息
			loadAccountInfo() {
				// 模拟从服务器获取账户信息
				// 实际项目中这里应该调用API
				const savedAccountInfo = uni.getStorageSync('accountInfo');
				if (savedAccountInfo) {
					this.accountInfo = savedAccountInfo;
				}
			},
			
			// 分享分佣
			shareCommission() {
				uni.showActionSheet({
					itemList: ['分享给微信好友', '分享到朋友圈', '复制邀请链接'],
					success: (res) => {
						switch(res.tapIndex) {
							case 0:
								this.shareToWechat();
								break;
							case 1:
								this.shareToMoments();
								break;
							case 2:
								this.copyInviteLink();
								break;
						}
					}
				});
			},
			
			// 分享给微信好友
			shareToWechat() {
				const shareContent = {
					title: '天天体验馆邀请您体验',
					summary: '我在天天体验馆发现了超棒的体验项目，邀请你一起来玩！还有分佣奖励哦～',
					imageUrl: '/static/image/day/轮播图1.jpg'
				};
				
				// 模拟微信分享
				uni.showLoading({ title: '分享中...' });
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '分享成功',
						icon: 'success'
					});
				}, 1500);
			},
			
			// 分享到朋友圈
			shareToMoments() {
				const shareContent = {
					title: '天天体验馆 - 发现美好体验',
					summary: '超多精彩体验项目等你来！VR、密室、台球、棋牌...',
					imageUrl: '/static/image/day/轮播图2.jpg'
				};
				
				// 模拟朋友圈分享
				uni.showLoading({ title: '分享中...' });
				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '分享成功',
						icon: 'success'
					});
				}, 1500);
			},
			
			// 复制邀请链接
			copyInviteLink() {
				const inviteCode = this.generateInviteCode();
				const inviteLink = `https://tttyg.com/invite?code=${inviteCode}`;
				
				uni.setClipboardData({
					data: inviteLink,
					success: () => {
						uni.showToast({
							title: '邀请链接已复制',
							icon: 'success'
						});
						
						// 显示邀请详情
						setTimeout(() => {
							uni.showModal({
								title: '邀请链接已复制',
								content: `您的专属邀请码：${inviteCode}\n\n好友通过您的邀请链接注册并消费，您将获得5%的分佣奖励！`,
								showCancel: false,
								confirmText: '知道了'
							});
						}, 1000);
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						});
					}
				});
			},
			
			// 生成邀请码
			generateInviteCode() {
				// 简单的邀请码生成逻辑
				const userId = this.userInfo.nickName || 'USER';
				const timestamp = Date.now().toString().slice(-6);
				return `${userId.slice(0, 3).toUpperCase()}${timestamp}`;
			},
			
			// 处理账户操作
			handleAccountAction(type) {
				if (!this.userInfo.isLogin) {
					this.getUserInfo();
					return;
				}
				
				switch(type) {
					case 'recharge':
						this.showRechargeOptions();
						break;
					case 'points':
						uni.showToast({ title: '积分商城', icon: 'none' });
						break;
					case 'reviews':
						this.goToReviews();
						break;
				}
			},
			
			// 显示充值选项
			showRechargeOptions() {
				uni.showActionSheet({
					itemList: ['充值100元', '充值200元', '充值500元', '自定义金额'],
					success: (res) => {
						const amounts = [100, 200, 500, 0];
						const amount = amounts[res.tapIndex];
						
						if (amount === 0) {
							// 自定义金额
							uni.showModal({
								title: '自定义充值',
								content: '请输入充值金额',
								editable: true,
								placeholderText: '请输入金额',
								success: (res) => {
									if (res.confirm && res.content) {
										this.processRecharge(parseFloat(res.content));
									}
								}
							});
						} else {
							this.processRecharge(amount);
						}
					}
				});
			},
			
			// 处理充值
			processRecharge(amount) {
				if (amount <= 0 || isNaN(amount)) {
					uni.showToast({
						title: '请输入有效金额',
						icon: 'none'
					});
					return;
				}
				
				uni.showModal({
					title: '确认充值',
					content: `确定要充值￥${amount}元吗？`,
					success: (res) => {
						if (res.confirm) {
							// 模拟充值成功
							uni.showLoading({ title: '支付中...' });
							setTimeout(() => {
								uni.hideLoading();
								
								// 更新余额
								const currentBalance = parseFloat(this.accountInfo.balance);
								this.accountInfo.balance = (currentBalance + amount).toFixed(2);
								
								// 增加积分（充值1元得1积分）
								this.accountInfo.points += Math.floor(amount);
								
								// 保存到本地
								uni.setStorageSync('accountInfo', this.accountInfo);
								
								uni.showToast({
									title: '充值成功',
									icon: 'success'
								});
							}, 2000);
						}
					}
				});
			},
			
			// 处理快捷服务点击
			handleServiceClick(item) {
				if (!this.userInfo.isLogin) {
					this.getUserInfo();
					return;
				}
				this.handleAccountAction(item.action);
			},
			
			// 处理菜单点击
			handleMenuClick(item) {
				if (!this.userInfo.isLogin && item.action !== 'about') {
					this.getUserInfo();
					return;
				}
				
				switch(item.action) {
					case 'feedback':
						this.showFeedback();
						break;
					case 'about':
						this.showAbout();
						break;
					case 'commission':
						this.showCommission();
						break;
					case 'franchise':
						this.showFranchise();
						break;
					case 'cleaning':
						this.showCleaningArea();
						break;
				}
			},
			
			// 去评价页面
			goToReviews() {
				if (this.accountInfo.pendingReviews === 0) {
					uni.showToast({
						title: '暂无待评价订单',
						icon: 'none'
					});
					return;
				}
				uni.showToast({ title: '跳转到评价页面', icon: 'none' });
			},
			
			// 意见反馈
			showFeedback() {
				uni.showModal({
					title: '意见反馈',
					content: '请描述您的意见或建议',
					editable: true,
					placeholderText: '请输入您的反馈内容...',
					success: (res) => {
						if (res.confirm && res.content) {
							uni.showLoading({ title: '提交中...' });
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({
									title: '反馈提交成功',
									icon: 'success'
								});
							}, 1500);
						}
					}
				});
			},
			
			// 关于我们
			showAbout() {
				uni.showModal({
					title: '关于我们',
					content: '天天体验馆\n\n致力于为用户提供最优质的体验服务，包括VR体验、密室逃脱、台球、棋牌等多种娱乐项目。\n\n联系我们：400-123-4567\n地址：北京市朝阳区建国路88号',
					showCancel: false,
					confirmText: '知道了'
				});
			},
			
			// 分佣收入
			showCommission() {
				uni.showModal({
					title: '分佣收入',
					content: '当前分佣收入：¥1,280.50\n本月收入：¥320.80\n\n邀请好友体验即可获得分佣奖励！',
					confirmText: '查看详情',
					cancelText: '关闭',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '跳转到分佣详情页',
								icon: 'none'
							});
						}
					}
				});
			},
			
			// 加盟我们
			showFranchise() {
				uni.showActionSheet({
					itemList: ['了解加盟政策', '申请加盟', '联系招商经理'],
					success: (res) => {
						switch(res.tapIndex) {
							case 0:
								this.showFranchisePolicy();
								break;
							case 1:
								this.applyFranchise();
								break;
							case 2:
								this.contactFranchiseManager();
								break;
						}
					}
				});
			},
			
			// 了解加盟政策
			showFranchisePolicy() {
				uni.showModal({
					title: '加盟政策',
					content: '天天体验馆加盟优势：\n\n• 品牌授权使用\n• 整店输出模式\n• 专业运营指导\n• 区域保护政策\n• 持续培训支持\n\n加盟费用：20-50万\n预期回本周期：12-18个月',
					confirmText: '了解更多',
					cancelText: '关闭',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '跳转到加盟详情页',
								icon: 'none'
							});
						}
					}
				});
			},
			
			// 申请加盟
			applyFranchise() {
				uni.showModal({
					title: '申请加盟',
					content: '请填写您的基本信息',
					editable: true,
					placeholderText: '姓名/联系方式/意向城市',
					success: (res) => {
						if (res.confirm && res.content) {
							uni.showLoading({ title: '提交中...' });
							setTimeout(() => {
								uni.hideLoading();
								uni.showModal({
									title: '申请提交成功',
									content: '我们的招商经理将在24小时内与您联系，请保持电话畅通。',
									showCancel: false,
									confirmText: '知道了'
								});
							}, 1500);
						}
					}
				});
			},
			
			// 联系招商经理
			contactFranchiseManager() {
				uni.showActionSheet({
					itemList: ['拨打招商热线 400-888-9999', '微信咨询', '在线客服'],
					success: (res) => {
						switch(res.tapIndex) {
							case 0:
								uni.makePhoneCall({
									phoneNumber: '400-888-9999',
									success: () => {
										console.log('拨打招商热线成功');
									},
									fail: () => {
										uni.showToast({
											title: '拨打失败',
											icon: 'none'
										});
									}
								});
								break;
							case 1:
								uni.showToast({
									title: '微信号：tttyg2024',
									icon: 'none',
									duration: 3000
								});
								break;
							case 2:
								uni.showToast({
									title: '在线客服',
									icon: 'none'
								});
								break;
						}
					}
				});
			},
			
			// 保洁专区
			showCleaningArea() {
				uni.showActionSheet({
					itemList: ['提交保洁需求', '查看保洁进度', '保洁服务评价'],
					success: (res) => {
						switch(res.tapIndex) {
							case 0:
								uni.showToast({
									title: '提交保洁需求',
									icon: 'none'
								});
								break;
							case 1:
								uni.showToast({
									title: '查看保洁进度',
									icon: 'none'
								});
								break;
							case 2:
								uni.showToast({
									title: '保洁服务评价',
									icon: 'none'
								});
								break;
						}
					}
				});
			},
			
			// 退出登录
			logout() {
				uni.showModal({
					title: '确认退出',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 清除用户信息
							this.userInfo = {
								nickName: '微信用户',
								avatarUrl: '/static/image/default-avatar.png',
								level: '普通会员',
								isLogin: false
							};
							
							// 清除本地存储
							uni.removeStorageSync('userInfo');
							
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
	
	/* 用户信息头部 */
	.user-info {
		background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
		padding: 60rpx 40rpx 40rpx;
		color: #fff;
		
		.avatar-section {
			display: flex;
			align-items: center;
			
			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 4rpx solid rgba(255, 255, 255, 0.3);
				margin-right: 30rpx;
			}
			
			.user-details {
				flex: 1;
				
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
			
			.login-tip {
				background-color: rgba(255, 255, 255, 0.2);
				padding: 8rpx 16rpx;
				border-radius: 20rpx;
				
				text {
					font-size: 24rpx;
				}
			}
			
			.share-commission-btn {
				background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
				color: #fff;
				border: none;
				border-radius: 24rpx;
				padding: 12rpx 20rpx;
				display: flex;
				align-items: center;
				gap: 8rpx;
				font-size: 24rpx;
				font-weight: bold;
				box-shadow: 0 4rpx 12rpx rgba(255, 165, 0, 0.3);
				
				.btn-icon {
					font-size: 28rpx;
				}
				
				.btn-text {
					font-size: 24rpx;
				}
				
				&:active {
					transform: scale(0.95);
					box-shadow: 0 2rpx 6rpx rgba(255, 165, 0, 0.3);
				}
			}
		}
	}
	
	/* 账户信息卡片 */
	.account-section {
		margin: 20rpx;
		
		.account-card {
			background-color: #fff8fa;
			border-radius: 16rpx;
			border: 1rpx solid #ffe4e8;
			overflow: hidden;
			
			.card-header {
				padding: 30rpx 30rpx 20rpx;
				border-bottom: 1rpx solid #ffe4e8;
				
				.card-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
				}
			}
			
			.account-stats {
				display: flex;
				padding: 30rpx 0;
				
				.stat-item {
					flex: 1;
					text-align: center;
					position: relative;
					
					.stat-number {
						font-size: 32rpx;
						font-weight: bold;
						color: #FF69B4;
						display: block;
						margin-bottom: 8rpx;
					}
					
					.stat-label {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 8rpx;
					}
					
					.stat-action {
						font-size: 22rpx;
						color: #999;
						padding: 4rpx 12rpx;
						background-color: #f5f5f5;
						border-radius: 12rpx;
						display: inline-block;
					}
				}
				
				.stat-divider {
					width: 1rpx;
					background-color: #ffe4e8;
					margin: 20rpx 0;
				}
			}
		}
	}
	
	/* 快捷服务 */
	.quick-services {
		margin: 20rpx;
		
		.service-title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
			padding: 0 10rpx;
		}
		
		.service-grid {
			display: flex;
			background-color: #fff8fa;
			border-radius: 16rpx;
			border: 1rpx solid #ffe4e8;
			padding: 30rpx 40rpx;
			justify-content: space-around;
			margin-bottom: 20rpx;
			
			.service-item {
				text-align: center;
				min-width: 160rpx;
				
				.service-icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 auto 12rpx;
					
					.icon-text {
						font-size: 36rpx;
					}
				}
				
				.service-text {
					font-size: 24rpx;
					color: #333;
				}
			}
		}
	}
	
	/* 退出登录 */
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