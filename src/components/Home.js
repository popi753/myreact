import { Link } from "react-router-dom";






export default function Home(){
    return(
        <div id="auth">
            <Link to="/login"   >
                    <button>login</button>
            </Link>
            <Link to="/profile" >
                   <button>profile</button>
            </Link>
            <Link to="/register" >
                   <button>register</button>
            </Link>
      </div>
    )
}