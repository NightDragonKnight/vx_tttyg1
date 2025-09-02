<template>
	<view class="content">
		<!-- 搜索栏 -->
		<view class="search-section">
			<view class="search-bar">
				<input 
					type="text" 
					placeholder="搜索商品" 
					class="search-input"
					v-model="searchKeyword"
					@input="onSearchInput"
				/>
				<button class="search-btn" @click="search">搜索</button>
			</view>
		</view>
		
		<!-- 分类选择 -->
		<view class="category-section">
			<scroll-view class="category-scroll" scroll-x="true">
				<view class="category-list">
					<view 
						class="category-item" 
						v-for="(category, index) in categories" 
						:key="index"
						:class="{ active: selectedCategory === category.id }"
						@click="selectCategory(category)"
					>
						<text class="category-icon">{{category.icon}}</text>
						<text class="category-name">{{category.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 商品列表 -->
		<view class="product-section">
			<view class="section-header">
				<text class="section-title">{{selectedCategoryName}}商品</text>
				<view class="sort-options">
					<text 
						class="sort-item" 
						:class="{ active: sortType === 'default' }"
						@click="changeSort('default')"
					>默认</text>
					<text 
						class="sort-item" 
						:class="{ active: sortType === 'price' }"
						@click="changeSort('price')"
					>价格</text>
					<text 
						class="sort-item" 
						:class="{ active: sortType === 'sales' }"
						@click="changeSort('sales')"
					>销量</text>
				</view>
			</view>
			
			<view class="product-grid">
				<view 
					class="product-card" 
					v-for="(product, index) in filteredProducts" 
					:key="index"
					@click="viewProductDetail(product)"
				>
					<image :src="product.image" mode="aspectFill" class="product-image"></image>
					<view class="product-info">
						<text class="product-name">{{product.name}}</text>
						<text class="product-desc">{{product.description}}</text>
						<view class="product-meta">
							<text class="product-sales">已售{{product.sales}}件</text>
							<text class="product-rating">⭐{{product.rating}}</text>
						</view>
						<view class="product-price-section">
							<text class="product-price">¥{{product.price}}</text>
							<text class="product-original-price" v-if="product.originalPrice">¥{{product.originalPrice}}</text>
						</view>
					</view>
					<view class="product-actions">
						<button class="buy-btn" @click.stop="buyNow(product)">立即购买</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredProducts.length === 0">
			<text class="empty-text">{{searchKeyword ? '未找到相关商品' : '该分类暂无商品'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				selectedCategory: 'all',
				sortType: 'default',
				categories: [
					{ id: 'all', name: '全部', icon: '🏪' },
					{ id: 'vr', name: 'VR设备', icon: '🥽' },
					{ id: 'gaming', name: '游戏设备', icon: '🎮' },
					{ id: 'accessories', name: '配件', icon: '🔧' },
					{ id: 'clothing', name: '服装', icon: '👕' },
					{ id: 'drinks', name: '饮品', icon: '🥤' },
					{ id: 'snacks', name: '零食', icon: '🍿' }
				],
				products: [
					{
						id: 1,
						name: 'VR眼镜套装',
						description: '高清VR眼镜，沉浸式体验',
						price: 299,
						originalPrice: 399,
						image: '/static/image/day/VR体验馆.jpg',
						category: 'vr',
						sales: 156,
						rating: 4.8,
						stock: 50
					},
					{
						id: 2,
						name: '游戏手柄',
						description: '无线游戏手柄，支持多平台',
						price: 89,
						originalPrice: 129,
						image: '/static/componentIndex.png',
						category: 'gaming',
						sales: 234,
						rating: 4.6,
						stock: 100
					},
					{
						id: 3,
						name: 'VR手柄',
						description: 'VR专用手柄，精准定位',
						price: 199,
						image: '/static/templateIndex.png',
						category: 'accessories',
						sales: 89,
						rating: 4.7,
						stock: 30
					},
					{
						id: 4,
						name: '体验馆T恤',
						description: '舒适面料，时尚设计',
						price: 59,
						originalPrice: 79,
						image: '/static/extuiIndex.png',
						category: 'clothing',
						sales: 67,
						rating: 4.5,
						stock: 200
					},
					{
						id: 5,
						name: '能量饮料',
						description: '提神醒脑，补充能量',
						price: 8,
						image: '/static/image/day/VR体验馆.jpg',
						category: 'drinks',
						sales: 456,
						rating: 4.3,
						stock: 500
					},
					{
						id: 6,
						name: '爆米花',
						description: '香脆可口，观影必备',
						price: 12,
						image: '/static/componentIndex.png',
						category: 'snacks',
						sales: 234,
						rating: 4.4,
						stock: 300
					},
					{
						id: 7,
						name: 'VR头显支架',
						description: '可调节支架，舒适体验',
						price: 45,
						image: '/static/templateIndex.png',
						category: 'accessories',
						sales: 123,
						rating: 4.6,
						stock: 80
					},
					{
						id: 8,
						name: '游戏耳机',
						description: '立体声耳机，游戏体验更佳',
						price: 159,
						originalPrice: 199,
						image: '/static/extuiIndex.png',
						category: 'gaming',
						sales: 178,
						rating: 4.7,
						stock: 60
					}
				]
			}
		},
		computed: {
			selectedCategoryName() {
				const category = this.categories.find(c => c.id === this.selectedCategory);
				return category ? category.name : '全部';
			},
			filteredProducts() {
				let result = this.products;
				
				// 按分类筛选
				if (this.selectedCategory !== 'all') {
					result = result.filter(item => item.category === this.selectedCategory);
				}
				
				// 按搜索关键词筛选
				if (this.searchKeyword.trim()) {
					const keyword = this.searchKeyword.toLowerCase();
					result = result.filter(item => 
						item.name.toLowerCase().includes(keyword) ||
						item.description.toLowerCase().includes(keyword)
					);
				}
				
				// 排序
				result = this.sortProducts(result);
				
				return result;
			}
		},
		methods: {
			// 搜索输入
			onSearchInput() {
				// 实时搜索，可以添加防抖
			},
			
			// 执行搜索
			search() {
				console.log('搜索关键词:', this.searchKeyword);
			},
			
			// 选择分类
			selectCategory(category) {
				this.selectedCategory = category.id;
			},
			
			// 改变排序
			changeSort(type) {
				this.sortType = type;
			},
			
			// 排序商品
			sortProducts(products) {
				switch(this.sortType) {
					case 'price':
						return products.sort((a, b) => a.price - b.price);
					case 'sales':
						return products.sort((a, b) => b.sales - a.sales);
					default:
						return products;
				}
			},
			
			// 查看商品详情
			viewProductDetail(product) {
				uni.navigateTo({
					url: `/pages/shop/product-detail?product=${encodeURIComponent(JSON.stringify(product))}`
				});
			},
			
			// 立即购买
			buyNow(product) {
				uni.navigateTo({
					url: `/pages/shop/purchase?product=${encodeURIComponent(JSON.stringify(product))}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fef8fa; // 更淡的浅粉色背景
		min-height: 100vh;
		padding-bottom: 20rpx;
	}
	
	/* 搜索栏 */
	.search-section {
		padding: 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f0f0f0;
		
		.search-bar {
			display: flex;
			gap: 20rpx;
			
			.search-input {
				flex: 1;
				height: 80rpx;
				background-color: #f8f8f8;
				border-radius: 40rpx;
				padding: 0 30rpx;
				font-size: 28rpx;
				color: #333;
			}
			
			.search-btn {
				background-color: #FFB6C1; // 更淡的粉色
				color: #fff;
				padding: 16rpx 32rpx;
				border-radius: 40rpx;
				font-size: 26rpx;
			}
		}
	}
	
	/* 分类选择 */
	.category-section {
		background-color: #fff;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
		
		.category-scroll {
			white-space: nowrap;
		}
		
		.category-list {
			display: flex;
			padding: 0 20rpx;
		}
		
		.category-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20rpx 30rpx;
			margin-right: 20rpx;
			border-radius: 16rpx;
			background-color: #f8f8f8;
			transition: all 0.3s ease;
			
			&.active {
				background-color: #FFB6C1; // 更淡的粉色
				color: #fff;
			}
			
			.category-icon {
				font-size: 40rpx;
				margin-bottom: 8rpx;
			}
			
			.category-name {
				font-size: 24rpx;
			}
		}
	}
	
	/* 商品区域 */
	.product-section {
		padding: 20rpx;
		
		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.section-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #333;
			}
			
			.sort-options {
				display: flex;
				gap: 20rpx;
				
				.sort-item {
					font-size: 26rpx;
					color: #666;
					padding: 8rpx 16rpx;
					border-radius: 20rpx;
					transition: all 0.3s ease;
					
					&.active {
						background-color: #FFB6C1; // 更淡的粉色
						color: #fff;
					}
				}
			}
		}
		
		.product-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
			
			.product-card {
				background-color: #fff;
				border-radius: 16rpx;
				overflow: hidden;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
				transition: all 0.3s ease;
				
				&:active {
					transform: scale(0.98);
				}
				
				.product-image {
					width: 100%;
					height: 300rpx;
				}
				
				.product-info {
					padding: 20rpx;
					
					.product-name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
						display: block;
						margin-bottom: 8rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					
					.product-desc {
						font-size: 24rpx;
						color: #666;
						display: block;
						margin-bottom: 12rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					
					.product-meta {
						display: flex;
						justify-content: space-between;
						margin-bottom: 12rpx;
						
						.product-sales, .product-rating {
							font-size: 22rpx;
							color: #999;
						}
					}
					
					.product-price-section {
						display: flex;
						align-items: center;
						gap: 10rpx;
						margin-bottom: 15rpx;
						
						.product-price {
							font-size: 32rpx;
							font-weight: bold;
							color: #FFB6C1; // 更淡的粉色
						}
						
						.product-original-price {
							font-size: 24rpx;
							color: #999;
							text-decoration: line-through;
						}
					}
				}
				
				.product-actions {
					padding: 0 20rpx 20rpx;
					
					.buy-btn {
						width: 100%;
						height: 60rpx;
						background-color: #FFB6C1; // 更淡的粉色
						color: #fff;
						border-radius: 30rpx;
						font-size: 26rpx;
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
		
		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
</style> 