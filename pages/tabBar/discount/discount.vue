<template>
	<view class="content">
		<view class="header">
			<text class="title">优惠中心</text>
		</view>
		
		<view class="search-bar">
			<input type="text" placeholder="搜索充值、团购、体验项目" class="search-input" />
			<button class="search-btn">搜索</button>
		</view>
		
		<view class="category-tabs">
			<view 
				class="tab-item" 
				v-for="(item, index) in categories" 
				:key="index"
				:class="{ active: currentCategory === index }"
				@click="switchCategory(index)"
			>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="discount-list">
			<view class="discount-item" v-for="(item, index) in currentDiscounts" :key="index">
				<view class="discount-image">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="discount-tag" v-if="item.tag">{{item.tag}}</view>
				</view>
				<view class="discount-info">
					<text class="discount-title">{{item.title}}</text>
					<text class="discount-desc">{{item.description}}</text>
					<view class="discount-price">
						<text class="original-price">¥{{item.originalPrice}}</text>
						<text class="current-price">¥{{item.currentPrice}}</text>
					</view>
					<view class="discount-footer">
						<text class="valid-date">有效期至：{{item.validDate}}</text>
						<button class="get-btn" @click="getDiscount(item)">立即领取</button>
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
				currentCategory: 0,
				categories: [
					{ name: '账户充值', id: 'recharge' },
					{ name: '团购优惠', id: 'group' },
					{ name: '体验中心', id: 'experience' },
					{ name: '特邀嘉宾', id: 'vip' }
				],
				discounts: {
					recharge: [
						{
							title: '充值100送20',
							description: '充值满100元，赠送20元体验券',
							originalPrice: '100',
							currentPrice: '120',
							image: '/static/componentIndex.png',
							tag: '限时特惠',
							validDate: '2024-12-31'
						},
						{
							title: '充值200送50',
							description: '充值满200元，赠送50元体验券',
							originalPrice: '200',
							currentPrice: '250',
							image: '/static/apiIndex.png',
							tag: '新用户专享',
							validDate: '2024-12-31'
						},
						{
							title: '充值500送150',
							description: '充值满500元，赠送150元体验券',
							originalPrice: '500',
							currentPrice: '650',
							image: '/static/extuiIndex.png',
							tag: '会员专享',
							validDate: '2024-12-31'
						}
					],
					group: [
						{
							title: 'VR体验团购',
							description: '5人团购，每人立减30元',
							originalPrice: '80',
							currentPrice: '50',
							image: '/static/templateIndex.png',
							tag: '团购特惠',
							validDate: '2024-12-31'
						},
						{
							title: '密室逃脱团购',
							description: '3人团购，每人立减40元',
							originalPrice: '120',
							currentPrice: '80',
							image: '/static/image/day/密室逃脱.jpg',
							tag: '限时抢购',
							validDate: '2024-12-31'
						}
					],
					experience: [
						{
							title: 'VR体验馆',
							description: '沉浸式虚拟现实体验',
							originalPrice: '80',
							currentPrice: '60',
							image: '/static/image/day/VR体验馆.jpg',
							tag: '体验推荐',
							validDate: '2024-12-31'
						},
						{
							title: '棋牌室',
							description: '休闲娱乐棋牌游戏',
							originalPrice: '60',
							currentPrice: '45',
							image: '/static/image/day/棋牌1.jpg',
							tag: '热门体验',
							validDate: '2024-12-31'
						},
						{
							title: '台球室',
							description: '专业台球体验',
							originalPrice: '50',
							currentPrice: '35',
							image: '/static/image/day/台球1.png',
							tag: '新项目',
							validDate: '2024-12-31'
						}
					],
					vip: [
						{
							title: 'VIP专享体验',
							description: '特邀嘉宾专享的豪华体验套餐',
							originalPrice: '300',
							currentPrice: '200',
							image: '/static/componentIndex.png',
							tag: 'VIP专享',
							validDate: '2024-12-31'
						},
						{
							title: '私人定制服务',
							description: '为特邀嘉宾提供个性化定制服务',
							originalPrice: '500',
							currentPrice: '350',
							image: '/static/apiIndex.png',
							tag: '专属服务',
							validDate: '2024-12-31'
						},
						{
							title: '贵宾休息室',
							description: '独立休息空间，提供免费饮品',
							originalPrice: '100',
							currentPrice: '0',
							image: '/static/extuiIndex.png',
							tag: '免费体验',
							validDate: '2024-12-31'
						}
					]
				}
			}
		},
		computed: {
			currentDiscounts() {
				const categoryId = this.categories[this.currentCategory].id;
				return this.discounts[categoryId] || [];
			}
		},
		methods: {
			switchCategory(index) {
				this.currentCategory = index;
			},
			getDiscount(item) {
				uni.showToast({
					title: '领取成功',
					icon: 'success'
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
	
	.search-bar {
		display: flex;
		margin: 20rpx 0;
		
		.search-input {
			flex: 1;
			height: 80rpx;
			background-color: #fff;
			border-radius: 40rpx 0 0 40rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
		}
		
		.search-btn {
			width: 120rpx;
			height: 80rpx;
			background-color: #FF69B4;
			color: #fff;
			border-radius: 0 40rpx 40rpx 0;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.category-tabs {
		display: flex;
		background-color: #fff8fa;
		border-radius: 16rpx;
		margin: 20rpx 0;
		overflow: hidden;
		border: 1rpx solid #ffe4e8;
		
		.tab-item {
			flex: 1;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #666;
			position: relative;
			
			&.active {
				color: #FF69B4;
				background-color: #fff0f5;
				
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 60rpx;
					height: 4rpx;
					background-color: #FF69B4;
					border-radius: 2rpx;
				}
			}
		}
	}
	
	.discount-list {
		.discount-item {
			background-color: #fff8fa;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			border: 1rpx solid #ffe4e8;
			
			.discount-image {
				position: relative;
				
				image {
					width: 100%;
					height: 300rpx;
				}
				
				.discount-tag {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					background-color: #ff6b35;
					color: #fff;
					padding: 8rpx 16rpx;
					border-radius: 20rpx;
					font-size: 24rpx;
				}
			}
			
			.discount-info {
				padding: 30rpx;
				
				.discount-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 16rpx;
				}
				
				.discount-desc {
					font-size: 26rpx;
					color: #666;
					display: block;
					margin-bottom: 20rpx;
				}
				
				.discount-price {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					
					.original-price {
						font-size: 26rpx;
						color: #999;
						text-decoration: line-through;
						margin-right: 20rpx;
					}
					
					.current-price {
						font-size: 36rpx;
						color: #ff6b35;
						font-weight: bold;
					}
				}
				
				.discount-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.valid-date {
						font-size: 24rpx;
						color: #999;
					}
					
					.get-btn {
						background-color: #FF69B4;
						color: #fff;
						padding: 16rpx 32rpx;
						border-radius: 30rpx;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style> 