"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentStore: 0,
      currentOrderStatus: 0,
      storeOptions: [
        { name: "全部门店", id: "all" },
        { name: "朝阳店", id: "chaoyang" },
        { name: "海淀店", id: "haidian" },
        { name: "西城店", id: "xicheng" }
      ],
      orderStatus: [
        { name: "全部状态", count: 0 },
        { name: "待支付", count: 2 },
        { name: "已支付", count: 3 },
        { name: "已完成", count: 1 },
        { name: "退款中", count: 1 },
        { name: "退款完成", count: 1 },
        { name: "已取消", count: 0 }
      ],
      bookings: [
        {
          orderNo: "BK20241201001",
          productName: "VR体验馆",
          description: "沉浸式虚拟现实体验",
          store: "朝阳店",
          orderType: "vr",
          image: "/static/image/day/VR体验馆.jpg",
          date: "2024-12-15",
          time: "09:00",
          quantity: 2,
          totalPrice: "120",
          status: "pending",
          statusText: "待支付"
        },
        {
          orderNo: "BK20241201002",
          productName: "棋牌室",
          description: "休闲娱乐棋牌游戏",
          store: "海淀店",
          orderType: "card",
          image: "/static/image/day/棋牌1.jpg",
          date: "2024-12-20",
          time: "14:00",
          quantity: 1,
          totalPrice: "60",
          status: "pending",
          statusText: "待支付"
        },
        {
          orderNo: "BK20241130001",
          productName: "台球室",
          description: "专业台球体验",
          store: "西城店",
          orderType: "billiards",
          image: "/static/image/day/台球1.png",
          date: "2024-12-25",
          time: "10:00",
          quantity: 3,
          totalPrice: "150",
          status: "paid",
          statusText: "已支付",
          roomStatus: "可使用",
          roomNumber: "A-101",
          createTime: "2024-12-08 15:30"
        },
        {
          orderNo: "BK20241125001",
          productName: "密室逃脱",
          description: "惊险刺激的解密游戏",
          store: "朝阳店",
          orderType: "escape",
          image: "/static/image/day/密室逃脱.jpg",
          date: "2024-12-05",
          time: "08:30",
          quantity: 2,
          totalPrice: "240",
          status: "completed",
          statusText: "已完成"
        },
        {
          orderNo: "BK20241202001",
          productName: "VR体验馆",
          description: "沉浸式虚拟现实体验",
          store: "朝阳店",
          orderType: "vr",
          image: "/static/image/day/VR体验馆.jpg",
          date: "2024-12-20",
          time: "15:00",
          quantity: 1,
          totalPrice: "80",
          status: "paid",
          statusText: "已支付",
          roomStatus: "清洁中",
          roomNumber: "B-203",
          createTime: "2024-12-10 09:15"
        },
        {
          orderNo: "BK20241203001",
          productName: "棋牌室",
          description: "休闲娱乐棋牌游戏",
          store: "海淀店",
          orderType: "card",
          image: "/static/image/day/棋牌1.jpg",
          date: "2024-12-13",
          time: "19:00",
          quantity: 4,
          totalPrice: "240",
          status: "paid",
          statusText: "已支付",
          roomStatus: "使用中",
          roomNumber: "C-305",
          createTime: "2024-12-11 16:45"
        },
        {
          orderNo: "BK20241204001",
          productName: "密室逃脱",
          description: "惊险刺激的解密游戏",
          store: "朝阳店",
          orderType: "escape",
          image: "/static/image/day/密室逃脱.jpg",
          date: "2024-12-18",
          time: "14:00",
          quantity: 2,
          totalPrice: "160",
          status: "refunding",
          statusText: "退款中",
          createTime: "2024-12-12 10:20"
        },
        {
          orderNo: "BK20241120001",
          productName: "VR体验馆",
          description: "沉浸式虚拟现实体验",
          store: "西城店",
          orderType: "vr",
          image: "/static/image/day/VR体验馆.jpg",
          date: "2024-12-08",
          time: "16:00",
          quantity: 1,
          totalPrice: "80",
          status: "refunded",
          statusText: "退款完成",
          refundAmount: "64.00",
          refundRate: "80",
          createTime: "2024-11-28 13:15"
        }
      ]
    };
  },
  computed: {
    filteredBookings() {
      let result = this.bookings;
      if (this.currentStore > 0) {
        const storeId = this.storeOptions[this.currentStore].id;
        result = result.filter((item) => item.store.includes(storeId.replace("店", "")));
      }
      if (this.currentOrderStatus > 0) {
        const statusMap = ["", "pending", "paid", "completed", "refunding", "refunded", "cancelled"];
        const status = statusMap[this.currentOrderStatus];
        result = result.filter((item) => item.status === status);
      }
      return result;
    }
  },
  methods: {
    onStoreChange(e) {
      this.currentStore = e.detail.value;
    },
    onOrderStatusChange(e) {
      this.currentOrderStatus = e.detail.value;
    },
    cancelBooking(item) {
      common_vendor.index.showModal({
        title: "确认取消",
        content: "确定要取消这个预订吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "取消成功",
              icon: "success"
            });
          }
        }
      });
    },
    payBooking(item) {
      common_vendor.index.showToast({
        title: "跳转支付",
        icon: "none"
      });
    },
    viewDetail(item) {
      common_vendor.index.navigateTo({
        url: `/pages/order-detail/order-detail?orderData=${encodeURIComponent(JSON.stringify(item))}`
      });
    },
    writeReview(item) {
      common_vendor.index.showToast({
        title: "写评价",
        icon: "none"
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
    },
    quickUnlock(item) {
      common_vendor.index.showModal({
        title: "快捷开锁",
        content: `确定要开启房间 ${item.roomNumber} 的门锁吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "开锁中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "开锁成功！",
                icon: "success"
              });
              item.roomStatus = "使用中";
            }, 2e3);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.storeOptions[$data.currentStore].name),
    b: $data.currentStore,
    c: $data.storeOptions,
    d: common_vendor.o((...args) => $options.onStoreChange && $options.onStoreChange(...args)),
    e: common_vendor.t($data.orderStatus[$data.currentOrderStatus].name),
    f: $data.currentOrderStatus,
    g: $data.orderStatus,
    h: common_vendor.o((...args) => $options.onOrderStatusChange && $options.onOrderStatusChange(...args)),
    i: common_vendor.f($options.filteredBookings, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.orderNo),
        b: common_vendor.t(item.statusText),
        c: common_vendor.n(item.status),
        d: item.image,
        e: common_vendor.t(item.productName),
        f: common_vendor.t(item.description),
        g: common_vendor.t(item.store),
        h: common_vendor.t(item.date),
        i: common_vendor.t(item.time),
        j: common_vendor.t(item.quantity),
        k: common_vendor.t(item.totalPrice),
        l: item.status === "pending"
      }, item.status === "pending" ? {
        m: common_vendor.o(($event) => $options.cancelBooking(item), index)
      } : {}, {
        n: item.status === "pending"
      }, item.status === "pending" ? {
        o: common_vendor.o(($event) => $options.payBooking(item), index)
      } : {}, {
        p: item.status === "paid"
      }, item.status === "paid" ? common_vendor.e({
        q: common_vendor.t(item.roomStatus),
        r: common_vendor.n($options.getRoomStatusClass(item.roomStatus)),
        s: item.roomNumber
      }, item.roomNumber ? {
        t: common_vendor.t(item.roomNumber)
      } : {}, {
        v: common_vendor.o(($event) => $options.viewDetail(item), index),
        w: item.roomStatus === "可使用"
      }, item.roomStatus === "可使用" ? {
        x: common_vendor.o(($event) => $options.quickUnlock(item), index)
      } : {}) : {}, {
        y: item.status === "completed"
      }, item.status === "completed" ? {
        z: common_vendor.o(($event) => $options.writeReview(item), index)
      } : {}, {
        A: item.status === "refunding"
      }, item.status === "refunding" ? {
        B: common_vendor.o(($event) => $options.viewDetail(item), index)
      } : {}, {
        C: item.status === "refunded"
      }, item.status === "refunded" ? {
        D: common_vendor.t(item.refundAmount),
        E: common_vendor.t(item.refundRate),
        F: common_vendor.o(($event) => $options.viewDetail(item), index)
      } : {}, {
        G: index
      });
    }),
    j: $options.filteredBookings.length === 0
  }, $options.filteredBookings.length === 0 ? {
    k: common_assets._imports_0$1
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/booking/booking.js.map
