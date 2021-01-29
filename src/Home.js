import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import book from './book.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <div className="App">
        <header className="App-header">
          <h2 >Welcome To My Books</h2>
          <br/>
          <img src={book} className="App-logo" alt="logo" />
          <br/>
          <span className="title-bio"><FontAwesomeIcon icon={faMailBulk} /> Upilatipudin@gmail.com&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faPhone} /> 085221081755</span>
        </header>
      </div>
      </div>
    );
  }
}

export default Home;