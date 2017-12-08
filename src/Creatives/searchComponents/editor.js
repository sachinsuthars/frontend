import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import history from '../../history';
import SortableTbl from 'react-sort-search-table';


class Editor extends React.Component{
	constructor(props) {
		super(props);
		this.editItem = this.editItem.bind(this);
	}

	editItem(){

    let editURL = 'editCreative/' + this.props.rowData.creativeName;
		history.replace(editURL);

	}
	render () {
		return (
			<td>
				  <input type="button" className="btn btn-warning" value="Edit"  onClick={this.editItem}/>
			</td>
		);
	}
}

Editor.propTypes = {
	rowData: React.PropTypes.object,
	tdData: React.PropTypes.string,
};


export default (Editor);
