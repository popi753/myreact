import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { createContext, useState } from "react";
import axios from "axios";






export const UserContext = createContext()

function App() {


  const [user, setUser] = useState()

      if (!user) {
        if (window.localStorage.getItem("token")) {
              axios.post("http://localhost:5000/validate", 
              {},
              {headers:
                   {"Content-Type" :"application/json",
                    "Authorization":window.localStorage.getItem("token")     },
              withCredentials: true},
              ).then(res=>setUser(res.data)).catch(e=>console.error(e))
        }
      }


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