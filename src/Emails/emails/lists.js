import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//Import Components
const axios = require('axios');
const jQuery = require("jquery");

class Lists extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: "Loading...",
            listRows: "Loading...",
            allTemplates: [],
            chosenList: ''
        }
    }

    componentWillMount(){

      this.getEmailTemplates();
      this.getEmailLists();
    };

    componentDidMount(){

      jQuery('#tabview').show();
      jQuery('#tabedit').hide();

    };


    //Send request for all email templates
    getEmailTemplates(){
      //Get Templates from Sparkpost


      //Format the api url
      let url = this.props.apiURL + 'emails/abs';

      //Make JSON Promise request
      axios.get(url)
      .then( (response) =>{
        console.log(response);

        //Send Data to Template List

        this.renderTemplateList(response.data);

      })
      .catch( (error) =>{
        console.log(error);
      });


    };

    //Get Single Template
    getSingleEmailTemplate(event){

      jQuery('#emailLoad').html('<p>Loading Preview...</p>');

      let id = event.target.attributes.getNamedItem("data-id").value;

      //Format the api url
      let url = this.props.apiURL + 'emailFind';

      //Make JSON Promise request
      axios.get(url, {
        params: {
          id: id,
        }
      })
      .then( (response) =>{

        console.log(response.data.body.results.content.html);

        jQuery('#emailLoad').html(response.data.body.results.content.html);

        //Render Preview

      })
      .catch( (error) =>{
        console.log(error);
      });



    };

    //Get Email Lists
    getEmailLists(){

      //Format the api url
      let url = this.props.apiURL + 'emailLists';

      //Make JSON Promise request
      axios.get(url, {
        params: {
          type: 'list',
        }
      })
      .then( (response) =>{
        console.log(response);

        //Send Data to Template List

        this.renderLists(response.data.results);

      })
      .catch( (error) =>{
        console.log(error);
      });


    };

    cancelListEdit(event){

      event.preventDefault();
      jQuery('#tabview').show();
      jQuery('#tabedit').hide();
    }

    getSingleList(event){

        let url = this.props.apiURL + 'emailLists';
        let id = event.target.attributes.getNamedItem("data-id").value;

        axios.get(url, {
          params: {
            id: id,
          }
        })
        .then( (response) =>{


          //Send Data to Template List
          this.setState({chosenList : response.data});
          //this.renderLists(response.data.results);
          jQuery('#tabview').hide();
          jQuery('#tabedit').show();




          jQuery('#listID').val(response.data.results.id);
          jQuery('#listName').val(response.data.results.name);
          jQuery('#listDescription').val(response.data.results.description);

          let listEmails = [];


          for(let x = 0; x < response.data.results.recipients.length; x++){
             let emailFound;

             emailFound = response.data.results.recipients[x].address.email;
             listEmails.push(emailFound);
          }

          listEmails = listEmails.join(',');

          jQuery('#listEmails').val(listEmails);


        })
        .catch( (error) =>{
          console.log(error);
        });


    }



    //Map all found templates
    renderTemplateList(data){

        let templateListRender = data.map((template) => {

              return(
                    <tr key={template.id}>
                      <td>{template.id}</td>
                      <td>{template.name}</td>
                      <td>{template.description}</td>
                      <td>
                        <button data-id={template.id} className="btn btn-warning btn-sm" onClick={this.getSingleEmailTemplate.bind(this)}>View<div className="ripple-container"></div></button>
                      </td>
                    </tr>

                  );
          });


        this.setState({dataRows: templateListRender});


    };


    //Render Email List on Table
    renderLists(data){

      let listsRender = data.map((list) => {

            return(
                  <tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.name}</td>
                    <td>{list.description}</td>
                    <td>{list.total_accepted_recipients}</td>
                    <td>
                      <button onClick={this.getSingleList.bind(this)} data-id={list.id} className="btn btn-warning btn-sm">Edit<div className="ripple-container"></div></button>
                    </td>
                  </tr>


                );
        });


      this.setState({listRows: listsRender});

    }

    newList(event){

      event.preventDefault();


      let data = jQuery( '#newEmailList' ).serialize();

      let url = this.props.apiURL + 'listUpdate?type=create';

      axios.post(url, data)
      .then( (response) =>{


        window.swal({
              title: "List Created",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success"
          });

          this.getEmailLists();

      })
      .catch( (error) =>{

        console.log(error);

        window.swal({
              title: "There was an error, please try again.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger"
          });
      });

    };


    updateList(event){

      event.preventDefault();

      let data = jQuery( '#updateEmailList' ).serialize();

      let url = this.props.apiURL + 'listUpdate?type=update';

      axios.post(url, data)
      .then( (response) =>{


        window.swal({
              title: "List Updated",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success"
          });

          jQuery('#tabview').show();
          jQuery('#tabedit').hide();

          this.getEmailLists();

      })
      .catch( (error) =>{

        console.log(error);

        window.swal({
              title: "There was an error, please try again.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger"
          });
      });

    };

    render(){

        return(

          <div className="col-md-12">
            {/* Emails and Seed Lists */}

              {/* Card */}
              <div className="card">

                  {/* Card Content */}
                  <div className="card-content">

                  {/* Sub Row */}
                  <div className="row">

                       {/* Sub Columns */}
                      <div className="col-md-12">


                        <h3 className="title text-center">Transactional Emails and Seed Lists</h3>
                        <br />


                        {/* Navigation */}
                        <div className="nav-center">
                          <ul className="nav nav-pills nav-pills-primary nav-pills-icons" role="tablist">

                            <li className="active">
                              <a href="#description-1" role="tab" data-toggle="tab">
                                <i className="material-icons">email</i> Emails
                              </a>
                            </li>
                            <li>
                              <a href="#schedule-1" role="tab" data-toggle="tab">
                                <i className="material-icons">list</i> Lists
                              </a>
                            </li>

                            <li>
                              <a id="editListTab" href="#tasks-2" role="tab" data-toggle="tab">
                                <i className="material-icons">note_add</i> New List
                              </a>
                            </li>
                          </ul>
                        </div>


                        {/* Tab Content */}
                        <div className="tab-content" id="tabview">


                          <div className="tab-pane active" id="description-1">

                              <div className="card-content table-responsive table-full-width">


                                  <table className="table table-striped">
                                    <thead>
                                      <tr><th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                      </tr></thead>
                                    <tbody>
                                      {this.state.dataRows}
                                    </tbody>
                                  </table>

                                </div>


                          </div>

                          <div className="tab-pane" id="schedule-1">


                              <div className="card-content">
                                <div className="table-responsive">
                                  <table className="table table-striped">
                                    <thead>
                                      <tr><th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>List Size</th>
                                        <th>Actions</th>
                                      </tr></thead>
                                    <tbody>
                                      {this.state.listRows}
                                    </tbody>
                                  </table>
                                </div>


                              </div>


                          </div>



                          <div className="tab-pane" id="tasks-2">

                              <form id="newEmailList"  onSubmit={this.newList.bind(this)}>

                                  <br/>

                                  <div className="col-md-12">
                                        <h4 className="card-title">List ID</h4>
                                        <p>Must include the letters abs. Use underscores instead of spaces.</p>
                                        <div className="form-group">

                                        <input type="text" name="listID" className="form-control" placeholder="abs_new_list" required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                        <h4 className="card-title">List Name</h4>
                                        <div className="form-group">

                                        <input type="text" name="listName" className="form-control"  required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                        <h4 className="card-title">Description</h4>
                                        <div className="form-group">

                                        <input type="text" name="listDescription" className="form-control" required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                      <br/>
                                      <br/>
                                      <h4 className="card-title">Names</h4>
                                      <p>Comma seperated list of emails addresses with no spaces between.</p>
                                      <div className="form-group">

                                      <input type="text" name="listEmails" className="form-control" required />
                                      <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-4 col-md-offset-4 text-center">
                                      <br/>
                                      <div className="form-group">
                                      <button type="submit" className="btn btn-danger btn-round btn-lg">
                                          <i className="material-icons">playlist_add</i>
                                             &nbsp;Submit<div className="ripple-container"></div>
                                      </button>

                                      </div>
                                  </div>


                                  </form>

                          </div>


                        </div>
                        {/* Close Tab Content */}


                        {/* Tab Content */}
                        <div className="tab-content" id="tabedit">


                          <div  id="tasks-3">

                              <form id="updateEmailList"  onSubmit={this.updateList.bind(this)}>

                                  <br/>

                                  <div className="col-md-12">
                                        <h4 className="card-title">List ID</h4>
                                        <p>Must include the letters abs. Use underscores instead of spaces.</p>
                                        <div className="form-group">

                                        <input type="text" id="listID" name="id" className="form-control" placeholder="abs_new_list" required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                        <h4 className="card-title">List Name</h4>
                                        <div className="form-group">

                                        <input id="listName" type="text" name="name" className="form-control"  required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                        <h4 className="card-title">Description</h4>
                                        <div className="form-group">

                                        <input id="listDescription" type="text" name="description" className="form-control" required />
                                        <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-12">
                                      <br/>
                                      <br/>
                                      <h4 className="card-title">Names</h4>
                                      <p>Comma seperated list of emails addresses with no spaces between.</p>
                                      <div className="form-group">

                                      <input id="listEmails" type="text" name="emails" className="form-control" required />
                                      <span className="material-input" /></div>
                                  </div>

                                  <div className="col-md-4 col-md-offset-4 text-center">
                                      <br/>
                                      <div className="form-group">
                                      <button type="submit" className="btn btn-danger btn-round btn-lg">
                                          <i className="material-icons">playlist_add</i>
                                             &nbsp;Update List<div className="ripple-container"></div>
                                      </button><br/>

                                      <button type="button" className="btn btn-warning btn-round btn-md" onClick={this.cancelListEdit.bind(this)}>Cancel</button>

                                      </div>
                                  </div>


                                  </form>

                          </div>


                        </div>
                        {/* Close Tab Content */}




                      </div>
                      {/* Close Sub Columns */}

                    </div>
                    {/* Close Sub Row */}


                  </div>
                   {/* Card Content Content */}

              </div>
               {/* Close Card */}

          {/* Close Report Results */}
          </div>



        );
    }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        allClients : state.allClients,
        apiURL: state.apiURL,
        reportAPI : state.reportAPI
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


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
