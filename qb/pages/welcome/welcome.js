Page({
  data: {
    hiddenmodalput:true,
    link:"",
    name: "",
    phone: "",
    uid: 0,
    bhf: 0,
    qbf: 0,
    clf: 0,
    stats: 0,
    jnum: "计算中",
    swiperItems: [
      { imgUrl: '../../static/imgs/swiper-1.jpg', title: "" },
    ],
    surplus:'请登录'
  },
  onShow: function() {
    var _this = this;
    wx.request({
      url: "https://www.wxori.top/api/index/getJunm",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(r){
       let num1 = r.data.data.val;
        _this.setData({
          jnum: num1,
          link: r.data.data.link
        });
      //  console.log(r);
      //  let n1 = new NumberAnimate({
      //     from: num1, //开始时的数字
      //     speed: 2000, // 总时间
      //     refreshTime: 100, //  刷新一次的时间
      //     decimals: 0, //小数点后的位数
      //     onUpdate: () => { //更新回调函数    
      //       _this.setData({
      //         jnum: n1.tempValue,
      //         link: r.data.data.link
      //       });
      //     }
      //   });
      }
    })
    
  },
  //壁画效果制作
  bhTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.bhf ? wx.navigateTo({
      url: "../bihua/bihua"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //壁画拍照神器
  pzTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.bhf ? wx.navigateTo({
      url: "../bhxj/bhxj"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //墙布效果制作
  qbTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.qbf ? wx.navigateTo({
      url: "../qiangbu/qiangbu"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //墙布拍照神器
  qbpzTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.qbf ? wx.navigateTo({
      url: "../qbxj/qbxj"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //窗帘效果制作
  clTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.clf ? wx.navigateTo({
      url: "../chuanlian/chuanlian"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //窗帘拍照神器
  clpzTap: function(a) {
    var t = this;
    0 == t.data.uid ? (t.setData({
      stats: 1
    }), t.data.stats) : 1 == t.data.clf ? wx.navigateTo({
      url: "../clxj/clxj"
    }) : wx.showModal({
      title: "提示",
      content: "未开通此项服务",
      showCancel: !1
    });
  },
  //获取账号
  getAccount: function(){
    this.setData({
      hiddenmodalput:false,
    })
  },
  iName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  iPhoneNum: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  cancelM: function (e) {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirmM: function (a) {
    "" != this.data.name && "" != this.data.phone ? this.postASK(this.data.name,this.data.phone) : wx.showModal({
      title: "提示",
      content: "未输入电话或姓名",
      showCancel: !1
    });
  },
  formSubmit: function(a) {
    var t = a.detail.value;
    t.password = "123456";
    "" != t.username && "" != t.password ? this.ulogin(t) : wx.showModal({
      title: "提示",
      content: "未输入账号或密码",
      showCancel: !1
    });
  },
  postASK: function(a,b){
    var _this = this;
    wx.login({
      success: function(res){
        let code = res.code;
        wx.request({
          url: "https://www.wxori.top/api/index/ask",
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: { name: a, phone: b, code: code},
          success: function (r) {
            var res = r.data;
            wx.showModal({
              title: "提示",
              content: res.msg,
              showCancel: !1
            });
            _this.setData({
              hiddenmodalput: true
            })
          }
        })
      }
    })
    
  },
  ulogin: function(a) {
    var _this = this;
    wx.login({
      success: function(res) {
        a.code = res.code;
        wx.request({
          url: "https://www.wxori.top/api/index/login",
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: a,
          success: function(r) {
            var t = _this;
            var res = r.data;
            // console.log(res);
            if (res.code != "200") {
              wx.showModal({
                title: "提示",
                content: res.msg,
                showCancel: !1
              });
            } else {
              t.setData({
                bhf: res.data.bhf,
                qbf: res.data.qbf,
                clf: res.data.clf,
                stats: 0,
                uid: res.data.id,
                surplus: res.data.expiredate
              })
            }
          }
        })
      },
      fail: function(res) {
        wx.showModal({
          title: "提示",
          content: "网络错误",
          showCancel: !1
        });
      }
    })
  },
  copyWx: function(a) {
    var _this = this;
    wx.setClipboardData({
      data: _this.data.link,
      success: function(a) {
        wx.getClipboardData({
          success: function(a) {
            wx.showModal({
              title: "复制作者账号成功",
              content: "复制作者账号成功，可以打开微信查找好友里粘贴，增添作者为好友"
            });
          }
        });
      }
    });
  }
});