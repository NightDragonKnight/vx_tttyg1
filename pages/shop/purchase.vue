<template>
	<view class="content">
		<!-- 商品信息 -->
		<view class="product-section">
			<view class="section-title">商品信息</view>
			<view class="product-card">
				<image :src="orderInfo.product.image" mode="aspectFill" class="product-image"></image>
				<view class="product-info">
					<text class="product-name">{{orderInfo.product.name}}</text>
					<text class="product-desc">{{orderInfo.product.description}}</text>
					<view class="product-spec" v-if="orderInfo.specName">
						<text class="spec-label">规格：</text>
						<text class="spec-value">{{orderInfo.specName}}</text>
					</view>
					<view class="product-price">
						<text class="current-price">¥{{orderInfo.product.price}}</text>
						<text class="original-price" v-if="orderInfo.product.originalPrice">¥{{orderInfo.product.originalPrice}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 数量选择 -->
		<view class="quantity-section">
			<view class="section-title">购买数量</view>
			<view class="quantity-control">
				<button class="quantity-btn" @click="decreaseQuantity" :disabled="orderInfo.quantity <= 1">-</button>
				<text class="quantity-text">{{orderInfo.quantity}}</text>
				<button class="quantity-btn" @click="increaseQuantity" :disabled="orderInfo.quantity >= orderInfo.product.stock">+</button>
			</view>
		</view>
		
		<!-- 收货地址 -->
		<view class="address-section">
			<view class="section-title">收货地址</view>
			<view class="address-card" @click="selectAddress">
				<view v-if="selectedAddress" class="address-info">
					<view class="address-header">
						<text class="contact-name">{{selectedAddress.name}}</text>
						<text class="contact-phone">{{selectedAddress.phone}}</text>
					</view>
					<text class="address-detail">{{selectedAddress.fullAddress}}</text>
				</view>
				<view v-else class="no-address">
					<text class="no-address-text">请选择收货地址</text>
					<text class="add-address-btn">+ 添加地址</text>
				</view>
				<text class="arrow">></text>
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
					<text class="delivery-desc">{{option.desc}}</text>
					<text class="delivery-price">¥{{option.price}}</text>
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
					<view class="payment-info">
						<text class="payment-icon">{{option.icon}}</text>
						<text class="payment-name">{{option.name}}</text>
					</view>
					<text class="payment-desc">{{option.desc}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单备注 -->
		<view class="remark-section">
			<view class="section-title">订单备注</view>
			<textarea 
				class="remark-input" 
				placeholder="请输入订单备注（选填）" 
				v-model="orderInfo.remark"
				maxlength="200"
			></textarea>
			<text class="remark-count">{{orderInfo.remark.length}}/200</text>
		</view>
		
		<!-- 价格明细 -->
		<view class="price-section">
			<view class="section-title">价格明细</view>
			<view class="price-list">
				<view class="price-item">
					<text class="price-label">商品总价</text>
					<text class="price-value">¥{{orderInfo.product.price * orderInfo.quantity}}</text>
				</view>
				<view class="price-item" v-if="orderInfo.specPrice > 0">
					<text class="price-label">规格加价</text>
					<text class="price-value">¥{{orderInfo.specPrice * orderInfo.quantity}}</text>
				</view>
				<view class="price-item">
					<text class="price-label">配送费</text>
					<text class="price-value">¥{{selectedDeliveryPrice}}</text>
				</view>
				<view class="price-divider"></view>
				<view class="price-item total">
					<text class="price-label">实付金额</text>
					<text class="price-value">¥{{totalAmount}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部支付栏 -->
		<view class="bottom-bar">
			<view class="price-summary">
				<text class="total-label">合计：</text>
				<text class="total-price">¥{{totalAmount}}</text>
			</view>
			<button class="pay-btn" @click="submitOrder" :disabled="!canSubmit">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: {
					product: {},
					quantity: 1,
					specName: '',
					specPrice: 0,
					remark: ''
				},
				selectedAddress: null,
				selectedDelivery: 'express',
				selectedPayment: 'wechat',
				deliveryOptions: [
					{ value: 'express', name: '快递配送', desc: '2-3个工作日', price: 10 },
					{ value: 'fast', name: '快速配送', desc: '1个工作日', price: 20 },
					{ value: 'same_day', name: '当日达', desc: '当日送达', price: 30 }
				],
				paymentOptions: [
					{ value: 'wechat', name: '微信支付', desc: '推荐使用', icon: '💚' },
					{ value: 'alipay', name: '支付宝', desc: '安全便捷', icon: '💙' },
					{ value: 'balance', name: '余额支付', desc: '可用余额', icon: '💰' }
				]
			}
		},
		computed: {
			selectedDeliveryPrice() {
				const delivery = this.deliveryOptions.find(d => d.value === this.selectedDelivery);
				return delivery ? delivery.price : 0;
			},
			totalAmount() {
				const productPrice = this.orderInfo.product.price * this.orderInfo.quantity;
				const specPrice = this.orderInfo.specPrice * this.orderInfo.quantity;
				const deliveryPrice = this.selectedDeliveryPrice;
				return productPrice + specPrice + deliveryPrice;
			},
			canSubmit() {
				return this.selectedAddress && this.orderInfo.product.id;
			}
		},
		onLoad(options) {
			if (options.product) {
				try {
					const productData = JSON.parse(decodeURIComponent(options.product));
					this.orderInfo.product = productData;
					
					// 如果有规格信息，设置默认规格
					if (productData.specs && productData.specs.length > 0) {
						const defaultSpec = productData.specs[0];
						this.orderInfo.specName = defaultSpec.name;
						this.orderInfo.specPrice = defaultSpec.price || 0;
					}
				} catch (e) {
					console.error('解析商品数据失败:', e);
				}
			}
			
			// 加载默认地址
			this.loadDefaultAddress();
		},
		methods: {
			// 减少数量
			decreaseQuantity() {
				if (this.orderInfo.quantity > 1) {
					this.orderInfo.quantity--;
				}
			},
			
			// 增加数量
			increaseQuantity() {
				if (this.orderInfo.quantity < this.orderInfo.product.stock) {
					this.orderInfo.quantity++;
				}
			},
			
			// 选择地址
			selectAddress() {
				uni.showActionSheet({
					itemList: ['选择已有地址', '添加新地址'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.showAddressList();
						} else {
							this.addNewAddress();
						}
					}
				});
			},
			
			// 显示地址列表
			showAddressList() {
				const addresses = [
					{
						id: 1,
						name: '张三',
						phone: '138****8888',
						province: '北京市',
						city: '北京市',
						district: '朝阳区',
						detail: '建国路88号现代城B座3层',
						fullAddress: '北京市朝阳区建国路88号现代城B座3层'
					},
					{
						id: 2,
						name: '李四',
						phone: '139****9999',
						province: '上海市',
						city: '上海市',
						district: '浦东新区',
						detail: '陆家嘴金融贸易区世纪大道100号',
						fullAddress: '上海市浦东新区陆家嘴金融贸易区世纪大道100号'
					}
				];
				
				uni.showActionSheet({
					itemList: addresses.map(addr => `${addr.name} ${addr.phone} ${addr.fullAddress}`),
					success: (res) => {
						this.selectedAddress = addresses[res.tapIndex];
					}
				});
			},
			
			// 添加新地址
			addNewAddress() {
				uni.showModal({
					title: '添加地址',
					content: '请填写收货地址信息',
					editable: true,
					placeholderText: '姓名/电话/详细地址',
					success: (res) => {
						if (res.confirm && res.content) {
							// 模拟添加地址
							const newAddress = {
								id: Date.now(),
								name: '新用户',
								phone: '138****0000',
								province: '北京市',
								city: '北京市',
								district: '海淀区',
								detail: res.content,
								fullAddress: `北京市海淀区${res.content}`
							};
							this.selectedAddress = newAddress;
							
							uni.showToast({
								title: '地址添加成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 加载默认地址
			loadDefaultAddress() {
				// 模拟加载默认地址
				this.selectedAddress = {
					id: 1,
					name: '张三',
					phone: '138****8888',
					province: '北京市',
					city: '北京市',
					district: '朝阳区',
					detail: '建国路88号现代城B座3层',
					fullAddress: '北京市朝阳区建国路88号现代城B座3层'
				};
			},
			
			// 选择配送方式
			selectDelivery(delivery) {
				this.selectedDelivery = delivery.value;
			},
			
			// 选择支付方式
			selectPayment(payment) {
				this.selectedPayment = payment.value;
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
				
				// 显示确认弹窗
				uni.showModal({
					title: '确认订单',
					content: `确认购买 ${this.orderInfo.product.name} × ${this.orderInfo.quantity} 件？\n总金额：¥${this.totalAmount}`,
					success: (res) => {
						if (res.confirm) {
							this.processPayment();
						}
					}
				});
			},
			
			// 处理支付
			processPayment() {
				uni.showLoading({
					title: '正在处理...'
				});
				
				// 模拟支付过程
				setTimeout(() => {
					uni.hideLoading();
					
					// 生成订单号
					const orderNo = 'ORD' + Date.now();
					
					// 创建订单数据
					const orderData = {
						orderNo: orderNo,
						product: this.orderInfo.product,
						quantity: this.orderInfo.quantity,
						specName: this.orderInfo.specName,
						totalAmount: this.totalAmount,
						address: this.selectedAddress,
						delivery: this.deliveryOptions.find(d => d.value === this.selectedDelivery),
						payment: this.paymentOptions.find(p => p.value === this.selectedPayment),
						remark: this.orderInfo.remark,
						createTime: new Date().toLocaleString(),
						status: 'paid',
						statusText: '已支付'
					};
					
					// 保存订单到本地存储
					this.saveOrder(orderData);
					
					// 显示支付成功
					uni.showModal({
						title: '支付成功',
						content: `订单号：${orderNo}\n支付金额：¥${this.totalAmount}`,
						showCancel: false,
						confirmText: '查看订单',
						success: (res) => {
							if (res.confirm) {
								// 跳转到订单详情页
								uni.navigateTo({
									url: `/pages/shop/order-detail?orderData=${encodeURIComponent(JSON.stringify(orderData))}`
								});
							}
						}
					});
				}, 2000);
			},
			
			// 保存订单
			saveOrder(orderData) {
				let orders = uni.getStorageSync('orders') || [];
				orders.unshift(orderData);
				uni.setStorageSync('orders', orders);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 120rpx;
	}
	
	/* 通用样式 */
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		padding: 0 30rpx;
	}
	
	/* 商品信息 */
	.product-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx 0;
		
		.product-card {
			display: flex;
			padding: 0 30rpx;
			
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
					margin-bottom: 10rpx;
				}
				
				.product-spec {
					margin-bottom: 10rpx;
					
					.spec-label {
						font-size: 24rpx;
						color: #999;
					}
					
					.spec-value {
						font-size: 24rpx;
						color: #FFB6C1;
						font-weight: 500;
					}
				}
				
				.product-price {
					display: flex;
					align-items: center;
					gap: 10rpx;
					
					.current-price {
						font-size: 32rpx;
						font-weight: bold;
						color: #FFB6C1;
					}
					
					.original-price {
						font-size: 24rpx;
						color: #999;
						text-decoration: line-through;
					}
				}
			}
		}
	}
	
	/* 数量选择 */
	.quantity-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		
		.quantity-control {
			display: flex;
			align-items: center;
			gap: 30rpx;
			
			.quantity-btn {
				width: 60rpx;
				height: 60rpx;
				background-color: #f0f0f0;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				color: #333;
				
				&:disabled {
					background-color: #f5f5f5;
					color: #ccc;
				}
			}
			
			.quantity-text {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
				min-width: 80rpx;
				text-align: center;
			}
		}
	}
	
	/* 收货地址 */
	.address-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		
		.address-card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			background-color: #f8f8f8;
			border-radius: 12rpx;
			
			.address-info {
				flex: 1;
				
				.address-header {
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
						font-size: 24rpx;
						color: #666;
					}
				}
				
				.address-detail {
					font-size: 26rpx;
					color: #666;
					line-height: 1.4;
				}
			}
			
			.no-address {
				flex: 1;
				text-align: center;
				
				.no-address-text {
					font-size: 26rpx;
					color: #999;
					display: block;
					margin-bottom: 10rpx;
				}
				
				.add-address-btn {
					font-size: 24rpx;
					color: #FFB6C1;
				}
			}
			
			.arrow {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	/* 配送方式 */
	.delivery-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		
		.delivery-options {
			display: flex;
			flex-direction: column;
			gap: 15rpx;
			
			.delivery-option {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border: 2rpx solid #f0f0f0;
				border-radius: 12rpx;
				transition: all 0.3s ease;
				
				&.active {
					border-color: #FFB6C1;
					background-color: #fef8fa;
				}
				
				.delivery-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
				}
				
				.delivery-desc {
					font-size: 24rpx;
					color: #666;
					margin-left: 20rpx;
				}
				
				.delivery-price {
					font-size: 28rpx;
					font-weight: bold;
					color: #FFB6C1;
				}
			}
		}
	}
	
	/* 支付方式 */
	.payment-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		
		.payment-options {
			display: flex;
			flex-direction: column;
			gap: 15rpx;
			
			.payment-option {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border: 2rpx solid #f0f0f0;
				border-radius: 12rpx;
				transition: all 0.3s ease;
				
				&.active {
					border-color: #FFB6C1;
					background-color: #fef8fa;
				}
				
				.payment-info {
					display: flex;
					align-items: center;
					gap: 15rpx;
					
					.payment-icon {
						font-size: 32rpx;
					}
					
					.payment-name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
					}
				}
				
				.payment-desc {
					font-size: 24rpx;
					color: #666;
				}
			}
		}
	}
	
	/* 订单备注 */
	.remark-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		position: relative;
		
		.remark-input {
			width: 100%;
			height: 120rpx;
			background-color: #f8f8f8;
			border-radius: 12rpx;
			padding: 20rpx;
			font-size: 26rpx;
			color: #333;
			line-height: 1.4;
		}
		
		.remark-count {
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			font-size: 22rpx;
			color: #999;
		}
	}
	
	/* 价格明细 */
	.price-section {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		
		.price-list {
			.price-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				
				.price-label {
					font-size: 26rpx;
					color: #666;
				}
				
				.price-value {
					font-size: 26rpx;
					color: #333;
				}
				
				&.total {
					margin-top: 20rpx;
					
					.price-label {
						font-size: 30rpx;
						font-weight: bold;
						color: #333;
					}
					
					.price-value {
						font-size: 32rpx;
						font-weight: bold;
						color: #FFB6C1;
					}
				}
			}
			
			.price-divider {
				height: 1rpx;
				background-color: #f0f0f0;
				margin: 20rpx 0;
			}
		}
	}
	
	/* 底部支付栏 */
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
			.total-label {
				font-size: 26rpx;
				color: #666;
			}
			
			.total-price {
				font-size: 36rpx;
				font-weight: bold;
				color: #FFB6C1;
			}
		}
		
		.pay-btn {
			background-color: #FFB6C1;
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			
			&:disabled {
				background-color: #ccc;
				color: #999;
			}
		}
	}
</style> 