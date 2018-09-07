var React = require('react');

var SearchResult = React.createClass({

	render: function(){
		return(
			<tr>
				<td className="col-sm-1">{this.props.index}</td>
				<td>{this.props.result.file_path}</td>
				<td>{this.props.result.chunk_text}</td>
				<td>{this.props.result.candidate_name}</td>
				<td>{this.props.result.email}</td>
				<td>{this.props.result.phone}</td>
				<td>{this.props.result.birthdate}</td>
				<td>{this.props.result.experience}</td>
				<td>{this.props.result.position}</td>
				<td>{this.props.result.level_of_education}</td>
				<td>{this.props.result.platforms}</td>
				<td>{this.props.result.typestudies}</td>
				<td>{this.props.result.universities}</td>
				<td>{this.props.result.programming}</td>
				<td>{this.props.result.database}</td>
				<td>{this.props.result.machinelearning}</td>
				<td>{this.props.result.cloud_platform}</td>
				<td>{this.props.result.open_source}</td>
				<td>{this.props.result.IT_business_toolkit}</td>
			</tr>   
			)
	}
});

module.exports = SearchResult;