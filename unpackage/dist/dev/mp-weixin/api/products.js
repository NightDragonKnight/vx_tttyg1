"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function getHotProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: 1,
            name: "VR虚拟现实体验",
            image: "/static/image/day/VR体验馆.jpg",
            link: "/pages/tabBar/booking-detail/booking-detail"
          },
          {
            id: 2,
            name: "密室逃脱挑战",
            image: "/static/image/day/密室逃脱.jpg",
            link: "/pages/tabBar/booking-detail/booking-detail"
          },
          {
            id: 3,
            name: "VR头显设备",
            image: "/static/image/day/vr-headset.jpg",
            link: "/pages/shop/product-detail"
          },
          {
            id: 4,
            name: "台球杆套装",
            image: "/static/image/day/台球1.png",
            link: "/pages/shop/product-detail"
          }
        ]
      });
    }, 300);
  });
}
exports.getHotProducts = getHotProducts;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/products.js.map
