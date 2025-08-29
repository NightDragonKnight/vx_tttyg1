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
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:23", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:48", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:51", "App Hide");
  },
  globalData: {
    test: ""
  },
  methods: {
    ...common_vendor.mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"])
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
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
