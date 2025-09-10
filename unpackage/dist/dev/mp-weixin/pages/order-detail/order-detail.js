"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderInfo: {},
      storeDetail: {},
      unlockRemaining: 3,
      unlockLimit: 3,
      refundReasonIndex: 0,
      refundReasons: [
        "临时有事无法前往",
        "门店服务问题",
        "设备故障",
        "时间冲突",
        "其他原因"
      ],
      refundRemark: "",
      storeGuideVideo: "/static/video/store-guide.mp4"
      // 到店指引视频路径
    };
  },
  computed: {
    canRefund() {
      return this.orderInfo.status === "paid";
    },
    canUnlock() {
      return this.orderInfo.status === "paid" && this.orderInfo.roomNumber;
    },
    canUnlockNow() {
      return (this.orderInfo.roomStatus === "可使用" || this.orderInfo.roomStatus === "使用中") && this.unlockRemaining > 0;
    },
    unlockButtonText() {
      if (this.orderInfo.roomStatus !== "可使用" && this.orderInfo.roomStatus !== "使用中") {
        return "房间暂不可用";
      }
      if (this.unlockRemaining <= 0) {
        return "开锁次数已用完";
      }
      return `开锁 (${this.unlockRemaining}/${this.unlockLimit})`;
    },
    // 计算退款比例
    refundRate() {
      const hoursUntilBooking = this.calculateHoursUntilBooking();
      if (hoursUntilBooking >= 12) {
        return 100;
      } else if (hoursUntilBooking >= 6) {
        return 80;
      } else {
        return 50;
      }
    },
    // 计算退款金额
    refundAmount() {
      const originalPrice = parseFloat(this.orderInfo.totalPrice);
      const refundAmount = (originalPrice * this.refundRate / 100).toFixed(2);
      return refundAmount;
    }
  },
  onLoad(options) {
    if (options.orderData) {
      this.orderInfo = JSON.parse(decodeURIComponent(options.orderData));
      this.loadStoreDetail();
      const savedUnlockRemaining = common_vendor.index.getStorageSync("unlockRemaining");
      if (savedUnlockRemaining !== null && savedUnlockRemaining !== void 0) {
        this.unlockRemaining = savedUnlockRemaining;
      }
    }
  },
  methods: {
    // 计算距离预约时间还有多少小时
    calculateHoursUntilBooking() {
      try {
        const now = /* @__PURE__ */ new Date();
        const bookingDateStr = `${this.orderInfo.date} ${this.orderInfo.time}`;
        const bookingTime = new Date(bookingDateStr);
        const timeDiff = bookingTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1e3 * 60 * 60);
        return Math.max(0, hoursDiff);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/order-detail/order-detail.vue:269", "计算预约时间失败:", error);
        return 0;
      }
    },
    loadStoreDetail() {
      const storeMap = {
        "朝阳店": {
          name: "朝阳店",
          address: "北京市朝阳区建国路88号现代城B座3层",
          phone: "010-85888888",
          businessHours: "09:00-22:00",
          status: "open",
          statusText: "营业中",
          latitude: 39.9151,
          longitude: 116.4687
        },
        "海淀店": {
          name: "海淀店",
          address: "北京市海淀区中关村大街28号海龙大厦5层",
          phone: "010-82666666",
          businessHours: "09:00-22:00",
          status: "open",
          statusText: "营业中",
          latitude: 39.9838,
          longitude: 116.3174
        },
        "西城店": {
          name: "西城店",
          address: "北京市西城区西单北大街132号太平洋百货6层",
          phone: "010-66777777",
          businessHours: "09:00-22:00",
          status: "open",
          statusText: "营业中",
          latitude: 39.9084,
          longitude: 116.3736
        }
      };
      this.storeDetail = storeMap[this.orderInfo.store] || storeMap["朝阳店"];
    },
    navigateToStore() {
      common_vendor.index.openLocation({
        latitude: this.storeDetail.latitude,
        longitude: this.storeDetail.longitude,
        name: this.storeDetail.name,
        address: this.storeDetail.address,
        success: () => {
          common_vendor.index.__f__("log", "at pages/order-detail/order-detail.vue:319", "导航成功");
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "导航失败",
            icon: "none"
          });
        }
      });
    },
    callStore() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.storeDetail.phone,
        success: () => {
          common_vendor.index.__f__("log", "at pages/order-detail/order-detail.vue:334", "拨打电话成功");
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: "拨打失败",
            icon: "none"
          });
        }
      });
    },
    // 显示到店指引视频
    showStoreGuide() {
      this.$refs.storeGuidePopup.open();
    },
    // 关闭到店指引弹窗
    closeStoreGuidePopup() {
      this.$refs.storeGuidePopup.close();
    },
    requestRefund() {
      this.$refs.refundPopup.open();
    },
    closeRefundPopup() {
      this.$refs.refundPopup.close();
      this.refundRemark = "";
      this.refundReasonIndex = 0;
    },
    onRefundReasonChange(e) {
      this.refundReasonIndex = e.detail.value;
    },
    confirmRefund() {
      const hoursUntil = this.calculateHoursUntilBooking();
      const timeDesc = hoursUntil >= 12 ? "12小时外" : hoursUntil >= 6 ? "12-6小时内" : "6小时内";
      common_vendor.index.showModal({
        title: "确认退款",
        content: `确定要申请退款￥${this.refundAmount}吗？

退款原因：${this.refundReasons[this.refundReasonIndex]}
退款比例：${this.refundRate}% (${timeDesc})
退款到账时间：1-3个工作日`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "提交中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "退款申请提交成功",
                icon: "success"
              });
              this.closeRefundPopup();
              this.orderInfo.status = "refunding";
              this.orderInfo.statusText = "退款中";
            }, 2e3);
          }
        }
      });
    },
    unlockRoom() {
      if (!this.canUnlockNow) {
        return;
      }
      const roomStatusText = this.orderInfo.roomStatus === "使用中" ? "（房间正在使用中）" : "";
      common_vendor.index.showModal({
        title: "确认开锁",
        content: `确定要开启房间 ${this.orderInfo.roomNumber} 吗？${roomStatusText}

剩余开锁次数：${this.unlockRemaining}次`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "开锁中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              this.unlockRemaining--;
              common_vendor.index.setStorageSync("unlockRemaining", this.unlockRemaining);
              common_vendor.index.showToast({
                title: "开锁成功！",
                icon: "success"
              });
              if (this.unlockRemaining > 0) {
                setTimeout(() => {
                  const statusText = this.orderInfo.roomStatus === "使用中" ? "（房间正在使用中）" : "";
                  common_vendor.index.showModal({
                    title: "开锁成功",
                    content: `房间 ${this.orderInfo.roomNumber} 已开启！${statusText}

剩余开锁次数：${this.unlockRemaining}次

您可以继续使用开锁功能，直到次数用完。`,
                    confirmText: "知道了",
                    showCancel: false
                  });
                }, 1e3);
              } else {
                setTimeout(() => {
                  const statusText = this.orderInfo.roomStatus === "使用中" ? "（房间正在使用中）" : "";
                  common_vendor.index.showModal({
                    title: "开锁次数已用完",
                    content: `房间 ${this.orderInfo.roomNumber} 已开启！${statusText}

您的开锁次数已用完，如需继续使用，请联系客服。`,
                    confirmText: "知道了",
                    showCancel: false
                  });
                }, 1e3);
              }
            }, 2e3);
          }
        }
      });
    },
    getRoomStatusClass(status) {
      switch (status) {
        case "可使用":
          return "status-available";
        case "清洁中":
          return "status-cleaning";
        case "使用中":
          return "status-using";
        default:
          return "";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.orderInfo.orderNo),
    b: common_vendor.t($data.orderInfo.statusText),
    c: common_vendor.n($data.orderInfo.status),
    d: common_vendor.t($data.orderInfo.createTime || "2024-12-01 14:30"),
    e: common_vendor.t($data.storeDetail.name),
    f: common_vendor.t($data.storeDetail.statusText),
    g: common_vendor.n($data.storeDetail.status),
    h: common_vendor.t($data.storeDetail.address),
    i: common_vendor.t($data.storeDetail.businessHours),
    j: common_vendor.t($data.storeDetail.phone),
    k: common_vendor.o((...args) => $options.callStore && $options.callStore(...args)),
    l: common_vendor.o((...args) => $options.navigateToStore && $options.navigateToStore(...args)),
    m: common_vendor.o((...args) => $options.showStoreGuide && $options.showStoreGuide(...args)),
    n: $data.orderInfo.image,
    o: common_vendor.t($data.orderInfo.productName),
    p: common_vendor.t($data.orderInfo.description),
    q: common_vendor.t($data.orderInfo.date),
    r: common_vendor.t($data.orderInfo.time),
    s: common_vendor.t($data.orderInfo.quantity),
    t: $data.orderInfo.roomNumber
  }, $data.orderInfo.roomNumber ? {
    v: common_vendor.t($data.orderInfo.roomStatus),
    w: common_vendor.n($options.getRoomStatusClass($data.orderInfo.roomStatus)),
    x: common_vendor.t($data.orderInfo.roomNumber),
    y: common_vendor.t($data.unlockRemaining),
    z: common_vendor.t($data.unlockLimit)
  } : {}, {
    A: common_vendor.t($data.orderInfo.totalPrice),
    B: $options.canRefund
  }, $options.canRefund ? {
    C: common_vendor.o((...args) => $options.requestRefund && $options.requestRefund(...args))
  } : {}, {
    D: $options.canUnlock
  }, $options.canUnlock ? {
    E: common_vendor.t($options.unlockButtonText),
    F: common_vendor.o((...args) => $options.unlockRoom && $options.unlockRoom(...args)),
    G: !$options.canUnlockNow
  } : {}, {
    H: $data.orderInfo.status === "refunding"
  }, $data.orderInfo.status === "refunding" ? {} : {}, {
    I: $data.orderInfo.status === "refunded"
  }, $data.orderInfo.status === "refunded" ? {
    J: common_vendor.t($data.orderInfo.refundAmount),
    K: common_vendor.t($data.orderInfo.refundRate)
  } : {}, {
    L: common_vendor.t($options.refundAmount),
    M: common_vendor.t($options.refundRate),
    N: common_vendor.t($data.refundReasons[$data.refundReasonIndex]),
    O: $data.refundReasonIndex,
    P: $data.refundReasons,
    Q: common_vendor.o((...args) => $options.onRefundReasonChange && $options.onRefundReasonChange(...args)),
    R: $data.refundRemark,
    S: common_vendor.o(($event) => $data.refundRemark = $event.detail.value),
    T: common_vendor.o((...args) => $options.closeRefundPopup && $options.closeRefundPopup(...args)),
    U: common_vendor.o((...args) => $options.confirmRefund && $options.confirmRefund(...args)),
    V: common_vendor.sr("refundPopup", "67732602-0"),
    W: common_vendor.p({
      type: "center"
    }),
    X: common_vendor.o((...args) => $options.closeStoreGuidePopup && $options.closeStoreGuidePopup(...args)),
    Y: $data.storeGuideVideo,
    Z: common_vendor.t($data.storeDetail.name),
    aa: common_vendor.sr("storeGuidePopup", "67732602-1"),
    ab: common_vendor.p({
      type: "center"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order-detail/order-detail.js.map
