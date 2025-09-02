"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      selectedStatus: "all",
      statusFilters: [
        { value: "all", name: "全部", count: 0 },
        { value: "paid", name: "已支付", count: 0 },
        { value: "shipped", name: "已发货", count: 0 },
        { value: "completed", name: "已完成", count: 0 },
        { value: "refunding", name: "退款中", count: 0 },
        { value: "refunded", name: "已退款", count: 0 }
      ],
      orders: []
    };
  },
  computed: {
    filteredOrders() {
      if (this.selectedStatus === "all") {
        return this.orders;
      }
      return this.orders.filter((order) => order.status === this.selectedStatus);
    }
  },
  onShow() {
    this.loadOrders();
    this.updateFilterCounts();
  },
  methods: {
    // 加载订单
    loadOrders() {
      const savedOrders = common_vendor.index.getStorageSync("orders") || [];
      this.orders = savedOrders;
    },
    // 更新筛选器数量
    updateFilterCounts() {
      this.statusFilters.forEach((filter) => {
        if (filter.value === "all") {
          filter.count = this.orders.length;
        } else {
          filter.count = this.orders.filter((order) => order.status === filter.value).length;
        }
      });
    },
    // 选择状态筛选
    selectStatus(filter) {
      this.selectedStatus = filter.value;
    },
    // 查看订单详情
    viewOrderDetail(order) {
      common_vendor.index.navigateTo({
        url: `/pages/shop/order-detail?orderData=${encodeURIComponent(JSON.stringify(order))}`
      });
    },
    // 确认收货
    confirmReceived(order) {
      common_vendor.index.showModal({
        title: "确认收货",
        content: "确认已收到商品吗？",
        success: (res) => {
          if (res.confirm) {
            order.status = "completed";
            order.statusText = "已完成";
            order.completeTime = (/* @__PURE__ */ new Date()).toLocaleString();
            this.saveOrders();
            this.updateFilterCounts();
            common_vendor.index.showToast({
              title: "确认收货成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 写评价
    writeReview(order) {
      common_vendor.index.showModal({
        title: "写评价",
        content: "请对本次购买进行评价",
        editable: true,
        placeholderText: "请输入您的评价内容...",
        success: (res) => {
          if (res.confirm && res.content) {
            order.review = {
              content: res.content,
              time: (/* @__PURE__ */ new Date()).toLocaleString(),
              rating: 5
            };
            this.saveOrders();
            common_vendor.index.showToast({
              title: "评价提交成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 申请退款
    applyRefund(order) {
      common_vendor.index.showActionSheet({
        itemList: ["商品质量问题", "商品与描述不符", "发货太慢", "其他原因"],
        success: (res) => {
          const reasons = ["商品质量问题", "商品与描述不符", "发货太慢", "其他原因"];
          const reason = reasons[res.tapIndex];
          common_vendor.index.showModal({
            title: "申请退款",
            content: `退款原因：${reason}

请描述具体问题：`,
            editable: true,
            placeholderText: "请详细描述问题...",
            success: (modalRes) => {
              if (modalRes.confirm) {
                order.status = "refunding";
                order.statusText = "退款中";
                order.refund = {
                  reason,
                  description: modalRes.content || "",
                  applyTime: (/* @__PURE__ */ new Date()).toLocaleString(),
                  amount: order.totalAmount
                };
                this.saveOrders();
                this.updateFilterCounts();
                common_vendor.index.showToast({
                  title: "退款申请已提交",
                  icon: "success"
                });
              }
            }
          });
        }
      });
    },
    // 保存订单
    saveOrders() {
      common_vendor.index.setStorageSync("orders", this.orders);
    },
    // 去购物
    goShopping() {
      common_vendor.index.switchTab({
        url: "/pages/tabBar/home/home"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.statusFilters, (filter, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(filter.name),
        b: filter.count > 0
      }, filter.count > 0 ? {
        c: common_vendor.t(filter.count)
      } : {}, {
        d: index,
        e: $data.selectedStatus === filter.value ? 1 : "",
        f: common_vendor.o(($event) => $options.selectStatus(filter), index)
      });
    }),
    b: common_vendor.f($options.filteredOrders, (order, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.orderNo),
        b: common_vendor.t(order.statusText),
        c: common_vendor.n(order.status),
        d: order.product.image,
        e: common_vendor.t(order.product.name),
        f: order.specName
      }, order.specName ? {
        g: common_vendor.t(order.specName)
      } : {}, {
        h: common_vendor.t(order.quantity),
        i: common_vendor.t(order.createTime),
        j: common_vendor.t(order.totalAmount),
        k: common_vendor.o(($event) => $options.viewOrderDetail(order), index),
        l: order.status === "paid"
      }, order.status === "paid" ? {
        m: common_vendor.o(($event) => $options.confirmReceived(order), index)
      } : {}, {
        n: order.status === "completed"
      }, order.status === "completed" ? {
        o: common_vendor.o(($event) => $options.writeReview(order), index)
      } : {}, {
        p: order.status === "paid"
      }, order.status === "paid" ? {
        q: common_vendor.o(($event) => $options.applyRefund(order), index)
      } : {}, {
        r: index,
        s: common_vendor.o(($event) => $options.viewOrderDetail(order), index)
      });
    }),
    c: $options.filteredOrders.length === 0
  }, $options.filteredOrders.length === 0 ? {
    d: common_assets._imports_0$1,
    e: common_vendor.t($data.selectedStatus === "all" ? "暂无订单" : "该状态暂无订单"),
    f: common_vendor.o((...args) => $options.goShopping && $options.goShopping(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/orders.js.map
