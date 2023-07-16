import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';



function App() {

  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>} />
              
          </Routes>
    </BrowserRouter>
  );
}

export default App;
