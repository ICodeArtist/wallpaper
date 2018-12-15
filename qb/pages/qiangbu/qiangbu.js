Page({
    data: {
        phoneWidth: wx.getSystemInfoSync().windowWidth,
        phoneHeight: 4 * wx.getSystemInfoSync().windowWidth / 3,
        ViewImgHei: 101,
        ViewImgWid: 101,
      imgb64: "",
        sfdx: 0,
        cjgd: 120,
        imgUrl: "cloud://room2-9fd8fd.726f-room2-9fd8fd/qbmb/",
        shoujiBihua: "/images/icon/q.jpg",
        showView: !0,
        gongneng1: "场",
        gongneng2: "景",
        gongneng3: "选",
        gongneng4: "择",
        chosedImg: 0,
        xsxz: 0,
        cjxz: "kt",
        fgxz: "bo"
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
        var a = t.currentTarget.dataset.url, i = this.data.cjxz + this.data.fgxz + ".png", n = this.data.imgUrl + a + i;
        this.downLoadqImg(n);
        this.setData({
            chosedImg: a
        });
    },
    openImg: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
          sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
              var i = t.tempFilePaths[0], s = "data:image/jpg;base64," + wx.getFileSystemManager().readFileSync(i, "base64");
                wx.getImageInfo({
                    src: i,
                    success: function(t) {
                        var n = a.data.ViewImgWid * t.width / t.height;
                        a.setData({
                            ViewImgHei: n,
                            shoujiBihua: i,
                            imgb64: s
                        });
                    }
                });
            }
        });
    },
    setSticker: function(t) {
        var a = 900 / this.data.phoneWidth, i = this.data.shoujiBihua, n = this.data.ViewImgHei * a, s = this.data.ViewImgWid * a;
        t.translate(0, 1200), t.rotate(270 * Math.PI / 180);
        for (var e = 0; s * e < 900; e++) for (var o = 0; n * o < 1200; o++) t.drawImage(i, n * o, s * e, n, s);
        t.save(), t.restore(), t.stroke();
    },
    createNewImg: function() {
        var t = this, a = this.data.shoujiBihua, i = this.data.qianDa, n = wx.createCanvasContext("mycanvas");
        a && this.setSticker(n), n.drawImage(i, 0, 0, 1200, 900), n.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(a) {
                    var i = a.tempFilePath;
                    t.setData({
                        imagePath: i
                    }), wx.navigateTo({
                        url: "/pages/huabu/huabu?path=" + i + "&gaodu=1000"
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
        }), t.createNewImg();
    },
    bianhao: function(t) {
        for (var a = new Array(), i = 0; i < t; i++) a.push(i);
        this.setData({
            numbar: a
        });
    },
    tzdx: function() {
        2 == this.data.xsxz ? this.setData({
            xsxz: 0,
            cjgd: 120
        }) : this.setData({
            xsxz: 2,
            cjgd: 200,
            gongneng1: "场",
            gongneng2: "景",
            gongneng3: "选",
            gongneng4: "择"
        });
    },
    dxbs: function(t) {
        var a = 101 + t.detail.value, i = a * this.data.ViewImgWid / this.data.ViewImgHei;
        this.setData({
            ViewImgHei: a,
            ViewImgWid: i
        });
    },
    cjxz: function() {
        5 != this.data.xsxz ? this.setData({
            xsxz: 5,
            cjgd: 430,
            gongneng1: "关",
            gongneng2: "闭",
            gongneng3: "选",
            gongneng4: "择"
        }) : this.setData({
            xsxz: 0,
            cjgd: 120,
            gongneng1: "场",
            gongneng2: "景",
            gongneng3: "选",
            gongneng4: "择"
        });
    },
    ktAn: function() {
        this.setData({
            cjxz: "kt"
        }), this.cjsl();
    },
    wsAn: function() {
        this.setData({
            cjxz: "ws"
        }), this.cjsl();
    },
    boAn: function() {
        this.setData({
            fgxz: "bo"
        }), this.cjsl();
    },
    dzhAn: function() {
        this.setData({
            fgxz: "dzh"
        }), this.cjsl();
    },
    msAn: function() {
        this.setData({
            fgxz: "ms"
        }), this.cjsl();
    },
    osAn: function() {
        this.setData({
            fgxz: "os"
        }), this.cjsl();
    },
    xdAn: function() {
        this.setData({
            fgxz: "xd"
        }), this.cjsl();
    },
    zsAn: function() {
        this.setData({
            fgxz: "zs"
        }), this.cjsl();
    },
    cjsl: function() {
        var t = this, a = {
            cj: t.data.cjxz,
            fg: t.data.fgxz
        };
        var db = wx.cloud.database()
        db.collection('cjfg').where({
          cj: a.cj,
          fg: a.fg
        }).get({
            success: res => {
              // console.log((res.data)[0].sl);
              t.bianhao((res.data)[0].sl);
            },
            fail: res=>{
              // console.log(2);
            }
        })
    },
    onReady: function() {
      var t = this;
      var a = "data:image/jpg;base64," + wx.getFileSystemManager().readFileSync("/images/icon/q.jpg", "base64");
      this.downLoadqImg("cloud://room2-9fd8fd.726f-room2-9fd8fd/qbmb/0ktbo.png"), this.setData({
            numbar: 9,
            imgb64: a,
        });
        // wx.cloud.downloadFile({
        //     fileID: "cloud://room2-9fd8fd.726f-room2-9fd8fd/q.jpg",
        //     success: function(a) {
        //         t.setData({
        //             shoujiBihua: a.tempFilePath
        //         });
        //     },
        //     fail: function(t) {}
        // });
    },
    onLoad: function() {
        this.ctx = wx.createCameraContext();
    }
});