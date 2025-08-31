<template>
	<view class="content">
		<view class="activity-list">
			<view class="activity-item" v-for="(item, index) in activities" :key="index" @click="viewActivity(item)">
				<view class="activity-image">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="activity-tag" :class="item.status">{{item.statusText}}</view>
				</view>
				<view class="activity-info">
					<text class="activity-title">{{item.title}}</text>
					<text class="activity-desc">{{item.description}}</text>
					<view class="activity-details">
						<view class="activity-time">
							<text class="time-label">活动时间：</text>
							<text class="time-text">{{item.startDate}} - {{item.endDate}}</text>
						</view>
						<view class="activity-location" v-if="item.location">
							<text class="location-label">活动地点：</text>
							<text class="location-text">{{item.location}}</text>
						</view>
					</view>
					<view class="activity-footer">
						<view class="participants-info">
							<text class="participants-text">已有{{item.participants}}人参与</text>
						</view>
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
				activities: [
					{
						id: 1,
						title: '🎉 新店开业大酬宾',
						description: '庆祝新店开业，全场体验项目享8折优惠，新用户首次体验更享特价！',
						image: '/static/image/day/VR体验馆.jpg',
						startDate: '2024-12-01',
						endDate: '2024-12-31',
						location: '全部门店',
						participants: 1288,
						status: 'active',
						statusText: '进行中'
					},
					{
						id: 2,
						title: '🔥 周末狂欢夜',
						description: '每周末晚上18:00-22:00，特色体验项目限时开放，还有神秘嘉宾现场互动！',
						image: '/static/componentIndex.png',
						startDate: '2024-12-01',
						endDate: '2024-12-31',
						location: '旗舰店',
						participants: 856,
						status: 'active',
						statusText: '每周进行'
					},
					{
						id: 3,
						title: '💝 生日月专享福利',
						description: '生日当月持身份证享受免费体验一次，还有生日礼品相送！',
						image: '/static/apiIndex.png',
						startDate: '2024-01-01',
						endDate: '2024-12-31',
						location: '全部门店',
						participants: 2156,
						status: 'active',
						statusText: '长期有效'
					},
					{
						id: 4,
						title: '🎯 连续签到挑战',
						description: '连续签到7天送体验券，连续签到30天送神秘大礼包！',
						image: '/static/extuiIndex.png',
						startDate: '2024-12-01',
						endDate: '2024-12-31',
						location: '线上活动',
						participants: 3247,
						status: 'hot',
						statusText: '火热进行'
					},
					{
						id: 5,
						title: '👥 好友拼团活动',
						description: '邀请好友一起体验，3人团享7折，5人团享6折，团长免费！',
						image: '/static/templateIndex.png',
						startDate: '2024-12-15',
						endDate: '2024-12-25',
						location: '全部门店',
						participants: 567,
						status: 'new',
						statusText: '最新活动'
					},
					{
						id: 6,
						title: '🏆 年终盛典',
						description: '年终感恩回馈，VIP会员专享超值套餐，限量发售！',
						image: '/static/image/day/VR体验馆.jpg',
						startDate: '2024-12-20',
						endDate: '2024-12-31',
						location: '全部门店',
						participants: 234,
						status: 'coming',
						statusText: '即将开始'
					}
				]
			}
		},
		methods: {
			viewActivity(activity) {
				uni.showModal({
					title: activity.title,
					content: `${activity.description}\n\n活动时间：${activity.startDate} - ${activity.endDate}\n活动地点：${activity.location}\n已有${activity.participants}人参与`,
					showCancel: false,
					confirmText: '知道了'
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
	
	.activity-list {
		.activity-item {
			background-color: #fff8fa;
			border-radius: 16rpx;
			margin-bottom: 30rpx;
			overflow: hidden;
			border: 1rpx solid #ffe4e8;
			transition: all 0.3s ease;
			
			&:active {
				transform: scale(0.98);
			}
			
			.activity-image {
				position: relative;
				
				image {
					width: 100%;
					height: 300rpx;
				}
				
				.activity-tag {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					color: #fff;
					padding: 8rpx 16rpx;
					border-radius: 20rpx;
					font-size: 24rpx;
					font-weight: bold;
					
					&.active {
						background-color: #4CAF50; /* 进行中 - 绿色 */
					}
					
					&.hot {
						background-color: #FF6347; /* 火热 - 红色 */
					}
					
					&.new {
						background-color: #FF69B4; /* 最新 - 粉色 */
					}
					
					&.coming {
						background-color: #FFA500; /* 即将开始 - 橙色 */
					}
					
					&.ended {
						background-color: #999; /* 已结束 - 灰色 */
					}
				}
			}
			
			.activity-info {
				padding: 30rpx;
				
				.activity-title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 16rpx;
					line-height: 1.4;
				}
				
				.activity-desc {
					font-size: 26rpx;
					color: #666;
					display: block;
					margin-bottom: 24rpx;
					line-height: 1.5;
				}
				
				.activity-details {
					margin-bottom: 24rpx;
					
					.activity-time, .activity-location {
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;
						
						.time-label, .location-label {
							font-size: 24rpx;
							color: #999;
							margin-right: 8rpx;
							min-width: 140rpx;
						}
						
						.time-text, .location-text {
							font-size: 24rpx;
							color: #666;
							flex: 1;
						}
					}
				}
				
				.activity-footer {
					.participants-info {
						.participants-text {
							font-size: 24rpx;
							color: #FF69B4;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style> 