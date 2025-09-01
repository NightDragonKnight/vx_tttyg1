"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://api.example.com";
function getBannerList(params = {}) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}/banners`,
      method: "GET",
      data: params,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("获取轮播图失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function getHomeBanners() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}/banners/home`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("获取首页轮播图失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function addBanner(bannerData) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}/banners`,
      method: "POST",
      data: bannerData,
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        if (res.statusCode === 201) {
          resolve(res.data);
        } else {
          reject(new Error("添加轮播图失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function updateBanner(id, bannerData) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}/banners/${id}`,
      method: "PUT",
      data: bannerData,
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("更新轮播图失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function deleteBanner(id) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}/banners/${id}`,
      method: "DELETE",
      header: {
        "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error("删除轮播图失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function uploadBannerImage(filePath) {
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      url: `${BASE_URL}/upload/banner`,
      filePath,
      name: "image",
      header: {
        "Authorization": `Bearer ${common_vendor.index.getStorageSync("token")}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          resolve(data);
        } else {
          reject(new Error("上传图片失败"));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
const BANNER_STRUCTURE = {
  id: 1,
  // 轮播图ID
  title: "轮播图标题",
  // 轮播图标题
  description: "轮播图描述",
  // 轮播图描述
  image: "图片URL",
  // 轮播图图片
  linkType: "activity",
  // 链接类型：activity-活动, product-商品, url-外部链接
  linkData: "link_data",
  // 链接数据
  sort: 1,
  // 排序权重
  status: "active",
  // 状态：active-启用, inactive-禁用
  startTime: "2024-01-01",
  // 开始时间
  endTime: "2024-12-31",
  // 结束时间
  createTime: "2024-01-01",
  // 创建时间
  updateTime: "2024-01-01"
  // 更新时间
};
const LINK_TYPES = {
  ACTIVITY: "activity",
  // 活动页面
  PRODUCT: "product",
  // 商品页面
  URL: "url",
  // 外部链接
  EXPERIENCE: "experience"
  // 体验馆页面
};
const BANNER_STATUS = {
  ACTIVE: "active",
  // 启用
  INACTIVE: "inactive"
  // 禁用
};
const MOCK_BANNERS = [
  {
    id: 1,
    title: "新店开业大酬宾",
    description: "全场8折优惠，新用户首次体验更享特价！",
    image: "/static/image/day/轮播图1.jpg",
    linkType: "activity",
    linkData: "new_store_promotion",
    sort: 1,
    status: "active",
    startTime: "2024-01-01",
    endTime: "2024-12-31"
  },
  {
    id: 2,
    title: "VR体验专区",
    description: "沉浸式虚拟现实体验，带你进入全新世界",
    image: "/static/image/day/轮播图2.jpg",
    linkType: "product",
    linkData: "vr_experience",
    sort: 2,
    status: "active",
    startTime: "2024-01-01",
    endTime: "2024-12-31"
  },
  {
    id: 3,
    title: "密室逃脱挑战",
    description: "惊险刺激的解密游戏，考验你的智慧",
    image: "/static/image/day/轮播图3.jpg",
    linkType: "product",
    linkData: "escape_room",
    sort: 3,
    status: "active",
    startTime: "2024-01-01",
    endTime: "2024-12-31"
  },
  {
    id: 4,
    title: "周末狂欢夜",
    description: "每周末特色体验项目限时开放",
    image: "/static/image/day/VR体验馆.jpg",
    linkType: "activity",
    linkData: "weekend_party",
    sort: 4,
    status: "active",
    startTime: "2024-01-01",
    endTime: "2024-12-31"
  }
];
function getMockBanners() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: MOCK_BANNERS.filter((banner) => banner.status === "active")
      });
    }, 500);
  });
}
exports.BANNER_STATUS = BANNER_STATUS;
exports.BANNER_STRUCTURE = BANNER_STRUCTURE;
exports.LINK_TYPES = LINK_TYPES;
exports.MOCK_BANNERS = MOCK_BANNERS;
exports.addBanner = addBanner;
exports.deleteBanner = deleteBanner;
exports.getBannerList = getBannerList;
exports.getHomeBanners = getHomeBanners;
exports.getMockBanners = getMockBanners;
exports.updateBanner = updateBanner;
exports.uploadBannerImage = uploadBannerImage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/banner.js.map
