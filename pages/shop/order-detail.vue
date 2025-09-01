<template>
	<view class="content">
		<!-- 订单状态 -->
		<view class="status-section">
			<view class="status-info">
				<text class="status-text">{{orderInfo.statusText}}</text>
				<text class="status-desc">{{orderInfo.statusDesc}}</text>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order-section">
			<view class="section-title">订单信息</view>
			<view class="order-info">
				<view class="info-item">
					<text class="info-label">订单号：</text>
					<text class="info-value">{{orderInfo.orderNo}}</text>
				</view>
				<view class="info-item">
					<text class="info-label">下单时间：</text>
					<text class="info-value">{{orderInfo.createTime}}</text>
				</view>
				<view class="info-item">
					<text class="info-label">支付方式：</text>
					<text class="info-value">{{orderInfo.paymentName}}</text>
				</view>
			</view>
		</view>
		
		<!-- 收货地址 -->
		<view class="address-section">
			<view class="section-title">收货地址</view>
			<view class="address-info">
				<text class="contact-name">{{orderInfo.address.name}}</text>
				<text class="contact-phone">{{orderInfo.address.phone}}</text>
				<text class="address-detail">{{orderInfo.address.address}}</text>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view class="products-section">
			<view class="section-title">商品信息</view>
			<view class="product-list">
				<view class="product-item" v-for="(item, index) in orderInfo.items" :key="index">
					<image :src="item.image" class="product-image" mode="aspectFill"></image>
					<view class="product-info">
						<text class="product-name">{{item.name}}</text>
						<text class="product-spec" v-if="item.specName">规格：{{item.specName}}</text>
						<view class="product-price-section">
							<text class="product-price">¥{{item.price}}</text>
							<text class="product-quantity">x{{item.quantity}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 价格明细 -->
		<view class="price-section">
			<view class="section-title">价格明细</view>
			<view class="price-list">
				<view class="price-item">
					<text>商品总价</text>
					<text class="price-value">¥{{orderInfo.totalPrice}}</text>
				</view>
				<view class="price-item" v-if="orderInfo.deliveryFee > 0">
					<text>配送费</text>
					<text class="price-value">¥{{orderInfo.deliveryFee}}</text>
				</view>
				<view class="price-item total">
					<text>实付金额</text>
					<text class="final-price">¥{{orderInfo.finalPrice}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<button class="action-btn secondary" @click="viewLogistics" v-if="orderInfo.status === 'shipped'">
				查看物流
			</button>
			<button class="action-btn primary" @click="confirmReceive" v-if="orderInfo.status === 'shipped'">
				确认收货
			</button>
			<button class="action-btn primary" @click="writeReview" v-if="orderInfo.status === 'completed'">
				评价商品
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo: '',
				orderInfo: {
					orderNo: '',
					status: 'pending',
					statusText: '待付款',
					statusDesc: '请尽快完成支付',
					createTime: '',
					paymentName: '',
					address: {},
					items: [],
					totalPrice: '0.00',
					deliveryFee: 0,
					finalPrice: '0.00'
				}
			}
		},
		onLoad(options) {
			if (options.orderNo) {
				this.orderNo = options.orderNo;
				this.loadOrderDetail();
			}
		},
		methods: {
			// 加载订单详情
			loadOrderDetail() {
				const orders = uni.getStorageSync('shop_orders') || [];
				const order = orders.find(o => o.orderNo === this.orderNo);
				
				if (order) {
					this.orderInfo = {
						orderNo: order.orderNo,
						status: 'paid', // 模拟已支付状态
						statusText: '已付款',
						statusDesc: '商家正在处理您的订单',
						createTime: this.formatTime(order.createTime),
						paymentName: order.payment.name,
						address: order.address,
						items: order.items,
						totalPrice: order.totalPrice,
						deliveryFee: order.deliveryFee,
						finalPrice: order.finalPrice
					};
				} else {
					uni.showToast({
						title: '订单不存在',
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				}
			},
			
			// 格式化时间
			formatTime(timeStr) {
				const date = new Date(timeStr);
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
			},
			
			// 查看物流
			viewLogistics() {
				uni.showToast({
					title: '查看物流',
					icon: 'none'
				});
			},
			
			// 确认收货
			confirmReceive() {
				uni.showModal({
					title: '确认收货',
					content: '确认已收到商品吗？',
					success: (res) => {
						if (res.confirm) {
							this.orderInfo.status = 'completed';
							this.orderInfo.statusText = '已完成';
							this.orderInfo.statusDesc = '订单已完成，感谢您的购买';
							
							uni.showToast({
								title: '确认收货成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 评价商品
			writeReview() {
				uni.showToast({
					title: '评价功能',
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fef8fa; // 更淡的浅粉色背景
		min-height: 100vh;
		padding-bottom: 120rpx;
	}
	
	/* 状态区域 */
	.status-section {
		background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%); // 更淡的粉色渐变
		padding: 60rpx 30rpx;
		color: #fff;
		
		.status-info {
			text-align: center;
			
			.status-text {
				font-size: 36rpx;
				font-weight: bold;
				display: block;
				margin-bottom: 10rpx;
			}
			
			.status-desc {
				font-size: 26rpx;
				opacity: 0.9;
			}
		}
	}
	
	/* 通用样式 */
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	
	/* 订单信息 */
	.order-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.order-info {
			.info-item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				.info-label {
					font-size: 26rpx;
					color: #666;
				}
				
				.info-value {
					font-size: 26rpx;
					color: #333;
				}
			}
		}
	}
	
	/* 地址信息 */
	.address-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.address-info {
			.contact-name {
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
				display: block;
				margin-bottom: 8rpx;
			}
			
			.contact-phone {
				font-size: 26rpx;
				color: #666;
				display: block;
				margin-bottom: 8rpx;
			}
			
			.address-detail {
				font-size: 26rpx;
				color: #333;
				line-height: 1.5;
			}
		}
	}
	
	/* 商品列表 */
	.products-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.product-list {
			.product-item {
				display: flex;
				align-items: center;
				gap: 20rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f0f0f0;
				
				&:last-child {
					border-bottom: none;
				}
				
				.product-image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 8rpx;
				}
				
				.product-info {
					flex: 1;
					
					.product-name {
						font-size: 28rpx;
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
					
					.product-price-section {
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.product-price {
							font-size: 28rpx;
							font-weight: bold;
							color: #FFB6C1; // 更淡的粉色
						}
						
						.product-quantity {
							font-size: 24rpx;
							color: #999;
						}
					}
				}
			}
		}
	}
	
	/* 价格明细 */
	.price-section {
		background-color: #fff;
		padding: 30rpx;
		
		.price-list {
			.price-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				font-size: 28rpx;
				color: #666;
				
				&.total {
					margin-top: 20rpx;
					padding-top: 20rpx;
					border-top: 1rpx solid #f0f0f0;
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
				}
				
				.price-value {
					color: #FFB6C1; // 更淡的粉色
				}
				
				.final-price {
					color: #FFB6C1; // 更淡的粉色
					font-size: 36rpx;
				}
			}
		}
	}
	
	/* 底部操作栏 */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		gap: 20rpx;
		
		.action-btn {
			flex: 1;
			height: 80rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			
			&.secondary {
				background-color: #fff;
				color: #FFB6C1; // 更淡的粉色
				border: 2rpx solid #FFB6C1; // 更淡的粉色
			}
			
			&.primary {
				background-color: #FFB6C1; // 更淡的粉色
				color: #fff;
			}
		}
	}
</style> 