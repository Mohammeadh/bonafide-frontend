import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LucideLogOut } from 'lucide-react'
import Cookies from 'js-cookie';
import psnalogo from '../images/psnalogo.png'
import './Dasboard.css'




function Dashboard() {

  const nav = useNavigate()

  const [message, setmsg] = useState('')
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [display, setDisplay] = useState(false)
  const [dep, setdep] = useState("")
  const [yr, setyr] = useState("")
  const [reg, setreg] = useState("")
  const [genders, setgender] = useState("")
  const [Subject, setSubject] = useState("")
  const [contents, setContents] = useState("")
  const [gen, setgen] = useState(true)
  const [edits, setedits] = useState(false)
  const [fname, setfname] = useState("")
  const [status, setStatus] = useState("")
  const [tutors, setTutors] = useState([])
  const [tutor, setTutor] = useState("")
  const [dispstatus, setdispstatus] = useState(true)
  const [lname, setlname] = useState("")
  const [lDep, setlDep] = useState("")
  const [lreason, setlreason] = useState("")
  const [lyear, setlyear] = useState("")
  const [ltutor, setltutor] = useState("")
  const [lregno, setlregno] = useState("")
  const [sem, setsem] = useState("")
  const [cgpa, setcgpa] = useState("")
  const [tmail, setTmail] = useState("")
  const [mode, setmode] = useState("")

  useEffect(() => {
    setname(Cookies.get('name'))
    setEmail(Cookies.get('email'))
    checkExist()
    checkTutor()

  }, [])


  const checkExist = async () => {
    const check = await axios.post("https://psna-mohammed-developer.onrender.com/psna/check", {
      data: {
        email: Cookies.get('email')
      }
    })
    setStatus(check.data.message)
    if (check.data.message == "Progress in Hod") {
      setlname(check.data.detials.name)
      setlregno(check.data.detials.regNo)
      setlDep(check.data.detials.department)
      setlyear(check.data.detials.year)
      setlreason(check.data.detials.reason)
      setltutor(check.data.detials.tutors)

    }

    if (check.data.message == "Progress in technician") {
      setlname(check.data.detials.name)
      setlregno(check.data.detials.regNo)
      setlDep(check.data.detials.department)
      setlyear(check.data.detials.year)
      setlreason(check.data.detials.reason)
      setltutor(check.data.detials.tutors)

    }
    if (check.data.message == "Progress in Tutor") {
      setlname(check.data.detials.name)
      setlregno(check.data.detials.Regno)
      setlDep(check.data.detials.Department)
      setlyear(check.data.detials.Year)
      setlreason(check.data.detials.reason)
      setltutor(check.data.detials.tutor)
    }
  }


  const checkTutor = async () => {
    const res_tutor = await axios.get("https://psna-mohammed-developer.onrender.com/psna/tutorlist")
    setTutors(res_tutor.data.message)
  }


  async function save() {
    if (name != "" && dep != "" && email !== "" && yr != "" && reg != "" && Subject != "" && contents != "" && fname != "" && sem != "" && cgpa != "" && mode != "" && gen != "") {
      toast.warning("Go Back And Fill The Details")
    }
    else {
      try {
        const response = await axios.post('https://psna-mohammed-developer.onrender.com/psna/apply', {
          data: {
            name: name,
            email: email,
            reason: message,
            department: dep,
            year: yr,
            Reg_no: reg,
            Contents: contents,
            Subject: Subject,
            Gender: genders,
            father: fname,
            tutors: tutor,
            cgpa: cgpa,
            sem: sem,
            mode: mode

          }
        }
        )


        if (response.data.message === "Progress" || response.data.message === "In Progres") {
          toast.warn("In Progress")
          window.location.reload()
        }
        if (response.data.error == "Tutor Not Found") {
          toast.warning("Tutor Not Found")
        }
        else if (response.data.message.name && response.data.message.email) {
          try {
            if (tmail !== "") {
              const res = await axios.post('https://psna-mohammed-developer.onrender.com/psna/notify/tutor', {
                data: {
                  name: name,
                  email: email,
                  reason: message,
                  Mail: tmail
                }
              })
              window.location.reload()
            }

          }
          catch (err) {
            console.log(err)
          }
          checkExist()
        }


      }
      catch (err) {
        console.log(err)
      }
    }

  }


  function Radio(e) {
    const value = e.target.value;
    if (value === "Bank loan") {
      setSubject("Request for Bonafide Certificate for Education Loan Application")
      setContents(`I am applying for an education loan to cover tuition fees during my course of study. As per the bank's requirements, 
      I need to provide a bonafide certificate from my institution as proof of my enrollment and academic status.`)
    }
    if (value === "passport") {
      setSubject("Application for Bonafide Certificate for Passport")
      setContents(`I kindly request you to issue a bonafide certificate in my ${name}, confirming my residential address and stating that I am a citizen of India . This certificate is necessary for my passport application, and I understand that it must bear the official seal of your office to be valid.`)
    }
    if (value === "scholarship") {
      setSubject("Application for Bonafide Certificate for Scholarship")
      setContents(`I am aware that a bonafide certificate is a crucial document required by the scholarship committee to verify my enrollment ${reg} and academic standing at the university. Therefore, I kindly request your assistance in providing me with this certificate to support my application`)
    }
    if (value === "course completion") {
      setSubject("Application for Bonafide Certificate for Course Completion")
      setContents(`I enrolled in the ${dep} program at PSNACET in ${yr} and have diligently completed all the required coursework and examinations as per the curriculum. I have attached a copy of my academic transcript, which reflects my academic performance and the successful fulfillment of all course requirements`)
    }
    if (value === "Income tax") {
      setSubject("Bonafide Certificate for Income Tax Purposes")
      setContents(`I am writing to request a bonafide certificate for income tax purposes. I am currently enrolled as a full-time student at PSNACET, pursuing a ${dep} .I require this bonafide certificate to provide proof of my student status for income tax filing purposes`)
    }
    setmsg(value)
  }

  function disp(e) {
    setDisplay(!display)
  }


  function logout() {
    Cookies.remove("name")
    Cookies.remove("email")
    Cookies.remove("token")
    localStorage.removeItem("reason")
    localStorage.removeItem("year")
    localStorage.removeItem("gender")
    localStorage.removeItem("regno")
    localStorage.removeItem("department")
    localStorage.removeItem("father")
    localStorage.removeItem("sub")
    localStorage.removeItem("contnet")
    localStorage.removeItem("name")
    localStorage.removeItem("Reg no")
    localStorage.removeItem("Department")
    localStorage.removeItem("Year")
    localStorage.removeItem("Reason")
    localStorage.removeItem("Tutor")
    nav("/")
  }

  function year(e) {
    const year = e.target.value
    setyr(year)
  }

  function department(e) {
    const department = e.target.value
    setdep(department)
  }

  function Reg(e) {
    const reg_number = e.target.value
    setreg(reg_number)
  }

  function gender(e) {
    const g = e.target.value;
    if (g == "Male") {
      setgender("Mr")
    }
    else {
      setgender("Ms")
    }
  }

  // function sub(e) {
  //   setSubject(e.target.value)
  // }

  // function content(e) {
  //   setContents(e.target.value)
  // }

  function selectTutor(e) {
    setTmail(e.target.value)
    setTutor(e.target.value)
  }

  function edit() {
    setedits(false)
    setgen(true)
    setDisplay(!display)
  }

  function parents(e) {
    setfname(e.target.value)
  }

  const removed = async () => {
    try {
      const rem = await axios.post('https://psna-mohammed-developer.onrender.com/psna/remove', {
        data: {
          regno: lregno
        }
      })
      if (rem.data.message) {
        toast.success("Deleted Sucessfully")
        window.location.reload()
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="dashboard-container">
    <div className="header">
      <div className="logo-container">
        <img src={psnalogo} alt="psnalogo" />
      </div>
      <div className="logout-container">
        <button className="remove-button" onClick={logout}>
          <LucideLogOut />
        </button>
      </div>
    </div>

    {(gen && status === 'not in progress') && (
      <div className="form-container">
        <h1 className="reason-header">Reason for Applying Bonafide</h1>
        <form onChange={(e) => 
          {
            Radio(e)
  
            setmsg(e.target.value)
        }}>
          <div className="radio-buttons">
            <label>
              <input type="radio" value="Bank loan" name="reason" />
              Bank Loan
            </label>
            <label>
              <input type="radio" value="passport" name="reason" />
              Passport
            </label>
            <label>
              <input type="radio" value="scholarship" name="reason" />
              Scholarship
            </label>
            <label>
              <input type="radio" value="course completion" name="reason" />
              Course Completion
            </label>
            <label>
              <input type="radio" value="Income tax" name="reason" />
              Income Tax
            </label>
          </div>
        </form>

        <h2 className="details-header">Enter The Student Details</h2>
        <div className="details-form">
          <select className="select-input" onChange={year}>
            <option value="">Year Of Studying</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>

          <select className="select-input" onChange={(e)=>setmode(e.target.value)}>
            <option value="">Mode</option>
            <option value="1st">Hostel</option>
            <option value="2nd">Day Scholar</option>
          </select>

          <select className="select-input" onChange={department}>
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECHANICAL">Mechanical</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="CSE">CSE</option>
          </select>



          <select className="select-input" onChange={(e)=>setsem(e.target.value)}>
            <option value="">Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          <select className="select-input" onChange={gender}>
            <option value="">Enter your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="select-input" onChange={selectTutor}>
            <option value="">Choose Your Tutor</option>
            {tutors.map((data) => (
              <option value={data.name} key={data._id}>
                {data.name}
              </option>
            ))}
          </select>

          <input
            className="input-field"
            type="number"
            minLength="10"
            onChange={(e) => setreg(e.target.value)}
            placeholder="Reg No"
          />

          <input
            className="input-field"
            type="number"
            onChange={(e) => setcgpa(e.target.value)}
            placeholder="CGPA ..."
          />

          <input
            className="input-field"
            type="text"
            onChange={(e) => setfname(e.target.value)}
            placeholder="Father's Name"
          />
          {
(message!='' && yr!='' && dep!='' && tutor!='' && reg != '' && fname!='' && genders!='') && 
          <button className="submit-button" onClick={()=>{
            setedits(true)
            setgen(false)
          }}>
            Next
          </button>
          }
        </div>
      </div>
    )}






      {(edits && status == "not in progress") && <div className='request'>
        {
          <div className='dasssh'>
            <center><h2>Bonafide Letter</h2></center>
            <br />
            <div>
              <h2>From:</h2>
              <div style={{ marginLeft: '50px' }}>
                <p style={{ textTransform: 'capitalize' }}>{name}</p>
                <p>Department of  {dep}</p>
                <p>P.S.N.A College of Engineering And Technology</p>
              </div>
              <br />
              <h2>To:</h2>
              <div style={{ marginLeft: '50px' }}>
                <p>Head Of The Department</p>
                <p>Department of  {dep}</p>
                <p>P.S.N.A College of Engineering And Technology</p>
              </div>
            </div>

            <div>

            </div>
            <br />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <div> <h3>Sub:</h3></div>
              <div> <p>{Subject}</p></div>
            </div>
            <br />
            <p style={{ wordSpacing: '6px', lineHeight: '25px' }}>{contents}</p><br />
            <input type='checkbox' onChange={disp} checked={display} />
            <label><i>Ensure your name and email and you are responsible for your request</i></label>
            <div className='Dbtn' style={{ marginTop: '20px' }}>
              <center><button id='btns' onClick={edit}>Edit</button></center>
              {(message && display && dep !== "" && yr !== "" && reg !== "") && <center><button id="btns" onClick={save}>submit</button></center>}
              <br />

            </div>
            <br />
            <ToastContainer />
          </div>
        }
      </div>}
      {(status !== "not in progress") && 
      <div className='daash'>
<div className="status-container">
  <h1 className="status-heading">{status}</h1>
  <div className="details-container">
    <h2>Name: {lname}</h2>
    <h2>Department: {lDep}</h2>
    <h2>Year: {lyear}</h2>
    <h2>Reason: {lreason}</h2>
    {status === "Progress in Tutor" && (
      <button className="remove-button" onClick={removed}>
        Remove
      </button>
    )}
  </div>
</div>


        </div>
      }


    </div>
  )
}

export default Dashboard
