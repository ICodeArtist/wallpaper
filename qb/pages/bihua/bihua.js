Page({
    data: {
        phoneWidth: wx.getSystemInfoSync().windowWidth,
        phoneHeight: wx.getSystemInfoSync().windowHeight,
        XS: 3,
        xiangsu: 0,
        yidong: 0,
        xsgj: "显示场景",
        imgUrl: "cloud://room2-9fd8fd.726f-room2-9fd8fd/zsbh/",
        thumb: "zx.png",
        shoujiBihua: "/images/icon/bihua.jpg",
        chosedImg: 0,
        stv: {
            offsetX: 75,
            offsetY: 75,
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
    downLoadbImg: function(t) {
        var a = this;
        wx.getImageInfo({
            src: t,
            success: function(t) {
                a.setData({
                    houDa: t.path
                });
            }
        });
    },
    changeImg: function(t) {
        var a = t.currentTarget.dataset.url, s = this.data.imgUrl + a + "zq.png";
        this.downLoadqImg(s);
        var e = {
            cate: "cate",
            serial: a
        };
        this.replaceimg(e), this.setData({
            chosedImg: a
        });
    },
    openImg: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
          sizeType: ["compressed"],
            sourceType: [ "album" ],
            success: function(t) {
                var s = t.tempFilePaths[0];
                wx.getImageInfo({
                    src: s,
                    success: function(t) {
                        a.setData({
                            shoujiBihua: s
                        });
                    }
                });
            }
        });
    },
    setSticker: function(t) {
        t.rect(0, 0, 1200, 1200), t.setFillStyle("red"), t.fill();
        var a = 1200 / this.data.phoneWidth, s = this.data.shoujiBihua, e = this.data.stv.offsetX * a, i = this.data.stv.offsetY * a, o = this.data.stv.width * a, n = this.data.stv.height * a;
        t.drawImage(s, e, i, o, n), t.save(), t.restore(), t.stroke();
    },
    createNewImg: function(t) {
        var a = this, s = this.data.shoujiBihua, e = this.data.qianDa, i = (this.data.houDa, 
        wx.createCanvasContext("mycanvas"));
        i.setGlobalAlpha(1), s && this.setSticker(i), i.setGlobalAlpha(1), i.drawImage(e, 0, 0, 1200, 1200), 
        i.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(t) {
                    var s = t.tempFilePath;
                    a.setData({
                        imagePath: s
                    }), wx.navigateTo({
                        url: "/pages/huabu/huabu?path=" + s + "&gaodu=750"
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
        for (var a = new Array(), s = t; s < t + 5; s++) a.push(s);
        return a;
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
    nextYe: function() {
        var t = this.data.numbar[4] + 1, a = new Date();
        a.getMonth(), a.getDate();
        if (t > 74) wx.showModal({
            title: "提示",
            content: "这已经是最后一页了",
            showCancel: !1
        }); else {
            var s = this.bianhao(t);
            this.setData({
                numbar: s
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
    replaceimg: function(t) {
      // console.log(t);
        var a = this;
        wx.request({
            url: "https://wx.orianna.top/api/index/image",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: t,
            success: function(t) {
                var s = 1200 / a.data.phoneWidth;
              // console.log(t);
                a.setData({
                    "stv.offsetX": t.data.offsetX / s,
                    "stv.offsetY": t.data.offsetY / s,
                    "stv.width": (t.data.width - t.data.offsetX) / s,
                    "stv.height": (t.data.height - t.data.offsetY) / s
                });
            }
        });
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
        var s = {
            cate: "cate",
            serial: 0
        };
        this.replaceimg(s);
    }
});