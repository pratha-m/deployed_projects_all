import "./myApp.css"
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Leftsidebar from "./components/leftSideBar/Leftsidebar";
import Footer from "./components/footer/Footer";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div>
       <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<><Leftsidebar/></>}/>
            {/* <Route exact path="/signup" element={<><Leftsidebar/><Rightsidebar/></>}/> */}
          </Routes>   
          <Footer/>
       </Router>
    </div>   
  );
}

export default App;
