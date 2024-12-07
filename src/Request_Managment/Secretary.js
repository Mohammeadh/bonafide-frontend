import axios from 'axios'
import { LucideLogOut, LucideSend, LucideXCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import psnalogo from '../images/psnalogo.png'
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Seceratory = (props) => {

  const [hod, sethod] = useState([])
  const [tutor, setTutor] = useState([])
  const [tech, setTech] = useState([])
  const [rejectss, setRejects] = useState(true)
  const [rejects, setReject] = useState(true)
  const [no, setno] = useState(0)
  const [reg, setreg] = useState("")

  const nav = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('https://psna-mohammed-developer.onrender.com/psna/seceratory');
      if (response.data.tutor_data && response.data.hod_data && response.data.tech_data) {
        sethod(response.data.hod_data)
        setTutor(response.data.tutor_data)
        setTech(response.data.tech_data)
      }
      else {
        toast.warn("Refresh The Page Again")
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  //logout
  function logout() {
    Cookies.remove("token")
    nav("/")
  }

  function letter(reg) {
    setno(reg)
    setRejects(false)
  }


  async function reject(email, role) {
    try {
      const resp = await axios.post('https://psna-mohammed-developer.onrender.com/psna/seceratory/reject', {
        data: {
          email, role
        }
      });
      fetchData()
      if (resp.data.message === "Deleted Sucessfully") {
        toast.dismiss("Rejected")
      }

    }
    catch (err) {
      console.log(err)
    }
  }



  const addhistory = async (name, year, department, reason, reg, father, cgpa, sem, gen, mode, email) => {
    try {
      const history = await axios.post("https://psna-mohammed-developer.onrender.com/psna/addhistory", {
        data: {
          name, year, department, reason, reg, father, cgpa, sem, gen, mode, email
        }
      })
      if (history.data.message) {
        fetchData()
        toast.success("Sucessfully Added")
      }

    }
    catch (err) {
      toast.warning("Problem in Adding History")
    }

  }

  return (
    <div className="containers" onClick={()=>console.log(tech)}>
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




      <br />
      {(props.role === "seceratory") &&
        <div className="data-container">
          <h2 style={{ textAlign: 'center' }}> Tutor Request</h2>
          {tutor.map(data => (
            <div key={data._id} className="data">
              <h4>Name: {data.name}</h4>
              <p>Reg No: {data.Regno}</p>
              <p>Reason for Applying: {data.reason}</p>
              <p>Department: {data.department}</p>
              <p>Year: {data.Year}</p>
              <p>Tutor : {data.tutor}</p>
              <p>CGPA : {data.cgpa}</p>
              <p>Semester : {data.sem}</p>
              {data.mode && <p>Mode : {data.mode}</p>}
              {data.date && <p>Date of Applying : {data.date}</p>}
              <div className="btns">
                {reg != data.regNo && <div className="Cbtn">
                  <button onClick={() => {
                    // accept(data.regNo)
                    // check(data.name, data.year, data.department, data.Gender, data.reason, data.regNo, data.Father, data.cgpa, data.sem)
                    addhistory(data.name, data.Year, data.Department, data.reason, data.Regno, data.father, data.cgpa, data.sem, data.Gender, data.mode, data.email)
                  }}>Accept</button>
                  <button onClick={() => reject(data.email, "Tutor")}>Remove</button>
                </div>}

              </div>
              <br/>
              {rejects === false &&
                <div className="btns">
                  <div style={{ display: 'flex', flexDirection: 'column' }} className="rbtn">
                    <input type="text" required style={{ padding: '13px', borderRadius: '10px', outline: 'none', position: 'relative', background: 'transparent', border: 'none', borderBottom: '2px solid black', boxShadow: '10px' }} />
                    <span style={{ position: 'absolute', padding: '8px' }}>Enter The Reason</span>
                  </div>
                  <button onClick={() => reject(data.email, "seceratory")} style={{ border: 'none' }}><LucideSend /></button>
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

      {/* Hod */}
      <h2 style={{ textAlign: 'center' }}>Hod Request</h2>
      <br/>
      {hod.map(data => (
        <div className='data-container' key={data._id}>
        <div  className="data">
          <h2>P.S.N.A College Of Engineering And Technology</h2>
          <h4>Name: {data.name}</h4>
          <p>Reg No: {data.regNo}</p>
          <p>Reason for Applying: {data.reason}</p>
          <p>Department: {data.department}</p>
          <p>Year: {data.year}</p>
          <p>Tutor : {data.tutors}</p>
          <p>CGPA : {data.cgpa}</p>
          <p>Semester : {data.sem}</p>
          {data.mode && <p>{data.mode}</p>}
            <div className="btns">
                {reg != data.regNo && <div className="Cbtn">
                  <button onClick={() => {
                    // accept(data.regNo)
                    // check(data.name, data.year, data.department, data.Gender, data.reason, data.regNo, data.Father, data.cgpa, data.sem)
                    addhistory(data.name, data.year, data.department, data.reason, data.regNo, data.Father, data.cgpa, data.sem, data.Gender, data.mode, data.email)
                  }}>Accept</button>
                  <button onClick={() => reject(data.email, "Hod")}>Remove</button>
                </div>}

              </div><br />
          </div>
          </div>

      ))}

      {/* Tech */}

      <div className='data-container'>
        <h2 style={{ textAlign: 'center' }}>Tech Request</h2>
        {tech.map(data => (
          <div key={data._id} className="data">
            <p style={{ textTransform: 'capitalize' }}>Name : {data.name}</p>
            <p>Department : {data.department}</p>
            <p>Year : {data.year}</p>
            <p>Reason : {data.reason}</p>
            {data.mode && <p>{data.mode}</p>}



            <div >
              {reg != data.regNo && <div className="Cbtn">
                <button onClick={() => {
                  // accept(data.regNo)
                  // check(data.name, data.year, data.department, data.Gender, data.reason, data.regNo, data.Father, data.cgpa, data.sem)
                  addhistory(data.name, data.year, data.department, data.reason, data.regNo, data.Father, data.cgpa, data.sem, data.Gender, data.mode,data.email)
                }}>Accept</button>
                <button onClick={() => reject(data.email, data.regNo)}>Remove</button>
              </div>}


            </div>
          </div>

        ))}
      </div>

    </div>
  )
}

export default Seceratory
