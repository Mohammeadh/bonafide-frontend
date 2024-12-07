import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { LucideArrowLeftCircle, LucideContact2, LucideLogOut, LucideUserMinus2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


function Edit() {



  const [list, setList] = useState([])
  const [auth, setauth] = useState(false)
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [addtutor, setaddtutor] = useState(true)
  const [msg, setmsg] = useState(null)
  const [confirm, setconfirm] = useState(false)
  const [confirmid, setconfirmid] = useState("")


  const nav = useNavigate()

  useEffect(() => {
    fetchData()
    start()
    if(!Cookies.get('token'))
    {
nav("/")
    }
  }, [])

  const fetchData = async () => {
    if (Cookies.get("token")) {
      const verify = await axios.post("http://localhost:3001/psna/verification", {
        data: {
          token: Cookies.get('token') ? Cookies.get('token') : null
        }
      })
      console.log(verify.data.message)
      setmsg(verify.data.message)
      if (verify.data.message === "cordinator" || verify.data.message === "hod" || verify.data.message === "adminHod") {
        start()
      }
    }
  }
  async function start() {
    const response = await axios.get('http://localhost:3001/psna/tech/edit');
    console.log(response.data)
    console.log(response.data.mesaage)
    setList(response.data.mesaage)
    console.log(list)
  }

  const removeTutor = async (email) => {
    const remove = await axios.post("http://localhost:3001/psna/tech/remove", {
      data: {
        email: email
      }
    })
    console.log(remove.data)
    start()
  }


  function change() {
    setauth(true)
    setaddtutor(false)
  }

  async function addTutor() {
    const add = await axios.post("http://localhost:3001/psna/tech/add", {
      data: {
        name: name,
        email: email,
        password: password
      }
    })
    if (add.data.mesaage == "Failed To Add Tutor") {
      toast.warning("Failed To Add")
    }
    if (add.data.mesaage == "Already exist") {
      toast.warning("Already exist")
    }
    if (add.data.mesaage == "Only for Student") {
      toast.warning("Only for Student Verification")
    }
    
    
    setauth(false)
    setaddtutor(true)
    start()

  }

  function logout() {
    Cookies.remove("token")
    nav("/")
  }
//search tuttor


const SearchTutor=(query)=>{
  if(query==null || query=="")
  {
    start()
  }
  const newList=list.filter((item) =>
  item.email.toLowerCase().includes(query.toLowerCase())
);
setList(newList);
};

  return (

    <div>

      {(addtutor && (msg === "cordinator" || msg=="hod" || msg=="adminHod" || msg=="seceratory")) &&
        <div style={{ backgroundColor: 'black', color: 'white', height: '100%', paddingTop: '40px', paddingLeft: '10px', top: '0px', width: '100%', margin: '0px', position: 'absolute', display: 'flex', justifyContent: 'stretch', gap: '50px', flexDirection: 'column', overflow: 'auto' }}>
          <div>
            <button onClick={change} style={{ padding: '13px', borderRadius: '8px', fontWeight: 'bolder', position: 'fixed', top: '10px', right: '100px' }}>Add a Tutor</button>
          </div>
          <div className="logout"><button onClick={logout} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontWeight: 'bolder', margin: '10px' }}><LucideLogOut /></button></div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <input type='text' placeholder='Search by email ( ex:"name...@psnacet.edu.in )' onChange={(e)=>SearchTutor(e.target.value)}
            style={{padding:'20px',borderRadius:'10px',outline:'none',fontWeight:'bolder',textTransform:'capitalize',width:'400px'}}
            />
          </div>
          {
            
          }
          {list.map(data => (
            <div key={data._id} style={{ border: ' 2px solid white', borderRadius: '20px', marginRight: '10px', padding: '30px 10px', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px' }}>
              <div><h3 style={{ marginTop: '6px' }}>{data.name ? data.name : null}</h3>
                <h3 style={{ marginTop: '6px' }}>{data.email ? data.email : null}</h3>
                {
                  <button onClick={() => {
                    setconfirmid(data.email)
                    setconfirm(true)
                  }} style={{ marginTop: '13px', background: 'transparent', outline: 'none', color: 'white', border: 'none', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', marginBottom: '13px', }}><LucideUserMinus2 /></button>
                }
                {(confirm && confirmid == data.email) &&
                  <div style={{ marginTop: "9px" }} className="Cbtn">
                    <button onClick={() => {
                      removeTutor(data.email)
                      setconfirm(true)
                    }} style={{ borderRadius: '6px', fontWeight: 'bolder' }}>Confirm</button>
                    <button onClick={() => setconfirm(false)
                    } style={{ borderRadius: '6px', fontWeight: 'bolder' }}>Cancel</button>
                  </div>
                }


              </div>
            </div>

          )
          )}


        </div>}


      {(auth) && (addtutor === false && (msg === "cordinator" || msg=="seceratory" || msg=="Hod" || msg=="hod")) &&
        <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', top: '0px', width: '100%', margin: '0px', position: 'absolute' }}>
          <button style={{ position: 'fixed', top: '10px', left: '7px', backgroundColor: 'transparent', color: 'white', border: 'none', outline: 'none' }} onClick={() => {
            setauth(false)
            setaddtutor(true)
          }}><LucideArrowLeftCircle /></button>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='techbtn'>
            <div style={{ display: 'flex', gap: '10px' }}>
              <h3>Add</h3>
              <h3>Tutor</h3>
            </div>
            <div className='techinp'>
              <input type='text' required onChange={(e) => {
                setname(e.target.value)
              }} />
              <span>Tutor's Name</span>
            </div>
            <br />
            <div className='techinp'>
              <input type='email' required onChange={(e) => {
                setEmail(e.target.value)
              }} />
              <span>Tutor's email</span>
            </div>
            <br />
            <div className='techinp'>
              <input type='password' required onChange={(e) => {
                setpassword(e.target.value)
              }} />
              <span>Tutor's password</span>
            </div>
            <br />
            {/* {(name!=="")&&(email!=="")&&(password!=="")&& */}
            <button onClick={() => {
              addTutor()
            }}><LucideContact2 /></button>
            {/* } */}
            <br />
          </div>
        </div>


      }

      <ToastContainer />
    </div>
  )
}

export default Edit
