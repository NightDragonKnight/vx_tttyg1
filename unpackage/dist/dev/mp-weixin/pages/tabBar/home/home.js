"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      showAnnouncement: false,
      // 控制公告显示
      currentBannerIndex: 0,
      // 当前轮播图索引
      announcementContent: `欢迎来到天天体验馆！

📢 重要公告：
------------------------
   本处后台维护即可
   样例如下：
------------------------

• 营业时间：每日 09:00-22:00
• 请提前预约，避免排队等候
• 体验过程中请遵守安全规定
• 如有疑问请联系客服：400-123-4567


🎯 最新活动：
• 周末体验享9折优惠
• 生日当月免费体验一次
• 连续签到7天送神秘礼品

祝您体验愉快！`,
      // 轮播图数据 - 后台可维护
      banners: [
        {
          id: 1,
          image: "/static/image/day/轮播图1.jpg",
          title: "新店开业大酬宾",
          description: "全场8折优惠，新用户首次体验更享特价！",
          linkType: "activity",
          // 链接类型：activity-活动, product-商品, url-外部链接
          linkData: "new_store_promotion"
          // 链接数据
        },
        {
          id: 2,
          image: "/static/image/day/轮播图2.jpg",
          title: "VR体验专区",
          description: "沉浸式虚拟现实体验，带你进入全新世界",
          linkType: "product",
          linkData: "vr_experience"
        },
        {
          id: 3,
          image: "/static/image/day/轮播图3.jpg",
          title: "密室逃脱挑战",
          description: "惊险刺激的解密游戏，考验你的智慧",
          linkType: "product",
          linkData: "escape_room"
        },
        {
          id: 4,
          image: "/static/image/day/VR体验馆.jpg",
          title: "周末狂欢夜",
          description: "每周末特色体验项目限时开放",
          linkType: "activity",
          linkData: "weekend_party"
        }
      ],
      products: [
        { name: "VR体验馆", price: "80", image: "/static/image/day/VR体验馆.jpg" },
        { name: "棋牌室", price: "60", image: "/static/image/day/棋牌1.jpg" },
        { name: "台球室", price: "50", image: "/static/image/day/台球1.png" },
        { name: "密室逃脱", price: "120", image: "/static/image/day/密室逃脱.jpg" }
      ]
    };
  },
  onLoad() {
    this.checkAndShowAnnouncement();
    this.loadBanners();
  },
  methods: {
    // 加载轮播图数据（从后台获取）
    loadBanners() {
      "../../../api/banner.js".then((module) => {
        const { getHomeBanners, getMockBanners } = module;
        {
          getMockBanners().then((res) => {
            if (res.success) {
              this.banners = res.data;
            }
          }).catch((err) => {
            common_vendor.index.__f__("error", "at pages/tabBar/home/home.vue:200", "加载模拟轮播图失败:", err);
          });
        }
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/tabBar/home/home.vue:215", "导入API模块失败:", err);
      });
    },
    // 轮播图点击事件
    onBannerClick(banner) {
      common_vendor.index.__f__("log", "at pages/tabBar/home/home.vue:222", "点击轮播图:", banner);
      switch (banner.linkType) {
        case "activity":
          this.navigateToActivity(banner.linkData);
          break;
        case "product":
          this.navigateToProduct(banner.linkData);
          break;
        case "url":
          this.openExternalUrl(banner.linkData);
          break;
        default:
          this.navigateToMainFunction();
          break;
      }
    },
    // 跳转到活动页面
    navigateToActivity(activityId) {
      common_vendor.index.navigateTo({
        url: `/pages/tabBar/discount/discount?activity=${activityId}`
      });
    },
    // 跳转到商品详情
    navigateToProduct(productId) {
      common_vendor.index.navigateTo({
        url: `/pages/tabBar/booking-detail/booking-detail?product=${productId}`
      });
    },
    // 打开外部链接
    openExternalUrl(url) {
      common_vendor.index.showToast({
        title: "请在浏览器中打开",
        icon: "none"
      });
    },
    checkAndShowAnnouncement() {
      const app = getApp();
      if (!app.globalData.hasShownAnnouncement) {
        app.globalData.hasShownAnnouncement = true;
        setTimeout(() => {
          this.showAnnouncement = true;
        }, 800);
      }
    },
    closeAnnouncement() {
      this.showAnnouncement = false;
    },
    navigateToMainFunction() {
      common_vendor.index.navigateTo({
        url: "/pages/tabBar/experience/experience"
      });
    },
    // 跳转到商品出售页面
    navigateToShop(category) {
      common_vendor.index.navigateTo({
        url: `/pages/shop/shop?category=${category}`
      });
    },
    // 查看商品详情
    viewProduct(product) {
      common_vendor.index.navigateTo({
        url: `/pages/shop/product-detail?product=${encodeURIComponent(JSON.stringify(product))}`
      });
    },
    // 测试方法：重新显示公告（开发调试用）
    showTestAnnouncement() {
      this.showAnnouncement = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showAnnouncement
  }, $data.showAnnouncement ? {
    b: common_vendor.t($data.announcementContent),
    c: common_vendor.o((...args) => $options.closeAnnouncement && $options.closeAnnouncement(...args)),
    d: common_vendor.o(() => {
    })
  } : {}, {
    e: common_vendor.f($data.banners, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.title || item.description
      }, item.title || item.description ? common_vendor.e({
        c: item.title
      }, item.title ? {
        d: common_vendor.t(item.title)
      } : {}, {
        e: item.description
      }, item.description ? {
        f: common_vendor.t(item.description)
      } : {}) : {}, {
        g: index,
        h: common_vendor.o(($event) => $options.onBannerClick(item), index)
      });
    }),
    f: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: index,
        b: $data.currentBannerIndex === index ? 1 : ""
      };
    }),
    g: common_vendor.o(($event) => $options.navigateToShop("clothing")),
    h: common_vendor.o(($event) => $options.navigateToShop("electronics")),
    i: common_vendor.o(($event) => $options.navigateToShop("beauty")),
    j: common_vendor.o(($event) => $options.navigateToShop("home")),
    k: common_vendor.o(($event) => $options.navigateToShop("food")),
    l: common_vendor.o(($event) => $options.navigateToShop("sports")),
    m: common_vendor.o(($event) => $options.navigateToShop("books")),
    n: common_vendor.o(($event) => $options.navigateToShop("all")),
    o: common_assets._imports_0,
    p: common_vendor.o((...args) => $options.navigateToMainFunction && $options.navigateToMainFunction(...args)),
    q: common_vendor.o((...args) => $options.showTestAnnouncement && $options.showTestAnnouncement(...args)),
    r: common_vendor.f($data.products, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: index,
        e: common_vendor.o(($event) => $options.viewProduct(item), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/home/home.js.map
