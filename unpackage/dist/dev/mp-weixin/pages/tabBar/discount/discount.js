"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activities: [
        {
          id: 1,
          title: "🎉 新店开业大酬宾",
          description: "庆祝新店开业，全场体验项目享8折优惠，新用户首次体验更享特价！",
          image: "/static/image/day/VR体验馆.jpg",
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          location: "全部门店",
          participants: 1288,
          status: "active",
          statusText: "进行中"
        },
        {
          id: 2,
          title: "🔥 周末狂欢夜",
          description: "每周末晚上18:00-22:00，特色体验项目限时开放，还有神秘嘉宾现场互动！",
          image: "/static/componentIndex.png",
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          location: "旗舰店",
          participants: 856,
          status: "active",
          statusText: "每周进行"
        },
        {
          id: 3,
          title: "💝 生日月专享福利",
          description: "生日当月持身份证享受免费体验一次，还有生日礼品相送！",
          image: "/static/apiIndex.png",
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          location: "全部门店",
          participants: 2156,
          status: "active",
          statusText: "长期有效"
        },
        {
          id: 4,
          title: "🎯 连续签到挑战",
          description: "连续签到7天送体验券，连续签到30天送神秘大礼包！",
          image: "/static/extuiIndex.png",
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          location: "线上活动",
          participants: 3247,
          status: "hot",
          statusText: "火热进行"
        },
        {
          id: 5,
          title: "👥 好友拼团活动",
          description: "邀请好友一起体验，3人团享7折，5人团享6折，团长免费！",
          image: "/static/templateIndex.png",
          startDate: "2024-12-15",
          endDate: "2024-12-25",
          location: "全部门店",
          participants: 567,
          status: "new",
          statusText: "最新活动"
        },
        {
          id: 6,
          title: "🏆 年终盛典",
          description: "年终感恩回馈，VIP会员专享超值套餐，限量发售！",
          image: "/static/image/day/VR体验馆.jpg",
          startDate: "2024-12-20",
          endDate: "2024-12-31",
          location: "全部门店",
          participants: 234,
          status: "coming",
          statusText: "即将开始"
        }
      ]
    };
  },
  methods: {
    viewActivity(activity) {
      common_vendor.index.showModal({
        title: activity.title,
        content: `${activity.description}

活动时间：${activity.startDate} - ${activity.endDate}
活动地点：${activity.location}
已有${activity.participants}人参与`,
        showCancel: false,
        confirmText: "知道了"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.activities, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: common_vendor.t(item.statusText),
        c: common_vendor.n(item.status),
        d: common_vendor.t(item.title),
        e: common_vendor.t(item.description),
        f: common_vendor.t(item.startDate),
        g: common_vendor.t(item.endDate),
        h: item.location
      }, item.location ? {
        i: common_vendor.t(item.location)
      } : {}, {
        j: common_vendor.t(item.participants),
        k: index,
        l: common_vendor.o(($event) => $options.viewActivity(item), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/discount/discount.js.map
