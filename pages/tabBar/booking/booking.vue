<template>
	<view class="content">
		<view class="header">
			<text class="title">我的预1订</text>
		</view>
		
		<!-- 搜索栏 -->
		<view class="search-section">
			<!-- 门店选择 -->
			<view class="search-group">
				<text class="search-label">门店选择</text>
				<picker :value="currentStore" :range="storeOptions" range-key="name" @change="onStoreChange">
					<view class="picker-btn">
						<text>{{storeOptions[currentStore].name}}</text>
						<text class="picker-arrow">▼</text>
					</view>
				</picker>
			</view>
			
			<!-- 订单状态 -->
			<view class="search-group">
				<text class="search-label">订单状态</text>
				<picker :value="currentOrderStatus" :range="orderStatus" range-key="name" @change="onOrderStatusChange">
					<view class="picker-btn">
						<text>{{orderStatus[currentOrderStatus].name}}</text>
						<text class="picker-arrow">▼</text>
					</view>
				</picker>
			</view>
		</view>
		
		<!-- 订单列表 -->
		<view class="booking-list">
			<view class="booking-item" v-for="(item, index) in filteredBookings" :key="index">
				<view class="booking-header">
					<text class="order-no">订单号：{{item.orderNo}}</text>
					<text class="status" :class="item.status">{{item.statusText}}</text>
				</view>
				
				<view class="booking-content">
					<image :src="item.image" mode="aspectFill" class="product-image"></image>
					<view class="product-info">
						<text class="product-name">{{item.productName}}</text>
						<text class="product-desc">{{item.description}}</text>
						<view class="booking-details">
							<text class="store">门店：{{item.store}}</text>
							<text class="date">日期：{{item.date}}</text>
							<text class="time">时间：{{item.time}}</text>
							<text class="quantity">数量：{{item.quantity}}张</text>
						</view>
						<view class="price-info">
							<text class="total-price">总价：¥{{item.totalPrice}}</text>
						</view>
					</view>
				</view>
				
				<view class="booking-footer">
					<button class="action-btn cancel" v-if="item.status === 'pending'" @click="cancelBooking(item)">取消预订</button>
					<button class="action-btn primary" v-if="item.status === 'pending'" @click="payBooking(item)">立即支付</button>
					<view v-if="item.status === 'paid'" class="paid-actions">
						<view class="room-status">
							<text class="status-label">房间状态：</text>
							<text class="status-value" :class="getRoomStatusClass(item.roomStatus)">{{item.roomStatus}}</text>
							<text class="room-number" v-if="item.roomNumber">({{item.roomNumber}})</text>
						</view>
						<view class="action-buttons">
							<button class="action-btn secondary" @click="viewDetail(item)">查看详情</button>
							<button class="action-btn unlock" @click="quickUnlock(item)" v-if="item.roomStatus === '可使用'">快捷开锁</button>
						</view>
					</view>
					<button class="action-btn secondary" v-if="item.status === 'completed'" @click="writeReview(item)">写评价</button>
					<view v-if="item.status === 'refunding'" class="refund-info">
						<text class="refund-text">退款申请已提交，预计1-3个工作日到账</text>
						<button class="action-btn cancel" @click="viewDetail(item)">查看详情</button>
					</view>
					<view v-if="item.status === 'refunded'" class="refunded-info">
						<text class="refund-text">退款金额：¥{{item.refundAmount}} ({{item.refundRate}}%)</text>
						<button class="action-btn secondary" @click="viewDetail(item)">查看详情</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-state" v-if="filteredBookings.length === 0">
			<image src="/static/image/empty.png" class="empty-image"></image>
			<text class="empty-text">暂无预订记录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentStore: 0,
				currentOrderStatus: 0,
				storeOptions: [
					{ name: '全部门店', id: 'all' },
					{ name: '朝阳店', id: 'chaoyang' },
					{ name: '海淀店', id: 'haidian' },
					{ name: '西城店', id: 'xicheng' }
				],
				orderStatus: [
					{ name: '全部状态', count: 0 },
					{ name: '待支付', count: 2 },
					{ name: '已支付', count: 3 },
					{ name: '已完成', count: 1 },
					{ name: '退款中', count: 1 },
					{ name: '退款完成', count: 1 },
					{ name: '已取消', count: 0 }
				],
				bookings: [
					{
						orderNo: 'BK20241201001',
						productName: 'VR体验馆',
						description: '沉浸式虚拟现实体验',
						store: '朝阳店',
						orderType: 'vr',
						image: '/static/image/day/VR体验馆.jpg',
						date: '2024-12-15',
						time: '09:00',
						quantity: 2,
						totalPrice: '120',
						status: 'pending',
						statusText: '待支付'
					},
					{
						orderNo: 'BK20241201002',
						productName: '棋牌室',
						description: '休闲娱乐棋牌游戏',
						store: '海淀店',
						orderType: 'card',
						image: '/static/image/day/棋牌1.jpg',
						date: '2024-12-20',
						time: '14:00',
						quantity: 1,
						totalPrice: '60',
						status: 'pending',
						statusText: '待支付'
					},
					{
						orderNo: 'BK20241130001',
						productName: '台球室',
						description: '专业台球体验',
						store: '西城店',
						orderType: 'billiards',
						image: '/static/image/day/台球1.png',
						date: '2024-12-25',
						time: '10:00',
						quantity: 3,
						totalPrice: '150',
						status: 'paid',
						statusText: '已支付',
						roomStatus: '可使用',
						roomNumber: 'A-101',
						createTime: '2024-12-08 15:30'
					},
					{
						orderNo: 'BK20241125001',
						productName: '密室逃脱',
						description: '惊险刺激的解密游戏',
						store: '朝阳店',
						orderType: 'escape',
						image: '/static/image/day/密室逃脱.jpg',
						date: '2024-12-05',
						time: '08:30',
						quantity: 2,
						totalPrice: '240',
						status: 'completed',
						statusText: '已完成'
					},
					{
						orderNo: 'BK20241202001',
						productName: 'VR体验馆',
						description: '沉浸式虚拟现实体验',
						store: '朝阳店',
						orderType: 'vr',
						image: '/static/image/day/VR体验馆.jpg',
						date: '2024-12-20',
						time: '15:00',
						quantity: 1,
						totalPrice: '80',
						status: 'paid',
						statusText: '已支付',
						roomStatus: '清洁中',
						roomNumber: 'B-203',
						createTime: '2024-12-10 09:15'
					},
					{
						orderNo: 'BK20241203001',
						productName: '棋牌室',
						description: '休闲娱乐棋牌游戏',
						store: '海淀店',
						orderType: 'card',
						image: '/static/image/day/棋牌1.jpg',
						date: '2024-12-13',
						time: '19:00',
						quantity: 4,
						totalPrice: '240',
						status: 'paid',
						statusText: '已支付',
						roomStatus: '使用中',
						roomNumber: 'C-305',
						createTime: '2024-12-11 16:45'
					},
					{
						orderNo: 'BK20241204001',
						productName: '密室逃脱',
						description: '惊险刺激的解密游戏',
						store: '朝阳店',
						orderType: 'escape',
						image: '/static/image/day/密室逃脱.jpg',
						date: '2024-12-18',
						time: '14:00',
						quantity: 2,
						totalPrice: '160',
						status: 'refunding',
						statusText: '退款中',
						createTime: '2024-12-12 10:20'
					},
					{
						orderNo: 'BK20241120001',
						productName: 'VR体验馆',
						description: '沉浸式虚拟现实体验',
						store: '西城店',
						orderType: 'vr',
						image: '/static/image/day/VR体验馆.jpg',
						date: '2024-12-08',
						time: '16:00',
						quantity: 1,
						totalPrice: '80',
						status: 'refunded',
						statusText: '退款完成',
						refundAmount: '64.00',
						refundRate: '80',
						createTime: '2024-11-28 13:15'
					}
				]
			}
		},
		computed: {
			filteredBookings() {
				let result = this.bookings;
				
				// 按门店筛选
				if (this.currentStore > 0) {
					const storeId = this.storeOptions[this.currentStore].id;
					result = result.filter(item => item.store.includes(storeId.replace('店', '')));
				}
				
				// 按订单状态筛选
				if (this.currentOrderStatus > 0) {
					const statusMap = ['', 'pending', 'paid', 'completed', 'refunding', 'refunded', 'cancelled'];
					const status = statusMap[this.currentOrderStatus];
					result = result.filter(item => item.status === status);
				}
				
				return result;
			}
		},
		methods: {
			onStoreChange(e) {
				this.currentStore = e.detail.value;
			},
			onOrderStatusChange(e) {
				this.currentOrderStatus = e.detail.value;
			},
			cancelBooking(item) {
				uni.showModal({
					title: '确认取消',
					content: '确定要取消这个预订吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '取消成功',
								icon: 'success'
							});
						}
					}
				});
			},
			payBooking(item) {
				uni.showToast({
					title: '跳转支付',
					icon: 'none'
				});
			},
			viewDetail(item) {
				// 传递订单信息到详情页
				uni.navigateTo({
					url: `/pages/order-detail/order-detail?orderData=${encodeURIComponent(JSON.stringify(item))}`
				});
			},
			writeReview(item) {
				uni.showToast({
					title: '写评价',
					icon: 'none'
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
			},
			quickUnlock(item) {
				uni.showModal({
					title: '快捷开锁',
					content: `确定要开启房间 ${item.roomNumber} 的门锁吗？`,
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
								
								// 更新房间状态为使用中
								item.roomStatus = '使用中';
							}, 2000);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		background-color: #fef5f7;
		min-height: 100vh;
	}
	
	.header {
		text-align: center;
		padding: 20rpx 0;
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.search-section {
		background-color: #fff8fa;
		border-radius: 16rpx;
		margin: 20rpx;
		padding: 30rpx;
		border: 1rpx solid #ffe4e8;
		display: flex;
		gap: 30rpx;
		
		.search-group {
			flex: 1;
			
			.search-label {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
				display: block;
			}
			
			.picker-btn {
				height: 80rpx;
				background-color: #fff0f5;
				border-radius: 12rpx;
				border: 1rpx solid #ffe4e8;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #333;
				
				.picker-arrow {
					color: #999;
					font-size: 24rpx;
				}
			}
		}
	}
	
	.booking-list {
		.booking-item {
			background-color: #fff8fa;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			border: 1rpx solid #ffe4e8;
			
			.booking-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;
				border-bottom: 1rpx solid #ffe4e8;
				
				.order-no {
					font-size: 26rpx;
					color: #666;
				}
				
				.status {
					font-size: 26rpx;
					padding: 8rpx 16rpx;
					border-radius: 20rpx;
					
					&.pending {
						background-color: #fff7e6;
						color: #fa8c16;
					}
					
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
			}
			
			.booking-content {
				display: flex;
				padding: 30rpx;
				
				.product-image {
					width: 160rpx;
					height: 160rpx;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}
				
				.product-info {
					flex: 1;
					
					.product-name {
						font-size: 30rpx;
						font-weight: bold;
						color: #333;
						display: block;
						margin-bottom: 10rpx;
					}
					
					.product-desc {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 20rpx;
					}
					
					.booking-details {
						margin-bottom: 20rpx;
						
						text {
							font-size: 24rpx;
							color: #999;
							display: block;
							margin-bottom: 8rpx;
						}
						
						.store {
							color: #FF69B4;
							font-weight: 500;
						}
					}
					
					.price-info {
						.total-price {
							font-size: 28rpx;
							color: #ff6b35;
							font-weight: bold;
						}
					}
				}
			}
			
			.booking-footer {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 30rpx;
				border-top: 1rpx solid #ffe4e8;
				gap: 20rpx;
				
				.action-btn {
					padding: 16rpx 32rpx;
					border-radius: 30rpx;
					font-size: 26rpx;
					
					&.cancel {
						background-color: #fff8fa;
						color: #666;
						border: 1rpx solid #ffe4e8;
					}
					
					&.primary {
						background-color: #FF69B4;
						color: #fff;
					}
					
					&.secondary {
						background-color: #fff0f5;
						color: #FF69B4;
						border: 1rpx solid #ffe4e8;
					}
					
					&.unlock {
						background-color: #4CAF50;
						color: #fff;
					}
				}
				
				.paid-actions {
					width: 100%;
					
					.room-status {
						display: flex;
						align-items: center;
						margin-bottom: 15rpx;
						
						.status-label {
							font-size: 26rpx;
							color: #666;
							margin-right: 10rpx;
						}
						
						.status-value {
							font-size: 26rpx;
							font-weight: bold;
							padding: 6rpx 12rpx;
							border-radius: 20rpx;
							margin-right: 10rpx;
							
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
						
						.room-number {
							font-size: 24rpx;
							color: #999;
						}
					}
					
					.action-buttons {
						display: flex;
						justify-content: flex-end;
						gap: 20rpx;
					}
				}
				
				.refund-info, .refunded-info {
					width: 100%;
					
					.refund-text {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 15rpx;
						line-height: 1.4;
					}
				}
				
				.refunded-info {
					.refund-text {
						color: #1890ff;
						font-weight: 500;
					}
				}
			}
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
		
		.empty-image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
</style> 