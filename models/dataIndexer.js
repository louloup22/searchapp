var request = require('request');
var config = require('../config');
var Payloads = require('./Payloads');
var Q = require('q');

var deleteIndex = function(){
    var deferred = Q.defer();
    var url = config.searchURL +
        "/indexes/" + 
        config.searchIndexName +
        "?api-version=" + config.searchApiVersion;

    var headers = {
    	'api-key': config.searchApiKey,
    	'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        withCredentials: false
    };
        
    request.del(options, function(error, response, body){
    	console.info("delete index result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;
};

var deleteDataSource = function(){
    // cleanup after previous runs
    var deferred = Q.defer();
    var url = config.searchURL +
        "/datasources/" + 
        config.searchDatasourceName +
        "?api-version=" + config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        withCredentials: false
    };
        
    request.del(options, function(error, response, body){
    	console.info("delete datasource result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;

};

var deleteIndexer = function(){
    // cleanup after previous runs
    var deferred = Q.defer();
    var url = config.searchURL +
        "/indexers/" + 
        config.searchIndexerName +
        "?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        withCredentials: false
    };
        
    request.del(options, function(error, response, body){
    	console.info("delete indexer result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;

};

var createIndex = function(){
    var deferred = Q.defer();

    var url = config.searchURL +
        "/indexes/" + 
        config.searchIndexName +
        "?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify(Payloads.indexPayload),
        withCredentials: false
    };
        
    request.put(options, function(error, response, body){
    	console.info("create index result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;
}

var createDataSource = function(){
    var deferred = Q.defer();

    var url = config.searchURL +
        "/datasources/" + 
        config.searchDatasourceName +
        "?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify(Payloads.dataSourcePayload),
        withCredentials: false
    };
        
    request.put(options, function(error, response, body){
    	console.info("create datasource result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;
};

var createIndexer = function(){
    var deferred = Q.defer();

    var url = config.searchURL +
        "/indexers/" + 
        config.indexerNameconfig.searchIndexerName +
        "?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify(Payloads.indexerPayload),
        withCredentials: false
    };
        
    request.put(options, function(error, response, body){
    	console.info("create indexer result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;
};

var runIndexer = function(){
    var deferred = Q.defer();

    var url = config.searchURL +
        "/indexers/" + 
        config.searchIndexerName +
        "/run?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        withCredentials: false
    };
        
    request.post(options, function(error, response, body){
    	console.info("run indexer result: " + response.statusCode);
    	deferred.resolve();
    });

    return deferred.promise;
};

var indexerStatus = function(){
    var deferred = Q.defer();

    var url = config.searchURL +
        "/indexers/" + 
        config.searchIndexerName +
        "/status?api-version=" + 
        config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        withCredentials: false
    };
        
    
    var indexerStatus = setInterval(function(){
        request.get(options, function(error, response, body){
            var result = JSON.parse(body);

            var processed = result.lastResult ? result.lastResult.itemsProcessed: 0;
            var status = result.lastResult ? result.lastResult.status: "inProgress";

            console.info(status + ", items processed: " + processed);
			
            if(status !== "inProgress"){
                clearInterval(indexerStatus);
                deferred.resolve(indexerStatus);
            }
        });
    }, 1000);
    return deferred.promise;
};

var searchDocs = function(query){
    var deferred = Q.defer();

    var url=config.searchURL + '/indexes/' + 
    config.searchIndexName +'/docs/search?api-version='+config.searchApiVersion;

    var headers = {
        'api-key': config.searchApiKey,
        'Content-Type': 'application/json'
    };

    var options = {
        url: url,
        headers: headers,
        body: JSON.stringify({
            //"count":count,
            "search":query,
            //"searchFields":fields,
            //"select":"file_path"
          }),
        withCredentials: false
    };

    request.post(options,function(error, response, body){
        console.info("search: " + response.statusCode);
        deferred.resolve();
    });

    return deferred.promise;


}

/*deleteIndexer()
    .then(deleteDataSource)
    .then(deleteIndex)
    .then(createIndex)
    .then(createDataSource)
    .then(createIndexer)
    .then(runIndexer)
    .then(indexerStatus);*/
runIndexer()
    .then(indexerStatus);
//    .then(searchDocs("Master"));
