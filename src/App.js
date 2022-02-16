import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as employeeAction from './components/Action/employeeAction';

class App extends Component {

  constructor(props){
    super(props);
    this.handlefirstName = this.handlefirstName.bind(this);
    this.handlelastName = this.handlelastName.bind(this);
    this.hanlerole = this.handlerole.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      firstname: '',
      lastname: '',
      role :''
    }
  }
  onhandlefirstName(e) {
    this.setState({
      firstname: e.target.value
      
    })
  }
   onhandlelastName(e) {
    this.setState({
      lastname: e.target.value
      
    })
  }
  onhandlerole(e) {
    this.setState({
      role: e.target.value
      
    })
  }

  handleChange(e){
    this.setState({
      firstname: e.target.firstname,
      lastname : e.target.lastname,
      role: e.target.role
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
            <input type="text" onChange={this.handlefirstName} className="form-control" placeholder="Enter first name" value={this.state.firstname}/><br />
             <input type="text2" onChange={this.handlelastName} className="form-control" placeholder="Enter last name" value={this.state.lastname}/><br />
             <div class="dropdown">
        <select className = "form-input"  
            name = "role"
            id = "role"
            value={this.state.role}
                                  onChange={this.handlerole}>
                    <option >User</option>
                    <option >Senior User</option>
                    <option >WFM</option>
                  </select>
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
