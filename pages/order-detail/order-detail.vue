<template>
	<view class="content">
		<!-- 订单信息卡片 -->
		<view class="order-card">
			<view class="order-header">
				<text class="order-title">订单详情</text>
				<text class="order-no">{{orderInfo.orderNo}}</text>
			</view>
			<view class="order-status-info">
				<text class="status" :class="orderInfo.status">{{orderInfo.statusText}}</text>
				<text class="order-time">下单时间：{{orderInfo.createTime || '2024-12-01 14:30'}}</text>
			</view>
		</view>

		<!-- 门店信息 -->
		<view class="store-card">
			<view class="card-title">门店信息</view>
			<view class="store-info">
				<view class="store-header">
					<text class="store-name">{{storeDetail.name}}</text>
					<text class="store-status" :class="storeDetail.status">{{storeDetail.statusText}}</text>
				</view>
				<view class="store-details">
					<view class="detail-item">
						<text class="detail-label">📍 地址：</text>
						<text class="detail-value">{{storeDetail.address}}</text>
					</view>
					<view class="detail-item">
						<text class="detail-label">🕐 营业时间：</text>
						<text class="detail-value">{{storeDetail.businessHours}}</text>
					</view>
					<view class="detail-item">
						<text class="detail-label">📞 联系电话：</text>
						<text class="detail-value phone-number" @click="callStore">{{storeDetail.phone}}</text>
					</view>
				</view>
				<view class="store-actions">
					<button class="action-btn navigation" @click="navigateToStore">
						<text class="btn-icon">🗺️</text>
						<text>门店导航</text>
					</button>
					<button class="action-btn call" @click="callStore">
						<text class="btn-icon">📞</text>
						<text>联系门店</text>
					</button>
				</view>
			</view>
		</view>

		<!-- 预订信息 -->
		<view class="booking-card">
			<view class="card-title">预订信息</view>
			<view class="booking-info">
				<view class="product-section">
					<image :src="orderInfo.image" class="product-image" mode="aspectFill"></image>
					<view class="product-details">
						<text class="product-name">{{orderInfo.productName}}</text>
						<text class="product-desc">{{orderInfo.description}}</text>
						<view class="booking-time">
							<text class="time-info">📅 {{orderInfo.date}} {{orderInfo.time}}</text>
							<text class="quantity-info">👥 {{orderInfo.quantity}}人</text>
						</view>
					</view>
				</view>
				
				<!-- 房间信息(如果已分配) -->
				<view class="room-info" v-if="orderInfo.roomNumber">
					<view class="room-header">
						<text class="room-title">分配房间</text>
						<text class="room-status" :class="getRoomStatusClass(orderInfo.roomStatus)">{{orderInfo.roomStatus}}</text>
					</view>
					<view class="room-details">
						<text class="room-number">房间号：{{orderInfo.roomNumber}}</text>
						<text class="unlock-count">剩余开锁次数：{{unlockRemaining}}/{{unlockLimit}}次</text>
					</view>
				</view>

				<view class="price-summary">
					<text class="total-label">总金额：</text>
					<text class="total-price">¥{{orderInfo.totalPrice}}</text>
				</view>
			</view>
		</view>

		<!-- 操作按钮区域 -->
		<view class="action-section">
			<button class="main-btn refund" @click="requestRefund" v-if="canRefund">
				<text class="btn-icon">💰</text>
				<text>申请退款</text>
			</button>
			<button class="main-btn unlock" @click="unlockRoom" v-if="canUnlock" :disabled="!canUnlockNow">
				<text class="btn-icon">🔓</text>
				<text>{{unlockButtonText}}</text>
			</button>
			<view v-if="orderInfo.status === 'refunding'" class="status-info">
				<text class="status-text">退款申请已提交，请耐心等待处理</text>
				<text class="status-note">预计1-3个工作日到账</text>
			</view>
			<view v-if="orderInfo.status === 'refunded'" class="status-info refunded">
				<text class="status-text">退款已完成</text>
				<text class="status-amount">退款金额：¥{{orderInfo.refundAmount}} ({{orderInfo.refundRate}}%)</text>
			</view>
		</view>

		<!-- 退款申请弹窗 -->
		<uni-popup ref="refundPopup" type="center">
			<view class="refund-popup">
				<view class="popup-header">
					<text class="popup-title">申请退款</text>
				</view>
				<view class="popup-content">
					<view class="refund-info">
						<text class="refund-text">退款金额：¥{{refundAmount}}</text>
						<text class="refund-rate">退款比例：{{refundRate}}%</text>
						<view class="refund-rules">
							<text class="rules-title">退款规则：</text>
							<text class="rule-item">• 预约时间12小时外，可100%退款</text>
							<text class="rule-item">• 预约时间12小时至6小时内，可80%退款</text>
							<text class="rule-item">• 预约时间6小时内，可50%退款</text>
						</view>
						<text class="refund-note">退款到账时间为1-3个工作日</text>
					</view>
					<view class="reason-section">
						<text class="reason-label">退款原因：</text>
						<picker :value="refundReasonIndex" :range="refundReasons" @change="onRefundReasonChange">
							<view class="reason-picker">
								<text>{{refundReasons[refundReasonIndex]}}</text>
								<text class="picker-arrow">▼</text>
							</view>
						</picker>
					</view>
					<view class="remark-section">
						<text class="remark-label">备注说明：</text>
						<textarea 
							v-model="refundRemark" 
							placeholder="请描述退款原因(可选)" 
							class="remark-input"
							maxlength="200"
						></textarea>
					</view>
				</view>
				<view class="popup-actions">
					<button class="popup-btn cancel" @click="closeRefundPopup">取消</button>
					<button class="popup-btn confirm" @click="confirmRefund">确认退款</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {},
				storeDetail: {},
				unlockRemaining: 3,
				unlockLimit: 3,
				refundReasonIndex: 0,
				refundReasons: [
					'临时有事无法前往',
					'门店服务问题',
					'设备故障',
					'时间冲突',
					'其他原因'
				],
				refundRemark: ''
			}
		},
		computed: {
			canRefund() {
				// 已支付的订单可以申请退款
				return this.orderInfo.status === 'paid';
			},
			canUnlock() {
				// 已支付且有房间分配的订单可以开锁
				return this.orderInfo.status === 'paid' && this.orderInfo.roomNumber;
			},
			canUnlockNow() {
				// 房间可使用且有剩余开锁次数
				return this.orderInfo.roomStatus === '可使用' && this.unlockRemaining > 0;
			},
			unlockButtonText() {
				if (this.orderInfo.roomStatus !== '可使用') {
					return '房间暂不可用';
				}
				if (this.unlockRemaining <= 0) {
					return '开锁次数已用完';
				}
				return `开锁 (${this.unlockRemaining}/${this.unlockLimit})`;
			},
			// 计算退款比例
			refundRate() {
				const hoursUntilBooking = this.calculateHoursUntilBooking();
				if (hoursUntilBooking >= 12) {
					return 100;
				} else if (hoursUntilBooking >= 6) {
					return 80;
				} else {
					return 50;
				}
			},
			// 计算退款金额
			refundAmount() {
				const originalPrice = parseFloat(this.orderInfo.totalPrice);
				const refundAmount = (originalPrice * this.refundRate / 100).toFixed(2);
				return refundAmount;
			}
		},
		onLoad(options) {
			if (options.orderData) {
				this.orderInfo = JSON.parse(decodeURIComponent(options.orderData));
				this.loadStoreDetail();
			}
		},
		methods: {
			// 计算距离预约时间还有多少小时
			calculateHoursUntilBooking() {
				try {
					// 获取当前时间
					const now = new Date();
					
					// 构建预约时间
					const bookingDateStr = `${this.orderInfo.date} ${this.orderInfo.time}`;
					const bookingTime = new Date(bookingDateStr);
					
					// 计算时间差（毫秒）
					const timeDiff = bookingTime.getTime() - now.getTime();
					
					// 转换为小时
					const hoursDiff = timeDiff / (1000 * 60 * 60);
					
					return Math.max(0, hoursDiff); // 确保不返回负数
				} catch (error) {
					console.error('计算预约时间失败:', error);
					return 0;
				}
			},
			
			loadStoreDetail() {
				// 根据门店名称加载详细信息
				const storeMap = {
					'朝阳店': {
						name: '朝阳店',
						address: '北京市朝阳区建国路88号现代城B座3层',
						phone: '010-85888888',
						businessHours: '09:00-22:00',
						status: 'open',
						statusText: '营业中',
						latitude: 39.9151,
						longitude: 116.4687
					},
					'海淀店': {
						name: '海淀店', 
						address: '北京市海淀区中关村大街28号海龙大厦5层',
						phone: '010-82666666',
						businessHours: '09:00-22:00',
						status: 'open',
						statusText: '营业中',
						latitude: 39.9838,
						longitude: 116.3174
					},
					'西城店': {
						name: '西城店',
						address: '北京市西城区西单北大街132号太平洋百货6层',
						phone: '010-66777777',
						businessHours: '09:00-22:00',
						status: 'open', 
						statusText: '营业中',
						latitude: 39.9084,
						longitude: 116.3736
					}
				};
				
				this.storeDetail = storeMap[this.orderInfo.store] || storeMap['朝阳店'];
			},
			
			navigateToStore() {
				uni.openLocation({
					latitude: this.storeDetail.latitude,
					longitude: this.storeDetail.longitude,
					name: this.storeDetail.name,
					address: this.storeDetail.address,
					success: () => {
						console.log('导航成功');
					},
					fail: (err) => {
						uni.showToast({
							title: '导航失败',
							icon: 'none'
						});
					}
				});
			},
			
			callStore() {
				uni.makePhoneCall({
					phoneNumber: this.storeDetail.phone,
					success: () => {
						console.log('拨打电话成功');
					},
					fail: (err) => {
						uni.showToast({
							title: '拨打失败',
							icon: 'none'
						});
					}
				});
			},
			
			requestRefund() {
				this.$refs.refundPopup.open();
			},
			
			closeRefundPopup() {
				this.$refs.refundPopup.close();
				this.refundRemark = '';
				this.refundReasonIndex = 0;
			},
			
			onRefundReasonChange(e) {
				this.refundReasonIndex = e.detail.value;
			},
			
			confirmRefund() {
				const hoursUntil = this.calculateHoursUntilBooking();
				const timeDesc = hoursUntil >= 12 ? '12小时外' : hoursUntil >= 6 ? '12-6小时内' : '6小时内';
				
				uni.showModal({
					title: '确认退款',
					content: `确定要申请退款￥${this.refundAmount}吗？\n\n退款原因：${this.refundReasons[this.refundReasonIndex]}\n退款比例：${this.refundRate}% (${timeDesc})\n退款到账时间：1-3个工作日`,
					success: (res) => {
						if (res.confirm) {
							// 模拟退款申请
							uni.showLoading({
								title: '提交中...'
							});
							
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({
									title: '退款申请提交成功',
									icon: 'success'
								});
								this.closeRefundPopup();
								
								// 更新订单状态
								this.orderInfo.status = 'refunding';
								this.orderInfo.statusText = '退款中';
							}, 2000);
						}
					}
				});
			},
			
			unlockRoom() {
				if (!this.canUnlockNow) {
					return;
				}
				
				uni.showModal({
					title: '确认开锁',
					content: `确定要开启房间 ${this.orderInfo.roomNumber} 吗？剩余开锁次数：${this.unlockRemaining}次`,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '开锁中...'
							});
							
							// 模拟开锁过程
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({
									title: '开锁成功！',
									icon: 'success'
								});
								
								// 减少开锁次数
								this.unlockRemaining--;
								
								// 更新房间状态
								this.orderInfo.roomStatus = '使用中';
							}, 2000);
						}
					}
				});
			},
			
			getRoomStatusClass(status) {
				switch(status) {
					case '可使用':
						return 'status-available';
					case '清洁中':
						return 'status-cleaning';
					case '使用中':
						return 'status-using';
					default:
						return '';
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fef5f7;
		min-height: 100vh;
		padding-bottom: 120rpx;
	}
	
	.order-card, .store-card, .booking-card {
		background-color: #fff8fa;
		border-radius: 16rpx;
		margin: 20rpx;
		border: 1rpx solid #ffe4e8;
		overflow: hidden;
	}
	
	.card-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		padding: 30rpx 30rpx 20rpx;
		border-bottom: 1rpx solid #ffe4e8;
	}
	
	/* 订单信息卡片 */
	.order-card {
		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #ffe4e8;
			
			.order-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
			
			.order-no {
				font-size: 26rpx;
				color: #999;
			}
		}
		
		.order-status-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			
			.status {
				font-size: 28rpx;
				padding: 8rpx 16rpx;
				border-radius: 20rpx;
				font-weight: bold;
				
				&.paid {
					background-color: #f6ffed;
					color: #52c41a;
				}
				
				&.completed {
					background-color: #fff0f5;
					color: #FF69B4;
				}
				
				&.refunding {
					background-color: #fff7e6;
					color: #fa8c16;
				}
				
				&.refunded {
					background-color: #f0f9ff;
					color: #1890ff;
				}
			}
			
			.order-time {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	/* 门店信息卡片 */
	.store-info {
		padding: 20rpx 30rpx 30rpx;
		
		.store-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.store-name {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
			}
			
			.store-status {
				font-size: 24rpx;
				padding: 6rpx 12rpx;
				border-radius: 20rpx;
				
				&.open {
					background-color: #E8F5E8;
					color: #4CAF50;
				}
			}
		}
		
		.store-details {
			margin-bottom: 30rpx;
			
			.detail-item {
				display: flex;
				margin-bottom: 12rpx;
				
				.detail-label {
					font-size: 26rpx;
					color: #666;
					min-width: 140rpx;
				}
				
				.detail-value {
					font-size: 26rpx;
					color: #333;
					flex: 1;
					
					&.phone-number {
						color: #FF69B4;
						text-decoration: underline;
					}
				}
			}
		}
		
		.store-actions {
			display: flex;
			gap: 20rpx;
			
			.action-btn {
				flex: 1;
				height: 80rpx;
				border-radius: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 8rpx;
				font-size: 28rpx;
				
				&.navigation {
					background-color: #e6f3ff;
					color: #1890ff;
				}
				
				&.call {
					background-color: #fff0f5;
					color: #FF69B4;
				}
				
				.btn-icon {
					font-size: 32rpx;
				}
			}
		}
	}
	
	/* 预订信息卡片 */
	.booking-info {
		padding: 20rpx 30rpx 30rpx;
		
		.product-section {
			display: flex;
			margin-bottom: 30rpx;
			
			.product-image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}
			
			.product-details {
				flex: 1;
				
				.product-name {
					font-size: 30rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.product-desc {
					font-size: 24rpx;
					color: #666;
					display: block;
					margin-bottom: 12rpx;
				}
				
				.booking-time {
					.time-info, .quantity-info {
						font-size: 24rpx;
						color: #999;
						display: block;
						margin-bottom: 4rpx;
					}
				}
			}
		}
		
		.room-info {
			background-color: #f0f9ff;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 30rpx;
			border: 1rpx solid #e0f2fe;
			
			.room-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 12rpx;
				
				.room-title {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
				}
				
				.room-status {
					font-size: 24rpx;
					padding: 6rpx 12rpx;
					border-radius: 20rpx;
					
					&.status-available {
						background-color: #E8F5E8;
						color: #4CAF50;
					}
					
					&.status-cleaning {
						background-color: #FFF3E0;
						color: #FF9800;
					}
					
					&.status-using {
						background-color: #FFEBEE;
						color: #F44336;
					}
				}
			}
			
			.room-details {
				text {
					font-size: 24rpx;
					color: #666;
					display: block;
					margin-bottom: 4rpx;
				}
			}
		}
		
		.price-summary {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 20rpx 0;
			border-top: 1rpx solid #ffe4e8;
			
			.total-label {
				font-size: 28rpx;
				color: #666;
				margin-right: 10rpx;
			}
			
			.total-price {
				font-size: 32rpx;
				font-weight: bold;
				color: #ff6b35;
			}
		}
	}
	
	/* 操作按钮区域 */
	.action-section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		gap: 20rpx;
		border-top: 1rpx solid #ffe4e8;
		
		.main-btn {
			flex: 1;
			height: 80rpx;
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8rpx;
			font-size: 30rpx;
			font-weight: bold;
			
			&.refund {
				background-color: #fff7e6;
				color: #fa8c16;
			}
			
			&.unlock {
				background-color: #f6ffed;
				color: #52c41a;
				
				&:disabled {
					background-color: #f5f5f5;
					color: #999;
				}
			}
			
			.btn-icon {
				font-size: 36rpx;
			}
		}
		
		.status-info {
			width: 100%;
			padding: 20rpx;
			background-color: #fff7e6;
			border-radius: 12rpx;
			text-align: center;
			
			.status-text {
				font-size: 28rpx;
				color: #fa8c16;
				font-weight: bold;
				display: block;
				margin-bottom: 8rpx;
			}
			
			.status-note, .status-amount {
				font-size: 24rpx;
				color: #999;
				display: block;
			}
			
			&.refunded {
				background-color: #f0f9ff;
				
				.status-text {
					color: #1890ff;
				}
				
				.status-amount {
					color: #1890ff;
					font-weight: 500;
				}
			}
		}
	}
	
	/* 退款弹窗 */
	.refund-popup {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		
		.popup-header {
			padding: 30rpx;
			text-align: center;
			border-bottom: 1rpx solid #f0f0f0;
			
			.popup-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.popup-content {
			padding: 30rpx;
			
			.refund-info {
				margin-bottom: 30rpx;
				
				.refund-text {
					font-size: 30rpx;
					color: #333;
					font-weight: bold;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.refund-rate {
					font-size: 26rpx;
					color: #FF69B4;
					font-weight: bold;
					display: block;
					margin-bottom: 20rpx;
				}
				
				.refund-rules {
					background-color: #f8f9fa;
					border-radius: 8rpx;
					padding: 20rpx;
					margin-bottom: 20rpx;
					border-left: 4rpx solid #FF69B4;
					
					.rules-title {
						font-size: 26rpx;
						color: #333;
						font-weight: bold;
						display: block;
						margin-bottom: 12rpx;
					}
					
					.rule-item {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 6rpx;
						line-height: 1.4;
						
						&:last-child {
							margin-bottom: 0;
						}
					}
				}
				
				.refund-note {
					font-size: 24rpx;
					color: #999;
					display: block;
				}
			}
			
			.reason-section {
				margin-bottom: 30rpx;
				
				.reason-label {
					font-size: 28rpx;
					color: #333;
					display: block;
					margin-bottom: 12rpx;
				}
				
				.reason-picker {
					height: 80rpx;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 0 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.picker-arrow {
						color: #999;
					}
				}
			}
			
			.remark-section {
				.remark-label {
					font-size: 28rpx;
					color: #333;
					display: block;
					margin-bottom: 12rpx;
				}
				
				.remark-input {
					width: 100%;
					height: 120rpx;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 20rpx;
					font-size: 26rpx;
					box-sizing: border-box;
				}
			}
		}
		
		.popup-actions {
			display: flex;
			border-top: 1rpx solid #f0f0f0;
			
			.popup-btn {
				flex: 1;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				
				&.cancel {
					color: #666;
					border-right: 1rpx solid #f0f0f0;
				}
				
				&.confirm {
					color: #FF69B4;
					font-weight: bold;
				}
			}
		}
	}
</style> 