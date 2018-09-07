var express = require('express');
var router = express.Router();
var config = require('../config');
var Payloads = require('../models/Payloads');
var Q = require('q');
var request = require('request');
var qs = require('querystring');
var fs = require('fs');
var querystring = require('querystring')
var path=require('path');
var zip = require('express-zip');


// Controller for search
//var search_controller = require('../controllers/searchControllers');
//var search = require('../models/dataIndexer');
var searchDocs = function(query) {
	//var deferred = Q.defer();
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
            "searchMode": "any"
            //"searchFields":fields,
            //"select":"file_path"
          })
    };
    
    return options;
}

function getJSON(query){request.post(searchDocs(query),function(error, response, body){
        console.log("query is : "+ query);
        console.info("search: " + response.statusCode);
        console.log("Files are" + Files);
        console.info(body);
    if (!error && response.statusCode == 200)
        {
        console.log(typeof JSON.parse(body));
    return JSON.parse(body);
}
else
    console.log('error');
}) } ;

var getFilesOfDir = function(dir){
    fs.readdir(dir,function(err,items) {
    //console.log(dir); 
    //console.log(items);
    //console.log('There are ' + items.length + ' files in ' + dir);
    return items
    /*for (var i=0; i<items.length; i++){
        console.log(items[i]);
        
    }*/
})
};

var Files = getFilesOfDir('/Users/jean-marcpicard/Documents/MICROSOFT/Project_resume_Microsoft/data/input/Datablob');


        //console.log(body);
        //console.log(JSON.parse(body).value);
        //return callback(null, JSON.parse(body).value);
        //return callback(body);
        //return JSON.parse(body).value;
        //deferred.resolve();
  //  })};
/*    return response(function(body)
        {//console.log(JSON.parse(body).value);
        JSON.parse(body).value;
    });

    //console.log("deferred is " + deferred.promise);
    //return deferred.promise;
}*/

router.get('/', function (req, res,next) {
    
    if (req.query.term != undefined){
        
        request.post(searchDocs(req.query.term),  function(error, response, body){
        console.log("query is : "+ req.query.term);
        console.info("search: " + response.statusCode);
        var values=JSON.parse(body).value;
        //console.log(values)    
        var datablob ='./Datablob/';
        var docbis = [];
        console.log('values is ' + values);
        
            for (var i=0;i<values.length;i++){
                console.log(datablob + values[i].file);
                var fileobject = {
                    path:datablob + values[i].file,
                    name:values[i].file
                };
            }
                docbis.push(fileobject);
                
        if (!error && response.statusCode == 200){
            res.render('searchdisplay', {searchTerm:req.query.term, searchResult:values, displayDoc:docbis});
            next();
            
        }
            
            else {console.log('error');}
        })}
    else {
		res.render('searchdisplay');//, {resultsByRel: [], resultsByTime:[], url: url, searchName: req.query.searchName, searchKey: req.query.searchKey});
	}
        
       });


router.post('/', /*query,*/ function (req, res) {
    console.log(searchDocs(req.query.term));
    //var query=req.query.term;
    console.log(req.params);
	if (req.query.term != undefined)
    {
      
        request.post(searchDocs(req.query.term),  function(error, response, body){
        console.log("query is : "+ req.query.term);
        console.info("search: " + response.statusCode);
        var values=JSON.parse(body).value;
        console.log(values)
        //console.log(values[0].file);
        var doc = [];
        var docbis = [];
        var datablob ='./Datablob/';
        console.log('values2 is ' + values);
            
            for (var i=0;i<values.length;i++){
                console.log(datablob + values[i].file);
                var fileobject = {
                    path:datablob + values[i].file,
                    name:values[i].file
                };
                docbis.push(fileobject);
                
               //res.download(docbis[i]);
    
            
            }
            res.zip(docbis);

      //  }
           // else
                //{
   // console.log('error');
//}
        })}
    else {
		res.render('searchdisplay');//, {resultsByRel: [], resultsByTime:[], url: url, searchName: req.query.searchName, searchKey: req.query.searchKey});
	}
});


router.post(':value(*)', function (req, res) {
    console.log(searchDocs(req.query.term));

	if (req.query.term != undefined)
    {
      
        request.post(searchDocs(req.query.term),  function(error, response, body){
        console.log("query is : "+ req.query.term);
        console.info("search: " + response.statusCode);
        var values=JSON.parse(body).value;
        console.log(values);
        
        //console.log(values[0].file);
        var doc = [];
        var docbis = [];
        var filepath ='./Datablob/';
        var filename=req.params.file
          //  for (var i=0;i<values.length;i++){
        //var filename = JSON.parse(body).value[i].file;}
        console.log('filename is ' + values);
        res.download(filePath, fileName);   
            
            for (var i=0;i<values.length;i++){
                console.log(filepath + values[i].file);
                var fileobject = {
                    path:filepath + values[i].file,
                    name:values[i].file
                };
            
                docbis.push(fileobject);
                
               res.download(filepath + filename);
    
            
            }
            res.zip(docbis);
        })}
    else {
		res.render('searchdisplay');//, {resultsByRel: [], resultsByTime:[], url: url, searchName: req.query.searchName, searchKey: req.query.searchKey});
	}
});


module.exports = router;

