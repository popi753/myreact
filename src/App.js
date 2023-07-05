import './App.css';
import axios from 'axios';
// import { useEffect, useState } from 'react';



axios.get('http://localhost:5000/users')
.then(response => {
  console.log(response.data);
}).catch((error) => {
  console.log(error)
});





function App() {
  // const [data, setdata] = useState([]);

 
  // useEffect(() => {
  //   axios.get('http://localhost:5000/users')
  //     .then(response => {
  //       setdata(response.data);
  //     });
  // } 
  // , []);


  return (
    <div className="App">
        {/* {data.map((item) => {
          return <div key={item._id}>{item.username}</div>
        })} */}

    </div>
  );
}

export default App;
