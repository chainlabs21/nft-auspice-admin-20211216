
import {web3} from '../configs/configweb3'
import {abierc20} from '../contracts/abi/erc20'
import { abierc721extended } from '../contracts/abi/erc721extended'
import { abiadmin } from '../contracts/abi/adminconfigs'
import {LOGGER} from './common'
// import { getweirep } from '../utils/eth'
// import { DebugMode } from '../configs/configs'
const jcontracts={}

const access_data=jargs=>{
	let {contractaddress , variablename , aargs }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[variablename](aargs[0]).call( 		(err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
/** 		contract[variablename].call( aargs[0] , (err,resp)=>{LOGGER('' , err,resp)
		if(err){resolve(null);return}
		resolve(resp)
	}).catch(err=>{resolve(null)})
})*/
})
}
const query_with_arg = jargs=> {  // {contractaddress , methodname , aargs }=jargs
	let {contractaddress , methodname , aargs }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](	aargs		).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_noargs=jargs=>{let { contractaddress , methodname  }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](			).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_decimals =jargs=>{	let { contractaddress  }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods.decimals(			).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}

export {
		access_data
	, query_with_arg
	, query_noargs
	, query_decimals
}
/** const approve=async jargs=>{let {contractaddress , spenderaddress,amount }=jargs; let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( abierc20 , contractaddress);    jcontracts[contractaddress ]=contract }
  return new Promise((resolve,reject)=>{  if(contract){} else {resolve(null) ; return false }
    contract.methods.approve(spenderaddress ,getweirep(amount) ).call((err,resp)=>{DebugMode && LOGGER('ttEyiAnksK',err,resp)
      resolve( resp )
    }).catch(err=>{DebugMode && LOGGER('KRiD5tsqkD',err);resolve(null)} )
  })
}
*/
