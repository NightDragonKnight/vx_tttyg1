<template>
	<view class="content">
		<!-- 购物车标题 -->
		<view class="header">
			<text class="title">购物车</text>
			<text class="edit-btn" @click="toggleEditMode">{{isEditMode ? '完成' : '编辑'}}</text>
		</view>
		
		<!-- 购物车列表 -->
		<view class="cart-list" v-if="cartItems.length > 0">
			<view class="cart-item" v-for="(item, index) in cartItems" :key="index">
				<!-- 选择框 -->
				<view class="checkbox" @click="toggleSelect(index)">
					<text class="checkbox-icon" :class="{ selected: item.selected }">
						{{item.selected ? '✓' : ''}}
					</text>
				</view>
				
				<!-- 商品信息 -->
				<image :src="item.image" class="item-image" mode="aspectFill"></image>
				<view class="item-info">
					<text class="item-name">{{item.name}}</text>
					<text class="item-spec" v-if="item.specName">规格：{{item.specName}}</text>
					<view class="item-price-section">
						<text class="item-price">¥{{item.price}}</text>
						<text class="item-original-price" v-if="item.originalPrice">¥{{item.originalPrice}}</text>
					</view>
				</view>
				
				<!-- 数量控制 -->
				<view class="quantity-control">
					<button class="quantity-btn" @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
					<text class="quantity-text">{{item.quantity}}</text>
					<button class="quantity-btn" @click="increaseQuantity(index)" :disabled="item.quantity >= item.stock">+</button>
				</view>
				
				<!-- 删除按钮（编辑模式） -->
				<view class="delete-btn" v-if="isEditMode" @click="removeItem(index)">
					<text class="delete-icon">🗑️</text>
				</view>
			</view>
		</view>
		
		<!-- 空购物车 -->
		<view class="empty-cart" v-else>
			<text class="empty-icon">🛒</text>
			<text class="empty-text">购物车是空的</text>
			<button class="go-shopping-btn" @click="goShopping">去购物</button>
		</view>
		
		<!-- 底部结算栏 -->
		<view class="bottom-bar" v-if="cartItems.length > 0">
			<view class="select-all">
				<view class="checkbox" @click="toggleSelectAll">
					<text class="checkbox-icon" :class="{ selected: isAllSelected }">
						{{isAllSelected ? '✓' : ''}}
					</text>
				</view>
				<text class="select-all-text">全选</text>
			</view>
			
			<view class="total-section">
				<view class="total-info">
					<text class="total-label">合计：</text>
					<text class="total-price">¥{{totalPrice}}</text>
				</view>
				<text class="total-desc">已选{{selectedCount}}件商品</text>
			</view>
			
			<button class="checkout-btn" @click="checkout" :disabled="selectedCount === 0">
				结算({{selectedCount}})
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartItems: [],
				isEditMode: false
			}
		},
		computed: {
			// 是否全选
			isAllSelected() {
				return this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
			},
			// 选中商品数量
			selectedCount() {
				return this.cartItems.filter(item => item.selected).length;
			},
			// 总价
			totalPrice() {
				return this.cartItems
					.filter(item => item.selected)
					.reduce((total, item) => total + (item.price * item.quantity), 0)
					.toFixed(2);
			}
		},
		onShow() {
			this.loadCartItems();
		},
		methods: {
			// 加载购物车数据
			loadCartItems() {
				const cart = uni.getStorageSync('cart') || [];
				this.cartItems = cart.map(item => ({
					...item,
					selected: true // 默认选中
				}));
			},
			
			// 切换编辑模式
			toggleEditMode() {
				this.isEditMode = !this.isEditMode;
			},
			
			// 切换商品选择
			toggleSelect(index) {
				this.cartItems[index].selected = !this.cartItems[index].selected;
				this.updateCart();
			},
			
			// 全选/取消全选
			toggleSelectAll() {
				const newState = !this.isAllSelected;
				this.cartItems.forEach(item => {
					item.selected = newState;
				});
				this.updateCart();
			},
			
			// 减少数量
			decreaseQuantity(index) {
				if (this.cartItems[index].quantity > 1) {
					this.cartItems[index].quantity--;
					this.updateCart();
				}
			},
			
			// 增加数量
			increaseQuantity(index) {
				if (this.cartItems[index].quantity < this.cartItems[index].stock) {
					this.cartItems[index].quantity++;
					this.updateCart();
				}
			},
			
			// 删除商品
			removeItem(index) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这个商品吗？',
					success: (res) => {
						if (res.confirm) {
							this.cartItems.splice(index, 1);
							this.updateCart();
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 更新购物车存储
			updateCart() {
				uni.setStorageSync('cart', this.cartItems);
			},
			
			// 去购物
			goShopping() {
				uni.navigateBack();
			},
			
			// 结算
			checkout() {
				const selectedItems = this.cartItems.filter(item => item.selected);
				if (selectedItems.length === 0) {
					uni.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					});
					return;
				}
				
				uni.navigateTo({
					url: `/pages/shop/checkout?items=${encodeURIComponent(JSON.stringify(selectedItems))}&type=cart`
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
	
	/* 头部 */
	.header {
		background-color: #fff;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f0f0f0;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
		
		.edit-btn {
			font-size: 28rpx;
			color: #FFB6C1; // 更淡的粉色
		}
	}
	
	/* 购物车列表 */
	.cart-list {
		.cart-item {
			background-color: #fff;
			margin: 20rpx;
			padding: 30rpx;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;
			
			.checkbox {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #ddd;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.checkbox-icon {
					font-size: 24rpx;
					color: transparent;
					
					&.selected {
						color: #FFB6C1; // 更淡的粉色
					}
				}
			}
			
			.item-image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
			}
			
			.item-info {
				flex: 1;
				
				.item-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.item-spec {
					font-size: 24rpx;
					color: #666;
					display: block;
					margin-bottom: 8rpx;
				}
				
				.item-price-section {
					display: flex;
					align-items: center;
					gap: 10rpx;
					
					.item-price {
						font-size: 28rpx;
						font-weight: bold;
						color: #FFB6C1; // 更淡的粉色
					}
					
					.item-original-price {
						font-size: 24rpx;
						color: #999;
						text-decoration: line-through;
					}
				}
			}
			
			.quantity-control {
				display: flex;
				align-items: center;
				gap: 20rpx;
				
				.quantity-btn {
					width: 50rpx;
					height: 50rpx;
					background-color: #f0f0f0;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #333;
					
					&:disabled {
						background-color: #f5f5f5;
						color: #ccc;
					}
				}
				
				.quantity-text {
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
					min-width: 60rpx;
					text-align: center;
				}
			}
			
			.delete-btn {
				width: 60rpx;
				height: 60rpx;
				background-color: #ff4757;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.delete-icon {
					font-size: 28rpx;
				}
			}
		}
	}
	
	/* 空购物车 */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 200rpx 0;
		
		.empty-icon {
			font-size: 120rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 32rpx;
			color: #999;
			margin-bottom: 40rpx;
		}
		
		.go-shopping-btn {
			background-color: #FFB6C1; // 更淡的粉色
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
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
		gap: 20rpx;
		
		.select-all {
			display: flex;
			align-items: center;
			gap: 10rpx;
			
			.checkbox {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #ddd;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.checkbox-icon {
					font-size: 24rpx;
					color: transparent;
					
					&.selected {
						color: #FFB6C1; // 更淡的粉色
					}
				}
			}
			
			.select-all-text {
				font-size: 28rpx;
				color: #333;
			}
		}
		
		.total-section {
			flex: 1;
			
			.total-info {
				display: flex;
				align-items: center;
				gap: 10rpx;
				margin-bottom: 4rpx;
				
				.total-label {
					font-size: 28rpx;
					color: #333;
				}
				
				.total-price {
					font-size: 32rpx;
					font-weight: bold;
					color: #FFB6C1; // 更淡的粉色
				}
			}
			
			.total-desc {
				font-size: 24rpx;
				color: #999;
			}
		}
		
		.checkout-btn {
			background-color: #FFB6C1; // 更淡的粉色
			color: #fff;
			padding: 20rpx 40rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: bold;
			
			&:disabled {
				background-color: #ccc;
			}
		}
	}
</style> 