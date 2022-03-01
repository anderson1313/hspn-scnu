<template>

	<view class="container">


		<view class="picbox">
			<image :src="admire.pic_url" mode="aspectFill" class="animated fadeInLeftBig"></image>

		</view>

		<view class="description animated fadeInLeftBig">
			<view class="picname">
				<view class="left"></view>
				<view class="right">
					<view class="tip">书法名</view>
					<view class="text ">
						{{admire.pic_name}}
					</view>
				</view>

			</view>
			<view class="der">
				<view class="left"></view>
				<view class="right">
					<view class="tip">时期</view>
					<view class="text ">
						{{admire.time}}
					</view>
				</view>
			</view>
			<view class="exp">
				<view class="left"></view>
				<view class="right">
					<view class="tip">赏析</view>
					<view class="text ">
						{{admire.content}}
					</view>
				</view>
			</view>

		</view>
		<view class="function">
			<view class="like" @click="like">
				<view class="icon">
					<image :src="likepic" :animation="likean"></image>
				</view>
				<view class="text2">{{liketext}}</view>
			</view>
			<view class="share">

				<image src="../../static/share.png"></image>
				<button class='text2' plain="true" open-type="share"> </button>

			</view>
		</view>

	</view>


</template>

<script>
	import {
		Api
	} from '../../common/api.js'
	const apiModel = new Api()
	export default {
		data() {
			return {
				alladmire: [],
				admire: {},
				likepic: "../../static/notlike.png", //通过这个更改喜欢不喜欢图片
				liketext: "收藏", //通过这个更改收藏/已收藏,
				likeornot: 0,
				

			}
		},
		methods: {
			onLoad: function(option) {
				
				this.loadFontWeb();
				this.id = option.index;
				var uid = uni.getStorageSync('useropenid')
				var data={
					openid:uid,
					id:this.id
					
				}
				apiModel.ifUserlikeCalli(data).then(res => {
					console.log(res)
					if(res.isexist==false){
						this.likeornot=0
						this.liketext='收藏'
						this.likepic="/static/notlike.png"
					}else{
						this.likeornot=1
						this.liketext='已收藏'
						this.likepic="/static/like.png"
					}
					
					
				})
				apiModel.getCalligraphy().then(res => {
				
					if (res.error_code != 0) {
						console.log("数据获取失败")
					} else {
						this.$data.alladmire = res.data
						console.log("数据获取成功")
						console.log(this.$data.alladmire)
						this.initData();
					
				
					}
				})
				
				
				

			},
			like: function() {
				var hasUserInfo = uni.getStorageSync('ifgetuserinfo')
				if (!hasUserInfo){
					uni.showToast({
						title:'请先登录',
						mask:false,
						icon:'none'
						
					})
					return
					
				}
				wx.vibrateShort({
					type: 'medium',
				})
			
				if (this.likeornot == 0) {
					var uid = uni.getStorageSync('useropenid')
					var id = this.id
					console.log(uid)
					console.log(id)
			
					var data = {
						'openid': uid,
						'id': id
					}
					apiModel.addUserCalli(data).then(res => {
						console.log(res)
					})
					this.likeornot=1,
					this.likepic="/static/like.png"
					uni.showToast({
						title: '已加入「收藏」',
						icon: 'none'
					})
				}else{
					var uid = uni.getStorageSync('useropenid')
					var id = this.id
					console.log(uid)
					console.log(id)
								
					var data = {
						'openid': uid,
						'id': id
					}
					apiModel.delUserCalli(data).then(res => {
						console.log(res)
					})
					this.likeornot=0,
					this.likepic="/static/like.png"
					uni.showToast({
						title: '已移除收藏',
						icon: 'none'
					})
					
				}
			
			},
			
			initData(e) {
				uni.showLoading({
					title: '加载中'
				});
				var admire = {}
				for (var i = 0; i < this.alladmire.length; i++) {
					if (this.alladmire[i].id == this.id) {
						admire = this.alladmire[i]
						console.log(admire)
						admire.content = admire.content.slice(4, )
					}
				}
				this.admire = admire
				
				uni.hideLoading()

			},
			loadFontWeb() {
				const url = 'https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf'
				uni.loadFontFace({
					family: 'font1',
					source: `url("${url}")`
				})
			},
			onShareAppMessage: function() {
				return {
					title: '我刚学到一个新成语，快来看看！',
					path: '/pages/pregnantClass/detail/index?id=' + this.id, //分享的页面所需要的id

				}
			},
			//收藏动画
			likeanimation() {
				var ani = uni.createAnimation({
					delay: 0,

				});
				ani.scale(0.5).step({
					duration: 200
				});
				ani.scale(1).step({
					duration: 200
				})
				this.likean = ani.export()
				console.log

			},



			
	


			
		},
	}
</script>

<style>
	/* pages/eachidiom/eachidiom.wxss */
	.picbox {
		height: 800rpx;
		width: 750rpx;
		/* background: #f7f1e3; */
		font-size: 100rpx;

		background-image: url(https://wx4.sinaimg.cn/mw2000/003QmReqgy1gvdx2fgr0lj69pnacx7wi02.jpg);
		background-size: contain;
		display: flex;
		justify-content: center;
		align-items: center;



	}

	.picbox::after {
		content: "";
		height: 800rpx;
		width: 800rpx;
		position: absolute;
		left: 0;
		top: 0;
		background: inherit;
		filter: blur(8px);
		z-index: 2;

	}

	.picbox image {
		z-index: 11;
	}

	.description {
		width: 750rpx;
		background: #E6DDC6;
		background: #F2EDD7;
		background: #FDFAF6;
		padding-bottom: 250rpx;
	}

	.left {
		width: 5rpx;
		height: 50rpx;
		background: #B2B1B9;
		border-radius: 10rpx;
	}

	.right {
		display: flex;
		flex-direction: column;
		width: 520rpx;
		margin-left: 20rpx;

	}

	.picname,
	.der,
	.exa,
	.exp {
		display: flex;
		flex-direction: row;
		padding: 40rpx 60rpx;


	}

	.tip {
		font-size: 40rpx;

		color: #5F939A;
		color: #161D6F;
		font-family: 'font1';
	}

	.text {
		font-size: 35rpx;
		margin-top: 20rpx;
		text-align: left;
		color: #064420;
	}

	.function {
		position: fixed;
		width: 750rpx;
		height: 150rpx;
		bottom: 0;
		background: #F9F9F9;
		padding-bottom: env(safe-area-inset-bottom);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.like {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 280rpx;
		height: 90rpx;
		border: 2px solid #E1E5EA;
		border-radius: 20rpx;
		margin: 0 30rpx;

	}

	.icon {
		width: 50rpx;
		height: 50rpx;
	}


	.like image {
		width: 50rpx;
		height: 50rpx;
	}

	.like .text2 {
		font-weight: bold;
		color: #4C4C6D;
		height: 50rpx;
		font-size: 35rpx;
		margin-left: 30rpx;
		line-height: 50rpx;
	}

	button,
	.share image {
		/* position: absolute; */
		/* bottom: 800rpx;
	  right: 175rpx; */
		width: 50rpx !important;
		height: 50rpx !important;
		border: none !important;
		padding: 0 !important;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.share {
		width: 90rpx;
		position: relative;
		height: 90rpx;
		border: 2px solid #E1E5EA;
		border-radius: 20rpx;
		margin: 0 30rpx;
	}

	.share image {
		width: 50rpx;
		height: 50rpx;

	}

	/*fixednav*/

	.none {
		display: none;


	}
</style>
