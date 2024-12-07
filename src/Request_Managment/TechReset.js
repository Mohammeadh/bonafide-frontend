import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import psnalogo from '../images/psnalogo.png'
import Cookies from "js-cookie"
import { ToastContainer, toast } from 'react-toastify'

function TechReset() {
    const [display, setDisplay] = useState(false)
    const[history,sethistory]=useState(true)
    const[user,setuser]=useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        if (Cookies.get("token")) {
            const verify = await axios.post("http://localhost:3001/psna/verification", {
                data: {
                    token: Cookies.get('token') ? Cookies.get('token') : null
                }
            })
            if (verify.data.message === "cordinator") {
                setDisplay(true)
            }
        }
    }

// Remove History

const RemoveHisory=async()=>
{
try{
const history=await axios.get("http://localhost:3001/psna/addhistory/removeHistory")
console.log(history.data)
if(history.data.message==="History deleted")
{
    toast.success("History deleted")
}
}
catch(err)
{
    console.log(err)
}
}

const RemoveUser=async()=>
{
    try{
        const history=await axios.get("http://localhost:3001/psna/addhistory/removeUser")
        console.log(history.data)
        if(history.data.message==="User deleted")
        {
            toast.success("User deleted")
        }
    }
    catch(err)
    {
        console.log("Error in delete user")
    }
}


  return (
    <div className='reset'>
        {display &&
        <div>

<div className='logo' style={{ padding: '30px', backgroundColor: '#2eab38', display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }} className="image">
        <img src={psnalogo} alt='psnalogo' />
    </div>
</div>
<br/>
<div style={{textAlign:'center'}}>
    <h2>Reset The Data</h2>
</div>
<br/>
<div >
<div style={{display:'flex',gap:'10px',justifyContent:'space-around',margin:"20px",alignItems:'center',flexDirection:'row'}}>
    <div style={{display:'flex',gap:'10px',flexDirection:'column',marginLeft:'7%'}}>
   <h2 >Do You Want To Reset The History Database ?</h2> 
 { history && <div style={{display:'flex',gap:'10px'}}>
   <button style={{width:'100px',padding:'10px',borderRadius:'5px',background:'green',color:'white',fontWeight:'bold',outline:'none',border:'none'}}
   onClick={()=>sethistory(false)}
   >Yes</button>
   <button style={{width:'100px',border:'none',outline:'none',background:'red',color:'white',borderRadius:'5px',fontWeight:'bold'}}>No</button>
   </div>}
   {history===false && <div>
   <button onClick={RemoveHisory}
   style={{width:'170px',border:'none',outline:'none',background:'red',color:'white',borderRadius:'5px',fontWeight:'bold',padding:'5px'}}
   >Delete History</button>
   </div>}
    </div>
   
</div>

<div style={{display:'flex',gap:'10px',justifyContent:'space-around',margin:"20px",alignItems:'center'}}>
    <div style={{display:'flex',gap:'10px',flexDirection:'column'}}>
   <h2>Do You Want To Reset All The Users ?</h2> 
 { user && <div style={{display:'flex',gap:'10px'}}>
   <button style={{width:'100px',padding:'10px',borderRadius:'5px',background:'green',color:'white',fontWeight:'bold',outline:'none',border:'none'}}
   onClick={()=>setuser(false)}
   >Yes</button>
   <button style={{width:'100px',border:'none',background:'red',color:'white',borderRadius:'5px',outline:'none',fontWeight:'bold'}}>No</button>
   </div>}
   {user===false && <div>
   <button onClick={RemoveUser}
   style={{width:'170px',border:'none',outline:'none',background:'red',color:'white',borderRadius:'5px',fontWeight:'bold',padding:'5px'}}
   >Delete users</button>
   </div>}
    </div>
   
</div>
</div>

      </div>
        }
        <ToastContainer/>
    </div>
  )
}

export default TechReset
