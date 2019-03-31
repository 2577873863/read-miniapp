Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [], //书籍列表
    inputShowed: false, //input的现实
    inputVal: "" //输入的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //https://juejin.im/entry/593a3fdf61ff4b006c737ca4 接口文档
    this.getBookLists();
    this.getNewChapter();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getBookLists() { //获取书籍列表
    const bookList = wx.getStorageSync("bookList");
    if (bookList) {
      this.setData({
        bookList: bookList
      });
    } else {
      wx.request({
        url: 'http://api.zhuishushenqi.com/ranking/564d8003aca44f4f61850fcd',
        success: (res) => {
          this.setData({
            bookList: res.data.ranking.books
          });
          wx.setStorageSync("bookList", res.data.ranking.books);
        },
        fail: () => {
          wx.showToast({
            title: "获取数据异常",
            icon: "none"
          })
        }
      })
    }
  },
  getNewChapter(){ //获取最新章节
    let {bookList} = this.data;
    bookList.map((item,index)=>{
      let id = item._id;
      // console.log(id);
      wx.request({
        url: 'http://api05iye5.zhuishushenqi.com/book?view=updated&id='+id,
        success:(res)=>{
          this.setData({
            ["bookList["+index+"].lastChapter"]: res.data[0].lastChapter
          })
        },
        fail:()=>{
          console.log("获取最细章节失败");
        }
      })

    });
  },
  //搜索的一堆事件
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.getBookLists();
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onSearchTap() { //搜索事件
    // console.log('搜索的内容为'+this.data.inputVal);
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/fuzzy-search?query='+ this.data.inputVal,
      success: (res) => {
        this.setData({
          bookList: res.data.books
        })
      },
      fail: () => {
        wx.showToast({
          title: '搜索异常',
          icon: "none"
        })
      }
    })
  },
  //搜索事件结束
  onDetailTap(e) { //去详情页面
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?id=' + id,
    })
  },
  // onNewChapter(e){ //阅读最新章节
  //   const {bookid} = e.currentTarget.dataset;
  //   console.log(bookid);
  // }
})