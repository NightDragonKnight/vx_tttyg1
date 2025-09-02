<template>
	<view class="content">
		<!-- 页面标题 -->
		<view class="header">
			<text class="title">选择区域</text>
		</view>
		
		<!-- 使用 uni-indexed-list 展示城市（左侧城市，右侧A-Z索引） -->
		<view class="city-wrapper">
			<uni-indexed-list :options="indexedOptions" :showSelect="false" @click="onIndexedClick" />
		</view>
		
		<!-- 区域选择弹窗 -->
		<view v-if="showDistrictPopup" class="district-popup-overlay" @click="closeDistrictPopup">
			<view class="district-popup" @click.stop>
				<view class="popup-header">
					<text class="popup-title">{{selectedCity?.name || ''}} - 选择区域</text>
					<text class="popup-close" @click="closeDistrictPopup">✕</text>
				</view>
				<view class="popup-content">
					<view class="district-list">
						<view 
							class="district-item" 
							v-for="district in selectedCity?.districts || []" 
							:key="district.id"
							@click="selectDistrict(district)"
						>
							<text class="district-name">{{district.name}}</text>
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
				selectedCity: null,
				showDistrictPopup: false,
				cities: [
					{ id: 1, name: '北京市', letter: 'B', districts: [
						{ id: 101, name: '朝阳区' }, { id: 102, name: '海淀区' }, { id: 103, name: '西城区' },
						{ id: 104, name: '东城区' }, { id: 105, name: '丰台区' }, { id: 106, name: '石景山区' },
						{ id: 107, name: '通州区' }, { id: 108, name: '昌平区' }, { id: 109, name: '大兴区' },
						{ id: 110, name: '房山区' }, { id: 111, name: '门头沟区' }, { id: 112, name: '怀柔区' },
						{ id: 113, name: '平谷区' }, { id: 114, name: '密云区' }, { id: 115, name: '延庆区' }
					] },
					{ id: 2, name: '上海市', letter: 'S', districts: [
						{ id: 201, name: '浦东新区' }, { id: 202, name: '黄浦区' }, { id: 203, name: '徐汇区' },
						{ id: 204, name: '长宁区' }, { id: 205, name: '静安区' }, { id: 206, name: '普陀区' },
						{ id: 207, name: '虹口区' }, { id: 208, name: '杨浦区' }, { id: 209, name: '闵行区' },
						{ id: 210, name: '宝山区' }, { id: 211, name: '嘉定区' }, { id: 212, name: '金山区' },
						{ id: 213, name: '松江区' }, { id: 214, name: '青浦区' }, { id: 215, name: '奉贤区' },
						{ id: 216, name: '崇明区' }
					] },
					{ id: 3, name: '广州市', letter: 'G', districts: [
						{ id: 301, name: '天河区' }, { id: 302, name: '越秀区' }, { id: 303, name: '海珠区' },
						{ id: 304, name: '荔湾区' }, { id: 305, name: '白云区' }, { id: 306, name: '黄埔区' },
						{ id: 307, name: '番禺区' }, { id: 308, name: '花都区' }, { id: 309, name: '南沙区' },
						{ id: 310, name: '从化区' }, { id: 311, name: '增城区' }
					] },
					{ id: 4, name: '深圳市', letter: 'S', districts: [
						{ id: 401, name: '南山区' }, { id: 402, name: '福田区' }, { id: 403, name: '罗湖区' },
						{ id: 404, name: '宝安区' }, { id: 405, name: '龙岗区' }, { id: 406, name: '盐田区' },
						{ id: 407, name: '龙华区' }, { id: 408, name: '坪山区' }, { id: 409, name: '光明区' }
					] },
					{ id: 5, name: '杭州市', letter: 'H', districts: [
						{ id: 501, name: '西湖区' }, { id: 502, name: '上城区' }, { id: 503, name: '下城区' },
						{ id: 504, name: '江干区' }, { id: 505, name: '拱墅区' }, { id: 506, name: '滨江区' },
						{ id: 507, name: '萧山区' }, { id: 508, name: '余杭区' }, { id: 509, name: '富阳区' }, { id: 510, name: '临安区' }
					] },
					{ id: 6, name: '南京市', letter: 'N', districts: [
						{ id: 601, name: '玄武区' }, { id: 602, name: '秦淮区' }, { id: 603, name: '建邺区' }, { id: 604, name: '鼓楼区' },
						{ id: 605, name: '浦口区' }, { id: 606, name: '栖霞区' }, { id: 607, name: '雨花台区' }, { id: 608, name: '江宁区' },
						{ id: 609, name: '六合区' }, { id: 610, name: '溧水区' }, { id: 611, name: '高淳区' }
					] },
					{ id: 7, name: '成都市', letter: 'C', districts: [
						{ id: 701, name: '锦江区' }, { id: 702, name: '青羊区' }, { id: 703, name: '金牛区' }, { id: 704, name: '武侯区' },
						{ id: 705, name: '成华区' }, { id: 706, name: '龙泉驿区' }, { id: 707, name: '青白江区' }, { id: 708, name: '新都区' },
						{ id: 709, name: '温江区' }, { id: 710, name: '双流区' }, { id: 711, name: '郫都区' }
					] },
					{ id: 8, name: '武汉市', letter: 'W', districts: [
						{ id: 801, name: '江岸区' }, { id: 802, name: '江汉区' }, { id: 803, name: '硚口区' }, { id: 804, name: '汉阳区' },
						{ id: 805, name: '武昌区' }, { id: 806, name: '青山区' }, { id: 807, name: '洪山区' }, { id: 808, name: '东西湖区' },
						{ id: 809, name: '汉南区' }, { id: 810, name: '蔡甸区' }, { id: 811, name: '江夏区' }, { id: 812, name: '黄陂区' }, { id: 813, name: '新洲区' }
					] },
					{ id: 9, name: '西安市', letter: 'X', districts: [
						{ id: 901, name: '新城区' }, { id: 902, name: '碑林区' }, { id: 903, name: '莲湖区' }, { id: 904, name: '灞桥区' },
						{ id: 905, name: '未央区' }, { id: 906, name: '雁塔区' }, { id: 907, name: '阎良区' }, { id: 908, name: '临潼区' },
						{ id: 909, name: '长安区' }, { id: 910, name: '高陵区' }, { id: 911, name: '鄠邑区' }
					] },
					{ id: 10, name: '重庆市', letter: 'C', districts: [
						{ id: 1001, name: '渝中区' }, { id: 1002, name: '大渡口区' }, { id: 1003, name: '江北区' }, { id: 1004, name: '沙坪坝区' },
						{ id: 1005, name: '九龙坡区' }, { id: 1006, name: '南岸区' }, { id: 1007, name: '北碚区' }, { id: 1008, name: '渝北区' },
						{ id: 1009, name: '巴南区' }, { id: 1010, name: '綦江区' }, { id: 1011, name: '大足区' }, { id: 1012, name: '璧山区' }, { id: 1013, name: '铜梁区' }
					] }
				]
			}
		},
		computed: {
			// 生成 uni-indexed-list 所需 options 结构
			indexedOptions() {
				const grouped = {}
				this.cities.forEach(c => {
					if (!grouped[c.letter]) grouped[c.letter] = []
					grouped[c.letter].push(c.name)
				})
				return Object.keys(grouped).sort().map(letter => ({
					letter,
					data: grouped[letter]
				}))
			}
		},
		onLoad() {
			console.log('区域选择页面加载成功')
		},
		methods: {
			onIndexedClick(e) {
				// e.item.name 为城市名
				const name = e?.item?.name || ''
				const city = this.cities.find(c => c.name === name)
				if (city) {
					this.selectedCity = city
					this.showDistrictPopup = true
				} else {
					uni.showToast({ title: '未找到城市', icon: 'none' })
				}
			},
			selectDistrict(district) {
				try {
					if (!this.selectedCity || !district) {
						uni.showToast({ title: '数据异常', icon: 'none' });
						return;
					}
					const result = {
						city: this.selectedCity.name,
						district: district.name,
						cityId: this.selectedCity.id,
						districtId: district.id
					};
					this.closeDistrictPopup();
					uni.navigateBack({
						success: () => { if (uni.$emit) uni.$emit('areaSelected', result); },
						fail: () => { uni.switchTab({ url: '/pages/tabBar/experience/experience' }); }
					});
				} catch (error) {
					console.error('选择区域失败:', error);
					uni.showToast({ title: '选择区域失败', icon: 'none' });
				}
			},
			closeDistrictPopup() {
				this.showDistrictPopup = false
				this.selectedCity = null
			}
		}
	}
</script>

<style>
	.content { background-color: #fef5f7; min-height: 100vh; }
	.header { background-color: #fff8fa; padding: 30rpx; border-bottom: 1rpx solid #ffe4e8; }
	.header .title { font-size: 36rpx; font-weight: bold; color: #333; }
	.city-wrapper { height: calc(100vh - 120rpx); }
	
	/* 复用弹窗样式，已去除嵌套写法，兼容WXSS */
	.district-popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 999; display: flex; align-items: flex-end; justify-content: center; }
	.district-popup { background-color: #fff; border-radius: 20rpx 20rpx 0 0; overflow: hidden; width: 100%; max-height: 80vh; }
	.popup-header { padding: 30rpx; text-align: center; border-bottom: 1rpx solid #f0f0f0; position: relative; }
	.popup-title { font-size: 32rpx; font-weight: bold; color: #333; }
	.popup-close { position: absolute; right: 30rpx; top: 30rpx; font-size: 32rpx; color: #999; width: 40rpx; height: 40rpx; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
	.popup-content { max-height: 60vh; overflow-y: auto; }
	.district-list { padding: 20rpx; }
	.district-item { padding: 25rpx 30rpx; border-bottom: 1rpx solid #f0f0f0; }
	.district-item:last-child { border-bottom: none; }
	.district-name { font-size: 28rpx; color: #333; }
</style> 