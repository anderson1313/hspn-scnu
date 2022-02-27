<template>
	<view class="page">

		<view class="up">
			<view class="return">
				<view class="returnicon iconfont icon-fanhui" @click="goback"></view>
			</view>
			<view :class="['nav',uploading==true?'blur':'']">
				<block v-for="(item,index) in label" class="nav" v-bind:key="index">
					<view :class="['labelname','animated','flipInX',labelindex==index?'active':''] "
						@click="changelabel" :data-i="index">{{item}}</view>
				</block>
			</view>
		</view>



		<view class="tutorial animated fadeIn" v-show="labelindex==0">
			<view class="fixsub">
				<!-- <view class="iconfont icon-shangyige" @click="backward"></view> -->
				<view class="picbox">
					<image :src="word.pic_url"></image>
				</view>

				<view class="funbox">
					<view class="like" @click="like">
						<view class="icon">
							<image :src="likepic"></image>
						</view>

					</view>
					<view class="share" @click="share">
						<image src="/static/share.png"></image>
						<button class='text2' plain="true" open-type="share"> </button>
					</view>

				</view>

				<!-- <view class="iconfont icon-xiayige" @click="forward"></view> -->

			</view>

			<view class="subtutorial">
				<view class="tname">
					<image src="https://wx3.sinaimg.cn/mw2000/d1f0bf82gy1gw8njn04wsj22p81stgps.jpg"></image>

				</view>
				<view class="imgcontent"
					:style="{'background-image':'url('+word.seq+')','background-size':'contain','background-repeat':'no-repeat'}">
					<!-- <image :src="word.seq" class="img" mode="widthFix"></image> -->
				</view>
			</view>
			<view class="subtutorial">
				<view class="tname tgif">
					<image src="https://wx2.sinaimg.cn/mw2000/d1f0bf82gy1gw8njnq2s6j22p81stdmt.jpg"></image>

				</view>
				<view class="gifcontent">
					<image :src="word.gif" class="gif"></image>
				</view>
			</view>
		</view>


		<view class="submitcontainer " v-show="labelindex==1">
			<view :class="['tipBox','animated','fadeIn',uploading==true?'blur':'']">
				<view class="tip">
					1.请选用白色纸张进行临摹
				</view>
				<view class="tip">
					2.为保证分析效果，拍照时请尽可能使文字完整，且画面中仅包含此文字，减少阴影
				</view>
				<view class="tip">
					3.分析需要一定时间，请耐心等待
				</view>
				<view class="tip">
					4.若您使用ios设备，请将相机拍摄格式改为‘兼容性最好’
				</view>

			</view>

			<view class="loading" v-show="uploading==true">

				<image src="https://wx2.sinaimg.cn/large/d1f0bf82gy1gwagc5xqfug205k05kngk.gif"></image>
				<view class="loadingtext">上传分析中..</view>
			</view>

			<view class="down animated bounceIn fadeInLeft" v-show="uploading==false">
				<view class="titleBox">
					<text class="title">{{uploadtext}}</text>
				</view>
				<!--两个字体-->
				<view class="charBox" v-show="uploading==false && uuid==false">
					<!--上传的字体（临摹）-->
					<view class="bigChar" @click="chooseImage()" :style="{'background-image':'url('+img_url+')'}">

					</view>
					<!--选择的字体（字帖）-->
					<view class="smallChar">
						<view class="smallbox">
							<image class="smallImg" :src="word.pic_url"></image>
						</view>

					</view>
				</view>
				<!--提示文字-->


				<view class="submitBox animated fadeInRight" v-show="uuid!=false" @click="toAnalyse()">
					<view class="submit iconfont icon-fenxi">
					</view>
					<view class="text">查看结果</view>
					<!--<button class="btn" type="default" @click="submit">确定</button>-->
					<!-- v-show="uuid!=false" -->
					<view class="submit iconfont icon-xiangyou" @click="toAnalyse()">
					</view>
				</view>

				<view class="reuploadBox animated fadeInRight" v-show="uuid!=false" @click="reupload()">
					<view class="reupload iconfont icon-shangchuan">
					</view>
					<view class="text">重新上传</view>


				</view>

			</view>
		</view>

		<view class="rankingcontainer" v-show="labelindex==2">
			<view class="tutorial animated fadeIn">
				<view class="myrank"></view>
				<view class="myhead">
					<image class="profile" :src="userInfo.avatarUrl"></image>
				</view>
				<view class="myscore"></view>
				<view class="truescore">{{myscore.score}}</view>
				<view class="truerank">{{myrank}}</view>
				
				<view :v-if="allscore.length!=0" class="norank">还没小伙伴提交评价呢..</view>
				<view v-for="(item,index) in allscore" :key='index' class="rankingsquare" :v-if="allscore.length!=0">
					
					<view class="number">{{index+1}}</view>
					<view class="pixbox">
						<image :src="item.avatarurl"></image>
					</view>
					<view class="name">{{item.nickname}}</view>
					<view class="score">{{item.score}}</view>
				</view>
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
				userInfo: [],
				myscore:{'score':'/'},
				myrank:'/',
				allscore: [],
				likepic: '', //通过这个更改喜欢不喜欢图片
				likeornot: '', //记录收藏状态
				uploadtext: "请上传文字",
				uploading: false,
				see: false,
				labelindex: 0,
				haveUpLoad: false,
				FilePath: null,
				index: null,
				img_url: "https://wx1.sinaimg.cn/mw2000/d1f0bf82gy1gw94rb5af5j24tm4tlk97.jpg",
				uuid: false,
				result: {},
				label: ["教程", "提交", "排名"],
				/* word: {
					gif: "https://hanyu-word-gif.cdn.bcebos.com/bb3e43bce24154e4ea04e1887c296d7b8.gif",
					id: 1,
					name: "一",
					pic_url: "http://106.52.28.79/template?index=0001",
					seq: "https://hpsnx.top/bishun/0001.jpg",
				} */
				word: {}
			}
		},
		onLoad: function(option) {
			this.userInfo = uni.getStorageSync('userinfo')
			   

			if (option) {
				this.$data.index = option.index.padStart(5, '0')
			}

			uni.showLoading({
				title: '加载中',
				duration: 500 //具体时间要确定
			})
			var uid = uni.getStorageSync('useropenid')
			var data = {
				openid: uid,
				id: this.index

			}
			apiModel.ifUserlikeChar(data).then(res => {
				if (res.isexist == false) {
					this.likeornot = 0

					this.likepic = "/static/notlike.png"
				} else {
					this.likeornot = 1
					this.likepic = "/static/like.png"
				}


			})
			var dataa = {
				index: this.$data.index


			}
			
			apiModel.getRank(dataa).then(res => {
				var tmp=res.data
				this.$data.allscore=res.data
				/* this.allscore.sort(this.compare("score")) */
				this.myscore=res.data.filter(({ openid }) => openid == uid)[0]
				console.log(this.allscore)
				
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].openid==uid){
						this.myrank=i+1
					}
				}
				
				
		
			})


			var id = option.index
			console.log(id)
			var url = '/search/id/' + id
			apiModel.getsearch(url).then(res => {
				this.$data.word = res.data[0]
				console.log(this.$data.word)
				uni.hideLoading()
			})
		},
		methods: {
			
			
			like: function() {
				var hasUserInfo = uni.getStorageSync('ifgetuserinfo')
				if (!hasUserInfo) {
					uni.showToast({
						title: '请先登录',
						mask: false,
						icon: 'none'

					})
					return

				}
				wx.vibrateShort({
					type: 'medium',
				})

				if (this.likeornot == 0) {
					var uid = uni.getStorageSync('useropenid')
					var id = this.index
					console.log(uid)
					console.log(id)

					var data = {
						'openid': uid,
						'id': id
					}
					apiModel.addUserChar(data).then(res => {
						console.log(res)
					})
					this.likeornot = 1,
						this.likepic = "/static/like.png"
					uni.showToast({
						title: '已加入「收藏」',
						icon: 'none'
					})
				} else {
					var uid = uni.getStorageSync('useropenid')
					var id = this.index
					console.log(uid)
					console.log(id)

					var data = {
						'openid': uid,
						'id': id
					}
					apiModel.delUserChar(data).then(res => {
						console.log(res)
					})
					this.likeornot = 1,
						this.likepic = "/static/notlike.png"
					uni.showToast({
						title: '已移除收藏',
						icon: 'none'
					})

				}

			},



			share: function() {
				wx.vibrateShort({
					type: 'medium',
				})
			},
			toAnalyse() {
				//开始分析
				const that = this
				uni.showLoading({
					title: '结果获取中',
					duration: 500 //具体时间要确定
				});

				uni.navigateTo({
					url: "../analysis/analysis?uuid=" + String(that.$data.uuid) + "&index=" + String(that.$data
						.index)
				})
			},
			goback(e) {
				uni.navigateBack({

				})
			},
			//跳转页面
			changelabel(e) {
				console.log(e)

				var i = e.currentTarget.dataset.i
				this.labelindex = i
				console.log("已转化页面")


			},
			forward(e) {
				var id = this.$data.word.id + 1
				var url = '/search/id/' + id
				apiModel.getsearch(url).then(res => {
					this.$data.word = res.data[0]
					console.log(this.$data.word)

				})

			},
			reupload(e) {
				this.$data.uuid = false

			},
			backward(e) {
				var id = this.$data.word.id
				if (id == 1) {
					uni.showToast({
						title: '已经是第一个啦',
						duration: 2000,
						icon: 'none',
					})
				} else {
					var id = this.$data.word.id - 1
					var url = '/search/id/' + id
					apiModel.getsearch(url).then(res => {
						this.$data.word = res.data[0]
						console.log(this.$data.word)

					})

				}

				console.log(id)
			},

			//选择图片
			chooseImage() {
				//修改2——设置弹窗出现
				const that = this;
				// 选择相册或者拍照
				uni.chooseImage({
					// ablum相册 camera相机 ，默认二者都有
					sourceType: ['album', 'camera'],
					// orginal原图   compressed压缩图，默认二者都有
					sizeType: ['compressed'],
					// 最多可选图片张数，默认9
					count: 1,
					// 成功则返回图片的本地文件路径列表 tempFilePaths
					success: res => {
						/* uni.showToast({
							title: "选择成功", //上传中包含上传与分析两个步骤
							duration: 1000
						}); */
						console.log(res.tempFilePaths[0])
						that.uploadImage(res.tempFilePaths[0])
						this.$data.FilePath = res.tempFilePaths[0]

						this.$data.haveUpLoad = true
					},
					// 接口调用失败的回调函数
					fail: err => {


					}
				});
			},
			// 上传照片至指定服务器
			uploadImage(tempFilePaths) {
				var hasUserInfo = uni.getStorageSync('ifgetuserinfo')
				if (!hasUserInfo) {
					uni.showToast({
						title: '请先登录',
						mask: false,
						icon: 'none'

					})
					return

				}
				const that = this
				that.$data.uploading = true
				var uid = uni.getStorageSync('useropenid')

				/* uni.showLoading({
					title: "上传并分析中" //上传中包含上传与分析两个步骤
				}); */
				uni.uploadFile({
					// 服务器地址
					url: 'https://hpsnx.top/image',
					filePath: tempFilePaths,
					name: 'file',
					header: {
						"content-type": "multipart/form-data"
					},
					formData: {
						"index": that.$data.index,
						openid: uid
					},
					success: res => {
						that.$data.uploading = false
						uni.hideLoading();
						that.$data.uploadtext = "请查看结果"

						/* uni.showToast({
							title: "上传成功", //上传中包含上传与分析两个步骤
							duration: 1000
						}); */
						this.$data.result = JSON.parse(res.data);
						console.log(this.$data.result);
						this.$data.uuid = this.$data.result.data.uuid;
						console.log(this.$data.uuid)

					},
					fail: err => {
						console.log(err)
						that.$data.uploading = false
						uni.hideLoading()
						uni.showToast({
							title: "上传失败", //上传中包含上传与分析两个步骤
							duration: 1000,
							icon: "none",
						});
						that.$data.uploadtext = "请上传文字"

						console.log(err.code);
						console.log(err.errMsg);
						console.log(err.message);
					}
				});
			},
		}
	}
</script>

<style>
	.return {

		height: 100rpx;
		margin-top: 80rpx;
		padding-left: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		z-index: 10;


	}

	.blur {
		filter: blur(10px);

	}

	.icon-fanhui {
		font-size: 60rpx;

	}

	.up {
		background-color: #f1f3f6;
		height: 600rpx;

	}

	.fixsub {
		padding: 20rpx 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 380rpx;
		width: 600rpx;
		left: 50%;
		margin-left: -310rpx;
		background: #f1f3f6;
		border-radius: 10rpx;
		box-shadow:
			inset 0 0 15px rgba(55, 84, 170, 0),
			inset 0 0 20px rgba(255, 255, 255, 0),
			10px 10px 18px rgba(55, 84, 170, 0.15),
			-10px -10px 22px white,
			inset 0px 0px 4px rgba(255, 255, 255, 0.2);
		/* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */


	}

	.picbox {
		border-radius: 50%;
		background-image: url("https://wx2.sinaimg.cn/mw2000/d1f0bf82gy1gw6sjb3twqj24hu4i0b29.jpg");
		background-size: contain;
		margin: 30rpx 60rpx;
		width: 200rpx;
		height: 200rpx;
		position: relative;

	}

	.picbox image {
		border-radius: 50%;
		position: absolute;
		width: 80%;
		height: 80%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.funbox {
		width: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.like,
	.share {
		position: relative;
		width: 120rpx;
		height: 100rpx;
		border-radius: 20rpx;
		margin: 0 30rpx;

	}

	.like image {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
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

	.share image {
		width: 50rpx;
		height: 50rpx;

	}

	.tipBox {
		position: absolute;
		top: 320rpx;
		width: 580rpx;
		left: 50%;
		margin-left: -320rpx;
		background: #f1f3f6;
		padding: 30rpx;
		border-radius: 30rpx;
		box-shadow:
			inset 0 0 15px rgba(55, 84, 170, 0),
			inset 0 0 20px rgba(255, 255, 255, 0),
			10px 10px 18px rgba(55, 84, 170, 0.15),
			-10px -10px 22px white,
			inset 0px 0px 4px rgba(255, 255, 255, 0.2);
	}

	.tipBox .tip {
		margin: 20rpx 0;
		font-size: 30rpx;
		color: #6B4F4F;
	}

	.fixsub .iconfont {
		background: #f1f3f6;
		box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
			3px 3px 5px rgba(0, 0, 0, 0.5);
		font-size: 60rpx;
		border-radius: 40rpx;
		opacity: 0.6;
	}

	.page {
		width: 100%;
		background-color: #F1F2F6;
		background-color: white;
		display: flex;
		flex-direction: column;
	}

	.nav {
		margin: 0 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 200rpx;
	}

	.labelname {
		margin: 0 40rpx;
		font-size: 35rpx;
		font-weight: bold;

	}

	.active {
		color: #678983;
		border-bottom: 1px solid #678983;
	}




	.subtutorial {
		margin: 0 70rpx;
		border-radius: 10rpx;
		/* 	box-shadow: 0px -6px 10px rgba(255, 255, 255, 1), 0px 4px 15px rgba(0, 0, 0, 0.15); */
		overflow: hidden;

	}

	.tutorial:nth-child(2) {
		padding-top: 100rpx;
	}

	.imgcontent {
		/* margin: 0 auto;
		margin-bottom: 20rpx;
		width: inherit;
		height: 200rpx;
		position: relative; */
		width: 500rpx;
		height: 150rpx;
		overflow: hidden;
		/* margin-left: 40rpx; */
		margin: 0 auto;
	}


	.gifcontent {
		margin: 0 auto;
		width: 350rpx;
		height: 350rpx;
		position: relative;

	}

	.gifcontent .gif {
		position: absolute;
		width: 80%;
		height: 80%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}



	.tname {
		background-color: #105652;

		font-weight: bold;
		margin-top: 30rpx;
		width: 168rpx;
		height: 104rpx;
		text-align: center;
		color: white;
		padding: 15rpx;

		position: relative;

	}

	.tgif {
		margin-left: 50rpx;

	}

	.tname image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.down {
		padding-top: 200rpx;
	}

	.titleBox {
		text-align: center;
		font-size: 45rpx;
		font-weight: bold;
		color: #105652;
		margin-bottom: 50rpx;
	}

	.charBox {
		position: relative;
	}

	.bigChar {
		width: 300rpx;
		height: 300rpx;
		border-radius: 1rpx;
		margin: 0 auto;
		border-radius: 50%;
		/* background-image: url("https://wx1.sinaimg.cn/mw2000/d1f0bf82gy1gw94rb5af5j24tm4tlk97.jpg"); */
		background-size: cover;
	}

	.smallChar {
		position: absolute;
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
		left: 160rpx;
		top: 160rpx;
		background-image: url("https://wx2.sinaimg.cn/mw2000/003QmReqgy1gv8yo8y6b0j62v02uzwpa02.jpg");
		padding: 10rpx;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.smallbox {
		width: 80rpx;
		height: 80rpx;
		position: relative;

	}

	.smallbox image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-60%, -50%);
	}

	.submitBox,
	.reuploadBox {
		width: 250rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		margin: 40rpx auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}

	.reuploadBox {
		background-color: #DFD8CA;
	}

	.submitBox {
		background: #E6DDC4;

	}

	.submit,
	.upload {
		width: 50rpx;
		height: 50rpx;
		font-size: 50rpx;
		text-align: center;
		line-height: 50rpx;
		color: #000000;
	}

	.submitBox .text {
		font-size: 28rpx;
		width: 120rpx;
		text-align: center;
	}

	.icon-xiangyou {
		color: #105652;

	}

	.icon-shangchuan {
		font-size: 40rpx;
		color: #B91646;
		margin-right: 20rpx;


	}

	.loading {
		top: 450rpx;
		width: 500rpx;
		height: 500rpx;
		position: absolute;
		margin: 0 auto;
		left: 50%;
		margin-left: -250rpx;
	}

	.loading image {
		position: absolute;
		width: 70%;
		height: 70%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.loading .loadingtext {
		position: absolute;
		width: 70%;
		height: 70%;
		top: 120%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: #105652;
		font-weight: bold;
	}

	.rankingsquare {
		
		align-items: center;
		display: flex;
		flex-direction: row;
		border-width: 10rpx;
		border-color: #ecf0f1;
		border-style: none none solid none;
		width: 750rpx;
		height: 150rpx;
		background: #FFFFFF;
	}

	.number {
		font-size: 50rpx;
		font-weight: 500;
		color: #130f40;
		
		margin-left: 80rpx;
		margin-right: 30rpx;
		
		
		font-family: Arial, Helvetica, sans-serif;
	}

	.myscore {
		position: absolute;
		top: 325rpx;
		width: 150rpx;
		height: 50rpx;
		left: 50%;
		margin-left: 125rpx;
		background-image: url("../../static/myscore.jpg");
		background-size: cover;
		padding: 30rpx;
	}

	.name {
		margin-left: 10rpx;
		font-size: 40rpx;
		
		width: 100rpx;
		font-weight: 500;
		width: 30%;
	}

	.score {
		margin-left: 50rpx;
		font-size: 50rpx;
		padding: 40rpx;
		color: #84817a;
	}

	.myrank {
		position: absolute;
		top: 325rpx;
		width: 150rpx;
		height: 50rpx;
		left: 50%;
		background-image: url("../../static/myrank.jpg");
		background-size: cover;
		margin-left: -325rpx;
		padding: 30rpx;
		border-radius: 30rpx;

	}

	.myhead {
		overflow: hidden;
		position: absolute;
		display: block;
		width: 150rpx;
		height: 150rpx;
		top: 360rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		margin-left: 290rpx;
	}
	
	
	
	.myhead .profile {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.truescore {
		position: absolute;
		top: 410rpx;
		width: 150rpx;
		height: 50rpx;
		left: 50%;
		margin-left: 125rpx;
		background: #f1f3f6;
		padding: 30rpx;
		padding-left: 75rpx;
		font-weight: 400;
	}

	.truerank {
		position: absolute;
		top: 410rpx;
		width: 150rpx;
		height: 50rpx;
		left: 50%;
		margin-left: -325rpx;
		padding: 30rpx;
		font-weight: 400;
		padding-left: 75rpx;

	}

	.pixbox{
		overflow: hidden;
		display: block;
		width: 70rpx;
		height: 70rpx;
		margin: 20rpx;
		margin-top: 20rpx;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		position: relative;
		margin-right: 40rpx;
		
	}
	.pixbox image{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.norank{
		text-align: center;
		margin: 40rpx;
	}
</style>
