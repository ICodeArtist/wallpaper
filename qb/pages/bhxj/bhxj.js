Page({
    data: {
        phoneWidth: wx.getSystemInfoSync().windowWidth,
        phoneHeight: wx.getSystemInfoSync().windowHeight,
        imgUrl: "cloud://room2-9fd8fd.726f-room2-9fd8fd/zsbh/",
        thumb: "zx.png",
        shoujiBihua: "/images/icon/bihua.jpg",
        showView: !0,
        gongneng: "拍照预览",
        xsgj: "显示场景",
        chosedImg: 0,
        XS: 3,
        xiangsu: 0,
        yidong: 0,
        stv: {
            offsetX: 0,
            offsetY: 0,
            zoom: !1,
            distance: 0,
            scale: 1,
            width: 200,
            height: 161
        }
    },
    downLoadqImg: function(t) {
        var a = this;
        wx.showLoading({
            title: "场景加载中...",
            mask: !0
        }), wx.getImageInfo({
            src: t,
            success: function(t) {
                a.setData({
                    qianDa: t.path
                }), wx.hideLoading();
            }
        });
    },
    changeImg: function(t) {
        var a = t.currentTarget.dataset.url, e = this.data.imgUrl + a + "zq.png";
        this.downLoadqImg(e);
        this.setData({
            chosedImg: a
        });
    },
    takePhoto: function() {
        var t = this;
        t.data.showView ? t.ctx.takePhoto({
            quality: "high",
            success: function(a) {
                t.setData({
                    shoujiBihua: a.tempImagePath,
                    gongneng: "返回相机",
                    showView: !1
                });
            }
        }) : t.setData({
            showView: !0,
            gongneng: "拍照预览"
        });
    },
    xscj: function() {
        var t = this, a = this.data.xiangsu;
        1 == t.data.XS ? t.setData({
            yidong: 0,
            XS: 0,
            xsgj: "显示场景"
        }) : t.setData({
            yidong: a,
            XS: 1,
            xsgj: "关闭场景"
        });
    },
    openImg: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
            sourceType: [ "album" ],
            success: function(t) {
                var e = t.tempFilePaths[0];
                wx.getImageInfo({
                    src: e,
                    success: function(t) {
                        a.setData({
                            shoujiBihua: e
                        });
                    }
                });
            }
        });
    },
    setSticker: function(t) {
        t.rect(0, 0, 1200, 1200), t.setFillStyle("red"), t.fill();
        this.data.phoneWidth;
        var a = this.data.shoujiBihua;
        t.drawImage(a, 0, 0, 1200, 1200), t.save(), t.restore(), t.stroke();
    },
    createNewImg: function(t) {
        var a = this, e = this.data.shoujiBihua, i = this.data.qianDa, s = (this.data.houDa, 
        wx.createCanvasContext("mycanvas"));
        s.setGlobalAlpha(1), e && this.setSticker(s), s.setGlobalAlpha(1), s.drawImage(i, 0, 0, 1200, 1200), 
        s.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(t) {
                    var e = t.tempFilePath;
                    a.setData({
                        imagePath: e
                    }), wx.navigateTo({
                        url: "/pages/huabu/huabu?path=" + e + "&gaodu=750"
                    });
                },
                fail: function(t) {},
                complete: function(t) {
                    wx.hideLoading();
                }
            });
        }, 200);
    },
    save: function() {
        var t = this;
        wx.showLoading({
            title: "创建中...",
            duration: 1e4
        });
        var a = t.data.imgUrl + (a = t.data.chosedImg);
        t.createNewImg(a);
    },
    bianhao: function(t) {
        for (var a = new Array(), e = t; e < t + 5; e++) a.push(e);
        return a;
    },
    nextYe: function() {
        var t = this.data.numbar[4] + 1, a = new Date();
        a.getMonth(), a.getDate();
        if (t > 74) wx.showModal({
            title: "提示",
            content: "这已经是最后一页了",
            showCancel: !1
        }); else {
            var e = this.bianhao(t);
            this.setData({
                numbar: e
            });
        }
    },
    previous: function() {
        var t = this.data.numbar[0] - 5;
        if (t < 0) wx.showModal({
            title: "提示",
            content: "这已经是第一页了",
            showCancel: !1
        }); else {
            var a = this.bianhao(t);
            this.setData({
                numbar: a
            });
        }
    },
    onReady: function() {
        var t = this.bianhao(0);
        this.downLoadqImg("cloud://room2-9fd8fd.726f-room2-9fd8fd/zsbh/0zq.png");
        var a = 750 * this.data.phoneHeight / this.data.phoneWidth - 1060;
        a < 0 && this.setData({
            XS: 0,
            xiangsu: a
        }), this.setData({
            numbar: t
        });
    },
    onLoad: function() {
        this.ctx = wx.createCameraContext();
    }
});