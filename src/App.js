
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
   
  state ={
    progress :0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
    <>
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={5}
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<News key="general" setProgress={this.setProgress} category='general'/>}/>
          <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} category='health'/>}></Route>
          <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} category='technology'/>}></Route>
          <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} category='sports'/>}></Route>
          <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} category='entertainment'/>}></Route>
        </Routes>    
      </Router>
    </>
    ) 
  }
}
