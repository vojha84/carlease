'use strict';

/**
@author: Varun Ojha
@version: 1.0
@date: 29/06/2016
@Description: constants file
**/

module.exports = {
	//Http codes
	"INTERNAL_SERVER_ERROR": 500,
	"INVALID_INPUT": 400,
	"SUCCESS": 200,
	"SUCCESS_NO_CHANGE": 200,
	"UNAUTHORIZED": 401,
	"ERROR_START_CODE": 400,
	"NOT_FOUND": 404,

	//Http methods
	"HTTP_GET": 'GET',
	"HTTP_POST": 'POST',
	"HTTP_PUT": 'PUT',
	"HTTP_DELETE": 'DELETE',


	"VCAP_SERVICES_CLOUDANT":"cloudantNoSQLDB",
	"VCAP_SERVICES_BLOCKCHAIN":"ibm-blockchain-5-prod",
	"CLOUDANT_INSTANCE_NAME": "cloudantInstanceName",
	"MARKETPLACE_APP_MASTER_DB":"marketplaceAppMaster",
	"CARLEASE_APP_MASTER_DB":"carleaseAppMaster",

	"BLOCKCHAIN_DEFAULT_USERS" : "blockchain_default_users",

	"BLOCKCHAIN_CHAINCODE_NAME" : "marketplace_cc",
	"BLOCKCHAIN_CHAINCODE" : "chaincode",
	"BLOCKCHAIN_CHAIN_KVSTORE_PATH" : "./tmp/keyValStore",

	"BLOCKCHAIN_NW_CERT_PATH" : "./us.blockchain.ibm.com.cert",
	"BLOCKCHAIN_NW_PROTOCOL" : "grpcs://",
	"BLOCKCHAIN_REGISTRAR_ID" : "WebAppAdmin",
	"BLOCKCHAIN_ADMIN_ID" : "admin",

	"BLOCKCHAIN_USER_AFFILIATION": "registrar",
	"BLOCKCHAIN_USER_AFFILIATION_CODE": "0001",
	"BLOCKCHAIN_USER_ROLE_ADMIN": 'admin',
	"BLOCKCHAIN_USER_GROUP": 'group1',

	"BLOCKCHAIN_API_REGISTRAR": 'registrar',
	"BLOCKCHAIN_BUYER_AFFILIATION_CODE": 1,
	"BLOCKCHAIN_SELLER_AFFILIATION_CODE": 2,
	"BLOCKCHAIN_BANK_AFFILIATION_CODE": 3,
	"BLOCKCHAIN_APPRAISER_AFFILIATION_CODE": 4,
	"BLOCKCHAIN_AUDITOR_AFFILIATION_CODE": 5,

	"ENROLL_ID": "enrollId",
	"ENROLL_SECRET": "enrollSecret",


	//Models
	"MODEL_USER": 'user',
	"MODEL_KEYVALUESTORE": 'keyvaluestore',
	

	"CLOUDANT_ID_FIELD": '_id',

	//Views
	'VIEW_HOME': 'web_app/index.html',
	'VIEW_LOGIN': 'web_app/login.html',
	'VIEW_DASHBOARD': 'web_app/dashboard.html',
	'VIEW_PROPERTYADS': 'web_app/property_ads.html',
	'VIEW_PROPERTYAD': 'web_app/property_ad.html',
	'VIEW_MORTGAGEAPPS': 'web_app/mortgage_apps.html',
	'VIEW_MORTGAGEAPP': 'web_app/mortgage_app.html',
	'VIEW_APPRAISERAPPS': 'web_app/appraiser_apps.html',
	'VIEW_APPRAISERAPP': 'web_app/appraiser_app.html',
	'VIEW_SALESCONTRACTS': 'web_app/sales_contracts.html',
	'VIEW_SALESCONTRACT': 'web_app/sales_contract.html',
	'VIEW_BCLOGS': 'web_app/auditor.html',
	
	//Routes
	'ROUTE_REGISTER': '/controllers/register',
	'ROUTE_SESSION_LOGIN': '/controllers/sessions/login',
	'ROUTE_SESSION_LOGOUT': '/controllers/sessions/logout',
	'ROUTE_VIEW_HOME': '/controllers/views/home',
	'ROUTE_VIEW_HOME_PUBLIC': '/',
	'ROUTE_VIEW_LOGIN': '/login',
	

	//Data api entities
	'USERS': 'users',
	'FRIENDS': 'friends',

	//Request Actions
	'REQUEST_ACTION_UPDATE': 'update',

	//Request type
	'REQUEST_TYPE_DATA': 'requestTypeData',
	'REQUEST_TYPE_CONTROLLER': 'requestTypeController',

	"DESIGN_DOCUMENT": "views",
	"VIEW_USER_FRIEND": "userAndFriends",

	"CLOUDANT_VIEW_OCCASSION_LIST": 'occassion_list',
	"CLOUDANT_VIEW_RELATIONSHIP_LIST": 'relationship_list',
	"CLOUDANT_VIEW_LIKES_LIST": 'likes_list',

	"STATUS_SUBMITTED": "Submitted",
	"STATUS_NEW": "New",
	"STATUS_REVIEW": "Under Review",
	"STATUS_APPROVED": "Approved",
	"STATUS_REJECTED": "Rejected",
	"STATUS_COMPLETED": "Completed",


	"BLOCKCHAIN_RESTAPI_REGISTRAR": "/registrar",
	"BLOCKCHAIN_RESTAPI_CHAINCODE": "/chaincode"
	
	
}


