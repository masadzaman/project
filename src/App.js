import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as employeeAction from './components/Action/employeeAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      firstname: '',
      lastname:''
    }
  }

  handleChange(e){
    this.setState({
      firstname: e.target.value,
      lastname: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let employee = {
      first: this.state.firstname,
      last: this.state.lastname
    }
    this.setState({
      firstname: '',
      lastname : ''
    });
    this.props.createEmployee(employee);
  }

  listView(data, index){
    return (
     
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteEmployee(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteEmployee(e, index){
    e.preventDefault()
    this.props.deleteEmployee(index);
  }

  render() {

    return(
      <div className="container">
       <div>
       <nav class="navbar sticky-top navbar-light bg-light">
        <div class="container-fluid w-50">
            <label for="search-user" class="col-sm-2 col-form-label">Search for employee:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="search-user" placeholder="Enter a name"/>
            </div>
        </div>
    </nav>
        <hr />
        <div>
          <h3>Add Employee Form</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} className="form-control" value={this.state.firstname}/><br />
              <input type="text" onChange={this.handleChange} className="form-control" value={this.state.lastname}/><br />
            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.employee.map((employee, i) => this.listView(employee, i))}
        </ul> }
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employees: state.employees
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEmployee: employee => dispatch(employeeAction.createEmployee(employee)),
    deleteEmployee: index =>dispatch(employeeAction.deleteEmployee(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);