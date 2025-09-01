// 轮播图管理API接口
const BASE_URL = 'https://api.example.com'; // 替换为实际的后端API地址

/**
 * 获取轮播图列表
 * @param {Object} params - 查询参数
 * @returns {Promise} 轮播图数据
 */
export function getBannerList(params = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/banners`,
			method: 'GET',
			data: params,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(new Error('获取轮播图失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 获取首页轮播图
 * @returns {Promise} 首页轮播图数据
 */
export function getHomeBanners() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/banners/home`,
			method: 'GET',
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(new Error('获取首页轮播图失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 添加轮播图
 * @param {Object} bannerData - 轮播图数据
 * @returns {Promise} 添加结果
 */
export function addBanner(bannerData) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/banners`,
			method: 'POST',
			data: bannerData,
			header: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: (res) => {
				if (res.statusCode === 201) {
					resolve(res.data);
				} else {
					reject(new Error('添加轮播图失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 更新轮播图
 * @param {Number} id - 轮播图ID
 * @param {Object} bannerData - 轮播图数据
 * @returns {Promise} 更新结果
 */
export function updateBanner(id, bannerData) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/banners/${id}`,
			method: 'PUT',
			data: bannerData,
			header: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(new Error('更新轮播图失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 删除轮播图
 * @param {Number} id - 轮播图ID
 * @returns {Promise} 删除结果
 */
export function deleteBanner(id) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/banners/${id}`,
			method: 'DELETE',
			header: {
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(new Error('删除轮播图失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 上传轮播图图片
 * @param {String} filePath - 图片文件路径
 * @returns {Promise} 上传结果
 */
export function uploadBannerImage(filePath) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${BASE_URL}/upload/banner`,
			filePath: filePath,
			name: 'image',
			header: {
				'Authorization': `Bearer ${uni.getStorageSync('token')}`
			},
			success: (res) => {
				if (res.statusCode === 200) {
					const data = JSON.parse(res.data);
					resolve(data);
				} else {
					reject(new Error('上传图片失败'));
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 轮播图数据结构示例
 */
export const BANNER_STRUCTURE = {
	id: 1,                    // 轮播图ID
	title: '轮播图标题',       // 轮播图标题
	description: '轮播图描述', // 轮播图描述
	image: '图片URL',         // 轮播图图片
	linkType: 'activity',     // 链接类型：activity-活动, product-商品, url-外部链接
	linkData: 'link_data',    // 链接数据
	sort: 1,                  // 排序权重
	status: 'active',         // 状态：active-启用, inactive-禁用
	startTime: '2024-01-01',  // 开始时间
	endTime: '2024-12-31',    // 结束时间
	createTime: '2024-01-01', // 创建时间
	updateTime: '2024-01-01'  // 更新时间
};

/**
 * 轮播图链接类型枚举
 */
export const LINK_TYPES = {
	ACTIVITY: 'activity',     // 活动页面
	PRODUCT: 'product',       // 商品页面
	URL: 'url',              // 外部链接
	EXPERIENCE: 'experience' // 体验馆页面
};

/**
 * 轮播图状态枚举
 */
export const BANNER_STATUS = {
	ACTIVE: 'active',         // 启用
	INACTIVE: 'inactive'      // 禁用
};

// 模拟数据（开发环境使用）
export const MOCK_BANNERS = [
	{
		id: 1,
		title: '新店开业大酬宾',
		description: '全场8折优惠，新用户首次体验更享特价！',
		image: '/static/image/day/轮播图1.jpg',
		linkType: 'activity',
		linkData: 'new_store_promotion',
		sort: 1,
		status: 'active',
		startTime: '2024-01-01',
		endTime: '2024-12-31'
	},
	{
		id: 2,
		title: 'VR体验专区',
		description: '沉浸式虚拟现实体验，带你进入全新世界',
		image: '/static/image/day/轮播图2.jpg',
		linkType: 'product',
		linkData: 'vr_experience',
		sort: 2,
		status: 'active',
		startTime: '2024-01-01',
		endTime: '2024-12-31'
	},
	{
		id: 3,
		title: '密室逃脱挑战',
		description: '惊险刺激的解密游戏，考验你的智慧',
		image: '/static/image/day/轮播图3.jpg',
		linkType: 'product',
		linkData: 'escape_room',
		sort: 3,
		status: 'active',
		startTime: '2024-01-01',
		endTime: '2024-12-31'
	},
	{
		id: 4,
		title: '周末狂欢夜',
		description: '每周末特色体验项目限时开放',
		image: '/static/image/day/VR体验馆.jpg',
		linkType: 'activity',
		linkData: 'weekend_party',
		sort: 4,
		status: 'active',
		startTime: '2024-01-01',
		endTime: '2024-12-31'
	}
];

/**
 * 获取模拟轮播图数据（开发环境使用）
 * @returns {Promise} 模拟轮播图数据
 */
export function getMockBanners() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				data: MOCK_BANNERS.filter(banner => banner.status === 'active')
			});
		}, 500);
	});
} 