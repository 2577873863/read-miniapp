// pages/bookDetail/bookDetail.js
let bookid = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail:null,
    isChapter:true,
    chapterList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookid = options.id;
    this.getBookDetail(bookid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getBookDetail(bookid){
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/' + bookid,
      success: (res) => {
        // console.log(res.data);
        this.setData({
          bookDetail: res.data,
          "bookDetail.updated": new Date(res.data.updated).toLocaleString()
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取详情异常',
          icon: "none"
        })
      }
    })
  },
  onShowChapter(){ //获取章节
    wx.request({
      url: 'http://api.zhuishushenqi.com/mix-atoc/' + bookid,
      success:(res)=>{
        this.setData({
          chapterList:res.data.mixToc.chapters,
          isChapter: false
        });
        // console.log(this.data.chapterList)
      },
      fail:()=>{
        wx.showToast({
          title: '获取章节异常',
          icon:"none"
        })
      }
    })
  },
  onShowContentTap(e){ //获取章节内容
    const link = encodeURIComponent(e.currentTarget.dataset.link);
    console.log(link);
    wx.navigateTo({
      url: '/pages/bookContent/bookContent?link='+link,
    })
  }
})