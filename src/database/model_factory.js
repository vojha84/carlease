'use strict';

/**
@author: Varun Ojha
@version: 1.0
@date: 20/04/2016
@Description: Factory file that returns instantiated and configured instances of models
**/

var Promise = require('bluebird');
var Map = require('collections/map');
var logHelper = require(__dirname+'/../logging/logging.js');
var logger = logHelper.getLogger('model_factory.js');
var validate = require(__dirname+'/../utils/validation_helper.js');
var constants = require(__dirname+'/../constants/constants.js');

var datastore = require(__dirname+'/datastore.js');
var CloudantKeyValueStoreModel = require(__dirname+'/model/kv_store_model.js');

var modelCache = new Map();

module.exports = {
	getModel: getModel
};

/**
Instantiates model object with dbName and corresponding dbInstance
**/
function getModel(modelName, dbName){
	return new Promise(function(resolve, reject){
		logHelper.logEntryAndInput(logger, 'getModel', modelName + ' '+ dbName);

		if(!validate.isValidString(modelName)){
			logHelper.logError(logger, 'getModel', 'modelName is invalid');
			return reject({statusCode: constants.INVALID_INPUT, body: null});
		}

		if(!validate.isValidString(dbName)){
			logHelper.logError(logger, 'getModel', 'dbName is invalid');
			return reject({statusCode: constants.INVALID_INPUT, body: null});
		}

		var model = modelCache.get(modelName+'-'+dbName);
		if(validate.isValid(model)){
			return resolve({statusCode: constants.SUCCESS, body: model});
		}

		var Constructor;
		
		if(modelName == constants.MODEL_KEYVALUESTORE){
			Constructor = CloudantKeyValueStoreModel;
		}
		else{
			logHelper.logError(logger, 'getModel', 'modelName is invalid');
			return reject({statusCode: constants.INVALID_INPUT, body: null});
		}

		

		datastore.getDbInstance(dbName)
		.then(function(resp){
			var dbInstance = resp.body;
			model = new Constructor(dbName, dbInstance);
			modelCache.set(modelName+'-'+dbName, model);

			return resolve({statusCode: constants.SUCCESS, body: model});
		})
		.catch(function(err){
			logHelper.logError(logger, 'getModel', 'Could not initialize model for '+dbName, err);
			return reject({statusCode: constants.INTERNAL_SERVER_ERROR, body: null});

		});
	});
}

