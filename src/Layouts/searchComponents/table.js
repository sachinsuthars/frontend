import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import SortableTbl from 'react-sort-search-table';

import Edit from './editor.js';
import Manager from './manager.js';

/*
customTd={[
  {custd: EditComponent, keyItem: "edit"},
  {custd: ViewComponent, keyItem: "view"},
]}
*/

const ProductsTblPage = (props) =>{

    let col = [
        "name",
        "type",
        "paymentProcessor",
        "status",
        "description",
        "edit",
        "manage",
    ];
    let tHead = [
        "Name",
        "Type",
        "Processor",
        "Status",
        "Description",
        "Edit",
        "Preview",
    ];

    //let dynamoToJSON = props.data.map(unmarshalItem);

    return (
        <SortableTbl tblData={props.data}
            tHead={tHead}
            dKey={col}
            customTd={[
  						{custd: Edit, keyItem: "edit"},
              {custd: Manager, keyItem: "manage"},
						]}
            defaultCSS={true}
        />
    );
};

ProductsTblPage.propTypes = {
};

export default (ProductsTblPage);
