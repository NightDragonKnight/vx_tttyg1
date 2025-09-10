"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      storeInfo: {
        name: "朝阳VR体验馆",
        address: "北京市朝阳区建国路88号",
        phone: "010-12345678"
      },
      currentProduct: {
        id: 1,
        name: "VR虚拟现实体验",
        description: "沉浸式虚拟现实体验，带你进入全新的数字世界",
        price: 199,
        package1Price: 299,
        package2Price: 399,
        package3Price: 499,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        videoPoster: "/static/image/day/VR体验馆.jpg",
        images: [
          "/static/image/day/VR体验馆.jpg",
          "/static/image/day/VR体验馆.jpg",
          "/static/image/day/VR体验馆.jpg"
        ]
      },
      products: [
        {
          id: 1,
          name: "VR体验",
          description: "虚拟现实",
          price: 80,
          thumbnail: "/static/image/day/VR体验馆.jpg",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/image/day/VR体验馆.jpg",
          images: [
            "/static/image/day/VR体验馆.jpg",
            "/static/componentIndex.png",
            "/static/templateIndex.png"
          ]
        },
        {
          id: 2,
          name: "AR体验",
          description: "增强现实",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/componentIndex.png",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          videoPoster: "/static/componentIndex.png",
          images: [
            "/static/componentIndex.png",
            "/static/image/day/VR体验馆.jpg",
            "/static/extuiIndex.png"
          ]
        },
        {
          id: 3,
          name: "MR体验",
          description: "混合现实",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/extuiIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/extuiIndex.png",
          images: [
            "/static/extuiIndex.png",
            "/static/templateIndex.png",
            "/static/image/day/VR体验馆.jpg"
          ]
        },
        {
          id: 4,
          name: "密室逃脱",
          description: "解谜冒险",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/templateIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/templateIndex.png",
          images: [
            "/static/templateIndex.png",
            "/static/image/day/VR体验馆.jpg",
            "/static/componentIndex.png"
          ]
        },
        {
          id: 5,
          name: "剧本杀",
          description: "角色扮演",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/extuiIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/extuiIndex.png",
          images: [
            "/static/extuiIndex.png",
            "/static/templateIndex.png",
            "/static/image/day/VR体验馆.jpg"
          ]
        },
        {
          id: 6,
          name: "电竞游戏",
          description: "竞技对战",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/componentIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/componentIndex.png",
          images: [
            "/static/componentIndex.png",
            "/static/image/day/VR体验馆.jpg",
            "/static/extuiIndex.png"
          ]
        },
        {
          id: 7,
          name: "KTV包厢",
          description: "音乐娱乐",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/image/day/VR体验馆.jpg",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/image/day/VR体验馆.jpg",
          images: [
            "/static/image/day/VR体验馆.jpg",
            "/static/componentIndex.png",
            "/static/templateIndex.png"
          ]
        },
        {
          id: 8,
          name: "台球桌球",
          description: "桌球运动",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/templateIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/templateIndex.png",
          images: [
            "/static/templateIndex.png",
            "/static/extuiIndex.png",
            "/static/componentIndex.png"
          ]
        },
        {
          id: 9,
          name: "棋牌室",
          description: "棋牌娱乐",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/extuiIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/extuiIndex.png",
          images: [
            "/static/extuiIndex.png",
            "/static/image/day/VR体验馆.jpg",
            "/static/templateIndex.png"
          ]
        },
        {
          id: 10,
          name: "桌游室",
          description: "桌面游戏",
          price: 199,
          package1Price: 299,
          package2Price: 399,
          package3Price: 499,
          thumbnail: "/static/componentIndex.png",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          videoPoster: "/static/componentIndex.png",
          images: [
            "/static/componentIndex.png",
            "/static/templateIndex.png",
            "/static/image/day/VR体验馆.jpg"
          ]
        }
      ],
      selectedProduct: 1
    };
  },
  onLoad(options) {
    if (options.store) {
      try {
        const store = JSON.parse(decodeURIComponent(options.store));
        this.storeInfo = {
          name: store.name,
          address: store.address,
          phone: store.phone
        };
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:335", "解析门店数据失败:", e);
      }
    }
    if (options.item) {
      try {
        const item = JSON.parse(decodeURIComponent(options.item));
        const matchedProduct = this.products.find((p) => p.name.includes(item.name) || item.name.includes(p.name));
        if (matchedProduct) {
          this.selectProductForDisplay(matchedProduct);
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:347", "解析项目数据失败:", e);
      }
    }
  },
  methods: {
    selectProductForDisplay(product) {
      this.selectedProduct = product.id;
      this.currentProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price || 199,
        package1Price: product.package1Price || 299,
        package2Price: product.package2Price || 399,
        package3Price: product.package3Price || 499,
        videoUrl: product.videoUrl,
        videoPoster: product.videoPoster,
        images: product.images,
        height: product.height || "120-180cm",
        dimensions: product.dimensions || "长200cm × 宽150cm × 高180cm",
        powerType: product.powerType || "电动驱动",
        safetyLevel: product.safetyLevel || "A级安全认证",
        usage: product.usage || "专业工作人员指导操作，请勿自行操作"
      };
    },
    previewVideo() {
      common_vendor.index.navigateTo({
        url: `/pages/video-player/video-player?videoUrl=${encodeURIComponent(this.currentProduct.videoUrl)}&title=${encodeURIComponent(this.currentProduct.name)}`
      });
    },
    previewImage(currentImage, allImages) {
      common_vendor.index.previewImage({
        current: currentImage,
        urls: allImages,
        success: () => {
          common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:384", "预览图片成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:387", "预览图片失败:", err);
          common_vendor.index.showToast({
            title: "预览图片失败",
            icon: "none"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.currentProduct.videoUrl
  }, $data.currentProduct.videoUrl ? {
    b: $data.currentProduct.videoUrl,
    c: $data.currentProduct.videoPoster,
    d: common_vendor.o((...args) => $options.previewVideo && $options.previewVideo(...args))
  } : {}, {
    e: common_vendor.f($data.currentProduct.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.previewImage(image, $data.currentProduct.images), index),
        c: index
      };
    }),
    f: common_vendor.f($data.products, (product, k0, i0) => {
      return {
        a: product.thumbnail,
        b: common_vendor.t(product.name),
        c: product.id,
        d: $data.selectedProduct === product.id ? 1 : "",
        e: common_vendor.o(($event) => $options.selectProductForDisplay(product), product.id)
      };
    }),
    g: common_vendor.t($data.currentProduct.price),
    h: common_vendor.t($data.currentProduct.package1Price),
    i: common_vendor.t($data.currentProduct.package2Price),
    j: common_vendor.t($data.currentProduct.package3Price),
    k: common_vendor.t($data.currentProduct.height || "120-180cm"),
    l: common_vendor.t($data.currentProduct.dimensions || "长200cm × 宽150cm × 高180cm"),
    m: common_vendor.t($data.currentProduct.powerType || "电动驱动"),
    n: common_vendor.t($data.currentProduct.safetyLevel || "A级安全认证"),
    o: common_vendor.t($data.currentProduct.usage || "专业工作人员指导操作，请勿自行操作")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/booking-detail/booking-detail.js.map
