<template>
	<view class="container">

		<view class="up">
			<view class="zitiecon">

				<image src="../../static/blank.jpg"></image>

			</view>
			<view class="right">
				<view class="inputcon">
					<textarea maxlength="10" @input='getword' placeholder="请输入生成字帖的汉字.例如:横竖撇捺.请不要超过10个字"
						placeholder-style="color:grey;" :value="text" />
				</view>
				<view class="tip" :style="{'font-family':font}">字体加载需等十几秒哦</view>
			</view>



			<view class="words">
				<view v-for="(item, index) in wordlist" :key="index">
					<view class="word" :style="{top:item.top+'rpx','font-family':font}">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="optioncon">
			<view class="fontop">
				<view class="title">字体选择</view>
				<view class="options">
					<view class="eachoption" v-bind:class="index==fonttype?'active':''"
						v-for="(item,index) in fonttypes" :key="index" :data-id='index' :data-value='item'
						@click="changefont">{{item}}</view>
				</view>


			</view>



		</view>
		<view class="subcon" @click="generate">

			生成字帖


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
				text:'',
				wordlist: [],
				words: '',
				fonttype: 0,
				font: 'symks',
				chosenfont: '司马彦楷书',
				fonttypes: ['司马彦楷书', '田英章行书', '田英章楷书']

			}
		},
		methods: {
			onLoad() {
				uni.loadFontFace({
					family: 'symks',
					source: 'url("https://hpsnx.top/司马彦楷书.ttf")',
					success: console.log('success')
				})

				uni.loadFontFace({
					family: 'ztyxs',
					source: 'url("https://hpsnx.top/田英章行书.ttf")',
					success: console.log('success')
				})


			},
			onShow() {



			},
			getword(e) {

				var wordlist = []
				var str = e.detail.value;
				this.$data.words = str
				this.$data.text=str

				for (var i = 0; i < str.length; i++) {
					if (i <= 6) {
						var re = /[^\u4e00-\u9fa5]/
						if (re.test(str[i]) == false) {
							var word = {}
							word.name = str[i]
							word.top = 60 + 54 * i
							wordlist.push(word)
						}

					}


				}
				this.wordlist = wordlist



			},
			changefont(e) {

				this.$data.fonttype = e.currentTarget.dataset.id
				this.$data.chosenfont = e.currentTarget.dataset.value

			},
			generate() {
				var that=this
				var fonttype = this.$data.chosenfont
				var words = this.$data.words

				if (words.length == 0) {
					uni.showToast({
						title: '您还未输入任何汉字',
						icon: 'none'
					})
					return
				} else {
					
					var data = {
						text: words,
						font: fonttype


					}
					const baseurl = 'https://hpsnx.top/zitiePDF?'
					const para = 'text=' + words + '&' + 'font=' + fonttype
					const url = baseurl + para
					console.log(url)
					
					
					uni.showLoading({
					  title: '下载中...',
					}),
					uni.downloadFile({
						url: url,
						success(res) {
							
							if (res.statusCode === 200) {
								const filePath = res.tempFilePath
								console.log(res)
								uni.openDocument({
									filePath: filePath,
									showMenu: true,
									fileType: 'pdf',
									success: function(res) {
										uni.hideLoading()
										that.$data.words='',
										that.$data.wordlist=''
										that.$data.text=''
										
									}
								})
							}
						},
						fail: function(res) {
							console.log(res)
						}
					})


				}
			}

		}
	}
</script>

<style>
	.container {
		height: 100vh;
		background-color: #F1F2F6;
	}

	.up {
		padding: 40rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.zitiecon {
		width: 300rpx;
		height: 400rpx;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

		position: relative;
	}

	.zitiecon image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.right {

		width: 60%;
		padding: 20rpx;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.inputcon {
		padding: 20rpx;

		border-radius: 10rpx;
		position: relative;
		width: 100%;
		height: 200rpx;
		background-color: rgba(255, 255, 255, .6);

	}

	.tip {
		font-size: 28rpx;
		margin: 20rpx 0;
		color: rgba(149, 165, 166, 1.0);
	}


	.inputcon textarea {
		position: absolute;
		height: 80%;
		width: 80%;
		font-size: 30rpx;

	}

	.word {
		position: absolute;
		left: 248rpx;
		font-family: 'symks';
		width: 36rpx;
		height: 36rpx;
		text-align: center;
		line-height: 36rpx;
	}

	.rank {
		width: 150rpx;
		height: 50rpx;
		background-image: url(../../static/rank.jpg);
		background-size: cover;
	}

	.mark {
		width: 150rpx;
		height: 50rpx;
		background-image: url(../../static/mark.jpg);
		background-size: cover;
	}

	.optioncon {
		margin: 20rpx 0;
	}

	.title {
		width: 90%;
		margin: 0 auto;
		font-size: 40rpx;
		color: #227093;


	}

	.fontop .options {

		width: 100%;
		margin: 20rpx auto;


		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.fontop .eachoption {
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		background: white;
		padding: 20rpx;
		margin: 0 15rpx;
		border-radius: 20rpx;
	}

	.fontop .active {
		background-color: #f7f1e3;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.subcon {
		text-align: center;
		box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		background: #F1F2F6;
		margin-top: 60rpx;

	}
</style>
