"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      selectedCategory: "all",
      sortType: "default",
      cartCount: 0,
      categories: [
        { id: "all", name: "全部", icon: "🏪" },
        { id: "vr", name: "VR设备", icon: "🥽" },
        { id: "gaming", name: "游戏设备", icon: "🎮" },
        { id: "accessories", name: "配件", icon: "🔧" },
        { id: "clothing", name: "服装", icon: "👕" },
        { id: "drinks", name: "饮品", icon: "🥤" },
        { id: "snacks", name: "零食", icon: "🍿" }
      ],
      products: [
        {
          id: 1,
          name: "VR眼镜套装",
          description: "高清VR眼镜，沉浸式体验",
          price: 299,
          originalPrice: 399,
          image: "/static/image/day/VR体验馆.jpg",
          category: "vr",
          sales: 156,
          rating: 4.8,
          stock: 50
        },
        {
          id: 2,
          name: "游戏手柄",
          description: "无线游戏手柄，支持多平台",
          price: 89,
          originalPrice: 129,
          image: "/static/componentIndex.png",
          category: "gaming",
          sales: 234,
          rating: 4.6,
          stock: 100
        },
        {
          id: 3,
          name: "VR手柄",
          description: "VR专用手柄，精准定位",
          price: 199,
          image: "/static/templateIndex.png",
          category: "accessories",
          sales: 89,
          rating: 4.7,
          stock: 30
        },
        {
          id: 4,
          name: "体验馆T恤",
          description: "舒适面料，时尚设计",
          price: 59,
          originalPrice: 79,
          image: "/static/extuiIndex.png",
          category: "clothing",
          sales: 67,
          rating: 4.5,
          stock: 200
        },
        {
          id: 5,
          name: "能量饮料",
          description: "提神醒脑，补充能量",
          price: 8,
          image: "/static/image/day/VR体验馆.jpg",
          category: "drinks",
          sales: 456,
          rating: 4.3,
          stock: 500
        },
        {
          id: 6,
          name: "爆米花",
          description: "香脆可口，观影必备",
          price: 12,
          image: "/static/componentIndex.png",
          category: "snacks",
          sales: 234,
          rating: 4.4,
          stock: 300
        },
        {
          id: 7,
          name: "VR头显支架",
          description: "可调节支架，舒适体验",
          price: 45,
          image: "/static/templateIndex.png",
          category: "accessories",
          sales: 123,
          rating: 4.6,
          stock: 80
        },
        {
          id: 8,
          name: "游戏耳机",
          description: "立体声耳机，游戏体验更佳",
          price: 159,
          originalPrice: 199,
          image: "/static/extuiIndex.png",
          category: "gaming",
          sales: 178,
          rating: 4.7,
          stock: 60
        }
      ]
    };
  },
  computed: {
    selectedCategoryName() {
      const category = this.categories.find((c) => c.id === this.selectedCategory);
      return category ? category.name : "全部";
    },
    filteredProducts() {
      let result = this.products;
      if (this.selectedCategory !== "all") {
        result = result.filter((item) => item.category === this.selectedCategory);
      }
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase();
        result = result.filter(
          (item) => item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword)
        );
      }
      result = this.sortProducts(result);
      return result;
    }
  },
  onLoad() {
    this.loadCartCount();
  },
  methods: {
    // 加载购物车数量
    loadCartCount() {
      const cart = common_vendor.index.getStorageSync("cart") || [];
      this.cartCount = cart.length;
    },
    // 搜索输入
    onSearchInput() {
    },
    // 执行搜索
    search() {
      common_vendor.index.__f__("log", "at pages/shop/shop.vue:259", "搜索关键词:", this.searchKeyword);
    },
    // 选择分类
    selectCategory(category) {
      this.selectedCategory = category.id;
    },
    // 改变排序
    changeSort(type) {
      this.sortType = type;
    },
    // 排序商品
    sortProducts(products) {
      switch (this.sortType) {
        case "price":
          return products.sort((a, b) => a.price - b.price);
        case "sales":
          return products.sort((a, b) => b.sales - a.sales);
        default:
          return products;
      }
    },
    // 查看商品详情
    viewProductDetail(product) {
      common_vendor.index.navigateTo({
        url: `/pages/shop/product-detail?product=${encodeURIComponent(JSON.stringify(product))}`
      });
    },
    // 立即购买
    buyNow(product) {
      common_vendor.index.navigateTo({
        url: `/pages/shop/checkout?product=${encodeURIComponent(JSON.stringify(product))}&type=buy_now`
      });
    },
    // 添加到购物车
    addToCart(product) {
      let cart = common_vendor.index.getStorageSync("cart") || [];
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      common_vendor.index.setStorageSync("cart", cart);
      this.cartCount = cart.length;
      common_vendor.index.showToast({
        title: "已添加到购物车",
        icon: "success"
      });
    },
    // 查看购物车
    viewCart() {
      common_vendor.index.navigateTo({
        url: "/pages/shop/cart"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.onSearchInput && $options.onSearchInput(...args)]),
    b: $data.searchKeyword,
    c: common_vendor.o((...args) => $options.search && $options.search(...args)),
    d: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category.icon),
        b: common_vendor.t(category.name),
        c: index,
        d: $data.selectedCategory === category.id ? 1 : "",
        e: common_vendor.o(($event) => $options.selectCategory(category), index)
      };
    }),
    e: common_vendor.t($options.selectedCategoryName),
    f: $data.sortType === "default" ? 1 : "",
    g: common_vendor.o(($event) => $options.changeSort("default")),
    h: $data.sortType === "price" ? 1 : "",
    i: common_vendor.o(($event) => $options.changeSort("price")),
    j: $data.sortType === "sales" ? 1 : "",
    k: common_vendor.o(($event) => $options.changeSort("sales")),
    l: common_vendor.f($options.filteredProducts, (product, index, i0) => {
      return common_vendor.e({
        a: product.image,
        b: common_vendor.t(product.name),
        c: common_vendor.t(product.description),
        d: common_vendor.t(product.sales),
        e: common_vendor.t(product.rating),
        f: common_vendor.t(product.price),
        g: product.originalPrice
      }, product.originalPrice ? {
        h: common_vendor.t(product.originalPrice)
      } : {}, {
        i: common_vendor.o(($event) => $options.buyNow(product), index),
        j: common_vendor.o(($event) => $options.addToCart(product), index),
        k: index,
        l: common_vendor.o(($event) => $options.viewProductDetail(product), index)
      });
    }),
    m: $data.cartCount > 0
  }, $data.cartCount > 0 ? {
    n: common_vendor.t($data.cartCount),
    o: common_vendor.o((...args) => $options.viewCart && $options.viewCart(...args))
  } : {}, {
    p: $options.filteredProducts.length === 0
  }, $options.filteredProducts.length === 0 ? {
    q: common_vendor.t($data.searchKeyword ? "未找到相关商品" : "该分类暂无商品")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/shop.js.map
