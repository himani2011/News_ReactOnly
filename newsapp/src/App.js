import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {Routes,Route } from 'react-router-dom';

export default class App extends Component {
  pageSize=10;
  apiKey=process.env.REACT_APP_API_KEY;

  render() {
    return (
      <div>
        <Navbar/>

        <Routes>
        <Route path='/' element={<News key="general" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general"/>}/>
        <Route path='/business' element={<News key="business" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="business"/>}/>
        <Route path='/entertainment' element={<News key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="entertainment"/>}/>
        <Route path='/sports' element={<News key="sports" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="sports"/>} />
        <Route path='/health' element={<News key="health" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="health"/>} />
        <Route path='/science' element={<News key="science" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="science"/>} />
        <Route path='/technology' element={<News key="technology" apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="technology"/>} />
        </Routes>
      </div>
    )
  }
}

