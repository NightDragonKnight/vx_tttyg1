"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      product: {
        id: 1,
        name: "VR眼镜套装",
        description: "高清VR眼镜，沉浸式体验，支持多平台游戏和应用",
        price: 299,
        originalPrice: 399,
        image: "/static/image/day/VR体验馆.jpg",
        images: [
          "/static/image/day/VR体验馆.jpg",
          "/static/componentIndex.png",
          "/static/templateIndex.png"
        ],
        category: "vr",
        sales: 156,
        rating: 4.8,
        stock: 50,
        specs: [
          { name: "标准版", value: "standard", price: 0 },
          { name: "豪华版", value: "premium", price: 50 },
          { name: "专业版", value: "pro", price: 100 }
        ],
        detail: "产品特点：\n• 高清显示，沉浸式体验\n• 轻量化设计，佩戴舒适\n• 支持多平台游戏和应用\n• 内置音频系统\n• 可调节瞳距和焦距\n\n包装清单：\n• VR眼镜主机\n• 手柄控制器\n• 充电线\n• 说明书\n• 清洁布"
      },
      selectedSpec: "standard",
      quantity: 1
    };
  },
  onLoad(options) {
    if (options.product) {
      try {
        const productData = JSON.parse(decodeURIComponent(options.product));
        this.product = { ...this.product, ...productData };
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/shop/product-detail.vue:113", "解析商品数据失败:", e);
      }
    }
  },
  methods: {
    // 计算折扣
    getDiscount() {
      if (!this.product.originalPrice)
        return 10;
      const discount = Math.round(this.product.price / this.product.originalPrice * 10);
      return discount;
    },
    // 选择规格
    selectSpec(spec) {
      this.selectedSpec = spec.value;
    },
    // 减少数量
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    // 增加数量
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    },
    // 计算总价
    calculateTotalPrice() {
      var _a;
      const basePrice = this.product.price;
      const selectedSpec = (_a = this.product.specs) == null ? void 0 : _a.find((s) => s.value === this.selectedSpec);
      const specPrice = selectedSpec ? selectedSpec.price : 0;
      return (basePrice + specPrice) * this.quantity;
    },
    // 立即购买
    buyNow() {
      var _a;
      const selectedSpec = (_a = this.product.specs) == null ? void 0 : _a.find((s) => s.value === this.selectedSpec);
      const orderData = {
        ...this.product,
        specName: selectedSpec ? selectedSpec.name : "标准版",
        specPrice: selectedSpec ? selectedSpec.price : 0
      };
      common_vendor.index.navigateTo({
        url: `/pages/shop/purchase?product=${encodeURIComponent(JSON.stringify(orderData))}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.product.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    }),
    b: common_vendor.t($data.product.price),
    c: $data.product.originalPrice
  }, $data.product.originalPrice ? {
    d: common_vendor.t($data.product.originalPrice)
  } : {}, {
    e: $data.product.originalPrice
  }, $data.product.originalPrice ? {
    f: common_vendor.t($options.getDiscount())
  } : {}, {
    g: common_vendor.t($data.product.name),
    h: common_vendor.t($data.product.description),
    i: common_vendor.t($data.product.sales),
    j: common_vendor.t($data.product.rating),
    k: common_vendor.t($data.product.stock),
    l: $data.product.specs
  }, $data.product.specs ? {
    m: common_vendor.f($data.product.specs, (spec, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(spec.name),
        b: spec.price
      }, spec.price ? {
        c: common_vendor.t(spec.price)
      } : {}, {
        d: index,
        e: $data.selectedSpec === spec.value ? 1 : "",
        f: common_vendor.o(($event) => $options.selectSpec(spec), index)
      });
    })
  } : {}, {
    n: common_vendor.o((...args) => $options.decreaseQuantity && $options.decreaseQuantity(...args)),
    o: $data.quantity <= 1,
    p: common_vendor.t($data.quantity),
    q: common_vendor.o((...args) => $options.increaseQuantity && $options.increaseQuantity(...args)),
    r: $data.quantity >= $data.product.stock,
    s: common_vendor.t($data.product.detail || "暂无详细信息"),
    t: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/product-detail.js.map
