<template>
	<view class="content">
		<!-- 门店信息 -->
		<view class="store-info">
			<view class="store-header">
				<view class="store-name">{{storeInfo.name}}</view>
				<view class="store-address">{{storeInfo.address}}</view>
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
		
		<!-- 产品视频 -->
		<view class="video-section">
			<view class="section-title">产品视频</view>
			<video 
				:src="currentProduct.videoUrl" 
				class="product-video"
				controls
				:poster="currentProduct.videoPoster"
			></video>
		</view>
		
		<!-- 产品轮播图 -->
		<view class="swiper-section">
			<swiper 
				class="product-swiper" 
				:indicator-dots="true" 
				:autoplay="true" 
				:interval="3000" 
				:duration="500"
				indicator-color="rgba(255,255,255,0.6)"
				indicator-active-color="#FF69B4"
			>
				<swiper-item v-for="(image, index) in currentProduct.images" :key="index">
					<image :src="image" class="swiper-image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 产品选择 -->
		<view class="product-section">
			<view class="section-title">选择产品</view>
			<view class="product-list">
				<view 
					class="product-item" 
					v-for="product in products" 
					:key="product.id"
					:class="{ selected: selectedProduct === product.id }"
					@click="selectProduct(product)"
				>
					<image :src="product.thumbnail" class="product-thumbnail" mode="aspectFill"></image>
					<view class="product-info">
						<text class="product-name">{{product.name}}</text>
						<text class="product-desc">{{product.description}}</text>
						<text class="product-price">¥{{product.price}}/人</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 选择提示 -->
		<view class="tip-section" v-if="!selectedProduct">
			<view class="tip-content">
				<text class="tip-text">👆 请先选择您想要体验的产品</text>
			</view>
		</view>
		
		<!-- 房间选择 -->
		<view class="room-section" v-if="selectedProduct">
			<view class="section-title">选择房间</view>
			<view class="room-list">
				<view 
					class="room-item" 
					v-for="room in availableRooms" 
					:key="room.id"
					:class="{ 
						selected: selectedRoom === room.id,
						unavailable: room.status === 'unavailable' 
					}"
					@click="selectRoom(room)"
				>
					<view class="room-info">
						<text class="room-name">{{room.name}}</text>
						<text class="room-capacity">容纳人数：{{room.capacity}}人</text>
						<text class="room-features">设施：{{room.features.join('、')}}</text>
					</view>
					<view class="room-status" :class="room.status">
						{{room.statusText}}
					</view>
				</view>
			</view>
			
			<!-- 房间轮播图 -->
			<view class="room-images" v-if="selectedRoom && currentRoom.images.length > 0">
				<view class="section-subtitle">房间详情</view>
				<swiper 
					class="room-swiper" 
					:indicator-dots="true" 
					:autoplay="false"
					indicator-color="rgba(255,255,255,0.6)"
					indicator-active-color="#FF69B4"
				>
					<swiper-item v-for="(image, index) in currentRoom.images" :key="index">
						<image :src="image" class="swiper-image" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<!-- 选择房间提示 -->
		<view class="tip-section" v-if="selectedProduct && !selectedRoom">
			<view class="tip-content">
				<text class="tip-text">👆 请选择房间</text>
			</view>
		</view>
		
		<!-- 时间选择 -->
		<view class="time-section" v-if="selectedRoom">
			<view class="section-title">选择时间</view>
			<view class="time-selector">
				<view class="date-selector">
					<text class="selector-label">选择日期</text>
					<picker mode="date" :value="selectedDate" @change="onDateChange">
						<view class="picker-btn">{{selectedDate}}</view>
					</picker>
				</view>
				
				<!-- 开始时间和结束时间选择 -->
				<view class="time-range-section">
					<view class="time-range-row">
						<view class="time-picker-item">
							<text class="selector-label">开始时间</text>
							<picker :value="startTimeIndex" :range="availableStartTimes" @change="onStartTimeChange">
								<view class="picker-btn" :class="{ placeholder: !selectedStartTime }">
									{{selectedStartTime || '请选择开始时间'}}
								</view>
							</picker>
						</view>
						<view class="time-separator">
							<text>至</text>
						</view>
						<view class="time-picker-item">
							<text class="selector-label">结束时间</text>
							<picker :value="endTimeIndex" :range="availableEndTimes" @change="onEndTimeChange" :disabled="!selectedStartTime">
								<view class="picker-btn" :class="{ placeholder: !selectedEndTime, disabled: !selectedStartTime }">
									{{selectedEndTime || (selectedStartTime ? '请选择结束时间' : '请先选择开始时间')}}
								</view>
							</picker>
						</view>
					</view>
					
					<!-- 时长显示 -->
					<view class="duration-info" v-if="selectedStartTime && selectedEndTime">
						<text class="duration-text">预计时长：{{durationHours}}小时</text>
					</view>
					
					<!-- 24小时时间段可视化 -->
					<view class="time-visual-section">
						<text class="selector-label">时间段状态</text>
						<view class="time-visual-grid">
							<view 
								class="time-visual-item" 
								v-for="(hour, index) in hourlyTimeSlots" 
								:key="index"
								:class="getTimeSlotClass(hour)"
								@click="selectHourlySlot(hour)"
							>
								<text class="hour-text">{{hour.hour}}:00</text>
								<view class="status-dot" :class="hour.status"></view>
							</view>
						</view>
						<view class="time-legend">
							<view class="legend-item">
								<view class="legend-dot available"></view>
								<text class="legend-text">可预约</text>
							</view>
							<view class="legend-item">
								<view class="legend-dot booked"></view>
								<text class="legend-text">已预订</text>
							</view>
							<view class="legend-item">
								<view class="legend-dot cleaning"></view>
								<text class="legend-text">保洁时间</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 选择时间提示 -->
		<view class="tip-section" v-if="selectedRoom && (!selectedStartTime || !selectedEndTime)">
			<view class="tip-content">
				<text class="tip-text">👆 请选择预约时间</text>
			</view>
		</view>
		
		<!-- 套餐选择 -->
		<view class="package-section" v-if="selectedStartTime && selectedEndTime">
			<view class="section-title">选择套餐</view>
			<view class="package-list">
				<view 
					class="package-item" 
					v-for="pkg in availablePackages" 
					:key="pkg.id"
					:class="{ selected: selectedPackage === pkg.id }"
					@click="selectPackage(pkg)"
				>
					<view class="package-info">
						<text class="package-name">{{pkg.name}}</text>
						<text class="package-desc">{{pkg.description}}</text>
						<view class="package-includes">
							<text class="includes-title">套餐包含：</text>
							<text class="includes-content">{{pkg.includes.join('、')}}</text>
						</view>
					</view>
					<view class="package-price">
						<text class="price-text">¥{{pkg.price}}</text>
						<text class="price-unit">/人</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 选择套餐提示 -->
		<view class="tip-section" v-if="selectedStartTime && selectedEndTime && !selectedPackage">
			<view class="tip-content">
				<text class="tip-text">👆 请选择套餐</text>
			</view>
		</view>

		
		<!-- 价格信息 -->
		<view class="price-section" v-if="selectedPackage">
			<view class="price-item">
				<text>产品费用</text>
				<text class="price-value">¥{{productPrice}}</text>
			</view>
			<view class="price-item" v-if="packagePrice > 0">
				<text>套餐费用</text>
				<text class="price-value">¥{{packagePrice}}</text>
			</view>
			<view class="price-item total">
				<text>合计</text>
				<text class="final-price">¥{{totalPrice}}</text>
			</view>
		</view>
		
		<!-- 用户备注 -->
		<view class="remark-section" v-if="selectedPackage">
			<view class="section-title">用户备注</view>
			<view class="remark-input-container">
				<textarea 
					class="remark-input" 
					v-model="userRemark" 
					placeholder="请输入您的备注信息（选填）" 
					maxlength="200"
					:show-confirm-bar="false"
				></textarea>
				<view class="char-count">{{userRemark.length}}/200</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="price-summary">
				<text class="summary-label">合计：</text>
				<text class="summary-price">¥{{totalPrice}}</text>
			</view>
			<button class="pay-btn" @click="confirmBooking" :disabled="!canBook">立即预订</button>
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
					price: 80,
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
						price: 100,
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
						price: 120,
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
						price: 90,
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
						price: 110,
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
						price: 70,
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
						price: 60,
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
						price: 50,
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
						price: 40,
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
						price: 45,
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
				selectedProduct: 1,
				availableRooms: [
					{
						id: 1,
						name: 'VR体验室A',
						capacity: 1,
						features: ['独立空间', 'VR设备', 'Wi-Fi'],
						status: 'available',
						statusText: '可预约',
						images: [
							'/static/image/day/VR体验馆.jpg',
							'/static/image/day/VR体验馆.jpg'
						]
					},
					{
						id: 2,
						name: 'VR体验室B',
						capacity: 2,
						features: ['独立空间', 'VR设备', 'Wi-Fi'],
						status: 'unavailable',
						statusText: '已满',
						images: [
							'/static/image/day/VR体验馆.jpg',
							'/static/image/day/VR体验馆.jpg'
						]
					},
					{
						id: 3,
						name: 'VR体验室C',
						capacity: 1,
						features: ['独立空间', 'VR设备', 'Wi-Fi'],
						status: 'available',
						statusText: '可预约',
						images: [
							'/static/image/day/VR体验馆.jpg',
							'/static/image/day/VR体验馆.jpg'
						]
					}
				],
				selectedRoom: 1,
				currentRoom: {
					images: [
						'/static/image/day/VR体验馆.jpg',
						'/static/image/day/VR体验馆.jpg'
					]
				},
				// 可选择的时间点（00:00到23:00，每小时一个时间点）
				timeSlots: [
					'00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', 
					'08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
					'16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
				],
				// 已被预订的时间段
				bookedTimeSlots: [
					{ start: '10:00', end: '11:00' },
					{ start: '15:00', end: '16:00' },
					{ start: '18:00', end: '19:00' }
				],
				// 不同产品的24小时时间段状态
				productTimeSlots: {
					1: [ // VR体验
						{ startTime: '00:00', endTime: '01:00', status: 'cleaning', hour: '00' },
						{ startTime: '01:00', endTime: '02:00', status: 'cleaning', hour: '01' },
						{ startTime: '02:00', endTime: '03:00', status: 'cleaning', hour: '02' },
						{ startTime: '03:00', endTime: '04:00', status: 'cleaning', hour: '03' },
						{ startTime: '04:00', endTime: '05:00', status: 'cleaning', hour: '04' },
						{ startTime: '05:00', endTime: '06:00', status: 'cleaning', hour: '05' },
						{ startTime: '06:00', endTime: '07:00', status: 'cleaning', hour: '06' },
						{ startTime: '07:00', endTime: '08:00', status: 'cleaning', hour: '07' },
						{ startTime: '08:00', endTime: '09:00', status: 'available', hour: '08' },
						{ startTime: '09:00', endTime: '10:00', status: 'available', hour: '09' },
						{ startTime: '10:00', endTime: '11:00', status: 'booked', hour: '10' },
						{ startTime: '11:00', endTime: '12:00', status: 'available', hour: '11' },
						{ startTime: '12:00', endTime: '13:00', status: 'cleaning', hour: '12' },
						{ startTime: '13:00', endTime: '14:00', status: 'cleaning', hour: '13' },
						{ startTime: '14:00', endTime: '15:00', status: 'available', hour: '14' },
						{ startTime: '15:00', endTime: '16:00', status: 'booked', hour: '15' },
						{ startTime: '16:00', endTime: '17:00', status: 'available', hour: '16' },
						{ startTime: '17:00', endTime: '18:00', status: 'available', hour: '17' },
						{ startTime: '18:00', endTime: '19:00', status: 'booked', hour: '18' },
						{ startTime: '19:00', endTime: '20:00', status: 'available', hour: '19' },
						{ startTime: '20:00', endTime: '21:00', status: 'available', hour: '20' },
						{ startTime: '21:00', endTime: '22:00', status: 'available', hour: '21' },
						{ startTime: '22:00', endTime: '23:00', status: 'cleaning', hour: '22' },
						{ startTime: '23:00', endTime: '24:00', status: 'cleaning', hour: '23' }
					],
					2: [ // AR体验
						{ startTime: '00:00', endTime: '01:00', status: 'cleaning', hour: '00' },
						{ startTime: '01:00', endTime: '02:00', status: 'cleaning', hour: '01' },
						{ startTime: '02:00', endTime: '03:00', status: 'cleaning', hour: '02' },
						{ startTime: '03:00', endTime: '04:00', status: 'cleaning', hour: '03' },
						{ startTime: '04:00', endTime: '05:00', status: 'cleaning', hour: '04' },
						{ startTime: '05:00', endTime: '06:00', status: 'cleaning', hour: '05' },
						{ startTime: '06:00', endTime: '07:00', status: 'cleaning', hour: '06' },
						{ startTime: '07:00', endTime: '08:00', status: 'cleaning', hour: '07' },
						{ startTime: '08:00', endTime: '09:00', status: 'booked', hour: '08' },
						{ startTime: '09:00', endTime: '10:00', status: 'available', hour: '09' },
						{ startTime: '10:00', endTime: '11:00', status: 'available', hour: '10' },
						{ startTime: '11:00', endTime: '12:00', status: 'booked', hour: '11' },
						{ startTime: '12:00', endTime: '13:00', status: 'cleaning', hour: '12' },
						{ startTime: '13:00', endTime: '14:00', status: 'cleaning', hour: '13' },
						{ startTime: '14:00', endTime: '15:00', status: 'booked', hour: '14' },
						{ startTime: '15:00', endTime: '16:00', status: 'available', hour: '15' },
						{ startTime: '16:00', endTime: '17:00', status: 'available', hour: '16' },
						{ startTime: '17:00', endTime: '18:00', status: 'booked', hour: '17' },
						{ startTime: '18:00', endTime: '19:00', status: 'available', hour: '18' },
						{ startTime: '19:00', endTime: '20:00', status: 'available', hour: '19' },
						{ startTime: '20:00', endTime: '21:00', status: 'booked', hour: '20' },
						{ startTime: '21:00', endTime: '22:00', status: 'available', hour: '21' },
						{ startTime: '22:00', endTime: '23:00', status: 'cleaning', hour: '22' },
						{ startTime: '23:00', endTime: '24:00', status: 'cleaning', hour: '23' }
					],
					// 其他产品可以继续添加，暂时使用默认状态
					default: [
						{ startTime: '00:00', endTime: '01:00', status: 'cleaning', hour: '00' },
						{ startTime: '01:00', endTime: '02:00', status: 'cleaning', hour: '01' },
						{ startTime: '02:00', endTime: '03:00', status: 'cleaning', hour: '02' },
						{ startTime: '03:00', endTime: '04:00', status: 'cleaning', hour: '03' },
						{ startTime: '04:00', endTime: '05:00', status: 'cleaning', hour: '04' },
						{ startTime: '05:00', endTime: '06:00', status: 'cleaning', hour: '05' },
						{ startTime: '06:00', endTime: '07:00', status: 'cleaning', hour: '06' },
						{ startTime: '07:00', endTime: '08:00', status: 'cleaning', hour: '07' },
						{ startTime: '08:00', endTime: '09:00', status: 'available', hour: '08' },
						{ startTime: '09:00', endTime: '10:00', status: 'available', hour: '09' },
						{ startTime: '10:00', endTime: '11:00', status: 'available', hour: '10' },
						{ startTime: '11:00', endTime: '12:00', status: 'available', hour: '11' },
						{ startTime: '12:00', endTime: '13:00', status: 'cleaning', hour: '12' },
						{ startTime: '13:00', endTime: '14:00', status: 'cleaning', hour: '13' },
						{ startTime: '14:00', endTime: '15:00', status: 'available', hour: '14' },
						{ startTime: '15:00', endTime: '16:00', status: 'available', hour: '15' },
						{ startTime: '16:00', endTime: '17:00', status: 'available', hour: '16' },
						{ startTime: '17:00', endTime: '18:00', status: 'available', hour: '17' },
						{ startTime: '18:00', endTime: '19:00', status: 'available', hour: '18' },
						{ startTime: '19:00', endTime: '20:00', status: 'available', hour: '19' },
						{ startTime: '20:00', endTime: '21:00', status: 'available', hour: '20' },
						{ startTime: '21:00', endTime: '22:00', status: 'available', hour: '21' },
						{ startTime: '22:00', endTime: '23:00', status: 'cleaning', hour: '22' },
						{ startTime: '23:00', endTime: '24:00', status: 'cleaning', hour: '23' }
					]
				},
				selectedStartTime: null,
				selectedEndTime: null,
				startTimeIndex: -1,
				endTimeIndex: -1,
				availablePackages: [
					{
						id: 1,
						name: '基础套餐',
						description: '包含基础VR体验设备',
						price: 0, // 基础套餐不额外收费
						includes: ['基础VR设备', '标准体验']
					},
					{
						id: 2,
						name: '高级套餐',
						description: '包含高级VR设备和额外服务',
						price: 50,
						includes: ['高级VR设备', '专业指导', '饮品']
					},
					{
						id: 3,
						name: '豪华套餐',
						description: '包含顶级VR设备和全套服务',
						price: 100,
						includes: ['顶级VR设备', '专业指导', '饮品', '零食', '专属服务']
					}
				],
				selectedPackage: 1,
				selectedDate: '2024-12-15',
				userRemark: '' // 用户备注
			}
		},
		computed: {
			productPrice() {
				return this.currentProduct.price;
			},
			packagePrice() {
				const pkg = this.availablePackages.find(p => p.id === this.selectedPackage);
				return pkg ? pkg.price : 0;
			},
			totalPrice() {
				return this.productPrice + this.packagePrice;
			},
			// 可选择的开始时间（排除已被占用的时间点）
			availableStartTimes() {
				return this.timeSlots.filter(time => {
					// 检查这个时间点是否可以作为开始时间
					// 不能选择已被预订时间段的开始时间
					return !this.isTimeUnavailable(time);
				});
			},
			// 可选择的结束时间（基于开始时间）
			availableEndTimes() {
				if (!this.selectedStartTime) return [];
				
				const startIndex = this.timeSlots.findIndex(time => time === this.selectedStartTime);
				if (startIndex === -1) return [];
				
				// 创建包含24:00的结束时间数组
				const endTimes = [...this.timeSlots.slice(startIndex + 1), '24:00'];
				
				// 返回开始时间之后的时间点，但需要检查是否跨越了已预订的时间段
				return endTimes.filter(time => {
					return this.canSelectTimeRange(this.selectedStartTime, time);
				});
			},
			durationHours() {
				if (!this.selectedStartTime || !this.selectedEndTime) return 0;
				
				const startTime = this.timeToMinutes(this.selectedStartTime);
				const endTime = this.timeToMinutes(this.selectedEndTime);
				const duration = endTime - startTime;
				
				return Math.round((duration / 60) * 10) / 10; // 保留一位小数
			},
			canBook() {
				return this.selectedProduct && 
				       this.selectedRoom && 
				       this.selectedStartTime &&
				       this.selectedEndTime &&
				       this.selectedPackage;
			},
			// 根据当前选择的产品返回对应的时间段状态
			hourlyTimeSlots() {
				if (!this.selectedProduct) {
					return this.productTimeSlots.default;
				}
				return this.productTimeSlots[this.selectedProduct] || this.productTimeSlots.default;
			}
		},
		onLoad(options) {
			// 接收从体验馆页面传递的门店数据
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
			
			// 如果有传递具体的体验项目信息
			if (options.item) {
				try {
					const item = JSON.parse(decodeURIComponent(options.item));
					// 根据传递的项目信息设置默认选中的产品
					const matchedProduct = this.products.find(p => p.name.includes(item.name) || item.name.includes(p.name));
					if (matchedProduct) {
						this.selectProduct(matchedProduct);
					}
				} catch (e) {
					console.error('解析项目数据失败:', e);
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
					phoneNumber: this.storeInfo.phone,
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
			selectProduct(product) {
				this.selectedProduct = product.id;
				// 更新当前产品信息，包括视频和轮播图
				this.currentProduct = {
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
					videoUrl: product.videoUrl,
					videoPoster: product.videoPoster,
					images: product.images
				};
				// 选择产品时清空后续所有选择
				this.selectedRoom = null;
				this.selectedStartTime = null;
				this.selectedEndTime = null;
				this.startTimeIndex = -1;
				this.endTimeIndex = -1;
				this.selectedPackage = null;
				
				// 产品改变时，时间段状态也会通过计算属性自动更新
			},
			selectRoom(room) {
				if (room.status === 'available') {
					this.selectedRoom = room.id;
					this.currentRoom = room;
					// 选择房间时清空后续选择
					this.selectedStartTime = null;
					this.selectedEndTime = null;
					this.startTimeIndex = -1;
					this.endTimeIndex = -1;
					this.selectedPackage = null;
				} else {
					uni.showToast({
						title: '该房间暂不可选择',
						icon: 'none'
					});
				}
			},
			onStartTimeChange(e) {
				this.startTimeIndex = e.detail.value;
				this.selectedStartTime = this.availableStartTimes[this.startTimeIndex];
				// 清空结束时间
				this.selectedEndTime = null;
				this.endTimeIndex = -1;
				this.selectedPackage = null;
			},
			onEndTimeChange(e) {
				this.endTimeIndex = e.detail.value;
				this.selectedEndTime = this.availableEndTimes[this.endTimeIndex];
				this.selectedPackage = null;
			},
			selectPackage(pkg) {
				this.selectedPackage = pkg.id;
			},
			onDateChange(e) {
				this.selectedDate = e.detail.value;
				// 日期改变时清空时间选择
				this.selectedStartTime = null;
				this.selectedEndTime = null;
				this.startTimeIndex = -1;
				this.endTimeIndex = -1;
				this.selectedPackage = null;
			},
			// 时间转换为分钟
			timeToMinutes(timeStr) {
				if (timeStr === '24:00') {
					return 24 * 60; // 24:00 = 1440分钟
				}
				const [hours, minutes] = timeStr.split(':').map(Number);
				return hours * 60 + minutes;
			},
			// 分钟转换为时间字符串
			minutesToTime(minutes) {
				if (minutes === 24 * 60) {
					return '24:00';
				}
				const hours = Math.floor(minutes / 60);
				const mins = minutes % 60;
				return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
			},
			// 检查时间点是否不可用（在已预订时间段内）
			isTimeUnavailable(time) {
				return this.bookedTimeSlots.some(slot => {
					const timeMinutes = this.timeToMinutes(time);
					const startMinutes = this.timeToMinutes(slot.start);
					const endMinutes = this.timeToMinutes(slot.end);
					return timeMinutes >= startMinutes && timeMinutes < endMinutes;
				});
			},
			// 检查时间范围是否可选（不跨越已预订时间段）
			canSelectTimeRange(startTime, endTime) {
				const startMinutes = this.timeToMinutes(startTime);
				const endMinutes = this.timeToMinutes(endTime);
				
				return !this.bookedTimeSlots.some(slot => {
					const bookedStart = this.timeToMinutes(slot.start);
					const bookedEnd = this.timeToMinutes(slot.end);
					
					// 检查是否有重叠
					return (startMinutes < bookedEnd && endMinutes > bookedStart);
				});
			},

			// 获取时间段的样式类
			getTimeSlotClass(hour) {
				let classes = [];
				
				// 基础状态样式
				classes.push(hour.status);
				
				// 选中状态
				if (this.selectedStartTime && this.selectedEndTime) {
					const startMinutes = this.timeToMinutes(this.selectedStartTime);
					const endMinutes = this.timeToMinutes(this.selectedEndTime);
					const hourStartMinutes = this.timeToMinutes(hour.startTime);
					
					// 检查这个小时段是否在选中的时间范围内
					// 如果小时段的开始时间 >= 选择的开始时间 && 小时段的开始时间 < 选择的结束时间
					if (hourStartMinutes >= startMinutes && hourStartMinutes < endMinutes) {
						classes.push('selected-range');
					}
				}
				
				return classes.join(' ');
			},
			// 点击小时时间段
			selectHourlySlot(hour) {
				if (hour.status === 'available') {
					// 如果还没选择开始时间，设置为开始时间
					if (!this.selectedStartTime) {
						this.selectedStartTime = hour.startTime;
						this.startTimeIndex = this.availableStartTimes.findIndex(time => time === hour.startTime);
					} else if (!this.selectedEndTime) {
						// 如果已选择开始时间但没选择结束时间
						if (this.timeToMinutes(hour.endTime) > this.timeToMinutes(this.selectedStartTime)) {
							this.selectedEndTime = hour.endTime;
							this.endTimeIndex = this.availableEndTimes.findIndex(time => time === hour.endTime);
						} else {
							// 如果点击的时间早于开始时间，重新设置开始时间
							this.selectedStartTime = hour.startTime;
							this.selectedEndTime = null;
							this.startTimeIndex = this.availableStartTimes.findIndex(time => time === hour.startTime);
							this.endTimeIndex = -1;
						}
					} else {
						// 如果开始和结束时间都已选择，重新开始选择
						this.selectedStartTime = hour.startTime;
						this.selectedEndTime = null;
						this.startTimeIndex = this.availableStartTimes.findIndex(time => time === hour.startTime);
						this.endTimeIndex = -1;
					}
					
					// 清空套餐选择
					this.selectedPackage = null;
				} else {
					// 提示时间段不可选择
					let message = '';
					if (hour.status === 'booked') {
						message = '该时段已被预订';
					} else if (hour.status === 'cleaning') {
						message = '该时段为保洁时间';
					}
					
					uni.showToast({
						title: message,
						icon: 'none'
					});
				}
			},
			confirmBooking() {
				if (!this.canBook) {
					uni.showToast({
						title: '请完成所有选择',
						icon: 'none'
					});
					return;
				}
				
				const packageInfo = this.availablePackages.find(pkg => pkg.id === this.selectedPackage);
				const roomInfo = this.availableRooms.find(room => room.id === this.selectedRoom);
				const timeInfo = `${this.selectedDate} ${this.selectedStartTime}-${this.selectedEndTime}`;
				
				const remarkText = this.userRemark ? `\n备注：${this.userRemark}` : '';
				
				uni.showModal({
					title: '确认预订',
					content: `产品：${this.currentProduct.name}\n房间：${roomInfo.name}\n预约时间：${timeInfo}\n套餐：${packageInfo.name}\n总费用：¥${this.totalPrice}${remarkText}\n\n确定预订吗？`,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '预订中...'
							});
							
							// 模拟预订过程
							setTimeout(() => {
								uni.hideLoading();
								uni.showToast({
									title: '预订成功！',
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
	
	/* 提示区域 */
	.tip-section {
		background-color: #fff0f5;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.tip-content {
		text-align: center;
	}
	
	.tip-text {
		font-size: 26rpx;
		color: #FF69B4;
		font-weight: bold;
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
	
	.product-video {
		width: 100%;
		height: 400rpx;
		border-radius: 12rpx;
	}
	
	/* 产品轮播图 */
	.swiper-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.product-swiper {
		width: 100%;
		height: 300rpx;
		border-radius: 12rpx;
	}
	
	.swiper-image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	/* 产品选择 */
	.product-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.product-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr); /* 五列布局 */
		gap: 15rpx;
	}
	
	.product-item {
		background-color: #fff;
		border-radius: 8rpx;
		border: 2rpx solid #ffe4e8;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease;
	}
	
	.product-item.selected {
		border-color: #FF69B4;
		box-shadow: 0 0 10rpx rgba(255, 105, 180, 0.3);
	}
	
	.product-thumbnail {
		width: 100%;
		height: 120rpx;
		object-fit: cover;
	}
	
	.product-info {
		padding: 8rpx 6rpx;
		text-align: center;
	}
	
	.product-name {
		font-size: 22rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 4rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.product-desc {
		font-size: 20rpx;
		color: #666;
		margin-bottom: 6rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.product-price {
		font-size: 22rpx;
		font-weight: bold;
		color: #FF69B4;
	}
	
	/* 房间选择 */
	.room-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.room-list {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.room-item {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 2rpx solid #ffe4e8;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.room-item.selected {
		border-color: #FF69B4;
		background-color: #fff0f5;
	}
	
	.room-item.unavailable {
		opacity: 0.6;
		background-color: #f5f5f5;
	}
	
	.room-info {
		flex: 1;
	}
	
	.room-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
	}
	
	.room-capacity {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 8rpx;
	}
	
	.room-features {
		font-size: 22rpx;
		color: #999;
	}
	
	.room-status {
		padding: 8rpx 15rpx;
		border-radius: 8rpx;
		font-size: 22rpx;
		font-weight: bold;
	}
	
	.room-status.available {
		background-color: #e0f7fa;
		color: #007bff;
	}
	
	.room-status.unavailable {
		background-color: #ffebee;
		color: #f44336;
	}
	
	.room-images {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.section-subtitle {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 15rpx;
	}
	
	.room-swiper {
		width: 100%;
		height: 200rpx;
		border-radius: 12rpx;
	}
	
	.room-swiper .swiper-image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	
	/* 时间选择 */
	.time-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.time-selector {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.date-selector {
		margin-bottom: 20rpx;
	}
	
	.time-range-section {
		margin-top: 20rpx;
	}
	
	.time-range-row {
		display: flex;
		align-items: flex-end;
		gap: 15rpx;
		margin-bottom: 20rpx;
	}
	
	.time-picker-item {
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
		padding: 0 10rpx;
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
	
	.picker-btn.placeholder {
		color: #999;
		font-style: italic;
	}
	
	.picker-btn.disabled {
		background-color: #f5f5f5;
		color: #ccc;
		cursor: not-allowed;
	}
	
	.duration-info {
		background-color: #fff0f5;
		padding: 15rpx 20rpx;
		border-radius: 8rpx;
		border: 1rpx solid #ffe4e8;
		text-align: center;
	}
	
	.duration-text {
		font-size: 26rpx;
		color: #FF69B4;
		font-weight: bold;
	}
	
	/* 24小时时间段可视化 */
	.time-visual-section {
		margin-top: 30rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.time-visual-grid {
		display: grid;
		grid-template-columns: repeat(8, 1fr); /* 8列，三行显示24小时 */
		gap: 8rpx;
		margin-bottom: 20rpx;
	}
	
	.time-visual-item {
		position: relative;
		height: 60rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	/* 可预约时间 - 绿色 */
	.time-visual-item.available {
		background-color: #4CAF50;
		color: #fff;
	}
	
	.time-visual-item.available:hover {
		background-color: #45a049;
		transform: scale(1.05);
	}
	
	/* 已预订时间 - 红色 */
	.time-visual-item.booked {
		background-color: #F44336;
		color: #fff;
		cursor: not-allowed;
	}
	
	/* 保洁时间 - 黄色 */
	.time-visual-item.cleaning {
		background-color: #FFC107;
		color: #333;
		cursor: not-allowed;
	}
	
	/* 选中范围高亮 */
	.time-visual-item.selected-range {
		box-shadow: 0 0 0 3rpx #FF69B4;
		transform: scale(1.1);
		z-index: 2;
	}
	
	.hour-text {
		font-size: 20rpx;
		font-weight: bold;
		position: relative;
		z-index: 1;
	}
	
	.status-dot {
		position: absolute;
		top: 4rpx;
		right: 4rpx;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
	}
	
	.status-dot.available {
		background-color: #2E7D32;
	}
	
	.status-dot.booked {
		background-color: #C62828;
	}
	
	.status-dot.cleaning {
		background-color: #F57F17;
	}
	
	/* 图例 */
	.time-legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 15rpx 0;
		border-top: 1rpx solid #ffe4e8;
	}
	
	.legend-item {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.legend-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
	}
	
	.legend-dot.available {
		background-color: #4CAF50;
	}
	
	.legend-dot.booked {
		background-color: #F44336;
	}
	
	.legend-dot.cleaning {
		background-color: #FFC107;
	}
	
	.legend-text {
		font-size: 22rpx;
		color: #666;
	}
	
	/* 用户备注 */
	.remark-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.remark-input-container {
		position: relative;
		background-color: #fff;
		border-radius: 12rpx;
		border: 1rpx solid #ffe4e8;
		padding: 20rpx;
	}
	
	.remark-input {
		width: 100%;
		min-height: 120rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
		background-color: transparent;
		border: none;
		outline: none;
		resize: none;
	}
	
	.remark-input::placeholder {
		color: #999;
		font-style: italic;
	}
	
	.char-count {
		position: absolute;
		bottom: 10rpx;
		right: 15rpx;
		font-size: 22rpx;
		color: #999;
	}

	
	/* 套餐选择 */
	.package-section {
		background-color: #fff8fa;
		padding: 30rpx;
		margin: 20rpx;
		border-radius: 16rpx;
		border: 1rpx solid #ffe4e8;
	}
	
	.package-list {
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}
	
	.package-item {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 12rpx;
		border: 2rpx solid #ffe4e8;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.package-item.selected {
		border-color: #FF69B4;
		background-color: #fff0f5;
	}
	
	.package-info {
		flex: 1;
	}
	
	.package-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
	}
	
	.package-desc {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 10rpx;
	}
	
	.package-includes {
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: #999;
	}
	
	.includes-title {
		margin-right: 10rpx;
	}
	
	.package-price {
		text-align: right;
	}
	
	.price-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #FF69B4;
	}
	
	.price-unit {
		font-size: 24rpx;
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
	
	.price-value {
		color: #FF69B4;
		font-size: 36rpx;
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
	
	.pay-btn[disabled] {
		background-color: #ccc;
		color: #666;
		opacity: 0.7;
	}
</style> 