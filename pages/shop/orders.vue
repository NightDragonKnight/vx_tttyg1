<template>
	<view class="content">
		<!-- 订单状态筛选 -->
		<view class="filter-section">
			<scroll-view class="filter-scroll" scroll-x="true">
				<view class="filter-list">
					<view 
						class="filter-item" 
						v-for="(filter, index) in statusFilters" 
						:key="index"
						:class="{ active: selectedStatus === filter.value }"
						@click="selectStatus(filter)"
					>
						<text class="filter-text">{{filter.name}}</text>
						<text class="filter-count" v-if="filter.count > 0">({{filter.count}})</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 订单列表 -->
		<view class="orders-section">
			<view class="order-item" v-for="(order, index) in filteredOrders" :key="index" @click="viewOrderDetail(order)">
				<view class="order-header">
					<text class="order-no">订单号：{{order.orderNo}}</text>
					<text class="order-status" :class="order.status">{{order.statusText}}</text>
				</view>
				
				<view class="order-content">
					<image :src="order.product.image" mode="aspectFill" class="product-image"></image>
					<view class="order-info">
						<text class="product-name">{{order.product.name}}</text>
						<text class="product-spec" v-if="order.specName">规格：{{order.specName}}</text>
						<text class="order-meta">数量：{{order.quantity}}件</text>
						<text class="order-time">{{order.createTime}}</text>
					</view>
					<view class="order-price">
						<text class="price-label">实付金额</text>
						<text class="price-value">¥{{order.totalAmount}}</text>
					</view>
				</view>
				
				<view class="order-footer">
					<button class="action-btn secondary" @click.stop="viewOrderDetail(order)">查看详情</button>
					<button 
						class="action-btn primary" 
						v-if="order.status === 'paid'"
						@click.stop="confirmReceived(order)"
					>确认收货</button>
					<button 
						class="action-btn primary" 
						v-if="order.status === 'completed'"
						@click.stop="writeReview(order)"
					>写评价</button>
					<button 
						class="action-btn danger" 
						v-if="order.status === 'paid'"
						@click.stop="applyRefund(order)"
					>申请退款</button>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredOrders.length === 0">
			<image src="/static/image/empty.png" class="empty-image"></image>
			<text class="empty-text">{{selectedStatus === 'all' ? '暂无订单' : '该状态暂无订单'}}</text>
			<button class="go-shopping-btn" @click="goShopping">去购物</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedStatus: 'all',
				statusFilters: [
					{ value: 'all', name: '全部', count: 0 },
					{ value: 'paid', name: '已支付', count: 0 },
					{ value: 'shipped', name: '已发货', count: 0 },
					{ value: 'completed', name: '已完成', count: 0 },
					{ value: 'refunding', name: '退款中', count: 0 },
					{ value: 'refunded', name: '已退款', count: 0 }
				],
				orders: []
			}
		},
		computed: {
			filteredOrders() {
				if (this.selectedStatus === 'all') {
					return this.orders;
				}
				return this.orders.filter(order => order.status === this.selectedStatus);
			}
		},
		onShow() {
			this.loadOrders();
			this.updateFilterCounts();
		},
		methods: {
			// 加载订单
			loadOrders() {
				const savedOrders = uni.getStorageSync('orders') || [];
				this.orders = savedOrders;
			},
			
			// 更新筛选器数量
			updateFilterCounts() {
				this.statusFilters.forEach(filter => {
					if (filter.value === 'all') {
						filter.count = this.orders.length;
					} else {
						filter.count = this.orders.filter(order => order.status === filter.value).length;
					}
				});
			},
			
			// 选择状态筛选
			selectStatus(filter) {
				this.selectedStatus = filter.value;
			},
			
			// 查看订单详情
			viewOrderDetail(order) {
				uni.navigateTo({
					url: `/pages/shop/order-detail?orderData=${encodeURIComponent(JSON.stringify(order))}`
				});
			},
			
			// 确认收货
			confirmReceived(order) {
				uni.showModal({
					title: '确认收货',
					content: '确认已收到商品吗？',
					success: (res) => {
						if (res.confirm) {
							// 更新订单状态
							order.status = 'completed';
							order.statusText = '已完成';
							order.completeTime = new Date().toLocaleString();
							
							// 保存到本地存储
							this.saveOrders();
							this.updateFilterCounts();
							
							uni.showToast({
								title: '确认收货成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 写评价
			writeReview(order) {
				uni.showModal({
					title: '写评价',
					content: '请对本次购买进行评价',
					editable: true,
					placeholderText: '请输入您的评价内容...',
					success: (res) => {
						if (res.confirm && res.content) {
							// 添加评价
							order.review = {
								content: res.content,
								time: new Date().toLocaleString(),
								rating: 5
							};
							
							// 保存到本地存储
							this.saveOrders();
							
							uni.showToast({
								title: '评价提交成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 申请退款
			applyRefund(order) {
				uni.showActionSheet({
					itemList: ['商品质量问题', '商品与描述不符', '发货太慢', '其他原因'],
					success: (res) => {
						const reasons = ['商品质量问题', '商品与描述不符', '发货太慢', '其他原因'];
						const reason = reasons[res.tapIndex];
						
						uni.showModal({
							title: '申请退款',
							content: `退款原因：${reason}\n\n请描述具体问题：`,
							editable: true,
							placeholderText: '请详细描述问题...',
							success: (modalRes) => {
								if (modalRes.confirm) {
									// 更新订单状态
									order.status = 'refunding';
									order.statusText = '退款中';
									order.refund = {
										reason: reason,
										description: modalRes.content || '',
										applyTime: new Date().toLocaleString(),
										amount: order.totalAmount
									};
									
									// 保存到本地存储
									this.saveOrders();
									this.updateFilterCounts();
									
									uni.showToast({
										title: '退款申请已提交',
										icon: 'success'
									});
								}
							}
						});
					}
				});
			},
			
			// 保存订单
			saveOrders() {
				uni.setStorageSync('orders', this.orders);
			},
			
			// 去购物
			goShopping() {
				uni.switchTab({
					url: '/pages/tabBar/home/home'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	/* 筛选区域 */
	.filter-section {
		background-color: #fff;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
		
		.filter-scroll {
			white-space: nowrap;
		}
		
		.filter-list {
			display: flex;
			padding: 0 20rpx;
		}
		
		.filter-item {
			display: flex;
			align-items: center;
			padding: 15rpx 25rpx;
			margin-right: 20rpx;
			border-radius: 25rpx;
			background-color: #f8f8f8;
			transition: all 0.3s ease;
			
			&.active {
				background-color: #FFB6C1;
				color: #fff;
			}
			
			.filter-text {
				font-size: 26rpx;
			}
			
			.filter-count {
				font-size: 22rpx;
				margin-left: 5rpx;
				opacity: 0.8;
			}
		}
	}
	
	/* 订单列表 */
	.orders-section {
		padding: 20rpx;
		
		.order-item {
			background-color: #fff;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
			
			.order-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;
				border-bottom: 1rpx solid #f0f0f0;
				
				.order-no {
					font-size: 24rpx;
					color: #666;
				}
				
				.order-status {
					font-size: 24rpx;
					padding: 6rpx 12rpx;
					border-radius: 15rpx;
					
					&.paid {
						background-color: #e8f5e8;
						color: #4caf50;
					}
					
					&.shipped {
						background-color: #e3f2fd;
						color: #2196f3;
					}
					
					&.completed {
						background-color: #f3e5f5;
						color: #9c27b0;
					}
					
					&.refunding {
						background-color: #fff3e0;
						color: #ff9800;
					}
					
					&.refunded {
						background-color: #e0f2f1;
						color: #009688;
					}
				}
			}
			
			.order-content {
				display: flex;
				padding: 30rpx;
				
				.product-image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}
				
				.order-info {
					flex: 1;
					
					.product-name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
						display: block;
						margin-bottom: 8rpx;
					}
					
					.product-spec {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 8rpx;
					}
					
					.order-meta {
						font-size: 24rpx;
						color: #999;
						display: block;
						margin-bottom: 8rpx;
					}
					
					.order-time {
						font-size: 22rpx;
						color: #999;
					}
				}
				
				.order-price {
					text-align: right;
					
					.price-label {
						font-size: 22rpx;
						color: #999;
						display: block;
						margin-bottom: 5rpx;
					}
					
					.price-value {
						font-size: 28rpx;
						font-weight: bold;
						color: #FFB6C1;
					}
				}
			}
			
			.order-footer {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 30rpx;
				border-top: 1rpx solid #f0f0f0;
				gap: 20rpx;
				
				.action-btn {
					padding: 12rpx 24rpx;
					border-radius: 25rpx;
					font-size: 24rpx;
					
					&.secondary {
						background-color: #f8f8f8;
						color: #666;
					}
					
					&.primary {
						background-color: #FFB6C1;
						color: #fff;
					}
					
					&.danger {
						background-color: #ffebee;
						color: #f44336;
						border: 1rpx solid #f44336;
					}
				}
			}
		}
	}
	
	/* 空状态 */
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
			margin-bottom: 40rpx;
		}
		
		.go-shopping-btn {
			background-color: #FFB6C1;
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
		}
	}
</style> 