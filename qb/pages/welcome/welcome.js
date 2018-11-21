Page({
    data: {
        qx1: 0,
        qx2: 0,
        qx3: 0,
        qx4: 0,
        id: 0,
        dlc: 0,
        name: ""
    },
    ggsqTap: function(a) {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "解除绑定",
            success: function(a) {
                if (a.confirm) {
                    var e = {
                        name: t.data.name,
                        sqm: 2
                    };
                    t.shouquan(e), t.setData({
                        id: 0,
                        qx1: 0,
                        qx2: 0,
                        qx4: 0,
                        name: ""
                    });
                } else a.cancel;
            }
        });
    },
    //壁画效果制作
    bhTap: function(a) {
      wx.navigateTo({
        url: "../bihua/bihua"
      }) 
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx1 ? wx.navigateTo({
        //     url: "../bihua/bihua"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    //壁画拍照神器
    pzTap: function(a) {
      wx.navigateTo({
        url: "../bhxj/bhxj"
      }) 
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx1 ? wx.navigateTo({
        //     url: "../bhxj/bhxj"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    //墙布效果制作
    qbTap: function(a) {
      wx.navigateTo({
        url: "../qiangbu/qiangbu"
      })
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx2 ? wx.navigateTo({
        //     url: "../qiangbu/qiangbu"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    //墙布拍照神器
    qbpzTap: function(a) {
      wx.navigateTo({
        url: "../qbxj/qbxj"
      })
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx2 ? wx.navigateTo({
        //     url: "../qbxj/qbxj"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    //窗帘效果制作
    clTap: function(a) {
      wx.navigateTo({
        url: "../chuanlian/chuanlian"
      })
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx4 ? wx.navigateTo({
        //     url: "../chuanlian/chuanlian"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    //窗帘拍照神器
    clpzTap: function(a) {
      wx.navigateTo({
        url: "../clxj/clxj"
      })
        // var t = this;
        // 0 == t.data.id ? (t.setData({
        //     dlc: 2
        // }), t.data.dlc) : 2 == t.data.qx4 ? wx.navigateTo({
        //     url: "../clxj/clxj"
        // }) : wx.showModal({
        //     title: "提示",
        //     content: "未开通此项服务",
        //     showCancel: !1
        // });
    },
    formSubmit: function(a) {
        var t = a.detail.value;
        "" != t.yonghu && "" != t.mima ? (this.setData({
            name: a.detail.value.yonghu
        }), this.yonghudenglu(t)) : wx.showModal({
            title: "提示",
            content: "未输入账号或密码",
            showCancel: !1
        });
    },
    yonghudenglu: function(a) {
        var t = this;
        wx.request({
            url: "https://xcx.vrlook.top/yonghu.php",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: a,
            success: function(a) {
                var e = t;
                if (a.data.id < 1) wx.showModal({
                    title: "提示",
                    content: "请输入正确的账号密码",
                    showCancel: !1
                }); else {
                    if (e.setData({
                        id: a.data.id,
                        qx3: a.data.qx3
                    }), 2 == a.data.id) try {
                        var n = wx.getStorageSync("tiyan"), d = Date.parse(new Date()) / 1e3, o = d - 86400;
                        return "" == n ? (wx.setStorage({
                            key: "tiyan",
                            data: d
                        }), wx.showModal({
                            title: "提示",
                            content: "欢迎体验智能魔卡",
                            showCancel: !1
                        }), void e.setData({
                            id: a.data.id,
                            qx1: a.data.qx1,
                            qx2: a.data.qx2,
                            qx3: a.data.qx3,
                            qx4: a.data.qx4,
                            dlc: 0
                        })) : n > o ? (n++, wx.showModal({
                            title: "提示",
                            content: "欢迎体验智能魔卡",
                            showCancel: !1
                        }), void e.setData({
                            id: a.data.id,
                            qx1: a.data.qx1,
                            qx2: a.data.qx2,
                            qx3: a.data.qx3,
                            qx4: a.data.qx4,
                            dlc: 0
                        })) : (e.setData({
                            qx1: 0,
                            qx2: 0,
                            qx3: 0,
                            qx4: 0,
                            id: 0,
                            dlc: 0,
                            name: ""
                        }), void wx.showModal({
                            title: "提示",
                            content: "体验时间已用完",
                            showCancel: !1
                        }));
                    } catch (a) {}
                    if (2 == a.data.qx3) wx.showModal({
                        title: "绑定账号",
                        content: "此账号是第一次登陆，是否绑定，绑定后无特殊情况无法更改手机以及微信",
                        success: function(a) {
                            if (a.confirm) {
                                var t = Math.random(12).toString(36).substr(2, 15), n = {
                                    name: e.data.name,
                                    sqm: t
                                };
                                wx.setStorage({
                                    key: "sqm",
                                    data: t
                                }), e.shouquan(n);
                            } else a.cancel && (wx.showModal({
                                title: "提示",
                                content: "授权失败",
                                showCancel: !1
                            }), e.setData({
                                id: 0,
                                dlc: 0
                            }));
                        }
                    }); else try {
                        (n = wx.getStorageSync("sqm")) == a.data.qx3 ? e.setData({
                            qx1: a.data.qx1,
                            qx2: a.data.qx2,
                            qx3: a.data.qx3,
                            qx4: a.data.qx4,
                            dlc: 0
                        }) : (wx.showModal({
                            title: "提示",
                            content: "此手机或者此微信号，不是授权账号",
                            showCancel: !1
                        }), e.setData({
                            id: 0,
                            dlc: 0
                        }));
                    } catch (a) {}
                }
            }
        });
    },
    shouquan: function(a) {
        var t = this;
        wx.request({
            url: "https://xcx.vrlook.top/shouquan.php",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: a,
            success: function(a) {
                t.setData({
                    qx1: a.data.qx1,
                    qx2: a.data.qx2,
                    qx3: a.data.qx3,
                    qx4: a.data.qx4,
                    dlc: 0
                }), 2 == a.data.qx3 && t.setData({
                    qx1: 0,
                    qx2: 0,
                    qx3: 0,
                    qx4: 0,
                    dlc: 0
                });
            }
        });
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