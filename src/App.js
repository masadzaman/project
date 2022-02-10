import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as employeeAction from './components/Action/employeeAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      firstname: '',
      lastname: '',
      role :''
    }
  }

  handleChange(e){
    this.setState({
      firstname: e.target.value,
      lastname : e.target.value1,
      role: e.target.value2,
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let employee = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: this.state.role
    }
    this.setState({
      firstname: '',
      lastname :'',
      role: ''
    });
    this.props.createEmployee(employee);
  }

  listView(data, index,index1){
    return (
      <div className="row">
        <div className="col-md-05">
          <li key={index} className="list-group-item clearfix">
            {data.firstname}
            
            {data.lastname}

            {data.role}
          
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
    e.preventDefault();
    this.props.deleteEmployee(index);
  }

  render() {

    return(
      <div className="container">
       <nav className="navbar sticky-top navbar-light bg-light">
        <div class="container-fluid w-50">
            <label for="search-user" class="col-sm-2 col-form-label">Search for employee:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="search-user" placeholder="Enter a name"/>
            </div>
        </div>
    </nav>
        
        <hr />
        <div>
          
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Enter first name" value={this.state.firstname}/><br />
             <input type="text2" onChange={this.handleChange1} className="form-control" placeholder="Enter last name" value={this.state.lastname}/><br />
             <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a>User</a>
    <a>Senior User</a>
    <a>WFM</a>
  </div>
</div>
            <input type="submit" className="btn btn-success" value="ADD"/>
          </form>
          <hr />
        { <ul className="list-group">
          {this.props.employees.map((employee, i) => this.listView(employee, i))}

        </ul> }
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