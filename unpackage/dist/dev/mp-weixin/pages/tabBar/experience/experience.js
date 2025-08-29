"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      experiences: [
        {
          id: 1,
          name: "VR虚拟现实体验",
          description: "沉浸式虚拟现实体验，带你进入全新的数字世界",
          image: "/static/image/day/VR体验馆.jpg",
          location: "朝阳店",
          duration: "30分钟",
          capacity: "1-2",
          price: "80",
          originalPrice: "100",
          tag: "热门"
        },
        {
          id: 2,
          name: "VR赛车体验",
          description: "虚拟赛车游戏，体验速度与激情",
          image: "/static/templateIndex.png",
          location: "西城店",
          duration: "20分钟",
          capacity: "1-2",
          price: "40",
          originalPrice: "60",
          tag: "刺激"
        },
        {
          id: 3,
          name: "VR射击游戏",
          description: "虚拟射击游戏，考验反应和技巧",
          image: "/static/extuiIndex.png",
          location: "海淀店",
          duration: "25分钟",
          capacity: "1-4",
          price: "50",
          originalPrice: "70",
          tag: "推荐"
        },
        {
          id: 4,
          name: "VR飞行体验",
          description: "虚拟飞行体验，感受翱翔蓝天的快感",
          image: "/static/componentIndex.png",
          location: "朝阳店",
          duration: "35分钟",
          capacity: "1-2",
          price: "90",
          originalPrice: "120",
          tag: "新项目"
        }
      ]
    };
  },
  computed: {
    filteredExperiences() {
      if (!this.searchKeyword.trim()) {
        return this.experiences;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return this.experiences.filter(
        (item) => item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword) || item.location.toLowerCase().includes(keyword)
      );
    }
  },
  methods: {
    onSearchInput() {
    },
    search() {
      common_vendor.index.__f__("log", "at pages/tabBar/experience/experience.vue:127", "搜索关键词:", this.searchKeyword);
    },
    viewDetail(item) {
      common_vendor.index.showToast({
        title: `查看${item.name}详情`,
        icon: "none"
      });
    },
    bookExperience(item) {
      common_vendor.index.navigateTo({
        url: `/pages/tabBar/booking-detail/booking-detail?item=${encodeURIComponent(JSON.stringify(item))}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.onSearchInput && $options.onSearchInput(...args)]),
    b: $data.searchKeyword,
    c: common_vendor.o((...args) => $options.search && $options.search(...args)),
    d: common_vendor.f($options.filteredExperiences, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.tag
      }, item.tag ? {
        c: common_vendor.t(item.tag)
      } : {}, {
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.description),
        f: common_vendor.t(item.location),
        g: common_vendor.t(item.duration),
        h: common_vendor.t(item.capacity),
        i: common_vendor.t(item.price),
        j: item.originalPrice
      }, item.originalPrice ? {
        k: common_vendor.t(item.originalPrice)
      } : {}, {
        l: common_vendor.o(($event) => $options.bookExperience(item), index),
        m: index,
        n: common_vendor.o(($event) => $options.viewDetail(item), index)
      });
    }),
    e: $options.filteredExperiences.length === 0
  }, $options.filteredExperiences.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/experience/experience.js.map
