require('babel-register')
require("babel-polyfill")

var execAirdrop = require('./eosnts').execAirdrop
var ntsTransfer = require('./eosnts').ntsTransfer

var keyProvider = process.argv[2];
if (!keyProvider) {
  console.log("keyProvider must supply");
  process.exit();
}



var begin = process.argv[3];//从第多少条开始


if (!begin || isNaN(begin)) {
    console.log('第二个参数必填且需为数字，代表从第多少条记录开始执行');
    process.exit();
}

execAirdrop(keyProvider,begin);
//ntsTransfer("liao", "10.0000 EOSNTS", keyProvider).then(() => {process.exit()})


