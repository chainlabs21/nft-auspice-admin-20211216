
const MAP_ACTIONTYPES={
	"MINT_SINGLE" : 0
	,"PUT_ONSALE" :1
	,"EDIT_SALE_TERMS" :2 
	,"SET_SALE_TERMS" :3
	,"SET_SALE_EXPIRY" :4
	,"CHANGE_PRICE" :5
	,"SET_PAYMEANS" :6
	,"APPROVE_BUY_REQUEST" :7
	,"DENY_BUY_REQUEST" :8
	,"CANCEL_SALE" :9
	,"PUT_BID" :10
	,"CANCEL_BID" :11
}
//	mapping (string => uint ) public _map_action_str_adminfee_inbp ;
//	mapping (string => uint ) public _map_action_str_adminfee_inbp ;
//	mapping (uint => uint ) public _map_action_int_adminfee_inbp ;
const abiadmin = [
	{	name: 'query_admin_fee',
		type: 'function',
		payable: false ,
		constant: true,
		inputs: [
			{ type: 'string', name: '_action' }
		],
		outputs: [ { type: 'uint', name: 'feeamount_' } ]
	}	,
// function get_admin_fee (string memory _action ) public view returns (uint ) {
	{	name : '_map_action_int_adminfee_inbp'
		, type : 'function' // data mapping
		, payable : false
		, constant : true
		, inputs : [
			{ type: 'uint', name: '_action' }
		]
		, outputs : [
			{ type : 'uint' , name : 'feeinbp_' }
		]
	}
]
export {
	MAP_ACTIONTYPES
	, abiadmin
}

	
