import {  useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";





export default  function Home(){

    

    const [user,setUser] = useContext(UserContext)

    useEffect(() => {
        user ? console.log(`this is ${user}`) : console.log("no user")        
    },[user])
     
    if(user){
        return(
            <div>
                <h1>Welcome {user}</h1>
                <button onClick={()=>{window.localStorage.removeItem("token"); setUser(null);}}>Logout</button>
                
                <Link to="/teams" >
                            <button>teams</button>
                </Link>
            </div>
        )
    }
    

    return(
                
                    <div id="auth" style={{"display": "flex","flexDirection":"row","justifyContent": "center"}}>

                        <Link to="/login"   >
                                <button>login</button>
                        </Link>
                        <Link to="/register" >
                            <button>register</button>
                        </Link>


                     </div>
        
  )
}