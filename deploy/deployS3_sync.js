/**
*
*

deployment sync program to upload and sync one repository folder to s3 folder

How to use
#> node deployS3_sync.js git.rkd.io testfolder mytest


ARGS required     BUCKETNAME   REPOSITORYFOLDER   S3FOLDER
		   git.rkd.io    testfolder        mytest

*/


// load s3 library
var s3 = require('s3');

//client and aws keys
var client = s3.createClient({
	s3Options:{
		accessKeyId:'AKIAJCXRH3CSGAM7OFEQ',
		secretAccessKey:'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'
	}
});

//assigning parameters
var repositoryDirParam = bucketParam =remoteDirParam = '';


bucketParam = process.argv[2];
repositoryDirParam = process.argv[3];
remoteDirParam = process.argv[4];


// read parameters
try{
	if( typeof bucketParam == 'undefined' || typeof repositoryDirParam == 'undefined' || typeof remoteDirParam=='undefined'){
		throw new Error('params missing');
	}
}catch(err){
	console.log(err);
	process.exit(1);
}


//set configuration for s3 bucket
var params = {
	localDir : repositoryDirParam,
	s3Params:{
		Bucket: bucketParam,
		Prefix: remoteDirParam,
		ACL: 'public-read'
	}
}


var uploader = client.uploadDir(params);

//callback for error when sync folder
uploader.on('error',function(err){
	console.error("unable to sync:",err.stack);
	process.exit(1);
});

//callback for progress status
uploader.on('progress',function(){
	console.log("progress",uploader.progressAmount, uploader.progressTotal);
})

//callback for complete upload
uploader.on('end',function(){
	console.log("done uploading");
});
