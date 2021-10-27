import './App.css';
import React from "react";


function App() {
  return (
    <div>
    
      <div id = 'container'>
        <input placeholder='enter country name'  type = 'text' ref={textInput}></input>
        <button id='activation' onClick={onOnclickHandler}>ok</button>
      </div>


      <ul id = 'main'>
        
      </ul>
    </div>
  );
}

export default App;


function RequestURL(country,totalOrStats){

  return fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/${totalOrStats}?country=${country}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "933c98fa7amshe2840a4a213dfadp15a53ajsn8629f35eaef5"
    }
  })
  .then(response => {
      if(response.statusText==='OK'){
        const res = response.json()
        res.then(PromiseResult=>{
          const main = document.getElementById('main')
          
          if(Object.keys(PromiseResult.data).length===2){
            main.innerHTML=''
            for(let i=0;i<PromiseResult.data.covid19Stats.length;i++){
              let province = PromiseResult.data.covid19Stats[i].province
              if (province===null){
                province=PromiseResult.data.covid19Stats[i].keyId
              }
              let confirmed = PromiseResult.data.covid19Stats[i].confirmed
              let deaths = PromiseResult.data.covid19Stats[i].deaths
              main.innerHTML+=`<li>${province}  | confirmed:${confirmed} | death:${deaths}</li>`
            }
            
          }
        
        })  
      }else{
        document.getElementById('main').innerHTML='no such country'
      }
  })
  .catch(err => {
      console.error( err )
  })
}

let textInput = React.createRef();  // React use ref to get input value

let onOnclickHandler = (e) => {
  if(textInput.current.value!==null){
    RequestURL(textInput.current.value,'stats')
  } 
};



