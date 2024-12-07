import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Cookies from 'js-cookie'

const EditHod = () => {

useEffect(()=>{
fetchdata()
},[])

const fetchdata=async()=>{
    if(Cookies.get("token")){
      const verify=await axios.post("https://psna-mohammed-developer.onrender.com/psna/verification",{
        data:{
          token:Cookies.get('token')?Cookies.get('token'):null
        }
      })
      if(verify.data.message.role==="cordinator"){
    //  start()
    }
  }
  }
  return (
    <div>
      <h2>Hod</h2>
    </div>
  )
}

export default EditHod
