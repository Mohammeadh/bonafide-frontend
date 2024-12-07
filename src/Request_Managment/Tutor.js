import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LucideLogOut, LucideSend, LucideXCircle } from "lucide-react";
import Cookies from "js-cookie";
import psnalogo from '../images/psnalogo.png'


function Tutor(props) {

  const [list, setlist] = useState([])
  const[rejects,setReject]=useState(true)
  const[no,setno]=useState(0)
  const[rejectss,setRejects]=useState(true)
  const[reason,setreason]=useState("")


  const nav = useNavigate()

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      const response = await axios.get('https://psna-mohammed-developer.onrender.com/psna/tutor');
      setlist(response.data.mesaage);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  async function create(id,name,email,reason,department,year,regNo,Contents,Subject,Gender,father,tutor,cgpa,sem,mode) {
    try {
      const res = await axios.post('https://psna-mohammed-developer.onrender.com/psna/tutor/accept', {
        data: {
          id,name,email,reason,department,year,regNo,Contents,Subject,Gender,father,tutor,cgpa,sem,mode
        }
      }

      );
      fetchData()
      toast.success("Granted Sucessfully")
      if(res.data.info)
      {
        try{
          const response_tutor = await axios.post('https://psna-mohammed-developer.onrender.com/psna/notify/hod',{
            data:{
              name:name,
              department:department,
              email:email,
              reason:reason,
              Regno:regNo,
              tmail:tutor,
              year:year
            }
          }
          )
        }
        catch(err){
          console.log(err)
        }
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function logout() {
    Cookies.remove("token")
    nav("/")

  }

  const sendreason=async(email)=>{
    try{
const send=await axios.post("https://psna-mohammed-developer.onrender.com/psna/tutor/send",{
  data:{
    email,reason
  }
})
    }
    catch(err)
    {
      console.log("error in send message",err)
    }
  }

  async function reject(email) {
    try {
      const resp = await axios.post('https://psna-mohammed-developer.onrender.com/psna/tutor/reject', {
        data: {
          email
        }
      });
      fetchData()
      if (resp.data.message === "Rejected") {
        toast.dismiss("Rejected")
      }
      try{

        sendreason(email)
      }
      catch(err)
      {
        console.log(err)
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
      <div style={{display:'flex'}} className="image">
          <img src={psnalogo} alt='psnalogo'/>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }} className="log">
          <div><h3>Logout</h3></div>
          <div>
            <button onClick={logout} style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none' }}><LucideLogOut /></button>
          </div>
        </div>

      </div>

      <div className="data-container">
      
       <br />
        {props.role==="tutor" &&
        <div  >
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <h2>BONAFIDE REQUEST</h2>
         </div>

          {list.map(data => (
            <div key={data._id} >
              {data.tutor === props.name &&
              <div className="data">
<div style={{marginBottom:"10px"}}>
              <h4>Name: {data.name}</h4>
              <p>Reg No: {data.Regno}</p>
              <p>Reason : {data.reason}</p>
              <p>Department: {data.Department}</p>
              <p>Year: {data.Year}</p>
              <p>CGPA : {data.cgpa}</p>
              <p>Semester : {data.sem}</p>
              {data.mode &&<p>{data.mode}</p>}
              {data.date && <p>Date of Applying : {data.date}</p>}
              </div>
              <div className="btns">
                 {rejectss&&<button onClick={()=>letter(data.Regno)}>View</button>}
                 {(rejectss===false && no===data.Regno)&&<button onClick={()=>{
                    setno(0)
                    setRejects(true)
                 }
                  }>Close</button>}
                <button onClick={() => create(data._id,data.name, data.email, data.reason, data.Department, data.Year, data.Regno, data.Contents, data.Subject, data.Gender, data.father,data.tutor,data.cgpa,data.sem,data.mode)}>Accept</button>
                {rejects &&
                    <div><button onClick={()=>setReject(false)}>Reject</button></div>
                }
              
              </div><br/>
              {rejects===false&&
               <div className="btns">
                <div style={{display:'flex',flexDirection:'column'}} className="rbtn">
                <input type="text" required 
                style={{padding:'13px',borderRadius:'10px',outline:'none',position:'relative',background:'transparent',
                border:'none',borderBottom:'2px solid black',boxShadow:'10px'}}
                onChange={(e)=>setreason(e.target.value)}
                />
                <span style={{position:'absolute',padding:'8px'}}>Enter The Reason</span>
                </div>
                <button onClick={() => reject(data.email)}style={{border:'none'}}><LucideSend/></button>
                <button onClick={() => setReject(true)}style={{border:'none'}}><LucideXCircle/></button>
               </div>
                
               } 
              {(no===data.Regno)&&
                <div className="req-letter" style={{borderTop:'2px solid black'}}>
                  <br />
                  <center> <h2>Bonafide Letter</h2></center>
                  <h2>From</h2>
                  <div className="cont">
                    <h5 style={{textTransform:'capitalize'}}>{data.name}</h5>
                    {data.Gender === "Mr" ? <h5 style={{textTransform:'capitalize'}}>S/o {data.father}</h5> : <h5 style={{textTransform:'capitalize'}}>D/O {data.father}</h5>}
                    <h5>Reg no: {data.Regno}</h5>
                    <h5>Department of {data.Department} </h5>
                    <h5>P.S.N.A College Of Engineering And Technology</h5>
                  </div>

                  <br />
                  <h2>To</h2>
                  <div className="cont">
                    <h5>Head Of The Department</h5>
                    <h5>Department of {data.Department} </h5>
                    <h5>P.S.N.A College Of Engineering And Technology</h5>
                  </div>

             
                  <div style={{display:'flex',alignItems:'baseline',gap:'5px',fontWeight:'normal'}}>
           <div> <h3>Sub:</h3></div>
           <div> <p>{data.Subject}</p></div>
            </div>
            <p style={{fontWeight:'normal'}}>{data.Contents}</p>
     <br />
                  <center><h3>Thanking You</h3></center>
                </div>}
                </div>}
             
            </div>))}
            <br/>

        </div>}
        {props.role==="adminTutor"&&
       <div>

       {list.map(data => (
         <div key={data._id} >
           <div className="data">
              <h2>P.S.N.A College Of Engineering And Technology</h2>
           <h4>Name: {data.name}</h4>
           <p>Reg No: {data.Regno}</p>
           <p>Reason for Applying: {data.reason}</p>
           <p>Department: {data.Department}</p>
           <p>Year: {data.Year}</p>
           <p>Tutor: {data.tutor}</p>
           <p>CGPA : {data.cgpa}</p>
              <p>Semester : {data.sem}</p>
              {data.mode &&<p>{data.mode}</p>}
              {data.date && <p>Date of Applying : {data.date}</p>}
           <div className="btns">
         {rejectss&&<button onClick={()=>letter(data.Regno)}>View</button>}
                 {(rejectss===false && no===data.Regno)&&<button onClick={()=>{
                    setno(0)
                    setRejects(true)
                 }
                  }>Close</button>}
             <button onClick={() => create(data._id,data.name, data.email, data.reason, data.Department, data.Year, data.Regno, data.Contents, data.Subject, data.Gender, data.father,data.cgpa,data.sem,data.mode)}>Accept</button>
             {rejects &&
                    <div><button onClick={()=>
                      {
                      setReject(false)
                      setno(data.Regno)
                    }}>Reject</button></div>
                }
              
              </div><br/>
              {(rejects===false && no===data.Regno)&&
               <div className="btns">
                <div style={{display:'flex',flexDirection:'column'}} className="rbtn">
                <input type="text" required style={{padding:'13px',borderRadius:'10px',outline:'none',position:'relative',background:'transparent',border:'none',borderBottom:'2px solid black',boxShadow:'10px'}}
                onChange={(e)=>setreason(e.target.value)}
                />
                <span style={{position:'absolute',padding:'8px'}}>Enter The Reason</span>
                </div>
                <button onClick={() => reject(data.email)}style={{border:'none'}}><LucideSend/></button>
                <button onClick={() => setReject(true)}style={{border:'none'}}><LucideXCircle/></button>
               </div>
               
                
               } 
           { (no===data.Regno)&&
             <div className="req-letter" style={{fontWeight:'lighter'}}>
               <br />
               <center> <h2>Letter For Bonafide</h2></center>
               <h2>From</h2>
               <div className="cont">
                 <p>{data.name}</p>
                 {data.Gender === "Mr" ? <p>S/o {data.father}</p> : <p>D/O {data.father}</p>}
                 <p>Reg no: {data.Regno}</p>
                 <p>Department of {data.Department} </p>
                 <p>P.S.N.A College Of Engineering And Technology</p>
               </div>

               <br />
               <h2>To</h2>
               <div className="cont">
                 <p>Head Of The Department</p>
                 <p>Department of {data.Department} </p>
                 <p>P.S.N.A College Of Engineering And Technology</p>
               </div>
               <br />
               <div className="cont">
                 <h4>Sub:{data.Subject}</h4>
                 <p>{data.Contents}</p>
               </div>

               <center><h3>Thanking You</h3></center>
             </div>}
             </div>
          
         </div>
         
         ))}

     </div>}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Tutor
