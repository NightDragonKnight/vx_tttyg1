"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderInfo: {
        product: {},
        quantity: 1,
        specName: "",
        specPrice: 0,
        remark: ""
      },
      selectedAddress: null,
      selectedDelivery: "express",
      selectedPayment: "wechat",
      deliveryOptions: [
        { value: "express", name: "快递配送", desc: "2-3个工作日", price: 10 },
        { value: "fast", name: "快速配送", desc: "1个工作日", price: 20 },
        { value: "same_day", name: "当日达", desc: "当日送达", price: 30 }
      ],
      paymentOptions: [
        { value: "wechat", name: "微信支付", desc: "推荐使用", icon: "💚" },
        { value: "alipay", name: "支付宝", desc: "安全便捷", icon: "💙" },
        { value: "balance", name: "余额支付", desc: "可用余额", icon: "💰" }
      ]
    };
  },
  computed: {
    selectedDeliveryPrice() {
      const delivery = this.deliveryOptions.find((d) => d.value === this.selectedDelivery);
      return delivery ? delivery.price : 0;
    },
    totalAmount() {
      const productPrice = this.orderInfo.product.price * this.orderInfo.quantity;
      const specPrice = this.orderInfo.specPrice * this.orderInfo.quantity;
      const deliveryPrice = this.selectedDeliveryPrice;
      return productPrice + specPrice + deliveryPrice;
    },
    canSubmit() {
      return this.selectedAddress && this.orderInfo.product.id;
    }
  },
  onLoad(options) {
    if (options.product) {
      try {
        const productData = JSON.parse(decodeURIComponent(options.product));
        this.orderInfo.product = productData;
        if (productData.specs && productData.specs.length > 0) {
          const defaultSpec = productData.specs[0];
          this.orderInfo.specName = defaultSpec.name;
          this.orderInfo.specPrice = defaultSpec.price || 0;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/shop/purchase.vue:191", "解析商品数据失败:", e);
      }
    }
    this.loadDefaultAddress();
  },
  methods: {
    // 减少数量
    decreaseQuantity() {
      if (this.orderInfo.quantity > 1) {
        this.orderInfo.quantity--;
      }
    },
    // 增加数量
    increaseQuantity() {
      if (this.orderInfo.quantity < this.orderInfo.product.stock) {
        this.orderInfo.quantity++;
      }
    },
    // 选择地址
    selectAddress() {
      common_vendor.index.showActionSheet({
        itemList: ["选择已有地址", "添加新地址"],
        success: (res) => {
          if (res.tapIndex === 0) {
            this.showAddressList();
          } else {
            this.addNewAddress();
          }
        }
      });
    },
    // 显示地址列表
    showAddressList() {
      const addresses = [
        {
          id: 1,
          name: "张三",
          phone: "138****8888",
          province: "北京市",
          city: "北京市",
          district: "朝阳区",
          detail: "建国路88号现代城B座3层",
          fullAddress: "北京市朝阳区建国路88号现代城B座3层"
        },
        {
          id: 2,
          name: "李四",
          phone: "139****9999",
          province: "上海市",
          city: "上海市",
          district: "浦东新区",
          detail: "陆家嘴金融贸易区世纪大道100号",
          fullAddress: "上海市浦东新区陆家嘴金融贸易区世纪大道100号"
        }
      ];
      common_vendor.index.showActionSheet({
        itemList: addresses.map((addr) => `${addr.name} ${addr.phone} ${addr.fullAddress}`),
        success: (res) => {
          this.selectedAddress = addresses[res.tapIndex];
        }
      });
    },
    // 添加新地址
    addNewAddress() {
      common_vendor.index.showModal({
        title: "添加地址",
        content: "请填写收货地址信息",
        editable: true,
        placeholderText: "姓名/电话/详细地址",
        success: (res) => {
          if (res.confirm && res.content) {
            const newAddress = {
              id: Date.now(),
              name: "新用户",
              phone: "138****0000",
              province: "北京市",
              city: "北京市",
              district: "海淀区",
              detail: res.content,
              fullAddress: `北京市海淀区${res.content}`
            };
            this.selectedAddress = newAddress;
            common_vendor.index.showToast({
              title: "地址添加成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 加载默认地址
    loadDefaultAddress() {
      this.selectedAddress = {
        id: 1,
        name: "张三",
        phone: "138****8888",
        province: "北京市",
        city: "北京市",
        district: "朝阳区",
        detail: "建国路88号现代城B座3层",
        fullAddress: "北京市朝阳区建国路88号现代城B座3层"
      };
    },
    // 选择配送方式
    selectDelivery(delivery) {
      this.selectedDelivery = delivery.value;
    },
    // 选择支付方式
    selectPayment(payment) {
      this.selectedPayment = payment.value;
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
      common_vendor.index.showModal({
        title: "确认订单",
        content: `确认购买 ${this.orderInfo.product.name} × ${this.orderInfo.quantity} 件？
总金额：¥${this.totalAmount}`,
        success: (res) => {
          if (res.confirm) {
            this.processPayment();
          }
        }
      });
    },
    // 处理支付
    processPayment() {
      common_vendor.index.showLoading({
        title: "正在处理..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        const orderNo = "ORD" + Date.now();
        const orderData = {
          orderNo,
          product: this.orderInfo.product,
          quantity: this.orderInfo.quantity,
          specName: this.orderInfo.specName,
          totalAmount: this.totalAmount,
          address: this.selectedAddress,
          delivery: this.deliveryOptions.find((d) => d.value === this.selectedDelivery),
          payment: this.paymentOptions.find((p) => p.value === this.selectedPayment),
          remark: this.orderInfo.remark,
          createTime: (/* @__PURE__ */ new Date()).toLocaleString(),
          status: "paid",
          statusText: "已支付"
        };
        this.saveOrder(orderData);
        common_vendor.index.showModal({
          title: "支付成功",
          content: `订单号：${orderNo}
支付金额：¥${this.totalAmount}`,
          showCancel: false,
          confirmText: "查看订单",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: `/pages/shop/order-detail?orderData=${encodeURIComponent(JSON.stringify(orderData))}`
              });
            }
          }
        });
      }, 2e3);
    },
    // 保存订单
    saveOrder(orderData) {
      let orders = common_vendor.index.getStorageSync("orders") || [];
      orders.unshift(orderData);
      common_vendor.index.setStorageSync("orders", orders);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.orderInfo.product.image,
    b: common_vendor.t($data.orderInfo.product.name),
    c: common_vendor.t($data.orderInfo.product.description),
    d: $data.orderInfo.specName
  }, $data.orderInfo.specName ? {
    e: common_vendor.t($data.orderInfo.specName)
  } : {}, {
    f: common_vendor.t($data.orderInfo.product.price),
    g: $data.orderInfo.product.originalPrice
  }, $data.orderInfo.product.originalPrice ? {
    h: common_vendor.t($data.orderInfo.product.originalPrice)
  } : {}, {
    i: common_vendor.o((...args) => $options.decreaseQuantity && $options.decreaseQuantity(...args)),
    j: $data.orderInfo.quantity <= 1,
    k: common_vendor.t($data.orderInfo.quantity),
    l: common_vendor.o((...args) => $options.increaseQuantity && $options.increaseQuantity(...args)),
    m: $data.orderInfo.quantity >= $data.orderInfo.product.stock,
    n: $data.selectedAddress
  }, $data.selectedAddress ? {
    o: common_vendor.t($data.selectedAddress.name),
    p: common_vendor.t($data.selectedAddress.phone),
    q: common_vendor.t($data.selectedAddress.fullAddress)
  } : {}, {
    r: common_vendor.o((...args) => $options.selectAddress && $options.selectAddress(...args)),
    s: common_vendor.f($data.deliveryOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.name),
        b: common_vendor.t(option.desc),
        c: common_vendor.t(option.price),
        d: index,
        e: $data.selectedDelivery === option.value ? 1 : "",
        f: common_vendor.o(($event) => $options.selectDelivery(option), index)
      };
    }),
    t: common_vendor.f($data.paymentOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.icon),
        b: common_vendor.t(option.name),
        c: common_vendor.t(option.desc),
        d: index,
        e: $data.selectedPayment === option.value ? 1 : "",
        f: common_vendor.o(($event) => $options.selectPayment(option), index)
      };
    }),
    v: $data.orderInfo.remark,
    w: common_vendor.o(($event) => $data.orderInfo.remark = $event.detail.value),
    x: common_vendor.t($data.orderInfo.remark.length),
    y: common_vendor.t($data.orderInfo.product.price * $data.orderInfo.quantity),
    z: $data.orderInfo.specPrice > 0
  }, $data.orderInfo.specPrice > 0 ? {
    A: common_vendor.t($data.orderInfo.specPrice * $data.orderInfo.quantity)
  } : {}, {
    B: common_vendor.t($options.selectedDeliveryPrice),
    C: common_vendor.t($options.totalAmount),
    D: common_vendor.t($options.totalAmount),
    E: common_vendor.o((...args) => $options.submitOrder && $options.submitOrder(...args)),
    F: !$options.canSubmit
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/purchase.js.map
