import './App.css';
import React,{useState}from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const pageSize=10;
  const apiKey=process.env.REACT_APP_API_KEY;

  const [progress,setProgress] = useState(10);
  
    return (
      <div>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
        <Route path='/' element={<News setProgress={setProgress} key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>}/>
        <Route path='/business' element={<News setProgress={setProgress} key="business" apiKey={apiKey} pageSize={pageSize} country="in" category="business"/>}/>
        <Route path='/entertainment' element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment"/>}/>
        <Route path='/sports' element={<News setProgress={setProgress} key="sports" apiKey={apiKey} pageSize={pageSize} country="in" category="sports"/>} />
        <Route path='/health' element={<News setProgress={setProgress} key="health" apiKey={apiKey} pageSize={pageSize} country="in" category="health"/>} />
        <Route path='/science' element={<News setProgress={setProgress} key="science" apiKey={apiKey} pageSize={pageSize} country="in" category="science"/>} />
        <Route path='/technology' element={<News setProgress={setProgress} key="technology" apiKey={apiKey} pageSize={pageSize} country="in" category="technology"/>} />
        </Routes>
      </div>
    )
  
}
export default App

