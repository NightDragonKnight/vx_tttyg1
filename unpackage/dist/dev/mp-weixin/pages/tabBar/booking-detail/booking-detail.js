"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentStep: 1,
      // 当前页面步骤：1-产品详情，2-选择预订
      selectedPackageType: "",
      // 选择的套餐类型：hourly, package1, package2, package3
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
        ],
        detailImages: [
          { image: "/static/image/day/vr-headset.jpg", name: "VR头显设备" },
          { image: "/static/image/day/escape-room.jpg", name: "密室逃脱" },
          { image: "/static/image/day/gaming.jpg", name: "电玩设备" },
          { image: "/static/image/day/massage-chair.jpg", name: "按摩椅" }
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
          ],
          detailImages: [
            { image: "/static/image/day/vr-headset.jpg", name: "VR头显设备" },
            { image: "/static/image/day/escape-room.jpg", name: "密室逃脱" }
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
          ],
          detailImages: [
            { image: "/static/image/day/ar-glasses.jpg", name: "AR眼镜" },
            { image: "/static/image/day/ar-device.jpg", name: "AR设备" },
            { image: "/static/image/day/ar-interaction.jpg", name: "AR交互" },
            { image: "/static/image/day/ar-display.jpg", name: "AR显示" }
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
          ],
          detailImages: [
            { image: "/static/image/day/mr-device.jpg", name: "MR设备" },
            { image: "/static/image/day/mr-interaction.jpg", name: "MR交互" },
            { image: "/static/image/day/mr-display.jpg", name: "MR显示" },
            { image: "/static/image/day/mr-sensor.jpg", name: "MR传感器" }
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
          ],
          detailImages: [
            { image: "/static/image/day/escape-room.jpg", name: "密室场景" },
            { image: "/static/image/day/puzzle-game.jpg", name: "解谜游戏" },
            { image: "/static/image/day/team-activity.jpg", name: "团队活动" },
            { image: "/static/image/day/escape-equipment.jpg", name: "逃脱设备" }
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
          ],
          detailImages: [
            { image: "/static/image/day/script-killing.jpg", name: "剧本场景" },
            { image: "/static/image/day/role-playing.jpg", name: "角色扮演" },
            { image: "/static/image/day/detective-game.jpg", name: "侦探游戏" },
            { image: "/static/image/day/team-building.jpg", name: "团队建设" }
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
          ],
          detailImages: [
            { image: "/static/image/day/esports-gaming.jpg", name: "电竞设备" },
            { image: "/static/image/day/competitive-game.jpg", name: "竞技游戏" },
            { image: "/static/image/day/gaming-tournament.jpg", name: "游戏比赛" },
            { image: "/static/image/day/team-battle.jpg", name: "团队对战" }
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
          ],
          detailImages: [
            { image: "/static/image/day/ktv-room.jpg", name: "KTV包间" },
            { image: "/static/image/day/karaoke-system.jpg", name: "卡拉OK系统" },
            { image: "/static/image/day/music-entertainment.jpg", name: "音乐娱乐" },
            { image: "/static/image/day/party-room.jpg", name: "派对房间" }
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
          ],
          detailImages: [
            { image: "/static/image/day/billiards-table.jpg", name: "台球桌" },
            { image: "/static/image/day/billiards-cues.jpg", name: "台球杆" },
            { image: "/static/image/day/sports-equipment.jpg", name: "运动设备" },
            { image: "/static/image/day/game-room.jpg", name: "游戏室" }
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
          ],
          detailImages: [
            { image: "/static/image/day/chess-room.jpg", name: "棋牌室" },
            { image: "/static/image/day/chess-game.jpg", name: "棋类游戏" },
            { image: "/static/image/day/card-game.jpg", name: "卡牌游戏" },
            { image: "/static/image/day/leisure-entertainment.jpg", name: "休闲娱乐" }
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
          ],
          detailImages: [
            { image: "/static/image/day/board-game.jpg", name: "桌游" },
            { image: "/static/image/day/table-game.jpg", name: "桌面游戏" },
            { image: "/static/image/day/strategy-game.jpg", name: "策略游戏" },
            { image: "/static/image/day/social-gaming.jpg", name: "社交游戏" }
          ]
        }
      ],
      // 产品明细数据（动态更新）
      productDetails: [],
      selectedProduct: 1,
      availableRooms: [
        {
          id: 1,
          name: "VR体验室A",
          capacity: 1,
          features: ["独立空间", "VR设备", "Wi-Fi"],
          status: "available",
          statusText: "可预约",
          images: [
            "/static/image/day/VR体验馆.jpg",
            "/static/image/day/VR体验馆.jpg"
          ]
        },
        {
          id: 2,
          name: "VR体验室B",
          capacity: 2,
          features: ["独立空间", "VR设备", "Wi-Fi"],
          status: "unavailable",
          statusText: "已满",
          images: [
            "/static/image/day/VR体验馆.jpg",
            "/static/image/day/VR体验馆.jpg"
          ]
        },
        {
          id: 3,
          name: "VR体验室C",
          capacity: 1,
          features: ["独立空间", "VR设备", "Wi-Fi"],
          status: "available",
          statusText: "可预约",
          images: [
            "/static/image/day/VR体验馆.jpg",
            "/static/image/day/VR体验馆.jpg"
          ]
        }
      ],
      selectedRoom: 1,
      currentRoom: {
        images: [
          "/static/image/day/VR体验馆.jpg",
          "/static/image/day/VR体验馆.jpg"
        ]
      },
      // 可选择的时间点（00:00到23:00，每小时一个时间点）
      timeSlots: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      // 已被预订的时间段
      bookedTimeSlots: [
        { start: "10:00", end: "11:00" },
        { start: "15:00", end: "16:00" },
        { start: "18:00", end: "19:00" }
      ],
      // 不同产品的24小时时间段状态
      productTimeSlots: {
        1: [
          // VR体验
          { startTime: "00:00", endTime: "01:00", status: "cleaning", hour: "00" },
          { startTime: "01:00", endTime: "02:00", status: "cleaning", hour: "01" },
          { startTime: "02:00", endTime: "03:00", status: "cleaning", hour: "02" },
          { startTime: "03:00", endTime: "04:00", status: "cleaning", hour: "03" },
          { startTime: "04:00", endTime: "05:00", status: "cleaning", hour: "04" },
          { startTime: "05:00", endTime: "06:00", status: "cleaning", hour: "05" },
          { startTime: "06:00", endTime: "07:00", status: "cleaning", hour: "06" },
          { startTime: "07:00", endTime: "08:00", status: "cleaning", hour: "07" },
          { startTime: "08:00", endTime: "09:00", status: "available", hour: "08" },
          { startTime: "09:00", endTime: "10:00", status: "available", hour: "09" },
          { startTime: "10:00", endTime: "11:00", status: "booked", hour: "10" },
          { startTime: "11:00", endTime: "12:00", status: "available", hour: "11" },
          { startTime: "12:00", endTime: "13:00", status: "cleaning", hour: "12" },
          { startTime: "13:00", endTime: "14:00", status: "cleaning", hour: "13" },
          { startTime: "14:00", endTime: "15:00", status: "available", hour: "14" },
          { startTime: "15:00", endTime: "16:00", status: "booked", hour: "15" },
          { startTime: "16:00", endTime: "17:00", status: "available", hour: "16" },
          { startTime: "17:00", endTime: "18:00", status: "available", hour: "17" },
          { startTime: "18:00", endTime: "19:00", status: "booked", hour: "18" },
          { startTime: "19:00", endTime: "20:00", status: "available", hour: "19" },
          { startTime: "20:00", endTime: "21:00", status: "available", hour: "20" },
          { startTime: "21:00", endTime: "22:00", status: "available", hour: "21" },
          { startTime: "22:00", endTime: "23:00", status: "cleaning", hour: "22" },
          { startTime: "23:00", endTime: "24:00", status: "cleaning", hour: "23" }
        ],
        2: [
          // AR体验
          { startTime: "00:00", endTime: "01:00", status: "cleaning", hour: "00" },
          { startTime: "01:00", endTime: "02:00", status: "cleaning", hour: "01" },
          { startTime: "02:00", endTime: "03:00", status: "cleaning", hour: "02" },
          { startTime: "03:00", endTime: "04:00", status: "cleaning", hour: "03" },
          { startTime: "04:00", endTime: "05:00", status: "cleaning", hour: "04" },
          { startTime: "05:00", endTime: "06:00", status: "cleaning", hour: "05" },
          { startTime: "06:00", endTime: "07:00", status: "cleaning", hour: "06" },
          { startTime: "07:00", endTime: "08:00", status: "cleaning", hour: "07" },
          { startTime: "08:00", endTime: "09:00", status: "booked", hour: "08" },
          { startTime: "09:00", endTime: "10:00", status: "available", hour: "09" },
          { startTime: "10:00", endTime: "11:00", status: "available", hour: "10" },
          { startTime: "11:00", endTime: "12:00", status: "booked", hour: "11" },
          { startTime: "12:00", endTime: "13:00", status: "cleaning", hour: "12" },
          { startTime: "13:00", endTime: "14:00", status: "cleaning", hour: "13" },
          { startTime: "14:00", endTime: "15:00", status: "booked", hour: "14" },
          { startTime: "15:00", endTime: "16:00", status: "available", hour: "15" },
          { startTime: "16:00", endTime: "17:00", status: "available", hour: "16" },
          { startTime: "17:00", endTime: "18:00", status: "booked", hour: "17" },
          { startTime: "18:00", endTime: "19:00", status: "available", hour: "18" },
          { startTime: "19:00", endTime: "20:00", status: "available", hour: "19" },
          { startTime: "20:00", endTime: "21:00", status: "booked", hour: "20" },
          { startTime: "21:00", endTime: "22:00", status: "available", hour: "21" },
          { startTime: "22:00", endTime: "23:00", status: "cleaning", hour: "22" },
          { startTime: "23:00", endTime: "24:00", status: "cleaning", hour: "23" }
        ],
        // 其他产品可以继续添加，暂时使用默认状态
        default: [
          { startTime: "00:00", endTime: "01:00", status: "cleaning", hour: "00" },
          { startTime: "01:00", endTime: "02:00", status: "cleaning", hour: "01" },
          { startTime: "02:00", endTime: "03:00", status: "cleaning", hour: "02" },
          { startTime: "03:00", endTime: "04:00", status: "cleaning", hour: "03" },
          { startTime: "04:00", endTime: "05:00", status: "cleaning", hour: "04" },
          { startTime: "05:00", endTime: "06:00", status: "cleaning", hour: "05" },
          { startTime: "06:00", endTime: "07:00", status: "cleaning", hour: "06" },
          { startTime: "07:00", endTime: "08:00", status: "cleaning", hour: "07" },
          { startTime: "08:00", endTime: "09:00", status: "available", hour: "08" },
          { startTime: "09:00", endTime: "10:00", status: "available", hour: "09" },
          { startTime: "10:00", endTime: "11:00", status: "available", hour: "10" },
          { startTime: "11:00", endTime: "12:00", status: "available", hour: "11" },
          { startTime: "12:00", endTime: "13:00", status: "cleaning", hour: "12" },
          { startTime: "13:00", endTime: "14:00", status: "cleaning", hour: "13" },
          { startTime: "14:00", endTime: "15:00", status: "available", hour: "14" },
          { startTime: "15:00", endTime: "16:00", status: "available", hour: "15" },
          { startTime: "16:00", endTime: "17:00", status: "available", hour: "16" },
          { startTime: "17:00", endTime: "18:00", status: "available", hour: "17" },
          { startTime: "18:00", endTime: "19:00", status: "available", hour: "18" },
          { startTime: "19:00", endTime: "20:00", status: "available", hour: "19" },
          { startTime: "20:00", endTime: "21:00", status: "available", hour: "20" },
          { startTime: "21:00", endTime: "22:00", status: "available", hour: "21" },
          { startTime: "22:00", endTime: "23:00", status: "cleaning", hour: "22" },
          { startTime: "23:00", endTime: "24:00", status: "cleaning", hour: "23" }
        ]
      },
      selectedStartTime: null,
      selectedEndTime: null,
      startTimeIndex: -1,
      endTimeIndex: -1,
      availablePackages: [
        {
          id: 1,
          name: "基础套餐",
          description: "包含基础VR体验设备",
          price: 0,
          // 基础套餐不额外收费
          includes: ["基础VR设备", "标准体验"]
        },
        {
          id: 2,
          name: "高级套餐",
          description: "包含高级VR设备和额外服务",
          price: 50,
          includes: ["高级VR设备", "专业指导", "饮品"]
        },
        {
          id: 3,
          name: "豪华套餐",
          description: "包含顶级VR设备和全套服务",
          price: 100,
          includes: ["顶级VR设备", "专业指导", "饮品", "零食", "专属服务"]
        }
      ],
      selectedPackage: 1,
      selectedDate: "2024-12-15",
      userRemark: ""
      // 用户备注
    };
  },
  computed: {
    productPrice() {
      return this.currentProduct.price;
    },
    packagePrice() {
      const pkg = this.availablePackages.find((p) => p.id === this.selectedPackage);
      return pkg ? pkg.price : 0;
    },
    totalPrice() {
      return this.productPrice + this.packagePrice;
    },
    // 可选择的开始时间（排除已被占用的时间点）
    availableStartTimes() {
      return this.timeSlots.filter((time) => {
        return !this.isTimeUnavailable(time);
      });
    },
    // 可选择的结束时间（基于开始时间）
    availableEndTimes() {
      if (!this.selectedStartTime)
        return [];
      const startIndex = this.timeSlots.findIndex((time) => time === this.selectedStartTime);
      if (startIndex === -1)
        return [];
      const endTimes = [...this.timeSlots.slice(startIndex + 1), "24:00"];
      return endTimes.filter((time) => {
        return this.canSelectTimeRange(this.selectedStartTime, time);
      });
    },
    durationHours() {
      if (!this.selectedStartTime || !this.selectedEndTime)
        return 0;
      const startTime = this.timeToMinutes(this.selectedStartTime);
      const endTime = this.timeToMinutes(this.selectedEndTime);
      const duration = endTime - startTime;
      return Math.round(duration / 60 * 10) / 10;
    },
    canBook() {
      return this.selectedPackageType && this.selectedRoom && this.selectedStartTime && this.selectedEndTime;
    },
    canConfirm() {
      return this.selectedPackageType && this.selectedRoom && this.selectedStartTime && this.selectedEndTime;
    },
    // 根据当前选择的产品返回对应的时间段状态
    hourlyTimeSlots() {
      if (!this.selectedProduct) {
        return this.productTimeSlots.default;
      }
      return this.productTimeSlots[this.selectedProduct] || this.productTimeSlots.default;
    }
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
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:798", "解析门店数据失败:", e);
      }
    }
    if (options.item) {
      try {
        const item = JSON.parse(decodeURIComponent(options.item));
        const matchedProduct = this.products.find((p) => p.name.includes(item.name) || item.name.includes(p.name));
        if (matchedProduct) {
          this.selectProduct(matchedProduct);
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:812", "解析项目数据失败:", e);
      }
    }
    if (this.products.length > 0) {
      this.productDetails = this.products[0].detailImages || [];
    }
  },
  methods: {
    // 页面切换方法
    goToStep1() {
      this.currentStep = 1;
    },
    goToStep2() {
      this.currentStep = 2;
    },
    // 选择套餐方法
    selectPackage(packageType) {
      common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:832", "选择套餐:", packageType);
      this.selectedPackageType = packageType;
      common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:834", "selectedPackageType 已设置为:", this.selectedPackageType);
      this.selectedRoom = null;
      this.selectedStartTime = null;
      this.selectedEndTime = null;
      this.startTimeIndex = -1;
      this.endTimeIndex = -1;
      common_vendor.index.showToast({
        title: "已选择套餐: " + packageType,
        icon: "none",
        duration: 2e3
      });
    },
    // 产品选择显示方法
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
        detailImages: product.detailImages || []
      };
    },
    navigateToStore() {
      common_vendor.index.showToast({
        title: "正在打开导航...",
        icon: "none"
      });
    },
    callStore() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.storeInfo.phone,
        success: () => {
          common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:881", "拨打电话成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    },
    selectProduct(product) {
      this.selectedProduct = product.id;
      this.currentProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        videoUrl: product.videoUrl,
        videoPoster: product.videoPoster,
        images: product.images
      };
      this.selectedRoom = null;
      this.selectedStartTime = null;
      this.selectedEndTime = null;
      this.startTimeIndex = -1;
      this.endTimeIndex = -1;
      this.selectedPackage = null;
    },
    selectRoom(room) {
      if (room.status === "available") {
        this.selectedRoom = room.id;
        this.currentRoom = room;
        this.selectedStartTime = null;
        this.selectedEndTime = null;
        this.startTimeIndex = -1;
        this.endTimeIndex = -1;
        this.selectedPackage = null;
      } else {
        common_vendor.index.showToast({
          title: "该房间暂不可选择",
          icon: "none"
        });
      }
    },
    onStartTimeChange(e) {
      this.startTimeIndex = e.detail.value;
      this.selectedStartTime = this.availableStartTimes[this.startTimeIndex];
      this.selectedEndTime = null;
      this.endTimeIndex = -1;
      this.selectedPackage = null;
    },
    onEndTimeChange(e) {
      this.endTimeIndex = e.detail.value;
      this.selectedEndTime = this.availableEndTimes[this.endTimeIndex];
      this.selectedPackage = null;
    },
    selectPackage(pkg) {
      this.selectedPackage = pkg.id;
    },
    onDateChange(e) {
      this.selectedDate = e.detail.value;
      this.selectedStartTime = null;
      this.selectedEndTime = null;
      this.startTimeIndex = -1;
      this.endTimeIndex = -1;
      this.selectedPackage = null;
    },
    // 时间转换为分钟
    timeToMinutes(timeStr) {
      if (timeStr === "24:00") {
        return 24 * 60;
      }
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    },
    // 分钟转换为时间字符串
    minutesToTime(minutes) {
      if (minutes === 24 * 60) {
        return "24:00";
      }
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
    },
    // 检查时间点是否不可用（在已预订时间段内）
    isTimeUnavailable(time) {
      return this.bookedTimeSlots.some((slot) => {
        const timeMinutes = this.timeToMinutes(time);
        const startMinutes = this.timeToMinutes(slot.start);
        const endMinutes = this.timeToMinutes(slot.end);
        return timeMinutes >= startMinutes && timeMinutes < endMinutes;
      });
    },
    // 检查时间范围是否可选（不跨越已预订时间段）
    canSelectTimeRange(startTime, endTime) {
      const startMinutes = this.timeToMinutes(startTime);
      const endMinutes = this.timeToMinutes(endTime);
      return !this.bookedTimeSlots.some((slot) => {
        const bookedStart = this.timeToMinutes(slot.start);
        const bookedEnd = this.timeToMinutes(slot.end);
        return startMinutes < bookedEnd && endMinutes > bookedStart;
      });
    },
    // 获取时间段的样式类
    getTimeSlotClass(hour) {
      let classes = [];
      classes.push(hour.status);
      if (this.selectedStartTime && this.selectedEndTime) {
        const startMinutes = this.timeToMinutes(this.selectedStartTime);
        const endMinutes = this.timeToMinutes(this.selectedEndTime);
        const hourStartMinutes = this.timeToMinutes(hour.startTime);
        if (hourStartMinutes >= startMinutes && hourStartMinutes < endMinutes) {
          classes.push("selected-range");
        }
      }
      return classes.join(" ");
    },
    // 点击小时时间段
    selectHourlySlot(hour) {
      if (hour.status === "available") {
        if (!this.selectedStartTime) {
          this.selectedStartTime = hour.startTime;
          this.startTimeIndex = this.availableStartTimes.findIndex((time) => time === hour.startTime);
        } else if (!this.selectedEndTime) {
          if (this.timeToMinutes(hour.endTime) > this.timeToMinutes(this.selectedStartTime)) {
            this.selectedEndTime = hour.endTime;
            this.endTimeIndex = this.availableEndTimes.findIndex((time) => time === hour.endTime);
          } else {
            this.selectedStartTime = hour.startTime;
            this.selectedEndTime = null;
            this.startTimeIndex = this.availableStartTimes.findIndex((time) => time === hour.startTime);
            this.endTimeIndex = -1;
          }
        } else {
          this.selectedStartTime = hour.startTime;
          this.selectedEndTime = null;
          this.startTimeIndex = this.availableStartTimes.findIndex((time) => time === hour.startTime);
          this.endTimeIndex = -1;
        }
        this.selectedPackage = null;
      } else {
        let message = "";
        if (hour.status === "booked") {
          message = "该时段已被预订";
        } else if (hour.status === "cleaning") {
          message = "该时段为保洁时间";
        }
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      }
    },
    confirmBooking() {
      if (!this.canBook) {
        common_vendor.index.showToast({
          title: "请完成所有选择",
          icon: "none"
        });
        return;
      }
      const packageInfo = this.availablePackages.find((pkg) => pkg.id === this.selectedPackage);
      const roomInfo = this.availableRooms.find((room) => room.id === this.selectedRoom);
      const timeInfo = `${this.selectedDate} ${this.selectedStartTime}-${this.selectedEndTime}`;
      const remarkText = this.userRemark ? `
备注：${this.userRemark}` : "";
      common_vendor.index.showModal({
        title: "确认预订",
        content: `产品：${this.currentProduct.name}
房间：${roomInfo.name}
预约时间：${timeInfo}
套餐：${packageInfo.name}
总费用：¥${this.totalPrice}${remarkText}

确定预订吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "预订中..."
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "预订成功！",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1500);
            }, 2e3);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.currentStep === 1 ? "产品展示" : "选择预订"),
    b: $data.currentStep === 1 ? 1 : "",
    c: $data.currentStep === 2 ? 1 : "",
    d: $data.currentStep === 1
  }, $data.currentStep === 1 ? {
    e: $data.currentProduct.videoUrl,
    f: $data.currentProduct.videoPoster,
    g: common_vendor.f($data.currentProduct.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    }),
    h: common_vendor.f($data.products, (product, k0, i0) => {
      return {
        a: product.thumbnail,
        b: common_vendor.t(product.name),
        c: product.id,
        d: $data.selectedProduct === product.id ? 1 : "",
        e: common_vendor.o(($event) => $options.selectProductForDisplay(product), product.id)
      };
    }),
    i: common_vendor.t($data.currentProduct.price),
    j: common_vendor.t($data.currentProduct.package1Price),
    k: common_vendor.t($data.currentProduct.package2Price),
    l: common_vendor.t($data.currentProduct.package3Price),
    m: common_vendor.f($data.currentProduct.detailImages, (detail, index, i0) => {
      return {
        a: detail.image,
        b: common_vendor.t(detail.name),
        c: index
      };
    }),
    n: common_vendor.o((...args) => $options.goToStep2 && $options.goToStep2(...args))
  } : {}, {
    o: $data.currentStep === 2
  }, $data.currentStep === 2 ? common_vendor.e({
    p: common_vendor.o((...args) => $options.goToStep1 && $options.goToStep1(...args)),
    q: common_vendor.t($data.selectedPackageType || "未选择"),
    r: common_vendor.t($data.currentProduct.price),
    s: common_vendor.o(($event) => $options.selectPackage("hourly")),
    t: $data.selectedPackageType === "hourly" ? 1 : "",
    v: common_vendor.t($data.currentProduct.package1Price),
    w: common_vendor.o(($event) => $options.selectPackage("package1")),
    x: $data.selectedPackageType === "package1" ? 1 : "",
    y: common_vendor.t($data.currentProduct.package2Price),
    z: common_vendor.o(($event) => $options.selectPackage("package2")),
    A: $data.selectedPackageType === "package2" ? 1 : "",
    B: common_vendor.t($data.currentProduct.package3Price),
    C: common_vendor.o(($event) => $options.selectPackage("package3")),
    D: $data.selectedPackageType === "package3" ? 1 : "",
    E: !$data.selectedPackageType
  }, !$data.selectedPackageType ? {} : {}, {
    F: $data.selectedPackageType
  }, $data.selectedPackageType ? common_vendor.e({
    G: common_vendor.t($data.selectedPackageType),
    H: common_vendor.t($data.selectedDate),
    I: $data.selectedDate,
    J: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    K: common_vendor.t($data.selectedStartTime || "请选择开始时间"),
    L: !$data.selectedStartTime ? 1 : "",
    M: $data.startTimeIndex,
    N: $options.availableStartTimes,
    O: common_vendor.o((...args) => $options.onStartTimeChange && $options.onStartTimeChange(...args)),
    P: common_vendor.t($data.selectedEndTime || ($data.selectedStartTime ? "请选择结束时间" : "请先选择开始时间")),
    Q: !$data.selectedEndTime ? 1 : "",
    R: !$data.selectedStartTime ? 1 : "",
    S: $data.endTimeIndex,
    T: $options.availableEndTimes,
    U: common_vendor.o((...args) => $options.onEndTimeChange && $options.onEndTimeChange(...args)),
    V: !$data.selectedStartTime,
    W: $data.selectedStartTime && $data.selectedEndTime
  }, $data.selectedStartTime && $data.selectedEndTime ? {
    X: common_vendor.t($options.durationHours)
  } : {}, {
    Y: common_vendor.f($options.hourlyTimeSlots, (hour, index, i0) => {
      return {
        a: common_vendor.t(hour.hour),
        b: common_vendor.n(hour.status),
        c: index,
        d: common_vendor.n($options.getTimeSlotClass(hour)),
        e: common_vendor.o(($event) => $options.selectHourlySlot(hour), index)
      };
    })
  }) : {}, {
    Z: $data.selectedPackageType && (!$data.selectedStartTime || !$data.selectedEndTime)
  }, $data.selectedPackageType && (!$data.selectedStartTime || !$data.selectedEndTime) ? {} : {}, {
    aa: $data.selectedStartTime && $data.selectedEndTime
  }, $data.selectedStartTime && $data.selectedEndTime ? common_vendor.e({
    ab: common_vendor.f($data.availableRooms, (room, k0, i0) => {
      return {
        a: common_vendor.t(room.name),
        b: common_vendor.t(room.capacity),
        c: common_vendor.t(room.features.join("、")),
        d: common_vendor.t(room.statusText),
        e: common_vendor.n(room.status),
        f: room.id,
        g: $data.selectedRoom === room.id ? 1 : "",
        h: room.status === "unavailable" ? 1 : "",
        i: common_vendor.o(($event) => $options.selectRoom(room), room.id)
      };
    }),
    ac: $data.selectedRoom && $data.currentRoom.images.length > 0
  }, $data.selectedRoom && $data.currentRoom.images.length > 0 ? {
    ad: common_vendor.f($data.currentRoom.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    })
  } : {}) : {}, {
    ae: $data.selectedStartTime && $data.selectedEndTime && !$data.selectedRoom
  }, $data.selectedStartTime && $data.selectedEndTime && !$data.selectedRoom ? {} : {}, {
    af: $options.canConfirm
  }, $options.canConfirm ? {
    ag: common_vendor.o((...args) => $options.confirmBooking && $options.confirmBooking(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/booking-detail/booking-detail.js.map
