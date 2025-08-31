"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        nickName: "微信用户",
        avatarUrl: "/static/image/default-avatar.png",
        level: "普通会员",
        isLogin: false
      },
      accountInfo: {
        balance: "268.00",
        points: 1560,
        pendingReviews: 3
      },
      quickServices: [
        {
          icon: "💰",
          text: "储值充值",
          action: "recharge",
          bgColor: "#E8F5E8"
        },
        {
          icon: "⭐",
          text: "我的评价",
          action: "reviews",
          bgColor: "#F0F9FF"
        }
      ],
      menuItems: [
        {
          text: "意见反馈",
          icon: "💬",
          action: "feedback"
        },
        {
          text: "关于我们",
          icon: "ℹ️",
          action: "about"
        },
        {
          text: "分佣收入",
          icon: "💎",
          action: "commission"
        },
        {
          text: "加盟我们",
          icon: "🤝",
          action: "franchise"
        },
        {
          text: "保洁专区",
          icon: "🧽",
          action: "cleaning"
        }
      ]
    };
  },
  onShow() {
    this.loadUserInfo();
    this.loadAccountInfo();
  },
  methods: {
    // 获取微信用户信息
    getUserInfo() {
      if (this.userInfo.isLogin) {
        return;
      }
      common_vendor.index.getUserProfile({
        desc: "用于完善个人资料",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/tabBar/profile/profile.vue:155", "获取用户信息成功", res);
          this.userInfo = {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            level: "黄金会员",
            isLogin: true
          };
          common_vendor.index.setStorageSync("userInfo", this.userInfo);
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/tabBar/profile/profile.vue:172", "获取用户信息失败", err);
          common_vendor.index.showToast({
            title: "登录失败",
            icon: "none"
          });
        }
      });
    },
    // 加载用户信息
    loadUserInfo() {
      const savedUserInfo = common_vendor.index.getStorageSync("userInfo");
      if (savedUserInfo) {
        this.userInfo = savedUserInfo;
      }
    },
    // 加载账户信息
    loadAccountInfo() {
      const savedAccountInfo = common_vendor.index.getStorageSync("accountInfo");
      if (savedAccountInfo) {
        this.accountInfo = savedAccountInfo;
      }
    },
    // 分享分佣
    shareCommission() {
      common_vendor.index.showActionSheet({
        itemList: ["分享给微信好友", "分享到朋友圈", "复制邀请链接"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.shareToWechat();
              break;
            case 1:
              this.shareToMoments();
              break;
            case 2:
              this.copyInviteLink();
              break;
          }
        }
      });
    },
    // 分享给微信好友
    shareToWechat() {
      common_vendor.index.showLoading({ title: "分享中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "分享成功",
          icon: "success"
        });
      }, 1500);
    },
    // 分享到朋友圈
    shareToMoments() {
      common_vendor.index.showLoading({ title: "分享中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "分享成功",
          icon: "success"
        });
      }, 1500);
    },
    // 复制邀请链接
    copyInviteLink() {
      const inviteCode = this.generateInviteCode();
      const inviteLink = `https://tttyg.com/invite?code=${inviteCode}`;
      common_vendor.index.setClipboardData({
        data: inviteLink,
        success: () => {
          common_vendor.index.showToast({
            title: "邀请链接已复制",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.showModal({
              title: "邀请链接已复制",
              content: `您的专属邀请码：${inviteCode}

好友通过您的邀请链接注册并消费，您将获得5%的分佣奖励！`,
              showCancel: false,
              confirmText: "知道了"
            });
          }, 1e3);
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none"
          });
        }
      });
    },
    // 生成邀请码
    generateInviteCode() {
      const userId = this.userInfo.nickName || "USER";
      const timestamp = Date.now().toString().slice(-6);
      return `${userId.slice(0, 3).toUpperCase()}${timestamp}`;
    },
    // 处理账户操作
    handleAccountAction(type) {
      if (!this.userInfo.isLogin) {
        this.getUserInfo();
        return;
      }
      switch (type) {
        case "recharge":
          this.showRechargeOptions();
          break;
        case "points":
          common_vendor.index.showToast({ title: "积分商城", icon: "none" });
          break;
        case "reviews":
          this.goToReviews();
          break;
      }
    },
    // 显示充值选项
    showRechargeOptions() {
      common_vendor.index.showActionSheet({
        itemList: ["充值100元", "充值200元", "充值500元", "自定义金额"],
        success: (res) => {
          const amounts = [100, 200, 500, 0];
          const amount = amounts[res.tapIndex];
          if (amount === 0) {
            common_vendor.index.showModal({
              title: "自定义充值",
              content: "请输入充值金额",
              editable: true,
              placeholderText: "请输入金额",
              success: (res2) => {
                if (res2.confirm && res2.content) {
                  this.processRecharge(parseFloat(res2.content));
                }
              }
            });
          } else {
            this.processRecharge(amount);
          }
        }
      });
    },
    // 处理充值
    processRecharge(amount) {
      if (amount <= 0 || isNaN(amount)) {
        common_vendor.index.showToast({
          title: "请输入有效金额",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "确认充值",
        content: `确定要充值￥${amount}元吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({ title: "支付中..." });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              const currentBalance = parseFloat(this.accountInfo.balance);
              this.accountInfo.balance = (currentBalance + amount).toFixed(2);
              this.accountInfo.points += Math.floor(amount);
              common_vendor.index.setStorageSync("accountInfo", this.accountInfo);
              common_vendor.index.showToast({
                title: "充值成功",
                icon: "success"
              });
            }, 2e3);
          }
        }
      });
    },
    // 处理快捷服务点击
    handleServiceClick(item) {
      if (!this.userInfo.isLogin) {
        this.getUserInfo();
        return;
      }
      this.handleAccountAction(item.action);
    },
    // 处理菜单点击
    handleMenuClick(item) {
      if (!this.userInfo.isLogin && item.action !== "about") {
        this.getUserInfo();
        return;
      }
      switch (item.action) {
        case "feedback":
          this.showFeedback();
          break;
        case "about":
          this.showAbout();
          break;
        case "commission":
          this.showCommission();
          break;
        case "franchise":
          this.showFranchise();
          break;
        case "cleaning":
          this.showCleaningArea();
          break;
      }
    },
    // 去评价页面
    goToReviews() {
      if (this.accountInfo.pendingReviews === 0) {
        common_vendor.index.showToast({
          title: "暂无待评价订单",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({ title: "跳转到评价页面", icon: "none" });
    },
    // 意见反馈
    showFeedback() {
      common_vendor.index.showModal({
        title: "意见反馈",
        content: "请描述您的意见或建议",
        editable: true,
        placeholderText: "请输入您的反馈内容...",
        success: (res) => {
          if (res.confirm && res.content) {
            common_vendor.index.showLoading({ title: "提交中..." });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "反馈提交成功",
                icon: "success"
              });
            }, 1500);
          }
        }
      });
    },
    // 关于我们
    showAbout() {
      common_vendor.index.showModal({
        title: "关于我们",
        content: "天天体验馆\n\n致力于为用户提供最优质的体验服务，包括VR体验、密室逃脱、台球、棋牌等多种娱乐项目。\n\n联系我们：400-123-4567\n地址：北京市朝阳区建国路88号",
        showCancel: false,
        confirmText: "知道了"
      });
    },
    // 分佣收入
    showCommission() {
      common_vendor.index.showModal({
        title: "分佣收入",
        content: "当前分佣收入：¥1,280.50\n本月收入：¥320.80\n\n邀请好友体验即可获得分佣奖励！",
        confirmText: "查看详情",
        cancelText: "关闭",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "跳转到分佣详情页",
              icon: "none"
            });
          }
        }
      });
    },
    // 加盟我们
    showFranchise() {
      common_vendor.index.showActionSheet({
        itemList: ["了解加盟政策", "申请加盟", "联系招商经理"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.showFranchisePolicy();
              break;
            case 1:
              this.applyFranchise();
              break;
            case 2:
              this.contactFranchiseManager();
              break;
          }
        }
      });
    },
    // 了解加盟政策
    showFranchisePolicy() {
      common_vendor.index.showModal({
        title: "加盟政策",
        content: "天天体验馆加盟优势：\n\n• 品牌授权使用\n• 整店输出模式\n• 专业运营指导\n• 区域保护政策\n• 持续培训支持\n\n加盟费用：20-50万\n预期回本周期：12-18个月",
        confirmText: "了解更多",
        cancelText: "关闭",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "跳转到加盟详情页",
              icon: "none"
            });
          }
        }
      });
    },
    // 申请加盟
    applyFranchise() {
      common_vendor.index.showModal({
        title: "申请加盟",
        content: "请填写您的基本信息",
        editable: true,
        placeholderText: "姓名/联系方式/意向城市",
        success: (res) => {
          if (res.confirm && res.content) {
            common_vendor.index.showLoading({ title: "提交中..." });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showModal({
                title: "申请提交成功",
                content: "我们的招商经理将在24小时内与您联系，请保持电话畅通。",
                showCancel: false,
                confirmText: "知道了"
              });
            }, 1500);
          }
        }
      });
    },
    // 联系招商经理
    contactFranchiseManager() {
      common_vendor.index.showActionSheet({
        itemList: ["拨打招商热线 400-888-9999", "微信咨询", "在线客服"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              common_vendor.index.makePhoneCall({
                phoneNumber: "400-888-9999",
                success: () => {
                  common_vendor.index.__f__("log", "at pages/tabBar/profile/profile.vue:554", "拨打招商热线成功");
                },
                fail: () => {
                  common_vendor.index.showToast({
                    title: "拨打失败",
                    icon: "none"
                  });
                }
              });
              break;
            case 1:
              common_vendor.index.showToast({
                title: "微信号：tttyg2024",
                icon: "none",
                duration: 3e3
              });
              break;
            case 2:
              common_vendor.index.showToast({
                title: "在线客服",
                icon: "none"
              });
              break;
          }
        }
      });
    },
    // 保洁专区
    showCleaningArea() {
      common_vendor.index.showActionSheet({
        itemList: ["提交保洁需求", "查看保洁进度", "保洁服务评价"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              common_vendor.index.showToast({
                title: "提交保洁需求",
                icon: "none"
              });
              break;
            case 1:
              common_vendor.index.showToast({
                title: "查看保洁进度",
                icon: "none"
              });
              break;
            case 2:
              common_vendor.index.showToast({
                title: "保洁服务评价",
                icon: "none"
              });
              break;
          }
        }
      });
    },
    // 退出登录
    logout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            this.userInfo = {
              nickName: "微信用户",
              avatarUrl: "/static/image/default-avatar.png",
              level: "普通会员",
              isLogin: false
            };
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatarUrl,
    b: common_vendor.t($data.userInfo.nickName),
    c: common_vendor.t($data.userInfo.level),
    d: !$data.userInfo.isLogin
  }, !$data.userInfo.isLogin ? {} : {}, {
    e: $data.userInfo.isLogin
  }, $data.userInfo.isLogin ? {
    f: common_vendor.o((...args) => $options.shareCommission && $options.shareCommission(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args)),
    h: common_vendor.t($data.accountInfo.balance),
    i: common_vendor.o(($event) => $options.handleAccountAction("recharge")),
    j: common_vendor.t($data.accountInfo.points),
    k: common_vendor.o(($event) => $options.handleAccountAction("points")),
    l: common_vendor.t($data.accountInfo.pendingReviews),
    m: common_vendor.o(($event) => $options.handleAccountAction("reviews")),
    n: common_vendor.f($data.quickServices, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: item.bgColor,
        c: common_vendor.t(item.text),
        d: index,
        e: common_vendor.o(($event) => $options.handleServiceClick(item), index)
      };
    }),
    o: common_vendor.f($data.menuItems, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.text),
        c: item.badge
      }, item.badge ? {
        d: common_vendor.t(item.badge)
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.handleMenuClick(item), index)
      });
    }),
    p: $data.userInfo.isLogin
  }, $data.userInfo.isLogin ? {
    q: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/profile/profile.js.map
