exports.search_result = function(req, res) {

var pythonShell = require('python-shell');

  	var options = {
 		pythonPath: '/usr/local/bin/python3',
  		args:
  		[
            req.query.term,
            req.params.id
        ]
  	};

  	pythonShell.run('./controllers/Search.py', options, function (err, data) {
  		if (err) 
			throw err ;
		var values = JSON.parse(data[0]).value;
		var resultsByRel = values;
		// console.log(data);
		// res.send(data);
		// var resultsByTime = values.sort(function(a, b) {
		// 	return a.time > b.time? 1 : -1;
		// });
 		res.render('search', {resultsByRel: resultsByRel,  searchTerm: req.query.term, url: req.query.url});
 	});
};

var searchDocs = function(query){
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

    requests.post(options,function(error, response, body){
        console.info("search: " + response.statusCode);
        deferred.resolve();
    });

    return deferred.promise;
}

module.exports = searchDocs;

