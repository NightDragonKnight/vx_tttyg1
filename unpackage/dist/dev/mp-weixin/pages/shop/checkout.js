"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderItems: [],
      orderType: "cart",
      // cart-购物车, buy_now-立即购买
      selectedAddress: null,
      selectedDelivery: "express",
      selectedPayment: "wechat",
      orderRemark: "",
      deliveryOptions: [
        { name: "快递配送", value: "express", fee: 10 },
        { name: "到店自提", value: "self_pickup", fee: 0 }
      ],
      paymentOptions: [
        { name: "微信支付", value: "wechat", icon: "💳" },
        { name: "支付宝", value: "alipay", icon: "💰" },
        { name: "余额支付", value: "balance", icon: "💎" }
      ],
      addressList: [
        {
          id: 1,
          name: "张三",
          phone: "13800138000",
          address: "北京市朝阳区建国路88号现代城B座3层"
        },
        {
          id: 2,
          name: "李四",
          phone: "13900139000",
          address: "北京市海淀区中关村大街28号海龙大厦5层"
        }
      ]
    };
  },
  computed: {
    // 商品总价
    totalPrice() {
      return this.orderItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0).toFixed(2);
    },
    // 配送费
    deliveryFee() {
      const delivery = this.deliveryOptions.find((d) => d.value === this.selectedDelivery);
      return delivery ? delivery.fee : 0;
    },
    // 最终价格
    finalPrice() {
      return (parseFloat(this.totalPrice) + this.deliveryFee).toFixed(2);
    },
    // 是否可以提交订单
    canSubmit() {
      return this.selectedAddress && this.orderItems.length > 0;
    }
  },
  onLoad(options) {
    if (options.items) {
      try {
        this.orderItems = JSON.parse(decodeURIComponent(options.items));
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/shop/checkout.vue:173", "解析商品数据失败:", e);
      }
    }
    if (options.type) {
      this.orderType = options.type;
    }
    if (this.addressList.length > 0) {
      this.selectedAddress = this.addressList[0];
    }
  },
  methods: {
    // 选择地址
    selectAddress() {
      common_vendor.index.showActionSheet({
        itemList: this.addressList.map((addr) => `${addr.name} ${addr.phone} - ${addr.address}`),
        success: (res) => {
          this.selectedAddress = this.addressList[res.tapIndex];
        }
      });
    },
    // 选择配送方式
    selectDelivery(option) {
      this.selectedDelivery = option.value;
    },
    // 选择支付方式
    selectPayment(option) {
      this.selectedPayment = option.value;
    },
    // 提交订单
    submitOrder() {
      if (!this.canSubmit) {
        common_vendor.index.showToast({
          title: "请完善订单信息",
          icon: "none"
        });
        return;
      }
      const orderData = {
        orderNo: this.generateOrderNo(),
        items: this.orderItems,
        address: this.selectedAddress,
        delivery: this.deliveryOptions.find((d) => d.value === this.selectedDelivery),
        payment: this.paymentOptions.find((p) => p.value === this.selectedPayment),
        remark: this.orderRemark,
        totalPrice: this.totalPrice,
        deliveryFee: this.deliveryFee,
        finalPrice: this.finalPrice,
        createTime: (/* @__PURE__ */ new Date()).toISOString()
      };
      common_vendor.index.showModal({
        title: "确认订单",
        content: `订单总金额：¥${this.finalPrice}
支付方式：${orderData.payment.name}
配送方式：${orderData.delivery.name}`,
        success: (res) => {
          if (res.confirm) {
            this.processPayment(orderData);
          }
        }
      });
    },
    // 生成订单号
    generateOrderNo() {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1e3);
      return `SHOP${timestamp}${random}`;
    },
    // 处理支付
    processPayment(orderData) {
      common_vendor.index.showLoading({
        title: "处理中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        this.saveOrder(orderData);
        if (this.orderType === "cart") {
          this.clearCart();
        }
        common_vendor.index.showToast({
          title: "订单提交成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: `/pages/shop/order-detail?orderNo=${orderData.orderNo}`
          });
        }, 1500);
      }, 2e3);
    },
    // 保存订单
    saveOrder(orderData) {
      let orders = common_vendor.index.getStorageSync("shop_orders") || [];
      orders.unshift(orderData);
      common_vendor.index.setStorageSync("shop_orders", orders);
    },
    // 清空购物车
    clearCart() {
      common_vendor.index.removeStorageSync("cart");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.selectedAddress
  }, $data.selectedAddress ? {
    b: common_vendor.t($data.selectedAddress.name),
    c: common_vendor.t($data.selectedAddress.phone),
    d: common_vendor.t($data.selectedAddress.address)
  } : {}, {
    e: common_vendor.o((...args) => $options.selectAddress && $options.selectAddress(...args)),
    f: common_vendor.f($data.orderItems, (item, index, i0) => {
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
    g: common_vendor.f($data.deliveryOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.name),
        b: common_vendor.t(option.fee > 0 ? "¥" + option.fee : "免费"),
        c: index,
        d: $data.selectedDelivery === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.selectDelivery(option), index)
      };
    }),
    h: common_vendor.f($data.paymentOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.icon),
        b: common_vendor.t(option.name),
        c: $data.selectedPayment === option.value ? 1 : "",
        d: index,
        e: $data.selectedPayment === option.value ? 1 : "",
        f: common_vendor.o(($event) => $options.selectPayment(option), index)
      };
    }),
    i: $data.orderRemark,
    j: common_vendor.o(($event) => $data.orderRemark = $event.detail.value),
    k: common_vendor.t($options.totalPrice),
    l: $options.deliveryFee > 0
  }, $options.deliveryFee > 0 ? {
    m: common_vendor.t($options.deliveryFee)
  } : {}, {
    n: common_vendor.t($options.finalPrice),
    o: common_vendor.t($options.finalPrice),
    p: common_vendor.o((...args) => $options.submitOrder && $options.submitOrder(...args)),
    q: !$options.canSubmit
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/checkout.js.map
