// pages/auth/auth.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		images:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		
	},
	chooseImage(){
		wx.chooseImage({
			count: 9,	// 默认为9
			sizeType: ['original', 'compressed'],	// 指定原图或者压缩图
			sourceType: ['album', 'camera'],	// 指定图片来源
			success:res=> {
				const images = this.data.images.concat(res.tempFilePaths)
				this.setData({
					images:images
				})
			}
		})
	}
})