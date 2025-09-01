"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderNo: "",
      orderInfo: {
        orderNo: "",
        status: "pending",
        statusText: "待付款",
        statusDesc: "请尽快完成支付",
        createTime: "",
        paymentName: "",
        address: {},
        items: [],
        totalPrice: "0.00",
        deliveryFee: 0,
        finalPrice: "0.00"
      }
    };
  },
  onLoad(options) {
    if (options.orderNo) {
      this.orderNo = options.orderNo;
      this.loadOrderDetail();
    }
  },
  methods: {
    // 加载订单详情
    loadOrderDetail() {
      const orders = common_vendor.index.getStorageSync("shop_orders") || [];
      const order = orders.find((o) => o.orderNo === this.orderNo);
      if (order) {
        this.orderInfo = {
          orderNo: order.orderNo,
          status: "paid",
          // 模拟已支付状态
          statusText: "已付款",
          statusDesc: "商家正在处理您的订单",
          createTime: this.formatTime(order.createTime),
          paymentName: order.payment.name,
          address: order.address,
          items: order.items,
          totalPrice: order.totalPrice,
          deliveryFee: order.deliveryFee,
          finalPrice: order.finalPrice
        };
      } else {
        common_vendor.index.showToast({
          title: "订单不存在",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }
    },
    // 格式化时间
    formatTime(timeStr) {
      const date = new Date(timeStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    },
    // 查看物流
    viewLogistics() {
      common_vendor.index.showToast({
        title: "查看物流",
        icon: "none"
      });
    },
    // 确认收货
    confirmReceive() {
      common_vendor.index.showModal({
        title: "确认收货",
        content: "确认已收到商品吗？",
        success: (res) => {
          if (res.confirm) {
            this.orderInfo.status = "completed";
            this.orderInfo.statusText = "已完成";
            this.orderInfo.statusDesc = "订单已完成，感谢您的购买";
            common_vendor.index.showToast({
              title: "确认收货成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 评价商品
    writeReview() {
      common_vendor.index.showToast({
        title: "评价功能",
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.orderInfo.statusText),
    b: common_vendor.t($data.orderInfo.statusDesc),
    c: common_vendor.t($data.orderInfo.orderNo),
    d: common_vendor.t($data.orderInfo.createTime),
    e: common_vendor.t($data.orderInfo.paymentName),
    f: common_vendor.t($data.orderInfo.address.name),
    g: common_vendor.t($data.orderInfo.address.phone),
    h: common_vendor.t($data.orderInfo.address.address),
    i: common_vendor.f($data.orderInfo.items, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: common_vendor.t(item.name),
        c: item.specName
      }, item.specName ? {
        d: common_vendor.t(item.specName)
      } : {}, {
        e: common_vendor.t(item.price),
        f: common_vendor.t(item.quantity),
        g: index
      });
    }),
    j: common_vendor.t($data.orderInfo.totalPrice),
    k: $data.orderInfo.deliveryFee > 0
  }, $data.orderInfo.deliveryFee > 0 ? {
    l: common_vendor.t($data.orderInfo.deliveryFee)
  } : {}, {
    m: common_vendor.t($data.orderInfo.finalPrice),
    n: $data.orderInfo.status === "shipped"
  }, $data.orderInfo.status === "shipped" ? {
    o: common_vendor.o((...args) => $options.viewLogistics && $options.viewLogistics(...args))
  } : {}, {
    p: $data.orderInfo.status === "shipped"
  }, $data.orderInfo.status === "shipped" ? {
    q: common_vendor.o((...args) => $options.confirmReceive && $options.confirmReceive(...args))
  } : {}, {
    r: $data.orderInfo.status === "completed"
  }, $data.orderInfo.status === "completed" ? {
    s: common_vendor.o((...args) => $options.writeReview && $options.writeReview(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/order-detail.js.map
