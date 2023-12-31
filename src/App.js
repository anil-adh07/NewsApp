
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App() {
   
  const [progress,setProgress] =useState (0);
    return (
    <>
    setProgress(progress);
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<News key="general" setProgress={setProgress} category='general'/>}/>
          <Route exact path="/health" element={<News key="health" setProgress={setProgress} category='health'/>}></Route>
          <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} category='technology'/>}></Route>
          <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} category='sports'/>}></Route>
          <Route exact path="/business" element={<News key="business" setProgress={setProgress} category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} category='entertainment'/>}></Route>
        </Routes>    
      </Router>
    </>
    ) 
}
