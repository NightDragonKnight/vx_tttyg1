"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      banners: [
        { image: "/static/image/day/轮播图1.jpg" },
        { image: "/static/image/day/轮播图2.jpg" },
        { image: "/static/image/day/轮播图3.jpg" }
      ],
      subFunctions: [
        { text: "棋牌", icon: "🃏", path: "/pages/tabBar/discount/discount" },
        { text: "台球", icon: "🎱", path: "/pages/tabBar/discount/discount" },
        { text: "KTV", icon: "🎤", path: "/pages/tabBar/discount/discount" }
      ],
      products: [
        { name: "VR体验馆", price: "80", image: "/static/image/day/VR体验馆.jpg" },
        { name: "棋牌室", price: "60", image: "/static/image/day/棋牌1.jpg" },
        { name: "台球室", price: "50", image: "/static/image/day/台球1.png" },
        { name: "密室逃脱", price: "120", image: "/static/image/day/密室逃脱.jpg" }
      ]
    };
  },
  methods: {
    navigateToMainFunction() {
      common_vendor.index.navigateTo({
        url: "/pages/tabBar/experience/experience"
      });
    },
    navigateToSubFunction(item) {
      common_vendor.index.showToast({
        title: `进入${item.text}`,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: item.image,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.navigateToMainFunction && $options.navigateToMainFunction(...args)),
    c: common_vendor.f($data.subFunctions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.navigateToSubFunction(item), index)
      };
    }),
    d: common_vendor.f($data.products, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/home/home.js.map
