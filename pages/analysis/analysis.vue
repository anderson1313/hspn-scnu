<template>
	<view class="page">
		<view class="return">
			<view class="returnicon iconfont icon-fanhui" @click="goback"></view>
		</view>

		<view class="stat animated flipInX">
			<view class="left">
				<view class="diffpicBox">
					<image :src="diff_path"></image>
				</view>
			</view>
			<view class="right">
				<view class="userwordBox">
					<image :src="linmo_path"></image>
				</view>
				<view class="circlebox">
					<cCircle :size="60" :percent="mark" :animation="true" :animationSpeed="50" :direction="180"
						@animationPercent="getPercent">
						<span slot="content" class='text'>{{percent}}分</span>
					</cCircle>
				</view>
			</view>
		</view>

		<view class="comment animated flipInX">
			<view class="titlebox">
				<view class="iconfont icon-dianping"></view>
				<view class="titlename">点评</view>
			</view>
			<view class="commentbox">
				<view class="commentcontent"> {{comment}}</view>
			</view>
		</view>


	</view>
</template>

<script>
	import cCircle from "../../components/cCircle.vue"
	export default {
		components: {
			cCircle
		},
		data() {
			return {
				uuid: null,
				index: null, //标准图片的索引
				linmo_path: null,
				zitie_path: null,
				diff_path: null,
				score: null,
				comment: null,
				mark: '',
				percent: 0,
			}
		},
		onLoad: function(e) {

			//获取结果
			this.$data.uuid = e.uuid
			/* this.$data.index = e.index */
			this.$data.linmo_path = "http://106.52.28.79/linmo?uuid=" + this.$data.uuid
			this.$data.zitie_path = "http://106.52.28.79/template_2?index=" + this.$data.index
			this.$data.diff_path = "http://106.52.28.79/wan_mark?uuid=" + this.$data.uuid
			this.$data.resdict = "http://106.52.28.79/remark?uuid=" + this.$data.uuid
			uni.request({
				url: "http://106.52.28.79/remark?uuid=" + this.$data.uuid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data)
					this.$data.mark = res.data.score
					this.$data.comment = res.data.comment
					/* this.$data.mark = Math.floor(this.$data.score/10)*10
					console.log(this.$data.percent) */

				},
				fail: () => {
					uni.showToast({
						title: '数据获取失败',
						duration: 1000
					});
				},
				complete: () => {}
			})
		},
		methods: {

			getPercent(animationPercent) {
				this.percent = animationPercent;
			},
			goback() {
				uni.navigateBack({
			
				})
			}

		},
		


	}
</script>

<style>
	.page {
		background: #f1f2f6;
		height: 100vh;
	}

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

	.icon-fanhui {
		font-size: 60rpx;
	}

	.stat {

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 30rpx 40rpx;
		padding-top: 300rpx;
	}

	.stat>view {
		margin: 0 30rpx;
	}

	.left {
		width: 420rpx;
		height: 420rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.right {
		width: 200rpx;
		height: 420rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.diffpicBox {
		width: 420rpx;
		height: 420rpx;
		position: relative;
		background: #DFD8CA;
		border-radius: 10rpx;
		box-shadow:
			inset 0 0 15px rgba(55, 84, 170, 0.3),
			inset 0 0 20px rgba(255, 255, 255, 0),
			10px 10px 18px rgba(55, 84, 170, 0.4),
			-10px -10px 22px white,
			inset 0px 0px 4px rgba(255, 255, 255, 0.6);

	}

	.diffpicBox image {
		width: 95%;
		height: 95%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.userwordBox {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 10rpx;
		position: relative;
		background: #F1F2f3;
		border-radius: 10rpx;
		box-shadow:
			inset 0 0 15px rgba(55, 84, 170, 0),
			inset 0 0 20px rgba(255, 255, 255, 0),
			10px 10px 18px rgba(55, 84, 170, 0.14),
			-10px -10px 22px white,
			inset 0px 0px 4px rgba(255, 255, 255, 0.2);
	}

	.userwordBox image {
		width: 90%;
		height: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.circlebox {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;

	}

	.text {
		font-weight: bold;
		color: #105652;
	}

	.comment {
		margin: 20rpx 0;
		padding: 40rpx 0;
	}

	.titlebox {
		display: flex;
		flex-direction: row;
		width: 200rpx;
		margin: 30rpx 60rpx;

	}

	.titlebox>view {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 39rpx;
	}

	.icon-dianping {
		font-weight: bold;
		color: #678983;
	}

	.commentbox {
		margin: 0 auto;
		background-color: #6D9886;
		width: 600rpx;
		border-radius: 10rpx;
		padding: 10rpx;
		box-shadow:
			inset 0 0 15px rgba(55, 84, 170, 0.3),
			inset 0 0 20px rgba(255, 255, 255, 0),
			10px 10px 18px rgba(55, 84, 170, 0.4),
			-10px -10px 22px white,
			inset 0px 0px 4px rgba(255, 255, 255, 0.6);
	}

	.commentcontent {
		background-color: #F6F6F6;
		padding: 30rpx;
		color: #316B83;

	}
</style>
