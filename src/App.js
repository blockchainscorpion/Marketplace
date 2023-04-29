import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Homepage from "./Component/Homepage.js";
import Product from './Component/Product.js';
import {ethers} from "ethers";

const Connect = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts");
  console.log("trying to connect");
 }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <div className="logo">
            <h1> <a href=""> Gramp's Mystery Tool Box </a> </h1>
          </div>
          <ul>
            <li> <a href="./"> Home </a> </li>
            <li> <a href="/Products"> Products </a> </li>
            <li className="nav-cta"><a href="#" onClick={Connect}>Connect </a></li>
          </ul>
        </nav>
      </header>

      <Router>

        <Routes>
          
        <Route path="/" element={<Homepage />} />
        <Route path="/Products" element={<Product />} />
        </Routes>
        
      </Router>



    </div>
  );
}

export default App;
