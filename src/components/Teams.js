import { useState, useEffect } from 'react'
import Grouptable from '../componentsjr/Grouptable'
import "../styles/Teams.css";
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';

import "../styles/Grouptable.css";



export default function Teams() {
  const [ownRanking, setOwnRanking] = useState(false)

  useEffect(() => {
    !ownRanking && axios.post(process.env.REACT_APP_API + "/sport/getuclranking",
    {},
    {
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": window.localStorage.getItem("token")
      },
      withCredentials: true
    },
  )
  .then(res => {setOwnRanking(res.data)} )
  .catch(e => console.error(e))
  }, [ownRanking]);

  if (ownRanking.length) {
    return (
    
      <div>
        <Link className="teams-svg" to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                </svg>
        </Link>
        <h3
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}  
        >your ranking :</h3>
        <div className="groups-container"
        style={{
          paddingTop:"30px"
        }}>
      {ownRanking.map(element=>(
      <Grouptable2
      list={element}
      key={element.name}
      
    />  
      ))}
      
    </div>
      </div>
    )
  }

  return (
    <Ranking/>
  )

}


export function Ranking() {
  
  const [list, setList] = useState(false)

  const [savedRanking, setSavedRanking] = useState([
    {name: "Group A", },
    {name: "Group B", },
    {name: "Group C", },
    {name: "Group D", },
    {name: "Group E", },
    {name: "Group F", },
    {name: "Group G", },
    {name: "Group H", }
  ])

    useEffect(() => {
    !list ? fetchData() : console.log("exists");
  }, [list]);


  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API+"/sport/ucl")
      const result = await response.json();
      setList(result);
    
      console.log("got");
    } catch (error) {
      console.error(error);
    }
  };




  async function handleSave() {

    // try {
    //   const response = await fetch(process.env.REACT_APP_API+"/sport/saveucl", {
    //     method: "POST",
        
          
    //       body: savedRanking,
    //     },
    //     )
      
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }

    axios.post(process.env.REACT_APP_API+"/sport/saveucl", 
              savedRanking,
              {headers:
                   {"Content-Type" :"application/json",
                    "Authorization":window.localStorage.getItem("token")     },
              withCredentials: true},
              )
              .then(res=>console.log(res))
              .catch(e=>console.error(e))

    
    navigate("/");


  }


  const navigate = useNavigate();


  if (!list) {
    return (
    <div>
    <Link className="teams-svg" to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                </svg>
    </Link>
    <h1>Loading...</h1>
    </div>
    )
  }

  return (
    <div className="Teams">
      <Link className="teams-svg" to={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
                </svg>
      </Link>
    <div className="groups-container">
      {list.map(element=>(
      <Grouptable
      list={element}
      key={element.name}
      setSavedRanking={setSavedRanking}
      
    />  
      ))}
      
    </div>
      <button 
      onClick={()=>{
        (savedRanking.some(element=> !element.hasOwnProperty("teams")) ||
      savedRanking.some(element=> element.teams.some(ele=> ele.id == null)) 
      )
      ? window.alert("შეავსე ყველა ჯგუფი") : 
      handleSave()
    }}
      className="save-btn">save</button>
    </div>
  )




}



export function Grouptable2({list}) {
  
    

    return (
        <div className="container">
            <h3>{list.name}</h3>
            <div id="group">
                <div id="insidegroup">
                    {list.teams.map((element) => {
                        return (
                            <Chosengroup2
                                key={element.rank}
                                team={element}
                            />
                        );
                    })}
                </div>

                
            </div>
        </div>
    );

}



export function Chosengroup2({team}) {
  return (
    <div className="teams">
        <span className='span'>{team.rank}</span>
        <img
            src={team.logo}
            height="40px"
            alt="club logo"
        />
        <span >
            {team.name}
        </span>
    </div>
);
}