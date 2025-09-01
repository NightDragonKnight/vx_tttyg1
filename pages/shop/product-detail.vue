<template>
	<view class="content">
		<!-- 商品轮播图 -->
		<view class="product-swiper">
			<swiper 
				class="swiper" 
				:indicator-dots="true" 
				:autoplay="false"
				indicator-color="rgba(255,255,255,0.6)"
				indicator-active-color="#FF69B4"
			>
				<swiper-item v-for="(image, index) in product.images" :key="index">
					<image :src="image" class="swiper-image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 商品信息 -->
		<view class="product-info">
			<view class="price-section">
				<text class="current-price">¥{{product.price}}</text>
				<text class="original-price" v-if="product.originalPrice">¥{{product.originalPrice}}</text>
				<text class="discount-tag" v-if="product.originalPrice">{{getDiscount()}}折</text>
			</view>
			<text class="product-name">{{product.name}}</text>
			<text class="product-desc">{{product.description}}</text>
			<view class="product-meta">
				<text class="sales-info">已售{{product.sales}}件</text>
				<text class="rating-info">⭐{{product.rating}}</text>
				<text class="stock-info">库存{{product.stock}}件</text>
			</view>
		</view>
		
		<!-- 规格选择 -->
		<view class="spec-section" v-if="product.specs">
			<view class="section-title">规格选择</view>
			<view class="spec-list">
				<view 
					class="spec-item" 
					v-for="(spec, index) in product.specs" 
					:key="index"
					:class="{ active: selectedSpec === spec.value }"
					@click="selectSpec(spec)"
				>
					<text class="spec-text">{{spec.name}}</text>
					<text class="spec-price" v-if="spec.price">+¥{{spec.price}}</text>
				</view>
			</view>
		</view>
		
		<!-- 数量选择 -->
		<view class="quantity-section">
			<view class="section-title">购买数量</view>
			<view class="quantity-control">
				<button class="quantity-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
				<text class="quantity-text">{{quantity}}</text>
				<button class="quantity-btn" @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
			</view>
		</view>
		
		<!-- 商品详情 -->
		<view class="detail-section">
			<view class="section-title">商品详情</view>
			<view class="detail-content">
				<text class="detail-text">{{product.detail || '暂无详细信息'}}</text>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="left-actions">
				<button class="action-btn cart" @click="addToCart">
					<text class="btn-icon">🛒</text>
					<text class="btn-text">加入购物车</text>
				</button>
			</view>
			<view class="right-actions">
				<button class="buy-btn" @click="buyNow">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product: {
					id: 1,
					name: 'VR眼镜套装',
					description: '高清VR眼镜，沉浸式体验，支持多平台游戏和应用',
					price: 299,
					originalPrice: 399,
					image: '/static/image/day/VR体验馆.jpg',
					images: [
						'/static/image/day/VR体验馆.jpg',
						'/static/componentIndex.png',
						'/static/templateIndex.png'
					],
					category: 'vr',
					sales: 156,
					rating: 4.8,
					stock: 50,
					specs: [
						{ name: '标准版', value: 'standard', price: 0 },
						{ name: '豪华版', value: 'premium', price: 50 },
						{ name: '专业版', value: 'pro', price: 100 }
					],
					detail: '产品特点：\n• 高清显示，沉浸式体验\n• 轻量化设计，佩戴舒适\n• 支持多平台游戏和应用\n• 内置音频系统\n• 可调节瞳距和焦距\n\n包装清单：\n• VR眼镜主机\n• 手柄控制器\n• 充电线\n• 说明书\n• 清洁布'
				},
				selectedSpec: 'standard',
				quantity: 1
			}
		},
		onLoad(options) {
			if (options.product) {
				try {
					const productData = JSON.parse(decodeURIComponent(options.product));
					this.product = { ...this.product, ...productData };
				} catch (e) {
					console.error('解析商品数据失败:', e);
				}
			}
		},
		methods: {
			// 计算折扣
			getDiscount() {
				if (!this.product.originalPrice) return 10;
				const discount = Math.round((this.product.price / this.product.originalPrice) * 10);
				return discount;
			},
			
			// 选择规格
			selectSpec(spec) {
				this.selectedSpec = spec.value;
			},
			
			// 减少数量
			decreaseQuantity() {
				if (this.quantity > 1) {
					this.quantity--;
				}
			},
			
			// 增加数量
			increaseQuantity() {
				if (this.quantity < this.product.stock) {
					this.quantity++;
				}
			},
			
			// 计算总价
			calculateTotalPrice() {
				const basePrice = this.product.price;
				const selectedSpec = this.product.specs?.find(s => s.value === this.selectedSpec);
				const specPrice = selectedSpec ? selectedSpec.price : 0;
				return (basePrice + specPrice) * this.quantity;
			},
			
			// 添加到购物车
			addToCart() {
				const selectedSpec = this.product.specs?.find(s => s.value === this.selectedSpec);
				const cartItem = {
					...this.product,
					selectedSpec: this.selectedSpec,
					specName: selectedSpec ? selectedSpec.name : '标准版',
					quantity: this.quantity,
					totalPrice: this.calculateTotalPrice()
				};
				
				let cart = uni.getStorageSync('cart') || [];
				
				// 检查是否已存在相同商品和规格
				const existingIndex = cart.findIndex(item => 
					item.id === cartItem.id && item.selectedSpec === cartItem.selectedSpec
				);
				
				if (existingIndex >= 0) {
					cart[existingIndex].quantity += this.quantity;
					cart[existingIndex].totalPrice = cart[existingIndex].price * cart[existingIndex].quantity;
				} else {
					cart.push(cartItem);
				}
				
				uni.setStorageSync('cart', cart);
				
				uni.showToast({
					title: '已添加到购物车',
					icon: 'success'
				});
			},
			
			// 立即购买
			buyNow() {
				const selectedSpec = this.product.specs?.find(s => s.value === this.selectedSpec);
				const orderItem = {
					...this.product,
					selectedSpec: this.selectedSpec,
					specName: selectedSpec ? selectedSpec.name : '标准版',
					quantity: this.quantity,
					totalPrice: this.calculateTotalPrice()
				};
				
				uni.navigateTo({
					url: `/pages/shop/checkout?items=${encodeURIComponent(JSON.stringify([orderItem]))}&type=buy_now`
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
	
	/* 商品轮播图 */
	.product-swiper {
		.swiper {
			height: 500rpx;
			
			.swiper-image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	/* 商品信息 */
	.product-info {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.price-section {
			display: flex;
			align-items: center;
			gap: 20rpx;
			margin-bottom: 20rpx;
			
			.current-price {
				font-size: 48rpx;
				font-weight: bold;
				color: #FFB6C1; // 更淡的粉色
			}
			
			.original-price {
				font-size: 28rpx;
				color: #999;
				text-decoration: line-through;
			}
			
			.discount-tag {
				background-color: #ff4757;
				color: #fff;
				font-size: 22rpx;
				padding: 4rpx 12rpx;
				border-radius: 12rpx;
			}
		}
		
		.product-name {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			display: block;
			margin-bottom: 16rpx;
		}
		
		.product-desc {
			font-size: 28rpx;
			color: #666;
			display: block;
			margin-bottom: 20rpx;
			line-height: 1.5;
		}
		
		.product-meta {
			display: flex;
			gap: 30rpx;
			
			.sales-info, .rating-info, .stock-info {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	/* 规格选择 */
	.spec-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}
		
		.spec-list {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			
			.spec-item {
				padding: 20rpx 30rpx;
				border: 2rpx solid #f0f0f0;
				border-radius: 12rpx;
				background-color: #fafafa;
				transition: all 0.3s ease;
				
				&.active {
					border-color: #FFB6C1; // 更淡的粉色
					background-color: #fef8fa; // 更淡的浅粉色背景
				}
				
				.spec-text {
					font-size: 28rpx;
					color: #333;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.spec-price {
					font-size: 24rpx;
					color: #FFB6C1; // 更淡的粉色
				}
			}
		}
	}
	
	/* 数量选择 */
	.quantity-section {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}
		
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
	
	/* 商品详情 */
	.detail-section {
		background-color: #fff;
		padding: 30rpx;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}
		
		.detail-content {
			.detail-text {
				font-size: 28rpx;
				color: #666;
				line-height: 1.8;
				white-space: pre-line;
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
		align-items: center;
		gap: 20rpx;
		
		.left-actions {
			flex: 1;
			
			.action-btn {
				width: 100%;
				height: 80rpx;
				background-color: #fef8fa; // 更淡的浅粉色背景
				color: #FFB6C1; // 更淡的粉色
				border: 2rpx solid #FFB6C1; // 更淡的粉色
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 10rpx;
				
				.btn-icon {
					font-size: 32rpx;
				}
				
				.btn-text {
					font-size: 28rpx;
				}
			}
		}
		
		.right-actions {
			flex: 1;
			
			.buy-btn {
				width: 100%;
				height: 80rpx;
				background-color: #FFB6C1; // 更淡的粉色
				color: #fff;
				border-radius: 40rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
</style> 