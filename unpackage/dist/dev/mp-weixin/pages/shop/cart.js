"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      cartItems: [],
      isEditMode: false
    };
  },
  computed: {
    // 是否全选
    isAllSelected() {
      return this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
    },
    // 选中商品数量
    selectedCount() {
      return this.cartItems.filter((item) => item.selected).length;
    },
    // 总价
    totalPrice() {
      return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },
  onShow() {
    this.loadCartItems();
  },
  methods: {
    // 加载购物车数据
    loadCartItems() {
      const cart = common_vendor.index.getStorageSync("cart") || [];
      this.cartItems = cart.map((item) => ({
        ...item,
        selected: true
        // 默认选中
      }));
    },
    // 切换编辑模式
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    // 切换商品选择
    toggleSelect(index) {
      this.cartItems[index].selected = !this.cartItems[index].selected;
      this.updateCart();
    },
    // 全选/取消全选
    toggleSelectAll() {
      const newState = !this.isAllSelected;
      this.cartItems.forEach((item) => {
        item.selected = newState;
      });
      this.updateCart();
    },
    // 减少数量
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.updateCart();
      }
    },
    // 增加数量
    increaseQuantity(index) {
      if (this.cartItems[index].quantity < this.cartItems[index].stock) {
        this.cartItems[index].quantity++;
        this.updateCart();
      }
    },
    // 删除商品
    removeItem(index) {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这个商品吗？",
        success: (res) => {
          if (res.confirm) {
            this.cartItems.splice(index, 1);
            this.updateCart();
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    // 更新购物车存储
    updateCart() {
      common_vendor.index.setStorageSync("cart", this.cartItems);
    },
    // 去购物
    goShopping() {
      common_vendor.index.navigateBack();
    },
    // 结算
    checkout() {
      const selectedItems = this.cartItems.filter((item) => item.selected);
      if (selectedItems.length === 0) {
        common_vendor.index.showToast({
          title: "请选择要结算的商品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/shop/checkout?items=${encodeURIComponent(JSON.stringify(selectedItems))}&type=cart`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.isEditMode ? "完成" : "编辑"),
    b: common_vendor.o((...args) => $options.toggleEditMode && $options.toggleEditMode(...args)),
    c: $data.cartItems.length > 0
  }, $data.cartItems.length > 0 ? {
    d: common_vendor.f($data.cartItems, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.selected ? "✓" : ""),
        b: item.selected ? 1 : "",
        c: common_vendor.o(($event) => $options.toggleSelect(index), index),
        d: item.image,
        e: common_vendor.t(item.name),
        f: item.specName
      }, item.specName ? {
        g: common_vendor.t(item.specName)
      } : {}, {
        h: common_vendor.t(item.price),
        i: item.originalPrice
      }, item.originalPrice ? {
        j: common_vendor.t(item.originalPrice)
      } : {}, {
        k: common_vendor.o(($event) => $options.decreaseQuantity(index), index),
        l: item.quantity <= 1,
        m: common_vendor.t(item.quantity),
        n: common_vendor.o(($event) => $options.increaseQuantity(index), index),
        o: item.quantity >= item.stock
      }, $data.isEditMode ? {
        p: common_vendor.o(($event) => $options.removeItem(index), index)
      } : {}, {
        q: index
      });
    }),
    e: $data.isEditMode
  } : {
    f: common_vendor.o((...args) => $options.goShopping && $options.goShopping(...args))
  }, {
    g: $data.cartItems.length > 0
  }, $data.cartItems.length > 0 ? {
    h: common_vendor.t($options.isAllSelected ? "✓" : ""),
    i: $options.isAllSelected ? 1 : "",
    j: common_vendor.o((...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args)),
    k: common_vendor.t($options.totalPrice),
    l: common_vendor.t($options.selectedCount),
    m: common_vendor.t($options.selectedCount),
    n: common_vendor.o((...args) => $options.checkout && $options.checkout(...args)),
    o: $options.selectedCount === 0
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop/cart.js.map
