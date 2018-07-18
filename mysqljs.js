var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.236.130.82',
  user     : 'root',
  password : 'dKdh12@s/#s12',
  database : 'test_eos90s'
});
connection.connect();
 
export async function getCommunityAccounts(begin,limit){	
    return new Promise(function(resolve,reject){
    	try{
		
    	

 		let accounts = [];

		connection.query(`SELECT uid,eosaccount,tokencount from secondTable WHERE eosaccount IS NOT NULL and pwd != 'success' limit ${begin},${limit}`, function (error, results, fields) {//账号地址为空的没有取
		  if (error) throw reject(error);

		  // [
		  // 	{
		  //		uid,
		  // 		balance,
		  // 		eosAccount
		  // 	}
		  // ]
		 
	    for(let res of results){
	  	 	accounts.push(
	  	 		{
		  	 		uid: res.uid,	
		  	 		balance: res.tokencount,	
		  	 		eosAccount: res.eosaccount
	  	 		}
	  	 	)
	  	}
	  	
	  	//connection.end();
	  	if(accounts.length == 0){console.log('全部完成');process.exit();}
	  	resolve(accounts);
			
		});


    }catch(e){
    	reject(e);
    }
	
	})
}


 // getCommunityAccounts().then(function(value){
 // 	for (let m of value){
 // 		setCompleteRecord(m).then(function(val){
 // 			console.log(val);
 // 		})
 		
 // 		//console.log(m.balance,	m.eosAccount)
	// }
 // });

export async  function setCompleteRecord(eosAccount){
	return new Promise(function(resolve,reject){
		try{
			//connection.connect();
			connection.query(`UPDATE secondTable SET pwd = 'success' WHERE eosaccount = '${eosAccount}'`, function (error, results, fields) {
				console.log(error);
				if (error) throw reject(error);
			})
			resolve(`eosAccount:${eosAccount} mark success`);
		}catch(e){
			console.log(`UPDATE secondTable SET pwd = 'success' WHERE eosaccount = '${eosAccount}'`)
			reject(e);
		}

	})
}

