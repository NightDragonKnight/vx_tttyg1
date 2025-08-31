"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/tabBar/home/home.js";
  "./pages/tabBar/discount/discount.js";
  "./pages/tabBar/booking/booking.js";
  "./pages/tabBar/profile/profile.js";
  "./pages/tabBar/experience/experience.js";
  "./pages/tabBar/booking-detail/booking-detail.js";
  "./pages/order-detail/order-detail.js";
}
const pages = [
  "pages/tabBar/home/home",
  "pages/tabBar/discount/discount",
  "pages/tabBar/booking/booking",
  "pages/tabBar/profile/profile",
  "pages/tabBar/experience/experience",
  "pages/tabBar/booking-detail/booking-detail"
];
const window = {
  backgroundTextStyle: "light",
  navigationBarBackgroundColor: "#FF69B4",
  navigationBarTitleText: "天天体验馆",
  navigationBarTextStyle: "white",
  backgroundColor: "#fef5f7"
};
const tabBar = {
  color: "#7A7E83",
  selectedColor: "#FF69B4",
  borderStyle: "black",
  backgroundColor: "#ffffff",
  list: [
    {
      pagePath: "pages/tabBar/home/home",
      iconPath: "static/home.png",
      selectedIconPath: "static/home-active.png",
      text: "首页"
    },
    {
      pagePath: "pages/tabBar/discount/discount",
      iconPath: "static/star.png",
      selectedIconPath: "static/star-active.png",
      text: "优惠中心"
    },
    {
      pagePath: "pages/tabBar/booking/booking",
      iconPath: "static/component.png",
      selectedIconPath: "static/componentHL.png",
      text: "我的预订"
    },
    {
      pagePath: "pages/tabBar/profile/profile",
      iconPath: "static/uni.png",
      selectedIconPath: "static/uni.png",
      text: "个人中心"
    }
  ]
};
const networkTimeout = {
  request: 1e4,
  downloadFile: 1e4
};
const debug = true;
const permission = {
  "scope.userLocation": {
    desc: "你的位置信息将用于小程序位置接口的效果展示"
  }
};
const requiredBackgroundModes = [
  "audio"
];
const plugins = {};
const preloadRule = {};
const resizable = false;
const usingComponents = {};
const sitemapLocation = "sitemap.json";
const App = {
  pages,
  window,
  tabBar,
  networkTimeout,
  debug,
  permission,
  requiredBackgroundModes,
  plugins,
  preloadRule,
  resizable,
  usingComponents,
  sitemapLocation
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.use(common_vendor.createPinia());
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app,
    Vuex: common_vendor.index$1,
    // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
