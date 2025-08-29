"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        name: "张三",
        level: "黄金会员",
        avatar: "/static/image/avatar.jpg"
      },
      stats: [
        { number: "12", label: "收藏" },
        { number: "8", label: "优惠券" },
        { number: "1560", label: "积分" },
        { number: "3", label: "待评价" }
      ],
      menuItems: [
        { text: "我的订单", icon: "icon-order", action: "orders" },
        { text: "我的收藏", icon: "icon-favorite", action: "favorites" },
        { text: "优惠券", icon: "icon-coupon", action: "coupons" },
        { text: "积分商城", icon: "icon-points", action: "points" },
        { text: "客服中心", icon: "icon-service", action: "service" },
        { text: "设置", icon: "icon-settings", action: "settings" }
      ],
      quickActions: [
        { text: "意见反馈", icon: "icon-feedback", action: "feedback" },
        { text: "关于我们", icon: "icon-about", action: "about" },
        { text: "帮助中心", icon: "icon-help", action: "help" },
        { text: "分享应用", icon: "icon-share", action: "share" }
      ]
    };
  },
  methods: {
    changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
          common_vendor.index.showToast({
            title: "头像更新成功",
            icon: "success"
          });
        }
      });
    },
    handleMenuClick(item) {
      switch (item.action) {
        case "orders":
          common_vendor.index.navigateTo({ url: "/pages/tabBar/booking/booking" });
          break;
        case "favorites":
          common_vendor.index.showToast({ title: "我的收藏", icon: "none" });
          break;
        case "coupons":
          common_vendor.index.showToast({ title: "优惠券", icon: "none" });
          break;
        case "points":
          common_vendor.index.showToast({ title: "积分商城", icon: "none" });
          break;
        case "service":
          common_vendor.index.showToast({ title: "客服中心", icon: "none" });
          break;
        case "settings":
          common_vendor.index.showToast({ title: "设置", icon: "none" });
          break;
      }
    },
    handleQuickAction(item) {
      switch (item.action) {
        case "feedback":
          common_vendor.index.showToast({ title: "意见反馈", icon: "none" });
          break;
        case "about":
          common_vendor.index.showToast({ title: "关于我们", icon: "none" });
          break;
        case "help":
          common_vendor.index.showToast({ title: "帮助中心", icon: "none" });
          break;
        case "share":
          common_vendor.index.share({
            provider: "weixin",
            scene: "WXSceneSession",
            type: 0,
            href: "https://uniapp.dcloud.io",
            title: "天天体验馆",
            summary: "发现美好生活",
            success: function(res) {
              common_vendor.index.__f__("log", "at pages/tabBar/profile/profile.vue:134", "分享成功");
            },
            fail: function(err) {
              common_vendor.index.__f__("log", "at pages/tabBar/profile/profile.vue:137", "分享失败");
            }
          });
          break;
      }
    },
    logout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.o((...args) => $options.changeAvatar && $options.changeAvatar(...args)),
    c: common_vendor.t($data.userInfo.name),
    d: common_vendor.t($data.userInfo.level),
    e: common_vendor.f($data.stats, (item, index, i0) => {
      return {
        a: common_vendor.t(item.number),
        b: common_vendor.t(item.label),
        c: index
      };
    }),
    f: common_vendor.f($data.menuItems, (item, index, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.handleMenuClick(item), index)
      };
    }),
    g: common_vendor.f($data.quickActions, (item, index, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.handleQuickAction(item), index)
      };
    }),
    h: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/profile/profile.js.map
