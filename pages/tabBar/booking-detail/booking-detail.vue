<template>
	<view class="content">
		<!-- 页面标题 -->
		<view class="page-header">
			<view class="page-title">产品展示</view>
		</view>
		
		<!-- 产品详情页面 -->
		<view class="product-detail-page">
			<!-- 产品详情 -->
			<view class="product-detail-section">
				<view class="section-title">产品详情</view>
				<view class="media-swiper-section">
					<swiper 
						class="product-media-swiper" 
						:indicator-dots="true" 
						:autoplay="true" 
						:interval="3000" 
						:duration="500"
						indicator-color="rgba(255,255,255,0.6)"
						indicator-active-color="#FF69B4"
					>
						<swiper-item v-if="currentProduct.videoUrl">
							<view class="media-item video-item" @click="previewVideo">
								<video 
									:src="currentProduct.videoUrl" 
									class="product-video"
									:poster="currentProduct.videoPoster"
								></video>
								<view class="play-icon">▶</view>
							</view>
						</swiper-item>
						<swiper-item v-for="(image, index) in currentProduct.images" :key="index">
							<view class="media-item image-item" @click="previewImage(image, currentProduct.images)">
								<image :src="image" class="swiper-image" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
			<!-- 产品选择 -->
			<view class="product-selection-section">
				<view class="section-title">选择产品</view>
				<view class="product-grid">
					<view 
						class="product-grid-item" 
						v-for="product in products" 
						:key="product.id"
						:class="{ selected: selectedProduct === product.id }"
						@click="selectProductForDisplay(product)"
					>
						<image :src="product.thumbnail" class="product-grid-thumbnail" mode="aspectFill"></image>
						<text class="product-grid-name">{{product.name}}</text>
					</view>
				</view>
			</view>
			
			<!-- 产品价格信息 -->
			<view class="price-info-section">
				<view class="price-info-item">
					<text class="price-label">产品单价：</text>
					<text class="price-value">¥{{currentProduct.price}}/小时</text>
				</view>
				<view class="price-info-item">
					<text class="price-label">套餐详情：</text>
					<view class="package-details">
						<view class="package-detail-item">
							<text class="package-detail-name">套餐一：</text>
							<text class="package-detail-price">¥{{currentProduct.package1Price}}</text>
							<text class="package-detail-desc">（基础体验）</text>
						</view>
						<view class="package-detail-item">
							<text class="package-detail-name">套餐二：</text>
							<text class="package-detail-price">¥{{currentProduct.package2Price}}</text>
							<text class="package-detail-desc">（进阶体验）</text>
						</view>
						<view class="package-detail-item">
							<text class="package-detail-name">套餐三：</text>
							<text class="package-detail-price">¥{{currentProduct.package3Price}}</text>
							<text class="package-detail-desc">（豪华体验）</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 产品简介和郑重声明 -->
			<view class="product-info-section">
				<view class="section-title">产品简介</view>
				<view class="product-description">
					<view class="description-item">
						<text class="description-label">适用身高：</text>
						<text class="description-value">{{currentProduct.height || '120-180cm'}}</text>
					</view>
					<view class="description-item">
						<text class="description-label">产品尺寸：</text>
						<text class="description-value">{{currentProduct.dimensions || '长200cm × 宽150cm × 高180cm'}}</text>
					</view>
					<view class="description-item">
						<text class="description-label">动力类型：</text>
						<text class="description-value">{{currentProduct.powerType || '电动驱动'}}</text>
					</view>
					<view class="description-item">
						<text class="description-label">安全等级：</text>
						<text class="description-value">{{currentProduct.safetyLevel || 'A级安全认证'}}</text>
					</view>
					<view class="description-item">
						<text class="description-label">使用说明：</text>
						<text class="description-value">{{currentProduct.usage || '专业工作人员指导操作，请勿自行操作'}}</text>
					</view>
				</view>
				
				<view class="disclaimer-section">
					<view class="disclaimer-title">郑重声明</view>
					<view class="disclaimer-content">
						<text class="disclaimer-text">1. 本产品仅供娱乐体验，请遵守相关安全规定</text>
						<text class="disclaimer-text">2. 体验前请仔细阅读安全须知，确保身体健康</text>
						<text class="disclaimer-text">3. 未成年人请在监护人陪同下体验</text>
						<text class="disclaimer-text">4. 如有身体不适请立即停止体验并告知工作人员</text>
						<text class="disclaimer-text">5. 本店保留最终解释权</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeInfo: {
					name: '朝阳VR体验馆',
					address: '北京市朝阳区建国路88号',
					phone: '010-12345678'
				},
				currentProduct: {
					id: 1,
					name: 'VR虚拟现实体验',
					description: '沉浸式虚拟现实体验，带你进入全新的数字世界',
					price: 199,
					package1Price: 299,
					package2Price: 399,
					package3Price: 499,
					videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
					videoPoster: '/static/image/day/VR体验馆.jpg',
					images: [
						'/static/image/day/VR体验馆.jpg',
						'/static/image/day/VR体验馆.jpg',
						'/static/image/day/VR体验馆.jpg'
					]
				},
				products: [
					{
						id: 1,
						name: 'VR体验',
						description: '虚拟现实',
						price: 80,
						thumbnail: '/static/image/day/VR体验馆.jpg',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/image/day/VR体验馆.jpg',
						images: [
							'/static/image/day/VR体验馆.jpg',
							'/static/componentIndex.png',
							'/static/templateIndex.png'
						]
					},
					{
						id: 2,
						name: 'AR体验',
						description: '增强现实',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/componentIndex.png',
						videoUrl: 'https://www.w3schools.com/html/movie.mp4',
						videoPoster: '/static/componentIndex.png',
						images: [
							'/static/componentIndex.png',
							'/static/image/day/VR体验馆.jpg',
							'/static/extuiIndex.png'
						]
					},
					{
						id: 3,
						name: 'MR体验',
						description: '混合现实',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/extuiIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/extuiIndex.png',
						images: [
							'/static/extuiIndex.png',
							'/static/templateIndex.png',
							'/static/image/day/VR体验馆.jpg'
						]
					},
					{
						id: 4,
						name: '密室逃脱',
						description: '解谜冒险',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/templateIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/templateIndex.png',
						images: [
							'/static/templateIndex.png',
							'/static/image/day/VR体验馆.jpg',
							'/static/componentIndex.png'
						]
					},
					{
						id: 5,
						name: '剧本杀',
						description: '角色扮演',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/extuiIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/extuiIndex.png',
						images: [
							'/static/extuiIndex.png',
							'/static/templateIndex.png',
							'/static/image/day/VR体验馆.jpg'
						]
					},
					{
						id: 6,
						name: '电竞游戏',
						description: '竞技对战',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/componentIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/componentIndex.png',
						images: [
							'/static/componentIndex.png',
							'/static/image/day/VR体验馆.jpg',
							'/static/extuiIndex.png'
						]
					},
					{
						id: 7,
						name: 'KTV包厢',
						description: '音乐娱乐',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/image/day/VR体验馆.jpg',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/image/day/VR体验馆.jpg',
						images: [
							'/static/image/day/VR体验馆.jpg',
							'/static/componentIndex.png',
							'/static/templateIndex.png'
						]
					},
					{
						id: 8,
						name: '台球桌球',
						description: '桌球运动',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/templateIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/templateIndex.png',
						images: [
							'/static/templateIndex.png',
							'/static/extuiIndex.png',
							'/static/componentIndex.png'
						]
					},
					{
						id: 9,
						name: '棋牌室',
						description: '棋牌娱乐',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/extuiIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/extuiIndex.png',
						images: [
							'/static/extuiIndex.png',
							'/static/image/day/VR体验馆.jpg',
							'/static/templateIndex.png'
						]
					},
					{
						id: 10,
						name: '桌游室',
						description: '桌面游戏',
						price: 199,
						package1Price: 299,
						package2Price: 399,
						package3Price: 499,
						thumbnail: '/static/componentIndex.png',
						videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
						videoPoster: '/static/componentIndex.png',
						images: [
							'/static/componentIndex.png',
							'/static/templateIndex.png',
							'/static/image/day/VR体验馆.jpg'
						]
					}
				],
				selectedProduct: 1
			}
		},
		onLoad(options) {
			if (options.store) {
				try {
					const store = JSON.parse(decodeURIComponent(options.store));
					this.storeInfo = {
						name: store.name,
						address: store.address,
						phone: store.phone
					};
				} catch (e) {
					console.error('解析门店数据失败:', e);
				}
			}
			
			if (options.item) {
				try {
					const item = JSON.parse(decodeURIComponent(options.item));
					const matchedProduct = this.products.find(p => p.name.includes(item.name) || item.name.includes(p.name));
					if (matchedProduct) {
						this.selectProductForDisplay(matchedProduct);
					}
				} catch (e) {
					console.error('解析项目数据失败:', e);
				}
			}
		},
		methods: {
			selectProductForDisplay(product) {
				this.selectedProduct = product.id;
				this.currentProduct = {
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price || 199,
					package1Price: product.package1Price || 299,
					package2Price: product.package2Price || 399,
					package3Price: product.package3Price || 499,
					videoUrl: product.videoUrl,
					videoPoster: product.videoPoster,
					images: product.images,
					height: product.height || '120-180cm',
					dimensions: product.dimensions || '长200cm × 宽150cm × 高180cm',
					powerType: product.powerType || '电动驱动',
					safetyLevel: product.safetyLevel || 'A级安全认证',
					usage: product.usage || '专业工作人员指导操作，请勿自行操作'
				};
			},
			
			previewVideo() {
				uni.navigateTo({
					url: `/pages/video-player/video-player?videoUrl=${encodeURIComponent(this.currentProduct.videoUrl)}&title=${encodeURIComponent(this.currentProduct.name)}`
				});
			},
			
			previewImage(currentImage, allImages) {
				uni.previewImage({
					current: currentImage,
					urls: allImages,
					success: () => {
						console.log('预览图片成功');
					},
					fail: (err) => {
						console.error('预览图片失败:', err);
						uni.showToast({
							title: '预览图片失败',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #fef5f7;
		min-height: 100vh;
		padding-bottom: 120rpx;
	}
	
	/* 页面标题 */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #ffe4e8;
	}
	
	.page-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
	
	/* 产品详情页面 */
	.product-detail-page {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		margin: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
	}
	
	/* 产品详情块 */
	.product-detail-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	/* 媒体轮播区域 */
	.media-swiper-section {
		margin-bottom: 0;
	}
	
	.product-media-swiper {
		width: 100%;
		height: 400rpx;
		border-radius: 12rpx;
	}
	
	.media-item {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
		overflow: hidden;
		cursor: pointer;
	}
	
	.video-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #000;
	}
	
	.image-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		z-index: 10;
	}
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	
	.product-video {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	.swiper-image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	/* 产品价格信息 */
	.price-info-section {
		background-color: #fff8fa;
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.price-info-item {
		display: flex;
		align-items: flex-start;
		gap: 15rpx;
		margin-bottom: 15rpx;
	}
	
	.price-info-item:last-child {
		margin-bottom: 0;
	}
	
	.price-label {
		font-size: 26rpx;
		color: #666;
		font-weight: 500;
		min-width: 120rpx;
	}
	
	.price-value {
		font-size: 28rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	
	.package-details {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
		flex: 1;
	}
	
	.package-detail-item {
		display: flex;
		align-items: center;
		gap: 15rpx;
	}
	
	.package-detail-name {
		font-size: 26rpx;
		color: #666;
		font-weight: 500;
		min-width: 80rpx;
	}
	
	.package-detail-price {
		font-size: 28rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	
	.package-detail-desc {
		font-size: 24rpx;
		color: #999;
	}
	
	/* 产品简介和郑重声明 */
	.product-info-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.product-description {
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.description-item {
		display: flex;
		align-items: flex-start;
		gap: 15rpx;
	}
	
	.description-label {
		font-size: 26rpx;
		color: #666;
		font-weight: 500;
		min-width: 120rpx;
		flex-shrink: 0;
	}
	
	.description-value {
		font-size: 26rpx;
		color: #333;
		line-height: 1.5;
		flex: 1;
	}
	
	.disclaimer-section {
		border-top: 1rpx solid #ffe4e8;
		padding-top: 20rpx;
	}
	
	.disclaimer-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #FF69B4;
		margin-bottom: 15rpx;
	}
	
	.disclaimer-content {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}
	
	.disclaimer-text {
		font-size: 24rpx;
		color: #666;
		line-height: 1.5;
		text-align: justify;
	}
	
	/* 产品选择网格 */
	.product-selection-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.product-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 15rpx;
		margin-top: 20rpx;
	}
	
	.product-grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10rpx;
		padding: 15rpx;
		border-radius: 12rpx;
		border: 2rpx solid transparent;
		transition: all 0.3s ease;
		cursor: pointer;
	}
	
	.product-grid-item:hover {
		border-color: #FF69B4;
		background-color: #fff0f5;
	}
	
	.product-grid-item.selected {
		border-color: #FF69B4;
		background-color: #fff0f5;
	}
	
	.product-grid-thumbnail {
		width: 80rpx;
		height: 80rpx;
		border-radius: 12rpx;
		object-fit: cover;
	}
	
	.product-grid-name {
		font-size: 20rpx;
		color: #333;
		text-align: center;
		line-height: 1.2;
	}
</style> 