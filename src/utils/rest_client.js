'use strict';





var Promise = require('bluebird');

var request  = require('request');

var fs       = require('fs');



var _ = require('underscore');



var validate = require('./validation_helper.js');

var log_helper = require('../logging/logging.js');

var logger = log_helper.getLogger('rest_client');

var constants = require('../constants/constants.js');

var config = require('config');


var cert, key;




//Export functions
module.exports = {
        execute: execute,
        executeCallback: executeCallback
        
};


/**
Generic method to make http requests
params.uri
params.payload
params.method
params.timeout
params.use_ssl
params.content_type
params.auth{
    type: basic | bearer | digest
    basic: {
        user
        pass
    },
    bearer:
}
params.headers{
    
}
**/
 function execute(params){

    return new Promise(function(resolve, reject){
        log_helper.logEntryAndInput(logger, 'execute', params);
    
        //Validate input
        if(!validate.isValidJson(params)){
            var msg = "params are not valid";
            log_helper.logError(logger, 'execute', msg);
            return reject({body: msg, statusCode: constants.invalidInput});
        }


        if(!validate.isValidString(params.uri)){
            var msg = "uri is not valid";
            log_helper.logError(logger, 'execute', msg);
            return reject({body: msg, statusCode: constants.invalidInput});
        }

        var headers = {
            'accept': 'application/json'
        };

        if(validate.isValidJson(params.headers)){
            headers = params.headers;
        };


        var options = {
            uri : params.uri,
            method : 'GET',
            timeout : 60000,
            headers: headers,
            encoding: null
        };
        
       // var use_ssl = true;
        var content_type = 'application/json';
        
        if(validate.isValidString(params.method)){
            options.method = params.method;
        }

        if(validate.isValidJson(params.authorization)){
            var authorization = params.authorization;
            var type = authorization.type;
            if(type == 'basic'){
                var username = authorization.credentials.username;
                var password = authorization.credentials.password;
                var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

                options.headers['Authorization'] = auth;
            }
        }

        

        if(validate.isValid(params.payload)){
            if(validate.isValidString(params.content_type)){
               /*if(content_type!= 'application/json'){
                //Handle non json/string payload
                options.headers['content-type']   = content_type; 
               }
               
             }
             else{
                options.json = true;
               }*/

               content_type = params.content_type;

             
            }
            options.headers['Content-Type'] =content_type;
            options.body = params.payload;
        }
       

       /* if(false == params.use_ssl){
            use_ssl = false;
        }*/

        /*if(use_ssl){
            var agentOptions = getAgentOptions();
            if(agentOptions == null){
                return callback(error)
            }
            options.agentOptions = agentOptions;
        }*/

        

        request(options, function(err, response, body){

            if(validate.isValid(err) || (validate.isValid(response) && response.statusCode >= 400)){

                
                var code = 500;
                if(validate.isValid(response) && validate.isValid(response.statusCode)){
                    code = response.statusCode;
                }

                log_helper.logError(logger, 'execute', 'request to '+ options.uri + ' failed with code '+code, err );
                return reject({body: err || response, statusCode: code});
            }
               
                var code = 200;
                if(validate.isValid(response) && validate.isValid(response.statusCode)){
                    code = response.statusCode;
                }
                if(isError(body) || isErrorRegistrarCall(body)){
                    log_helper.logMessage(logger, 'execute', 'request to '+ options.uri + ' failed', body);
                    return callback({statusCode: 500, body:body})
                }

                

                log_helper.logMessage(logger, 'execute', 'request to '+ options.uri + ' succeeded  with code '+code );
                
                var respJson = {body: body, headers: response['headers'], statusCode : code};

                if(validate.isValid(params.returnToken)){
                    respJson['returnToken'] = params['returnToken'];
                }

                
                return resolve(respJson);
        });
    })
   

   

}

function executeCallback(params, callback){

    
        log_helper.logEntryAndInput(logger, 'execute', params);
    
        //Validate input
        if(!validate.isValidJson(params)){
            var msg = "params are not valid";
            log_helper.logError(logger, 'execute', msg);
            return callback({body: msg, statusCode: constants.invalidInput}, null);
        }


        if(!validate.isValidString(params.uri)){
            var msg = "uri is not valid";
            log_helper.logError(logger, 'execute', msg);
            return callback({body: msg, statusCode: constants.invalidInput}, null);
        }

        var headers = {
            'accept': 'application/json'
        };

        if(validate.isValidJson(params.headers)){
            headers = params.headers;
        };


        var options = {
            uri : params.uri,
            method : 'GET',
            timeout : 60000,
            headers: headers,
            encoding: null
        };
        
       // var use_ssl = true;
        var content_type = 'application/json';
        
        if(validate.isValidString(params.method)){
            options.method = params.method;
        }

        if(validate.isValidJson(params.authorization)){
            var authorization = params.authorization;
            var type = authorization.type;
            if(type == 'basic'){
                var username = authorization.credentials.username;
                var password = authorization.credentials.password;
                var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

                options.headers['Authorization'] = auth;
            }
        }

        

        if(validate.isValid(params.payload)){
            if(validate.isValidString(params.content_type)){
               /*if(content_type!= 'application/json'){
                //Handle non json/string payload
                options.headers['content-type']   = content_type; 
               }
               
             }
             else{
                options.json = true;
               }*/

               content_type = params.content_type;

             
            }
            options.headers['Content-Type'] =content_type;
            options.body = params.payload;
        }
       

       /* if(false == params.use_ssl){
            use_ssl = false;
        }*/

        /*if(use_ssl){
            var agentOptions = getAgentOptions();
            if(agentOptions == null){
                return callback(error)
            }
            options.agentOptions = agentOptions;
        }*/

        

        request(options, function(err, response, body){

            if(validate.isValid(err) || (validate.isValid(response) && response.statusCode >= 400)){

                
                var code = 500;
                if(validate.isValid(response) && validate.isValid(response.statusCode)){
                    code = response.statusCode;
                }

                log_helper.logError(logger, 'execute', 'request to '+ options.uri + ' failed with code '+code, err );
                return callback({body: err || response, statusCode: code},null);
            }
               
                var code = 200;
                if(validate.isValid(response) && validate.isValid(response.statusCode)){
                    code = response.statusCode;
                }
                if(isError(body) || isErrorRegistrarCall(body)){
                    log_helper.logMessage(logger, 'execute', 'request to '+ options.uri + ' failed', body);
                    return callback({statusCode: 500, body:body})
                }
                
                log_helper.logMessage(logger, 'execute', 'request to '+ options.uri + ' succeeded  with code '+code );
                
                
                var respJson = {body: body, headers: response['headers'], statusCode : code};

                if(validate.isValid(params.returnToken)){
                    respJson['returnToken'] = params['returnToken'];
                }

                
                return callback(null, respJson);
        });
   
   

   

}

function isError(body){
    try{
        var buffer = new Buffer(body)
        var respBody = JSON.parse(buffer)
        console.log(respBody)
        var error = respBody['result']['error'];
        if(validate.isValidJson(error)){
            return true;
        }
    }
    catch(err){
        return false;
    }
    return false;

    
}

function isErrorRegistrarCall(body){
    try{
        var buffer = new Buffer(body)
        var respBody = JSON.parse(buffer)
        console.log(respBody)
        var error = respBody['Error'];
        if(validate.isValidJson(error)){
            return true;
        }
    }
    catch(err){
        return false;
    }
    return false;

    
}

function uploadFile(params){
    return new Promise(function(resolve, reject){
        try{
        log_helper.logEntryAndInput(logger, 'uploadFile', params);

        if(!validate.isValidJson(params)){
            log_helper.logError(logger, 'uploadFile', 'invalid params');
            return reject({statusCode: constants.invalidInput, body: 'invalid params'});
        }

        var path = params.path;
        if(!validate.isValidString(path)){
            log_helper.logError(logger, 'uploadFile', 'invalid path');
            return reject({statusCode: constants.invalidInput, body: 'invalid path'});
        }

        var uri = params.uri;
        if(!validate.isValidString(uri)){
            log_helper.logError(logger, 'uploadFile', 'invalid uri');
            return reject({statusCode: constants.invalidInput, body: 'invalid uri'});
        }

        var formData = {
            'image' : fs.createReadStream(path)
        }

        var method = constants.httpPost;
        if(validate.isValidString(params.method)){
            method = params.method;
        }

        request({uri: uri, method: method, formData: formData} , function(err,response,body){
           if(err || (validate.isValid(response) && response.statusCode >= 400)){

                log_helper.logError(logger, 'uploadFile', 'request to '+ uri + ' failed with code '+response.statusCode, err );
                return reject({body: err || response, statusCode: response.statusCode});
            }

                log_helper.logMessage(logger, 'uploadFile', 'request to '+ uri + ' succeeded  with code '+response.statusCode, body );
          

                return resolve({body: body, statusCode : response.statusCode});
            });
    }
    catch(error){
        log_helper.logError(logger, 'uploadFile', 'could not upload file', error );
        return reject({body: error, statusCode: constants.internalServerError});
    }
        
    });
}


/**
Pipe the incoming request
**/
function pipeRequest(params, req, callback){
  log_helper.logEntryAndInput(logger, 'pipeRequest', params);
   
    //Validate input
    if(!validate.isValidJson(params)){
        var msg = "params are not valid";
        log_helper.logError(logger, 'pipeRequest', msg);
        return callback({body: msg, status_code: 400});
    }

    if(!validate.isValidString(params.uri)){
        var msg = "uri is not valid";
        log_helper.logError(logger, 'pipeRequest', msg);
        return callback({body: msg, status_code: 400});
    }

    log_helper.logMessage(logger, 'pipeRequest', 'piping request to '+uri);
   

    var pipeObj = request(params.uri, null , function(err,response,body){
       if(err || (validate.isValid(response) && response.statusCode >= 400)){

            log_helper.logError(logger, 'pipeRequest', 'request to '+ params.uri + ' failed with code '+response.statusCode, err );
            return callback({body: err || response, status_code: response.statusCode});
        }

            log_helper.logMessage(logger, 'pipeRequest', 'request to '+ params.uri + ' succeeded  with code '+response.statusCode, body );
      

        return callback(null, {body: body, status_code : response.statusCode});
    });

    req.pipe(pipeObj);
}



/**
load the certs/keys into agent options
**/

function getAgentOptions(){
logger.trace(filename+": getAgentOptions entry");
    try{
        var ssl_config = config.cicontainer.SSL;
        if(!validate.isValid(cert)){
         cert = fs.readFileSync('../../certs/'+ssl_config.cert);
        }

        if(!validate.isValid(key)){
         key = fs.readFileSync('../../certs/'+ssl_config.key);
        }

        return agentOptions = {
            cert: cert, 
            key: key,
            passphrase: 'kya hai',
            securityOptions: 'SSL_OP_NO_SSLv3'

        };
        
    }   
    catch(err){
        logger.error("method : getAgentOptions - could not read cert/key files %j "+err);
        return null;
    }
}







/*var fs = require('fs')
    , path = require('path')
    , certFile = path.resolve(__dirname, 'ssl/client.crt')
    , keyFile = path.resolve(__dirname, 'ssl/client.key')
    , request = require('request');

var options = {
    url: 'https://api.some-server.com/',
    agentOptions: {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
        // Or use `pfx` property replacing `cert` and `key` when using private key, certificate and CA certs in PFX or PKCS12 format:
        // pfx: fs.readFileSync(pfxFilePath),
        passphrase: 'password',
        securityOptions: 'SSL_OP_NO_SSLv3'
    }
};
*/




