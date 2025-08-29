"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentCategory: 0,
      categories: [
        { name: "账户充值", id: "recharge" },
        { name: "团购优惠", id: "group" },
        { name: "体验中心", id: "experience" },
        { name: "特邀嘉宾", id: "vip" }
      ],
      discounts: {
        recharge: [
          {
            title: "充值100送20",
            description: "充值满100元，赠送20元体验券",
            originalPrice: "100",
            currentPrice: "120",
            image: "/static/componentIndex.png",
            tag: "限时特惠",
            validDate: "2024-12-31"
          },
          {
            title: "充值200送50",
            description: "充值满200元，赠送50元体验券",
            originalPrice: "200",
            currentPrice: "250",
            image: "/static/apiIndex.png",
            tag: "新用户专享",
            validDate: "2024-12-31"
          },
          {
            title: "充值500送150",
            description: "充值满500元，赠送150元体验券",
            originalPrice: "500",
            currentPrice: "650",
            image: "/static/extuiIndex.png",
            tag: "会员专享",
            validDate: "2024-12-31"
          }
        ],
        group: [
          {
            title: "VR体验团购",
            description: "5人团购，每人立减30元",
            originalPrice: "80",
            currentPrice: "50",
            image: "/static/templateIndex.png",
            tag: "团购特惠",
            validDate: "2024-12-31"
          },
          {
            title: "密室逃脱团购",
            description: "3人团购，每人立减40元",
            originalPrice: "120",
            currentPrice: "80",
            image: "/static/image/day/密室逃脱.jpg",
            tag: "限时抢购",
            validDate: "2024-12-31"
          }
        ],
        experience: [
          {
            title: "VR体验馆",
            description: "沉浸式虚拟现实体验",
            originalPrice: "80",
            currentPrice: "60",
            image: "/static/image/day/VR体验馆.jpg",
            tag: "体验推荐",
            validDate: "2024-12-31"
          },
          {
            title: "棋牌室",
            description: "休闲娱乐棋牌游戏",
            originalPrice: "60",
            currentPrice: "45",
            image: "/static/image/day/棋牌1.jpg",
            tag: "热门体验",
            validDate: "2024-12-31"
          },
          {
            title: "台球室",
            description: "专业台球体验",
            originalPrice: "50",
            currentPrice: "35",
            image: "/static/image/day/台球1.png",
            tag: "新项目",
            validDate: "2024-12-31"
          }
        ],
        vip: [
          {
            title: "VIP专享体验",
            description: "特邀嘉宾专享的豪华体验套餐",
            originalPrice: "300",
            currentPrice: "200",
            image: "/static/componentIndex.png",
            tag: "VIP专享",
            validDate: "2024-12-31"
          },
          {
            title: "私人定制服务",
            description: "为特邀嘉宾提供个性化定制服务",
            originalPrice: "500",
            currentPrice: "350",
            image: "/static/apiIndex.png",
            tag: "专属服务",
            validDate: "2024-12-31"
          },
          {
            title: "贵宾休息室",
            description: "独立休息空间，提供免费饮品",
            originalPrice: "100",
            currentPrice: "0",
            image: "/static/extuiIndex.png",
            tag: "免费体验",
            validDate: "2024-12-31"
          }
        ]
      }
    };
  },
  computed: {
    currentDiscounts() {
      const categoryId = this.categories[this.currentCategory].id;
      return this.discounts[categoryId] || [];
    }
  },
  methods: {
    switchCategory(index) {
      this.currentCategory = index;
    },
    getDiscount(item) {
      common_vendor.index.showToast({
        title: "领取成功",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: $data.currentCategory === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchCategory(index), index)
      };
    }),
    b: common_vendor.f($options.currentDiscounts, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.tag
      }, item.tag ? {
        c: common_vendor.t(item.tag)
      } : {}, {
        d: common_vendor.t(item.title),
        e: common_vendor.t(item.description),
        f: common_vendor.t(item.originalPrice),
        g: common_vendor.t(item.currentPrice),
        h: common_vendor.t(item.validDate),
        i: common_vendor.o(($event) => $options.getDiscount(item), index),
        j: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/discount/discount.js.map
