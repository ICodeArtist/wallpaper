Page({
    data: {
        uid: 0,
        bhf: 0,
        qbf: 0,
        clf: 0,
        stats: 0
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
    formSubmit: function(a) {
        var t = a.detail.value;
        "" != t.username && "" != t.password ?this.ulogin(t) : wx.showModal({
            title: "提示",
            content: "未输入账号或密码",
            showCancel: !1
        });
    },
    ulogin: function(a){
      var _this = this;
      wx.login({
        success: function(res) {
          a.code = res.code;
          wx.request({
            url: "https://wx.orianna.top/api/index/login",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: a,
            success:function(r){
              var t = _this;
              var res = r.data;
              // console.log(res);
              if (res.code != "200"){
                wx.showModal({
                    title: "提示",
                    content: res.msg,
                    showCancel: !1
                });
              }else{
                t.setData({
                  bhf: res.data.bhf,
                  qbf: res.data.qbf,
                  clf: res.data.clf,
                  stats: 0,
                  uid: res.data.id
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
        wx.setClipboardData({
            data: "raxsg1990",
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