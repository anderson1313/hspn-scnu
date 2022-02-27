<script>
	export default {
		/* onLaunch: function() {
			
			
			
			wx.cloud.init({
			envid:"tianhegongyuan-7g7f4cog58bc2821",
			traceUser: true,
			}),

			console.log('App Launch');
			// 获取用户信息
			uni.getProvider({
				service:'oauth',
				success: function(res){
					console.log(res.provider)
					if(~res.provider.indexOf('weixin')){
						uni.login({
							provider: 'weixin',
							success: function(loginRes){
								console.log(JSON.stringify(loginRes))
								// 将所获取的code发送到服务器以换取userid
								getApp().globalData.code = loginRes.code.toString()
								uni.request({
									url: 'http://106.52.28.79/onLogin',
									method: 'POST',
									data: {
										code: getApp().globalData.code
									},
									header: {
										'content-type': 'application/json'
									},
									success: function(requestRes){
										console.log(requestRes.data)
										getApp().globalData.opendid=requestRes.data.openid
										uni.setStorageSync("useropenid",requestRes.data.openid)
										getApp().globalData.session_key=requestRes.data.session_key
										// 获取用户信息（用户名称与头像链接）
										uni.getUserInfo({
											provider: 'weixin',
											success: function(infoRes){
												console.log(infoRes.userInfo)
												getApp().globalData.nickName=infoRes.userInfo.nickName
												getApp().globalData.avatarUrl=infoRes.userInfo.avatarUrl
											},
											fail: function(infoFail){
												console.log(requestFail.code)
												console.log(requestFail.errMsg)
												console.log(requestFail.message)
												uni.showToast({
													title:'网络出错'
												})
											}
										})
									},
									fail: function(requestFail){
										console.log(requestFail.code)
										console.log(requestFail.errMsg)
										console.log(requestFail.message)
										uni.showToast({
											title:'网络出错'
										})
									}
								})
							},
							fail: ()=>{
								uni.showToast({
									title:"微信登录授权失败"
								})
							}
						})
					}
				},
				fail: ()=>{
					uni.showToast({
						title:"微信登录授权失败"
					})
				}
			})
		}, */
		/* onShow: function() {
			
			console.log('App Show')
			console.log(getApp().globalData.ZiTieIsSelected)
		}, */
		/* onHide: function() {
			console.log('App Hide')
		}, */
		globalData: {
			opendid: '',
			code: '',
			session_key: '',
			nickName: '',
			avatarUrl: '',
			ZiTieIsSelected:false
		}
	}
</script>

<style>
	
	@import "/common/icon.css";
	@import "/common/animate.css";
	
</style>
