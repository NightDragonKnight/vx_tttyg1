<template>
	<view class="content">
		<!-- 门店信息 -->
		<view class="store-info">
			<view class="store-header">
				<view class="store-name">{{bookingInfo.storeName}}</view>
				<view class="store-address">{{bookingInfo.address}}</view>
			</view>
			<view class="store-actions">
				<button class="action-btn" @click="navigateToStore">
					<text class="icon">📍</text>
					<text>导航</text>
				</button>
				<button class="action-btn" @click="callStore">
					<text class="icon">📞</text>
					<text>电话</text>
				</button>
			</view>
		</view>
		
		<!-- 门店视频 -->
		<view class="video-section">
			<view class="section-title">门店视频</view>
			<video 
				:src="bookingInfo.videoUrl" 
				class="store-video"
				controls
				poster="/static/image/day/VR体验馆.jpg"
			></video>
		</view>
		
		<!-- 预约信息 -->
		<view class="booking-section">
			<view class="section-title">预约信息</view>
			
			<!-- 预约种类 -->
			<view class="booking-item">
				<text class="item-label">预约种类</text>
				<view class="item-content">
					<text class="experience-name">{{bookingInfo.experienceName}}</text>
					<text class="experience-desc">{{bookingInfo.experienceDesc}}</text>
				</view>
			</view>
			
			<!-- 预约时间 -->
			<view class="booking-item">
				<text class="item-label">预约时间</text>
				<view class="time-selector">
					<view class="date-selector">
						<text class="selector-label">选择日期</text>
						<picker mode="date" :value="selectedDate" @change="onDateChange">
							<view class="picker-btn">{{selectedDate}}</view>
						</picker>
					</view>
					<view class="time-range-selector">
						<view class="time-selector-item">
							<text class="selector-label">开始时间</text>
							<picker :value="startTimeIndex" :range="timeSlots" @change="onStartTimeChange">
								<view class="picker-btn">{{selectedStartTime}}</view>
							</picker>
						</view>
						<view class="time-separator">
							<text>至</text>
						</view>
						<view class="time-selector-item">
							<text class="selector-label">结束时间</text>
							<picker :value="endTimeIndex" :range="availableEndTimes" @change="onEndTimeChange">
								<view class="picker-btn">{{selectedEndTime}}</view>
							</picker>
						</view>
					</view>
					<view class="duration-info" v-if="selectedStartTime && selectedEndTime">
						<text class="duration-text">预计时长：{{durationHours}}小时</text>
					</view>
				</view>
			</view>
			
			<!-- 预约人数 -->
			<view class="booking-item">
				<text class="item-label">预约人数</text>
				<view class="people-selector">
					<button class="count-btn" @click="decreasePeople">-</button>
					<text class="people-count">{{peopleCount}}人</text>
					<button class="count-btn" @click="increasePeople">+</button>
				</view>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="coupon-section">
			<view class="section-title">优惠券</view>
			<view class="coupon-list">
				<view 
					class="coupon-item" 
					v-for="(coupon, index) in availableCoupons" 
					:key="index"
					:class="{ selected: selectedCoupon === coupon.id }"
					@click="selectCoupon(coupon)"
				>
					<view class="coupon-info">
						<text class="coupon-name">{{coupon.name}}</text>
						<text class="coupon-desc">{{coupon.description}}</text>
						<text class="coupon-validity">有效期至：{{coupon.validUntil}}</text>
					</view>
					<view class="coupon-value">
						<text class="discount-amount">-¥{{coupon.discount}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 价格信息 -->
		<view class="price-section">
			<view class="price-item">
				<text>原价</text>
				<text class="original-price">¥{{originalPrice}}</text>
			</view>
			<view class="price-item" v-if="selectedCoupon">
				<text>优惠券</text>
				<text class="discount-price">-¥{{selectedCoupon.discount}}</text>
			</view>
			<view class="price-item total">
				<text>实付金额</text>
				<text class="final-price">¥{{finalPrice}}</text>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="price-summary">
				<text class="summary-label">合计：</text>
				<text class="summary-price">¥{{finalPrice}}</text>
			</view>
			<button class="pay-btn" @click="confirmPayment">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookingInfo: {
					storeName: '朝阳VR体验馆',
					address: '北京市朝阳区建国路88号',
					phone: '010-12345678',
					videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
					experienceName: 'VR虚拟现实体验',
					experienceDesc: '沉浸式虚拟现实体验，带你进入全新的数字世界',
					originalPrice: 80
				},
				selectedDate: '2024-12-15',
				timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
				startTimeIndex: 0,
				endTimeIndex: 1,
				selectedStartTime: '09:00',
				selectedEndTime: '10:00',
				peopleCount: 1,
				availableCoupons: [
					{
						id: 1,
						name: '新用户专享券',
						description: '新用户首次体验专享优惠',
						discount: 20,
						validUntil: '2024-12-31'
					},
					{
						id: 2,
						name: '周末特惠券',
						description: '周末使用享受额外优惠',
						discount: 15,
						validUntil: '2024-12-31'
					},
					{
						id: 3,
						name: '满减优惠券',
						description: '满50减10元',
						discount: 10,
						validUntil: '2024-12-31'
					}
				],
				selectedCoupon: null
			}
		},
		computed: {
			originalPrice() {
				return this.bookingInfo.originalPrice * this.peopleCount;
			},
			finalPrice() {
				let price = this.originalPrice;
				if (this.selectedCoupon) {
					price -= this.selectedCoupon.discount;
				}
				return Math.max(0, price);
			},
			availableEndTimes() {
				if (this.startTimeIndex === -1) return this.timeSlots;
				return this.timeSlots.slice(this.startTimeIndex + 1);
			},
			durationHours() {
				if (!this.selectedStartTime || !this.selectedEndTime) return 0;
				
				const startTime = this.timeToMinutes(this.selectedStartTime);
				const endTime = this.timeToMinutes(this.selectedEndTime);
				const duration = endTime - startTime;
				
				return (duration / 60).toFixed(1);
			}
		},
		onLoad(options) {
			// 接收从体验馆页面传递的数据
			if (options.item) {
				try {
					const item = JSON.parse(decodeURIComponent(options.item));
					this.bookingInfo.experienceName = item.name;
					this.bookingInfo.experienceDesc = item.description;
					this.bookingInfo.originalPrice = parseInt(item.price);
				} catch (e) {
					console.error('解析传递数据失败:', e);
				}
			}
		},
		methods: {
			navigateToStore() {
				uni.showToast({
					title: '正在打开导航...',
					icon: 'none'
				});
				// 这里可以调用地图导航API
			},
			callStore() {
				uni.makePhoneCall({
					phoneNumber: this.bookingInfo.phone,
					success: () => {
						console.log('拨打电话成功');
					},
					fail: () => {
						uni.showToast({
							title: '拨打电话失败',
							icon: 'none'
						});
					}
				});
			},
			onDateChange(e) {
				this.selectedDate = e.detail.value;
			},
			onStartTimeChange(e) {
				this.startTimeIndex = e.detail.value;
				this.selectedStartTime = this.timeSlots[this.startTimeIndex];
				
				// 如果结束时间早于开始时间，重置结束时间
				if (this.endTimeIndex <= this.startTimeIndex) {
					this.endTimeIndex = 0;
					this.selectedEndTime = this.availableEndTimes[0];
				}
			},
			onEndTimeChange(e) {
				this.endTimeIndex = e.detail.value;
				this.selectedEndTime = this.availableEndTimes[this.endTimeIndex];
			},
			timeToMinutes(timeStr) {
				const [hours, minutes] = timeStr.split(':').map(Number);
				return hours * 60 + minutes;
			},
			decreasePeople() {
				if (this.peopleCount > 1) {
					this.peopleCount--;
				}
			},
			increasePeople() {
				if (this.peopleCount < 10) {
					this.peopleCount++;
				}
			},
			selectCoupon(coupon) {
				this.selectedCoupon = this.selectedCoupon?.id === coupon.id ? null : coupon;
			},
			confirmPayment() {
				const timeInfo = `${this.selectedDate} ${this.selectedStartTime}-${this.selectedEndTime}`;
				uni.showModal({
					title: '确认支付',
					content: `预约时间：${timeInfo}\n预约人数：${this.peopleCount}人\n确定支付 ¥${this.finalPrice} 吗？`,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '支付中...'
							});
							
							// 模拟支付过程
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({
									title: '支付成功！',
									icon: 'success'
								});
								
								// 跳转到订单页面
								setTimeout(() => {
									uni.navigateBack();
								}, 1500);
							}, 2000);
						}
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
	
	/* 门店信息 */
	.store-info {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.store-header {
		margin-bottom: 20rpx;
	}
	
	.store-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.store-address {
		font-size: 26rpx;
		color: #666;
	}
	
	.store-actions {
		display: flex;
		gap: 20rpx;
	}
	
	.action-btn {
		flex: 1;
		height: 80rpx;
		background-color: #FF69B4;
		color: #fff;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
	
	.action-btn .icon {
		margin-right: 10rpx;
	}
	
	/* 视频区域 */
	.video-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}
	
	.store-video {
		width: 100%;
		height: 400rpx;
		border-radius: 12rpx;
	}
	
	/* 预约信息 */
	.booking-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.booking-item {
		margin-bottom: 30rpx;
	}
	
	.booking-item:last-child {
		margin-bottom: 0;
	}
	
	.item-label {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 15rpx;
		display: block;
	}
	
	.item-content {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.experience-name {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.experience-desc {
		font-size: 26rpx;
		color: #666;
	}
	
	/* 时间选择器 */
	.time-selector {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.date-selector {
		margin-bottom: 20rpx;
	}
	
	.selector-label {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 15rpx;
		display: block;
	}
	
	.picker-btn {
		height: 80rpx;
		background-color: #f0f0f0;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #333;
	}
	
	.time-range-selector {
		display: flex;
		align-items: flex-end;
		gap: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.time-selector-item {
		flex: 1;
	}
	
	.time-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		font-size: 28rpx;
		color: #666;
		font-weight: bold;
	}
	
	.duration-info {
		background-color: #fff0f5;
		padding: 15rpx 20rpx;
		border-radius: 8rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.duration-text {
		font-size: 26rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	

	
	/* 人数选择器 */
	.people-selector {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 30rpx;
	}
	
	.count-btn {
		width: 60rpx;
		height: 60rpx;
		background-color: #FF69B4;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.people-count {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
	
	/* 优惠券 */
	.coupon-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.coupon-list {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.coupon-item {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 2rpx solid #ffe4e8;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.coupon-item.selected {
		border-color: #FF69B4;
		background-color: #fff0f5;
	}
	
	.coupon-info {
		flex: 1;
	}
	
	.coupon-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.coupon-desc {
		font-size: 24rpx;
		color: #666;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.coupon-validity {
		font-size: 22rpx;
		color: #999;
	}
	
	.coupon-value {
		text-align: right;
	}
	
	.discount-amount {
		font-size: 32rpx;
		font-weight: bold;
		color: #FF69B4;
	}
	
	/* 价格信息 */
	.price-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.price-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
		font-size: 28rpx;
		color: #666;
	}
	
	.price-item.total {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #ffe4e8;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
	
	.original-price {
		text-decoration: line-through;
	}
	
	.discount-price {
		color: #FF69B4;
	}
	
	.final-price {
		color: #FF69B4;
		font-size: 36rpx;
	}
	
	/* 底部操作栏 */
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-top: 1rpx solid #ffe4e8;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.price-summary {
		display: flex;
		align-items: center;
	}
	
	.summary-label {
		font-size: 28rpx;
		color: #666;
	}
	
	.summary-price {
		font-size: 36rpx;
		font-weight: bold;
		color: #FF69B4;
	}
	
	.pay-btn {
		background-color: #FF69B4;
		color: #fff;
		padding: 20rpx 60rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
</style> 