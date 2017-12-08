import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import history from '../../history';
import {Link} from 'react-router';
import SortableTbl from 'react-sort-search-table';



class Manager extends React.Component{
	constructor(props) {
		super(props);
		this.editItem = this.editItem.bind(this);
	}

	editItem(){

		var win = window.open(this.props.rowData.preview, '_blank');
  	win.focus();

    //let editURL = 'editCampaign/' + this.props.rowData.Name;
		//history.replace(editURL);

	}
	render () {
		return (
			<td>
				  <input type="button" className="btn btn-warning" value="Preview"  onClick={this.editItem}/>
			</td>
		);
	}
}

Manager.propTypes = {
	rowData: React.PropTypes.object,
	tdData: React.PropTypes.string,
};


export default (Manager);
