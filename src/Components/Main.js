import React from 'react'
import Hod from '../Request_Managment/Hod'
import Dashboard from './Dashboard'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Cordinator from '../Request_Managment/Cordinator'
import Tutor from '../Request_Managment/Tutor'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Seceratory from './Seceratory'



function Main() {

const[role,setrole]=useState("")
const[tutor,setTutor]=useState("")

    useEffect(() => {
        restore()
        checking()
      }, [])

      const nav=useNavigate()

      async function restore() {
        const token=Cookies.get('token')
        const verify=await axios.post("https://psna-mohammed-developer.onrender.com/psna/verification",{
          data:{
            token:Cookies.get('token')?Cookies.get('token'):null
          }
        })
    setrole(verify.data.message)
    if(verify.data.message.role){
      setrole(verify.data.message.role)
    }
    setTutor(verify.data.message.name)
      }

      const checking=()=>{
        if(!Cookies.get('token'))
        {
          nav("/")
        }
      }
  return (
    <div>
        {role==="student" &&<Dashboard/>}
        {(role==="hod" || role==="adminHod") && <Hod role={role}/>}
        {role==="cordinator" && <Cordinator role={role}/>}
       {(role==="tutor" || role==="adminTutor") && <Tutor role={role} name={tutor}/>} 
       {role=="seceratory" && <Seceratory role={role}/>} 
        
    </div>
  )
}

export default Main
