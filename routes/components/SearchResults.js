var React = require('react');
var SearchResult = require('./SearchResult');

var SearchResults = React.createClass({
	render: function(){
		return (
			<div className="table-responsive">
				<table className="table table-striped">
					<tbody>
							<tr>
								<th className="col-sm-1">#</th>
								<th>Path</th>
								<th>Text</th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Birthdate</th>
								<th>Experience</th>
								<th>Position</th>
								<th>Education level</th>
								<th>Platforms</th>
								<th>Type of studies</th>
								<th>Universities</th>
								<th>Programming</th>
								<th>Database</th>
								<th>Machine learning</th>
								<th>Cloud Platform</th>
								<th>Open Source</th>
								<th>IT business toolkit</th>
							</tr>
					{this.props.results.map(function(result, index){
						return <SearchResult result={result} key={index} index={index + 1}/>
					})}
					</tbody>
				</table>
			</div>
			)
	}
});

module.exports = SearchResults;

