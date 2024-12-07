import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { useNavigate ,Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LucideLogOut, LucideSend, LucideXCircle } from "lucide-react";
import Cookies from "js-cookie";
import psnalogo from '../images/psnalogo.png'

function Hod(props) {


  const [list, setlist] = useState([])
  const [rejects, setReject] = useState(true)
  const [rejectss, setRejects] = useState(true)
  const [no, setno] = useState(0)


  const nav = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3001/psna/hod');
      console.log(response.data.data)
      setlist(response.data.data);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  async function create(name, email, reason, department, year, regNo, gender, father, tutor,cgpa,sem,mode) {
    try {
      const res = await axios.post('http://localhost:3001/psna/hod/accept', {
        data: {
          name, email, reason, department, year, regNo, gender, father, tutor,cgpa,sem,mode
        }
      }

      );
      console.log(res.data.message);
      toast.success("Granted Sucessfully")
      fetchData()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function logout() {
    Cookies.remove("token")
    nav("/")
  }


  async function reject(email) {
    try {
      const resp = await axios.post('http://localhost:3001/psna/hod/reject', {
        data: {
          email
        }
      });
      fetchData()
      if (resp.data.message === "Rejected") {
        toast.dismiss("Rejected")
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  function letter(reg) {
    setno(reg)
    setRejects(false)
  }




  return (
    <div className="containers">
      <div className='logo' style={{ padding: '30px', backgroundColor: '#2eab38', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }} className="image">
          <img src={psnalogo} alt='psnalogo' />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }} className="log">
          <div><h3>Logout</h3></div>
          <div>
            <button onClick={logout} style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none' }}><LucideLogOut /></button>
          </div>
        </div>

      </div>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'baseline', marginBottom: '0px', backgroundColor: 'white' }} className="offscreen">


<div className="nav-linkss" >
  <Link to="/main">Home</Link>
  <Link to="./Edit">Edit Tutor</Link>
  <Link to="/psna/bonafide_history">History</Link>
</div>
</div>
      <br/>
      {(props.role === "hod" || props.role === "adminHod") &&
        <div className="data-container">
          {list.map(data => (
            <div key={data._id} className="data">
              <h2>P.S.N.A College Of Engineering And Technology</h2>
              <h4>Name: {data.name}</h4>
              <p>Reg No: {data.regNo}</p>
              <p>Reason for Applying: {data.reason}</p>
              <p>Department: {data.department}</p>
              <p>Year: {data.year}</p>
              <p>Tutor : {data.tutors}</p>
              <p>CGPA : {data.cgpa}</p>
              <p>Semester : {data.sem}</p>
              {data.mode &&<p>{data.mode}</p>}
              <div className="btns">
                {rejectss && <button onClick={() => letter(data.regNo)}>View</button>}
                {(rejectss === false && no === data.regNo) && <button onClick={() => {
                  setno(0)
                  setRejects(true)
                }
                }>Close</button>}
                <button onClick={() => create(data.name, data.email, data.reason, data.department, data.year, data.regNo, data.Gender, data.Father, data.tutors,data.cgpa,data.sem,data.mode)}>Accept</button>
                {rejects &&
                  <div><button onClick={() => setReject(false)}>Reject</button></div>
                }

              </div><br />
              {rejects === false &&
                <div className="btns">
                  <div style={{ display: 'flex', flexDirection: 'column' }} className="rbtn">
                    <input type="text" required style={{ padding: '13px', borderRadius: '10px', outline: 'none', position: 'relative', background: 'transparent', border: 'none', borderBottom: '2px solid black', boxShadow: '10px' }} />
                    <span style={{ position: 'absolute', padding: '8px' }}>Enter The Reason</span>
                  </div>
                  <button onClick={() => reject(data.email)} style={{ border: 'none' }}><LucideSend /></button>
                  <button onClick={() => setReject(true)} style={{ border: 'none' }}><LucideXCircle /></button>
                </div>

              }
              {(no === data.regNo) &&
                <div className="req-letter" style={{ borderTop: '2px solid black' }}>
                  <br />
                  <center> <h2>Bonafide Letter</h2></center>
                  <h2>From</h2>
                  <div className="cont">
                    <h5>{data.name}</h5>
                    {data.Gender === "Mr" ? <h5>S/o {data.Father}</h5> : <h5>D/O {data.Father}</h5>}
                    <h5>Reg no: {data.regNo}</h5>
                    <h5>Department of {data.department} </h5>
                    <h5>P.S.N.A College Of Engineering And Technology</h5>
                  </div>

                  <br />
                  <h2>To</h2>
                  <div className="cont">
                    <h5>Head Of The Department</h5>
                    <h5>Department of {data.department} </h5>
                    <h5>P.S.N.A College Of Engineering And Technology</h5>
                  </div>

                  <br />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', fontWeight: 'normal' }}>
                    <div> <h3>Sub:</h3></div>
                    <div> <p>{data.Subject}</p></div>
                  </div>
                  <p style={{ fontWeight: 'normal' }}>{data.Contents}</p>

                  <center><h3>Thanking You</h3></center>
                </div>}
            </div>

          ))}

        </div>}
      <ToastContainer />

    </div>
  )
}

export default Hod
