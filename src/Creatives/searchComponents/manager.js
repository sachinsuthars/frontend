import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import history from '../../history';
import {Link} from 'react-router';
import SortableTbl from 'react-sort-search-table';
import {connect} from 'react-redux';


class Manager extends React.Component{
	constructor(props) {
		super(props);
		this.editItem = this.editItem.bind(this);
	}

	editItem(){


    let editURL = this.props.api + 'p/' + this.props.client + '/' + this.props.rowData.creativeName + '?amt=30,50,70,150';
		let win = window.open(editURL, '_blank');
  	win.focus();

	}
	render () {
		return (
			<td>
				  <input type="button" className="btn btn-warning" value="View"  onClick={this.editItem}/>
			</td>
		);
	}
}

Manager.propTypes = {
	rowData: React.PropTypes.object,
	tdData: React.PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
        api: state.api,
        client:  state.client,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        changeInitial : (initial) => {
            dispatch(
                {
                    type: "ChangeInitial",
                    payload : initial
                }
            );
        },
        changeRole : (role) => {
            dispatch(
                {
                    type: "ChangeRole",
                    payload : role
                }
            );
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
