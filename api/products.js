// 产品相关API接口
// 保留接口以便后续对接真实数据

/**
 * 获取热门推荐数据
 * 后台传递：图片、名称、链接
 * @returns {Promise} 返回热门推荐数据
 */
export function getHotProducts() {
	// TODO: 对接真实API
	return new Promise((resolve, reject) => {
		// 模拟API调用延迟
		setTimeout(() => {
			// 这里应该调用真实的API接口
			// const response = await fetch('/api/products/hot');
			// const data = await response.json();
			
			// 暂时返回模拟数据
			resolve({
				success: true,
				data: [
					{ 
						id: 1,
						name: 'VR虚拟现实体验', 
						image: '/static/image/day/VR体验馆.jpg',
						link: '/pages/tabBar/booking-detail/booking-detail'
					},
					{ 
						id: 2,
						name: '密室逃脱挑战', 
						image: '/static/image/day/密室逃脱.jpg',
						link: '/pages/tabBar/booking-detail/booking-detail'
					},
					{ 
						id: 3,
						name: 'VR头显设备', 
						image: '/static/image/day/vr-headset.jpg',
						link: '/pages/shop/product-detail'
					},
					{ 
						id: 4,
						name: '台球杆套装', 
						image: '/static/image/day/台球1.png',
						link: '/pages/shop/product-detail'
					}
				]
			});
		}, 300);
	});
} 