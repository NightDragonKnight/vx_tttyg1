<template>
	<view class="content">
		<!-- 收货地址 -->
		<view class="address-section">
			<view class="section-title">收货地址</view>
			<view class="address-card" @click="selectAddress">
				<view v-if="selectedAddress">
					<view class="address-info">
						<text class="contact-name">{{selectedAddress.name}}</text>
						<text class="contact-phone">{{selectedAddress.phone}}</text>
					</view>
					<text class="address-detail">{{selectedAddress.address}}</text>
				</view>
				<view v-else class="no-address">
					<text class="no-address-text">请选择收货地址</text>
				</view>
				<text class="address-arrow">></text>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view class="products-section">
			<view class="section-title">商品信息</view>
			<view class="product-list">
				<view class="product-item" v-for="(item, index) in orderItems" :key="index">
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
		
		<!-- 配送方式 -->
		<view class="delivery-section">
			<view class="section-title">配送方式</view>
			<view class="delivery-options">
				<view 
					class="delivery-option" 
					v-for="(option, index) in deliveryOptions" 
					:key="index"
					:class="{ active: selectedDelivery === option.value }"
					@click="selectDelivery(option)"
				>
					<text class="delivery-name">{{option.name}}</text>
					<text class="delivery-fee">{{option.fee > 0 ? '¥' + option.fee : '免费'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="payment-section">
			<view class="section-title">支付方式</view>
			<view class="payment-options">
				<view 
					class="payment-option" 
					v-for="(option, index) in paymentOptions" 
					:key="index"
					:class="{ active: selectedPayment === option.value }"
					@click="selectPayment(option)"
				>
					<text class="payment-icon">{{option.icon}}</text>
					<text class="payment-name">{{option.name}}</text>
					<text class="payment-arrow" :class="{ selected: selectedPayment === option.value }">✓</text>
				</view>
			</view>
		</view>
		
		<!-- 订单备注 -->
		<view class="remark-section">
			<view class="section-title">订单备注</view>
			<textarea 
				class="remark-input" 
				v-model="orderRemark" 
				placeholder="请输入订单备注（选填）" 
				maxlength="200"
			></textarea>
		</view>
		
		<!-- 价格明细 -->
		<view class="price-section">
			<view class="price-item">
				<text>商品总价</text>
				<text class="price-value">¥{{totalPrice}}</text>
			</view>
			<view class="price-item" v-if="deliveryFee > 0">
				<text>配送费</text>
				<text class="price-value">¥{{deliveryFee}}</text>
			</view>
			<view class="price-item total">
				<text>实付金额</text>
				<text class="final-price">¥{{finalPrice}}</text>
			</view>
		</view>
		
		<!-- 底部结算栏 -->
		<view class="bottom-bar">
			<view class="price-summary">
				<text class="summary-label">合计：</text>
				<text class="summary-price">¥{{finalPrice}}</text>
			</view>
			<button class="pay-btn" @click="submitOrder" :disabled="!canSubmit">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderItems: [],
				orderType: 'cart', // cart-购物车, buy_now-立即购买
				selectedAddress: null,
				selectedDelivery: 'express',
				selectedPayment: 'wechat',
				orderRemark: '',
				deliveryOptions: [
					{ name: '快递配送', value: 'express', fee: 10 },
					{ name: '到店自提', value: 'self_pickup', fee: 0 }
				],
				paymentOptions: [
					{ name: '微信支付', value: 'wechat', icon: '💳' },
					{ name: '支付宝', value: 'alipay', icon: '💰' },
					{ name: '余额支付', value: 'balance', icon: '💎' }
				],
				addressList: [
					{
						id: 1,
						name: '张三',
						phone: '13800138000',
						address: '北京市朝阳区建国路88号现代城B座3层'
					},
					{
						id: 2,
						name: '李四',
						phone: '13900139000',
						address: '北京市海淀区中关村大街28号海龙大厦5层'
					}
				]
			}
		},
		computed: {
			// 商品总价
			totalPrice() {
				return this.orderItems.reduce((total, item) => {
					return total + (item.price * item.quantity);
				}, 0).toFixed(2);
			},
			// 配送费
			deliveryFee() {
				const delivery = this.deliveryOptions.find(d => d.value === this.selectedDelivery);
				return delivery ? delivery.fee : 0;
			},
			// 最终价格
			finalPrice() {
				return (parseFloat(this.totalPrice) + this.deliveryFee).toFixed(2);
			},
			// 是否可以提交订单
			canSubmit() {
				return this.selectedAddress && this.orderItems.length > 0;
			}
		},
		onLoad(options) {
			if (options.items) {
				try {
					this.orderItems = JSON.parse(decodeURIComponent(options.items));
				} catch (e) {
					console.error('解析商品数据失败:', e);
				}
			}
			if (options.type) {
				this.orderType = options.type;
			}
			
			// 默认选择第一个地址
			if (this.addressList.length > 0) {
				this.selectedAddress = this.addressList[0];
			}
		},
		methods: {
			// 选择地址
			selectAddress() {
				uni.showActionSheet({
					itemList: this.addressList.map(addr => `${addr.name} ${addr.phone} - ${addr.address}`),
					success: (res) => {
						this.selectedAddress = this.addressList[res.tapIndex];
					}
				});
			},
			
			// 选择配送方式
			selectDelivery(option) {
				this.selectedDelivery = option.value;
			},
			
			// 选择支付方式
			selectPayment(option) {
				this.selectedPayment = option.value;
			},
			
			// 提交订单
			submitOrder() {
				if (!this.canSubmit) {
					uni.showToast({
						title: '请完善订单信息',
						icon: 'none'
					});
					return;
				}
				
				// 构建订单数据
				const orderData = {
					orderNo: this.generateOrderNo(),
					items: this.orderItems,
					address: this.selectedAddress,
					delivery: this.deliveryOptions.find(d => d.value === this.selectedDelivery),
					payment: this.paymentOptions.find(p => p.value === this.selectedPayment),
					remark: this.orderRemark,
					totalPrice: this.totalPrice,
					deliveryFee: this.deliveryFee,
					finalPrice: this.finalPrice,
					createTime: new Date().toISOString()
				};
				
				// 显示确认弹窗
				uni.showModal({
					title: '确认订单',
					content: `订单总金额：¥${this.finalPrice}\n支付方式：${orderData.payment.name}\n配送方式：${orderData.delivery.name}`,
					success: (res) => {
						if (res.confirm) {
							this.processPayment(orderData);
						}
					}
				});
			},
			
			// 生成订单号
			generateOrderNo() {
				const timestamp = Date.now();
				const random = Math.floor(Math.random() * 1000);
				return `SHOP${timestamp}${random}`;
			},
			
			// 处理支付
			processPayment(orderData) {
				uni.showLoading({
					title: '处理中...'
				});
				
				// 模拟支付过程
				setTimeout(() => {
					uni.hideLoading();
					
					// 保存订单到本地
					this.saveOrder(orderData);
					
					// 如果是购物车结算，清空购物车
					if (this.orderType === 'cart') {
						this.clearCart();
					}
					
					uni.showToast({
						title: '订单提交成功',
						icon: 'success'
					});
					
					// 跳转到订单详情页
					setTimeout(() => {
						uni.redirectTo({
							url: `/pages/shop/order-detail?orderNo=${orderData.orderNo}`
						});
					}, 1500);
				}, 2000);
			},
			
			// 保存订单
			saveOrder(orderData) {
				let orders = uni.getStorageSync('shop_orders') || [];
				orders.unshift(orderData);
				uni.setStorageSync('shop_orders', orders);
			},
			
			// 清空购物车
			clearCart() {
				uni.removeStorageSync('cart');
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
	
	/* 通用样式 */
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	
	/* 地址区域 */
	.address-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.address-card {
			background-color: #f8f8f8;
			padding: 30rpx;
			border-radius: 12rpx;
			position: relative;
			
			.address-info {
				display: flex;
				align-items: center;
				gap: 20rpx;
				margin-bottom: 10rpx;
				
				.contact-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
				}
				
				.contact-phone {
					font-size: 26rpx;
					color: #666;
				}
			}
			
			.address-detail {
				font-size: 26rpx;
				color: #333;
				line-height: 1.5;
			}
			
			.no-address {
				.no-address-text {
					font-size: 28rpx;
					color: #999;
				}
			}
			
			.address-arrow {
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 28rpx;
				color: #999;
			}
		}
	}
	
	/* 商品区域 */
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
	
	/* 配送方式 */
	.delivery-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.delivery-options {
			.delivery-option {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f0f0f0;
				
				&:last-child {
					border-bottom: none;
				}
				
				&.active {
					.delivery-name {
						color: #FFB6C1; // 更淡的粉色
					}
					
					.delivery-fee {
						color: #FFB6C1; // 更淡的粉色
					}
				}
				
				.delivery-name {
					font-size: 28rpx;
					color: #333;
				}
				
				.delivery-fee {
					font-size: 26rpx;
					color: #666;
				}
			}
		}
	}
	
	/* 支付方式 */
	.payment-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.payment-options {
			.payment-option {
				display: flex;
				align-items: center;
				gap: 20rpx;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #f0f0f0;
				
				&:last-child {
					border-bottom: none;
				}
				
				&.active {
					.payment-name {
						color: #FFB6C1; // 更淡的粉色
					}
					
					.payment-arrow {
						color: #FFB6C1; // 更淡的粉色
					}
				}
				
				.payment-icon {
					font-size: 32rpx;
				}
				
				.payment-name {
					flex: 1;
					font-size: 28rpx;
					color: #333;
				}
				
				.payment-arrow {
					font-size: 28rpx;
					color: #ccc;
					
					&.selected {
						color: #FFB6C1; // 更淡的粉色
					}
				}
			}
		}
	}
	
	/* 订单备注 */
	.remark-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
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
	
	/* 底部结算栏 */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.price-summary {
			display: flex;
			align-items: center;
			
			.summary-label {
				font-size: 28rpx;
				color: #666;
			}
			
			.summary-price {
				font-size: 36rpx;
				font-weight: bold;
				color: #FFB6C1; // 更淡的粉色
			}
		}
		
		.pay-btn {
			background-color: #FFB6C1; // 更淡的粉色
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			
			&:disabled {
				background-color: #ccc;
			}
		}
	}
</style> 