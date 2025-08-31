"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      selectedProvinceIndex: 0,
      selectedCityIndex: 0,
      selectedDistrictIndex: 0,
      provinces: [
        {
          name: "全国",
          cities: [{ name: "全部城市", districts: [{ name: "全部区域" }] }]
        },
        {
          name: "北京市",
          cities: [
            {
              name: "全部区域",
              districts: [{ name: "全部区县" }]
            },
            {
              name: "朝阳区",
              districts: [
                { name: "全部区域" },
                { name: "国贸" },
                { name: "三里屯" },
                { name: "望京" },
                { name: "酒仙桥" }
              ]
            },
            {
              name: "海淀区",
              districts: [
                { name: "全部区域" },
                { name: "中关村" },
                { name: "五道口" },
                { name: "西二旗" },
                { name: "公主坟" }
              ]
            },
            {
              name: "西城区",
              districts: [
                { name: "全部区域" },
                { name: "西单" },
                { name: "金融街" },
                { name: "新街口" }
              ]
            }
          ]
        },
        {
          name: "上海市",
          cities: [
            {
              name: "全部区域",
              districts: [{ name: "全部区县" }]
            },
            {
              name: "浦东新区",
              districts: [
                { name: "全部区域" },
                { name: "陆家嘴" },
                { name: "张江" },
                { name: "世纪公园" },
                { name: "川沙" }
              ]
            },
            {
              name: "黄浦区",
              districts: [
                { name: "全部区域" },
                { name: "外滩" },
                { name: "南京路" },
                { name: "人民广场" }
              ]
            },
            {
              name: "徐汇区",
              districts: [
                { name: "全部区域" },
                { name: "徐家汇" },
                { name: "田子坊" },
                { name: "衡山路" }
              ]
            }
          ]
        },
        {
          name: "广东省",
          cities: [
            {
              name: "全部城市",
              districts: [{ name: "全部区域" }]
            },
            {
              name: "广州市",
              districts: [
                { name: "全部区域" },
                { name: "天河区" },
                { name: "越秀区" },
                { name: "海珠区" },
                { name: "荔湾区" }
              ]
            },
            {
              name: "深圳市",
              districts: [
                { name: "全部区域" },
                { name: "南山区" },
                { name: "福田区" },
                { name: "罗湖区" },
                { name: "宝安区" }
              ]
            }
          ]
        }
      ],
      stores: [
        {
          id: 1,
          name: "天天体验馆（国贸店）",
          address: "北京市朝阳区国贸CBD核心区建国门外大街1号",
          province: "北京市",
          city: "朝阳区",
          district: "国贸",
          image: "/static/image/day/VR体验馆.jpg",
          businessHours: "09:00-22:00",
          phone: "010-85991234",
          status: "open",
          statusText: "营业中",
          services: ["VR体验", "密室逃脱", "电玩城", "按摩椅"],
          priceRange: { min: 50, max: 200 },
          facilities: ["免费WiFi", "空调", "停车场", "休息区"]
        },
        {
          id: 2,
          name: "天天体验馆（中关村店）",
          address: "北京市海淀区中关村大街27号中关村科技园区",
          province: "北京市",
          city: "海淀区",
          district: "中关村",
          image: "/static/templateIndex.png",
          businessHours: "10:00-23:00",
          phone: "010-62751234",
          status: "open",
          statusText: "营业中",
          services: ["VR体验", "赛车模拟", "射击游戏", "棋牌室"],
          priceRange: { min: 40, max: 150 },
          facilities: ["免费WiFi", "空调", "地铁直达", "24小时营业"]
        },
        {
          id: 3,
          name: "天天体验馆（陆家嘴店）",
          address: "上海市浦东新区陆家嘴金融贸易区世纪大道100号",
          province: "上海市",
          city: "浦东新区",
          district: "陆家嘴",
          image: "/static/extuiIndex.png",
          businessHours: "09:00-22:00",
          phone: "021-68881234",
          status: "open",
          statusText: "营业中",
          services: ["VR体验", "飞行模拟", "太空漫步", "深海探险"],
          priceRange: { min: 60, max: 250 },
          facilities: ["免费WiFi", "空调", "停车场", "咖啡厅"]
        },
        {
          id: 4,
          name: "天天体验馆（外滩店）",
          address: "上海市黄浦区外滩中山东一路18号外滩18号",
          province: "上海市",
          city: "黄浦区",
          district: "外滩",
          image: "/static/componentIndex.png",
          businessHours: "09:30-21:30",
          phone: "021-63211234",
          status: "renovation",
          statusText: "装修中",
          services: ["VR体验", "密室逃脱", "剧本杀", "KTV"],
          priceRange: { min: 80, max: 300 },
          facilities: ["免费WiFi", "空调", "江景", "高端设备"]
        },
        {
          id: 5,
          name: "天天体验馆（天河店）",
          address: "广东省广州市天河区天河北路233号中信广场",
          province: "广东省",
          city: "广州市",
          district: "天河区",
          image: "/static/templateIndex.png",
          businessHours: "10:00-22:30",
          phone: "020-38881234",
          status: "busy",
          statusText: "火爆",
          services: ["VR体验", "太空漫步", "电玩城", "台球"],
          priceRange: { min: 45, max: 180 },
          facilities: ["免费WiFi", "空调", "停车场", "美食城"]
        },
        {
          id: 6,
          name: "天天体验馆（南山店）",
          address: "广东省深圳市南山区深南大道9689号恒兴广场",
          province: "广东省",
          city: "深圳市",
          district: "南山区",
          image: "/static/extuiIndex.png",
          businessHours: "09:00-23:00",
          phone: "0755-86881234",
          status: "closed",
          statusText: "休息中",
          services: ["VR体验", "深海探险", "赛车模拟", "密室逃脱"],
          priceRange: { min: 55, max: 220 },
          facilities: ["免费WiFi", "空调", "地铁直达", "儿童区"]
        }
      ]
    };
  },
  computed: {
    selectedProvince() {
      return this.provinces[this.selectedProvinceIndex] || this.provinces[0];
    },
    currentCities() {
      return this.selectedProvince.cities || [];
    },
    selectedCity() {
      return this.currentCities[this.selectedCityIndex] || this.currentCities[0];
    },
    currentDistricts() {
      return this.selectedCity.districts || [];
    },
    selectedDistrict() {
      return this.currentDistricts[this.selectedDistrictIndex] || this.currentDistricts[0];
    },
    filteredStores() {
      let filtered = this.stores;
      if (this.selectedProvinceIndex > 0) {
        const provinceName = this.selectedProvince.name;
        filtered = filtered.filter((item) => item.province === provinceName);
        if (this.selectedCityIndex > 0) {
          const cityName = this.selectedCity.name;
          filtered = filtered.filter((item) => item.city === cityName);
          if (this.selectedDistrictIndex > 0) {
            const districtName = this.selectedDistrict.name;
            filtered = filtered.filter((item) => item.district === districtName);
          }
        }
      }
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase();
        filtered = filtered.filter(
          (item) => item.address.toLowerCase().includes(keyword) || item.province.toLowerCase().includes(keyword) || item.city.toLowerCase().includes(keyword) || item.district.toLowerCase().includes(keyword) || item.name.toLowerCase().includes(keyword)
        );
      }
      return filtered;
    }
  },
  methods: {
    onProvinceChange(e) {
      this.selectedProvinceIndex = e.detail.value;
      this.selectedCityIndex = 0;
      this.selectedDistrictIndex = 0;
    },
    onCityChange(e) {
      this.selectedCityIndex = e.detail.value;
      this.selectedDistrictIndex = 0;
    },
    onDistrictChange(e) {
      this.selectedDistrictIndex = e.detail.value;
    },
    onSearchInput() {
    },
    search() {
      common_vendor.index.__f__("log", "at pages/tabBar/experience/experience.vue:372", "搜索关键词:", this.searchKeyword);
    },
    viewStoreDetail(store) {
      common_vendor.index.showToast({
        title: `查看${store.name}详情`,
        icon: "none"
      });
    },
    callStore(store) {
      common_vendor.index.makePhoneCall({
        phoneNumber: store.phone,
        success: () => {
          common_vendor.index.__f__("log", "at pages/tabBar/experience/experience.vue:384", "拨打电话成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    },
    navigateToStore(store) {
      common_vendor.index.showToast({
        title: "正在打开导航...",
        icon: "none"
      });
    },
    bookStore(store) {
      if (store.status === "renovation") {
        common_vendor.index.showToast({
          title: "该门店正在装修中，暂无法预订",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (store.status === "closed") {
        common_vendor.index.showToast({
          title: "该门店正在休息中，暂无法预订",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/tabBar/booking-detail/booking-detail?store=${encodeURIComponent(JSON.stringify(store))}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.onSearchInput && $options.onSearchInput(...args)]),
    b: $data.searchKeyword,
    c: common_vendor.o((...args) => $options.search && $options.search(...args)),
    d: common_vendor.t($options.selectedProvince.name),
    e: $data.selectedProvinceIndex,
    f: $data.provinces,
    g: common_vendor.o((...args) => $options.onProvinceChange && $options.onProvinceChange(...args)),
    h: $options.currentCities.length > 1
  }, $options.currentCities.length > 1 ? {
    i: common_vendor.t($options.selectedCity.name),
    j: $data.selectedCityIndex,
    k: $options.currentCities,
    l: common_vendor.o((...args) => $options.onCityChange && $options.onCityChange(...args))
  } : {}, {
    m: $options.currentDistricts.length > 1
  }, $options.currentDistricts.length > 1 ? {
    n: common_vendor.t($options.selectedDistrict.name),
    o: $data.selectedDistrictIndex,
    p: $options.currentDistricts,
    q: common_vendor.o((...args) => $options.onDistrictChange && $options.onDistrictChange(...args))
  } : {}, {
    r: common_vendor.f($options.filteredStores, (store, index, i0) => {
      return {
        a: store.image,
        b: common_vendor.t(store.statusText),
        c: common_vendor.n(store.status),
        d: common_vendor.t(store.name),
        e: common_vendor.t(store.address),
        f: common_vendor.t(store.businessHours),
        g: common_vendor.t(store.phone),
        h: common_vendor.t(store.services.join("、")),
        i: common_vendor.t(store.priceRange.min),
        j: common_vendor.t(store.priceRange.max),
        k: common_vendor.o(($event) => $options.callStore(store), index),
        l: common_vendor.o(($event) => $options.navigateToStore(store), index),
        m: store.status === "renovation" || store.status === "closed" ? 1 : "",
        n: common_vendor.o(($event) => $options.bookStore(store), index),
        o: store.status === "renovation" || store.status === "closed",
        p: index,
        q: common_vendor.o(($event) => $options.viewStoreDetail(store), index)
      };
    }),
    s: $options.filteredStores.length === 0
  }, $options.filteredStores.length === 0 ? {
    t: common_vendor.t($data.searchKeyword ? "未找到该地区的门店" : "该地区暂无门店")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/experience/experience.js.map
