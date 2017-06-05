/**
@author: Varun Ojha
@version: 1.0
@date: 04/05/2016
@Description: Dispatches all incoming requests to express server.
**/

var Promise = require('bluebird');

var validate = require('../utils/validation_helper.js');
var logHelper = require('../logging/logging.js');
var logger = logHelper.getLogger('request_handler');
var util = require('../utils/util.js');
var constants = require('../constants/constants.js');


var config = require('config');

var dataPaths = [
constants.FRIENDS,
constants.USERS

];

var controllerPaths = [
constants.ROUTE_SESSION_LOGIN,
constants.ROUTE_SESSION_LOGOUT,
constants.ROUTE_VIEW_HOME,
constants.ROUTE_VIEW_LOGIN,
constants.ROUTE_REGISTER
]

var clientAccessMap = {};
clientAccessMap[constants.USERS] = [constants.HTTP_GET, constants.HTTP_POST, constants.HTTP_PUT, constants.HTTP_DELETE];
clientAccessMap[constants.FRIENDS] = [constants.HTTP_GET, constants.HTTP_POST, constants.HTTP_PUT, constants.HTTP_DELETE];

console.log(clientAccessMap);

module.exports= {
	dispatchRequest: dispatchRequest
}

function dispatchRequest(request, response, next){
	
	//temp hack for unit tests
	/*var query = request.query;
	if(validate.isValid(query)){
		var caller = query.caller;
		if(validate.isValidString(caller) && (caller == 'unit_test')){
			next();
			return;
		}
	}*/
	//end of temp hack



	var url = request.originalUrl;
	var method = request.method;
	var session = request.session;

	var requestType = getRequestType(url);

	if(constants.REQUEST_TYPE_CONTROLLER == requestType){	
		if(isException(url, requestType, method) || util.isSessionValid(session)){
			if(url == '/'){
				response.redirect(constants.ROUTE_VIEW_HOME);
			}
			else{
				next();	
			}
			
		}
		else{
			response.redirect(constants.ROUTE_VIEW_LOGIN);
		}
	}

	else if(constants.REQUEST_TYPE_DATA == requestType){

		if(isException(url, requestType, method) || util.isSessionValid(session)){
			next();
		}
		
		else{
			//response.status(401).send("You dont belong here.");
			response.redirect(constants.ROUTE_VIEW_LOGIN);
		}
	}

	else{
		// non data api request such as html, js, css images etc
		next();

	}

	
}

function getRequestType(url){

	var requestType;
	if(validate.isValidString(url)){
		

		if(url == constants.ROUTE_VIEW_HOME_PUBLIC || controllerPaths.findIndex(function(controllerPath){
			return util.stringStartsWith(url, controllerPath);
		}) > -1){
			//controller request
			requestType = constants.REQUEST_TYPE_CONTROLLER;
		}
		else{
			var pathElements = url.split('/');
			if(validate.isValidArray(pathElements)){
				var path = pathElements[1]; // /users/ or /friends

				if(dataPaths.indexOf(path) > -1){
					requestType = constants.REQUEST_TYPE_DATA;
				}
				
			}
		}
		
	}
	return requestType;

}



function isSessionOperation(url){

	if(util.stringStartsWith(url, constants.ROUTE_SESSION_LOGIN) || util.stringStartsWith(url, constants.ROUTE_SESSION_LOGOUT)){
		return true;
	}


	return false;

}

function isRegistrationOperation(url){

	if(util.stringStartsWith(url, constants.ROUTE_REGISTER)){
		return true;
	}


	return false;

}

function getDataObjects(url){
	var object = [];
	var objects = url.split('/');
	if(validate.isValidArray(objects) && objects.length >=2){

		object.push(objects[1]);
		/*if(object[0] == constants.query){
			object[1] = objects[3];
		}*/
	}

	return object;
}




function isException(url, type, method){
	
	/*if(isSessionOperation(url)){
		return true;
	}
	else if(type == constants.REQUEST_TYPE_CONTROLLER){
		return (util.stringStartsWith(url, constants.ROUTE_VIEW_LOGIN));
	}*/

	if(type == constants.REQUEST_TYPE_CONTROLLER){
		if(isSessionOperation(url) || isRegistrationOperation(url)){
			return true;
		}

		return (util.stringStartsWith(url, constants.ROUTE_VIEW_LOGIN));
	}

	else if(type == constants.REQUEST_TYPE_DATA){
		var objects = getDataObjects(url);
		console.log(url + ' '+ type + ' '+objects[0]+ ' '+method);
		if(method == constants.HTTP_POST  && (validate.isValidArray(objects) && (objects[0] == constants.USERS))){
			return true;
		}
		
	}
	

	return false;
}