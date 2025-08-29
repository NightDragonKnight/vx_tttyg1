"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      bookingInfo: {
        storeName: "朝阳VR体验馆",
        address: "北京市朝阳区建国路88号",
        phone: "010-12345678",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        experienceName: "VR虚拟现实体验",
        experienceDesc: "沉浸式虚拟现实体验，带你进入全新的数字世界",
        originalPrice: 80
      },
      selectedDate: "2024-12-15",
      timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
      startTimeIndex: 0,
      endTimeIndex: 1,
      selectedStartTime: "09:00",
      selectedEndTime: "10:00",
      peopleCount: 1,
      availableCoupons: [
        {
          id: 1,
          name: "新用户专享券",
          description: "新用户首次体验专享优惠",
          discount: 20,
          validUntil: "2024-12-31"
        },
        {
          id: 2,
          name: "周末特惠券",
          description: "周末使用享受额外优惠",
          discount: 15,
          validUntil: "2024-12-31"
        },
        {
          id: 3,
          name: "满减优惠券",
          description: "满50减10元",
          discount: 10,
          validUntil: "2024-12-31"
        }
      ],
      selectedCoupon: null
    };
  },
  computed: {
    originalPrice() {
      return this.bookingInfo.originalPrice * this.peopleCount;
    },
    finalPrice() {
      let price = this.originalPrice;
      if (this.selectedCoupon) {
        price -= this.selectedCoupon.discount;
      }
      return Math.max(0, price);
    },
    availableEndTimes() {
      if (this.startTimeIndex === -1)
        return this.timeSlots;
      return this.timeSlots.slice(this.startTimeIndex + 1);
    },
    durationHours() {
      if (!this.selectedStartTime || !this.selectedEndTime)
        return 0;
      const startTime = this.timeToMinutes(this.selectedStartTime);
      const endTime = this.timeToMinutes(this.selectedEndTime);
      const duration = endTime - startTime;
      return (duration / 60).toFixed(1);
    }
  },
  onLoad(options) {
    if (options.item) {
      try {
        const item = JSON.parse(decodeURIComponent(options.item));
        this.bookingInfo.experienceName = item.name;
        this.bookingInfo.experienceDesc = item.description;
        this.bookingInfo.originalPrice = parseInt(item.price);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:219", "解析传递数据失败:", e);
      }
    }
  },
  methods: {
    navigateToStore() {
      common_vendor.index.showToast({
        title: "正在打开导航...",
        icon: "none"
      });
    },
    callStore() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.bookingInfo.phone,
        success: () => {
          common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:235", "拨打电话成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    },
    onDateChange(e) {
      this.selectedDate = e.detail.value;
    },
    onStartTimeChange(e) {
      this.startTimeIndex = e.detail.value;
      this.selectedStartTime = this.timeSlots[this.startTimeIndex];
      if (this.endTimeIndex <= this.startTimeIndex) {
        this.endTimeIndex = 0;
        this.selectedEndTime = this.availableEndTimes[0];
      }
    },
    onEndTimeChange(e) {
      this.endTimeIndex = e.detail.value;
      this.selectedEndTime = this.availableEndTimes[this.endTimeIndex];
    },
    timeToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    },
    decreasePeople() {
      if (this.peopleCount > 1) {
        this.peopleCount--;
      }
    },
    increasePeople() {
      if (this.peopleCount < 10) {
        this.peopleCount++;
      }
    },
    selectCoupon(coupon) {
      var _a;
      this.selectedCoupon = ((_a = this.selectedCoupon) == null ? void 0 : _a.id) === coupon.id ? null : coupon;
    },
    confirmPayment() {
      const timeInfo = `${this.selectedDate} ${this.selectedStartTime}-${this.selectedEndTime}`;
      common_vendor.index.showModal({
        title: "确认支付",
        content: `预约时间：${timeInfo}
预约人数：${this.peopleCount}人
确定支付 ¥${this.finalPrice} 吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "支付中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "支付成功！",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1500);
            }, 2e3);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.bookingInfo.storeName),
    b: common_vendor.t($data.bookingInfo.address),
    c: common_vendor.o((...args) => $options.navigateToStore && $options.navigateToStore(...args)),
    d: common_vendor.o((...args) => $options.callStore && $options.callStore(...args)),
    e: $data.bookingInfo.videoUrl,
    f: common_assets._imports_0$1,
    g: common_vendor.t($data.bookingInfo.experienceName),
    h: common_vendor.t($data.bookingInfo.experienceDesc),
    i: common_vendor.t($data.selectedDate),
    j: $data.selectedDate,
    k: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    l: common_vendor.t($data.selectedStartTime),
    m: $data.startTimeIndex,
    n: $data.timeSlots,
    o: common_vendor.o((...args) => $options.onStartTimeChange && $options.onStartTimeChange(...args)),
    p: common_vendor.t($data.selectedEndTime),
    q: $data.endTimeIndex,
    r: $options.availableEndTimes,
    s: common_vendor.o((...args) => $options.onEndTimeChange && $options.onEndTimeChange(...args)),
    t: $data.selectedStartTime && $data.selectedEndTime
  }, $data.selectedStartTime && $data.selectedEndTime ? {
    v: common_vendor.t($options.durationHours)
  } : {}, {
    w: common_vendor.o((...args) => $options.decreasePeople && $options.decreasePeople(...args)),
    x: common_vendor.t($data.peopleCount),
    y: common_vendor.o((...args) => $options.increasePeople && $options.increasePeople(...args)),
    z: common_vendor.f($data.availableCoupons, (coupon, index, i0) => {
      return {
        a: common_vendor.t(coupon.name),
        b: common_vendor.t(coupon.description),
        c: common_vendor.t(coupon.validUntil),
        d: common_vendor.t(coupon.discount),
        e: index,
        f: $data.selectedCoupon === coupon.id ? 1 : "",
        g: common_vendor.o(($event) => $options.selectCoupon(coupon), index)
      };
    }),
    A: common_vendor.t($options.originalPrice),
    B: $data.selectedCoupon
  }, $data.selectedCoupon ? {
    C: common_vendor.t($data.selectedCoupon.discount)
  } : {}, {
    D: common_vendor.t($options.finalPrice),
    E: common_vendor.t($options.finalPrice),
    F: common_vendor.o((...args) => $options.confirmPayment && $options.confirmPayment(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/booking-detail/booking-detail.js.map
