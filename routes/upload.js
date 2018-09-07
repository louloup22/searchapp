var express = require('express');
var fileUpload = require('express-fileupload');
var async = require('async');
var router = express.Router();
var spawn = require("child_process").spawn;
//var formidable = require('formidable');
var path = require('path');
var http = require('http');
var storage=require('azure-storage');

var args = require('yargs').argv;
var config = require('../config');
var pythonShell = require('python-shell');
var fs = require('fs');


var blobService= storage.createBlobService(config.blobname,config.blobkey);

router.use(fileUpload());

//var upload_controller = require('../controllers/uploadController');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('upload');
});


router.post('/', function(req, res,next) {
  
  console.log('req.sesssion.user is : ' + req.session.user);
  var blobAccountName = req.session.user.blobname;
  var blobAccountKey = req.session.user.blobkey;
  var cosmosdbEndpoint = req.session.user.cosmoshost;
  var cosmosdbMasterkey = req.session.user.cosmoskey;
  var azureSearchName = req.session.user.azurename;
  var azureSearchKey = req.session.user.azurekey;

  if (!req.files)
    return res.status(400).send('No files uploaded');
  //var form = new formidable.IncomingForm();
  //form.parse(req,function(err,fields,files){
  //console.log('docFile is  '+ req.files.docFile);
  var docFile = req.files.docFile;
  //console.log(req.files.path);
  //console.log(req.files.docFile.path);
  //console.log('docFile is ' +  JSON.stringify(docFile));
  var docFileRootPath = './public/CV/';
  var docFileName = docFile.name;
  //var docFileData = docFile.data;
  //var Filepath = '/Users/jean-marcpicard/Documents/MICROSOFT/Test/CV_Louise2.docx';
  //console.log('docFile.name is ' +  docFile.name);
  var docFileData=JSON.parse(JSON.stringify(docFile.data)).data;
  //console.log('docFile.data is ' +  JSON.parse(JSON.stringify(docFile.data)).data);
  var buffer = new Buffer(JSON.parse(JSON.stringify(docFile.data)).data);

 

  docFile.mv(docFileRootPath + docFileName, function (err)    {
      if (err)
          return res.status(500).send(err);
   })
    //TO upload file and create blob
    /*if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}*/
    //TO DO WAIT FOR THE FILE TO HAVE BEEN MOVE THERE   
    function waitForElementToDisplay(time) {
        if(fs.existsSync(docFileRootPath + docFileName)) {
            blobService.createAppendBlobFromLocalFile(config.blobcontainer,docFileName,docFileRootPath + docFileName, function(err,result,response) {
            if (err){
                console.log('EROOOR');
            }
            else{
                console.log(`Upload of '${docFileName}' complete`);
                fs.unlinkSync(docFileRootPath + docFileName);
            }
                                                })
    
    var options = {
      pythonPath: '/usr/local/bin/python3'

      /*args:
      [
 
        docFileName,
        //Filepath,
        docFileData,
        docFileRootPath
        
      ]*/
    };
    
        pythonShell.run('../bin/main.py', options, function (err,results) {
            if (err) 
            console.log("Error") ;
        console.log('finished', results);
        
        res.redirect('/search');})
            return;
            }
        
        else {
            setTimeout(function() {
                waitForElementToDisplay(time);
            }, time);
        }
    }
    
    waitForElementToDisplay(100);

   
    });




module.exports = router;


