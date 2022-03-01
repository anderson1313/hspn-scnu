//引入阿里云包文件  

//存放此文件路劲必须是 common/ossutil
const OSS =  require('./aliFile.js');  
/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
const uploadFile = function(filePath, dir, successc, failc) {
	if (!filePath) {
		uni.showModal({
			title: '图片错误',
			content: '请重试',
			showCancel: false,
		})
		return;
	}

	//图片名字 可以自行定义，这里是采用当前的时间戳 + 150内的随机数来给图片命名的
	let aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
	let file = filePath.tempFiles[0];
	
	/*
	 *region，accessKeyId，accessKeySecret，bucket
	 * 这几个参数非常重要直接影响能否上传成功
	 */
	const client = new OSS({
	  region: '',  //区域   比如杭州的云仓库  oss-cn-hangzhou
	  secure: true,//*这句话很重要！！！！！！！！！ 
	  accessKeyId: '',  //您的oss的访问ID
	  accessKeySecret: '',  //您的oss的访问密钥
	  bucket: ''    //您的 bucket
	});
	
	client.multipartUpload(aliyunFileKey, file).then(function (result) {
	  let url = result.res.requestUrls[0];
		if (url && url.indexOf("?") != -1) {
		  url = url.toString().substring(0, url.indexOf("?"));
		}			
		successc(url);
	  }
	).catch(function (err) {
		failc(err)
	});
}

module.exports = uploadFile;
