import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import './styles/App.scss';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
