import {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";





export default  function Home(){

    

    const [user,setUser] = useContext(UserContext)

    useEffect(() => {
        {user ?console.log(`this is ${user.username}`): console.log("no user")}
        
    },[])
     
    if(user){
        console.log(typeof user)
        return(
            <div>
                <h1>Welcome {user.username}</h1>
                <button onClick={()=>{window.localStorage.removeItem("user"); setUser(null);}}>Logout</button>
            </div>
        )
    }
    

    return(
                
                    <div id="auth">

                        <Link to="/login"   >
                                <button>login</button>
                        </Link>
                        <Link to="/register" >
                            <button>register</button>
                        </Link>
                </div>
        
  )
}