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
        price: 80,
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
          price: 100,
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
          price: 120,
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
          price: 90,
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
          price: 110,
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
          price: 70,
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
          price: 60,
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
          price: 50,
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
          price: 40,
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
          price: 45,
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
      return this.selectedProduct && this.selectedRoom && this.selectedStartTime && this.selectedEndTime && this.selectedPackage;
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
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:689", "解析门店数据失败:", e);
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
        common_vendor.index.__f__("error", "at pages/tabBar/booking-detail/booking-detail.vue:703", "解析项目数据失败:", e);
      }
    }
  },
  methods: {
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
          common_vendor.index.__f__("log", "at pages/tabBar/booking-detail/booking-detail.vue:719", "拨打电话成功");
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
    a: common_vendor.t($data.storeInfo.name),
    b: common_vendor.t($data.storeInfo.address),
    c: common_vendor.o((...args) => $options.navigateToStore && $options.navigateToStore(...args)),
    d: common_vendor.o((...args) => $options.callStore && $options.callStore(...args)),
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
        c: common_vendor.t(product.description),
        d: common_vendor.t(product.price),
        e: product.id,
        f: $data.selectedProduct === product.id ? 1 : "",
        g: common_vendor.o(($event) => $options.selectProduct(product), product.id)
      };
    }),
    i: !$data.selectedProduct
  }, !$data.selectedProduct ? {} : {}, {
    j: $data.selectedProduct
  }, $data.selectedProduct ? common_vendor.e({
    k: common_vendor.f($data.availableRooms, (room, k0, i0) => {
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
    l: $data.selectedRoom && $data.currentRoom.images.length > 0
  }, $data.selectedRoom && $data.currentRoom.images.length > 0 ? {
    m: common_vendor.f($data.currentRoom.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    })
  } : {}) : {}, {
    n: $data.selectedProduct && !$data.selectedRoom
  }, $data.selectedProduct && !$data.selectedRoom ? {} : {}, {
    o: $data.selectedRoom
  }, $data.selectedRoom ? common_vendor.e({
    p: common_vendor.t($data.selectedDate),
    q: $data.selectedDate,
    r: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    s: common_vendor.t($data.selectedStartTime || "请选择开始时间"),
    t: !$data.selectedStartTime ? 1 : "",
    v: $data.startTimeIndex,
    w: $options.availableStartTimes,
    x: common_vendor.o((...args) => $options.onStartTimeChange && $options.onStartTimeChange(...args)),
    y: common_vendor.t($data.selectedEndTime || ($data.selectedStartTime ? "请选择结束时间" : "请先选择开始时间")),
    z: !$data.selectedEndTime ? 1 : "",
    A: !$data.selectedStartTime ? 1 : "",
    B: $data.endTimeIndex,
    C: $options.availableEndTimes,
    D: common_vendor.o((...args) => $options.onEndTimeChange && $options.onEndTimeChange(...args)),
    E: !$data.selectedStartTime,
    F: $data.selectedStartTime && $data.selectedEndTime
  }, $data.selectedStartTime && $data.selectedEndTime ? {
    G: common_vendor.t($options.durationHours)
  } : {}, {
    H: common_vendor.f($options.hourlyTimeSlots, (hour, index, i0) => {
      return {
        a: common_vendor.t(hour.hour),
        b: common_vendor.n(hour.status),
        c: index,
        d: common_vendor.n($options.getTimeSlotClass(hour)),
        e: common_vendor.o(($event) => $options.selectHourlySlot(hour), index)
      };
    })
  }) : {}, {
    I: $data.selectedRoom && (!$data.selectedStartTime || !$data.selectedEndTime)
  }, $data.selectedRoom && (!$data.selectedStartTime || !$data.selectedEndTime) ? {} : {}, {
    J: $data.selectedStartTime && $data.selectedEndTime
  }, $data.selectedStartTime && $data.selectedEndTime ? {
    K: common_vendor.f($data.availablePackages, (pkg, k0, i0) => {
      return {
        a: common_vendor.t(pkg.name),
        b: common_vendor.t(pkg.description),
        c: common_vendor.t(pkg.includes.join("、")),
        d: common_vendor.t(pkg.price),
        e: pkg.id,
        f: $data.selectedPackage === pkg.id ? 1 : "",
        g: common_vendor.o(($event) => $options.selectPackage(pkg), pkg.id)
      };
    })
  } : {}, {
    L: $data.selectedStartTime && $data.selectedEndTime && !$data.selectedPackage
  }, $data.selectedStartTime && $data.selectedEndTime && !$data.selectedPackage ? {} : {}, {
    M: $data.selectedPackage
  }, $data.selectedPackage ? common_vendor.e({
    N: common_vendor.t($options.productPrice),
    O: $options.packagePrice > 0
  }, $options.packagePrice > 0 ? {
    P: common_vendor.t($options.packagePrice)
  } : {}, {
    Q: common_vendor.t($options.totalPrice)
  }) : {}, {
    R: $data.selectedPackage
  }, $data.selectedPackage ? {
    S: $data.userRemark,
    T: common_vendor.o(($event) => $data.userRemark = $event.detail.value),
    U: common_vendor.t($data.userRemark.length)
  } : {}, {
    V: common_vendor.t($options.totalPrice),
    W: common_vendor.o((...args) => $options.confirmBooking && $options.confirmBooking(...args)),
    X: !$options.canBook
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/tabBar/booking-detail/booking-detail.js.map
