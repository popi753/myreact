import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { createContext, useState } from "react";


export const UserContext = createContext()

function App() {
  
      const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))


      if (user) {
      
        return(
          <UserContext.Provider value={[user, setUser]}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>  
            </BrowserRouter>
          </UserContext.Provider>
          )
      }

      return (
       
<UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
</UserContext.Provider>
  );
}

export default App;
