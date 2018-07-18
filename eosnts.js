import Eos from 'eosjs'
import config from './config'
//import {fetchVoteAccounts, updateAirdropStatus} from './snapshot'
import {getCommunityAccounts,setCompleteRecord} from './mysqljs'




export async function ntsTransfer(account, amount, keyProvider) {
  const eoscfg = {
    httpEndpoint: config.HTTP_END_POINT,
    chainId: config.CHAIN_ID,
    keyProvider: keyProvider
  };

  const eos = Eos(eoscfg);
  let ntsContract = await eos.contract('eosninetiess');
  await ntsContract.transfer('eosninetiess', account, amount, 'EOS90S感谢您对本社区的支持！').then(async(res)=>
  {
    await setCompleteRecord(account).then( res2=>console.log(`给EOS账户名[${account}]转账[${amount}]成功！！且数据库标记成功……`),err2=>{console.log(`给EOS账户名[${account}]转账[${amount}]成功，但是数据库标记失败！程序停止`);console.log(err2);process.exit()} );
  },
  err =>
  {
    console.log(`给EOS账户名[${account}]转账[${amount}]失败-_-||，程序停止`);
    process.exit();
  }
  );

}

async function batchNtsTransfer(accounts, keyProvider) {
  for (let account of accounts) {
    let balance = account.balance;
    if (balance > 1000000) {
      continue;
    }
    let balanceStr = balance + ".0000 EOSNTS";
    //await ntsTransfer(account, balanceStr, keyProvider);
    await ntsTransfer(account.eosAccount, balanceStr, keyProvider);
  }
}

export async function execAirdrop(keyProvider,begin = 0,limit = 4) {
  try {
    let accounts = await getCommunityAccounts(begin,limit);
    //let curBegin  = begin;
    let i = 1;
    console.log(`第1个到${limit}个：`)
    await batchNtsTransfer(accounts, keyProvider);
    while (accounts.length > 0) {
     // let lastId = accounts[accounts.length-1]._id;
      //curBegin =  limit * i + begin + 1;
      //i++;
      let tmp = limit * i + 1;  
      let tmp2 = limit * (i+1);    
      console.log(`第${tmp}个到${tmp2}个：`)
      accounts = await getCommunityAccounts(0,limit);//因为每次成功后，都讲pwd字段设置为了success，所以这里只要从第0条记录开始就可以了
      await batchNtsTransfer(accounts, keyProvider);
      i++;
    }
  } catch (e) {
    console.error(e);
  }
}