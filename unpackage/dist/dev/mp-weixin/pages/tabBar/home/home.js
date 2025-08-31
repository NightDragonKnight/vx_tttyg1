"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showAnnouncement: false,
      // 控制公告显示
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
      banners: [
        { image: "/static/image/day/轮播图1.jpg" },
        { image: "/static/image/day/轮播图2.jpg" },
        { image: "/static/image/day/轮播图3.jpg" }
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
  },
  methods: {
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
    navigateToHotRecommend() {
      common_vendor.index.showToast({
        title: "进入爆款推荐",
        icon: "none"
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
      return {
        a: item.image,
        b: index
      };
    }),
    f: common_vendor.o((...args) => $options.navigateToMainFunction && $options.navigateToMainFunction(...args)),
    g: common_vendor.o((...args) => $options.navigateToHotRecommend && $options.navigateToHotRecommend(...args)),
    h: common_vendor.o((...args) => $options.showTestAnnouncement && $options.showTestAnnouncement(...args)),
    i: common_vendor.f($data.products, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/home/home.js.map
