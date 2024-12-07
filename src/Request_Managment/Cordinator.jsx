import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LucideLogOut } from "lucide-react";
import Cookies from "js-cookie";
import psnalogo from '../images/psnalogo.png'
import '../App.css'

function Cordinator() {

  const [list, setlist] = useState([])
  const [button, setBtn] = useState(true)
  const [reg, setreg] = useState("")


  const nav = useNavigate()

  useEffect(() => {
    fetchData();

  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3001/psna/cordinator');
      setlist(response.data.data);
      console.log(response.data.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function logout() {
    Cookies.remove("token")
    nav("/")
  }
  // print
  //   const handlePrint = (name, department, year, reg, reason, gender, father) => {


  // console.log(reason)
  //     if (reason=='Bank loan') {
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p> This is to certify that<strong> ${gender}.${name} </strong> is a bonafide student of this college,<br/><br/>
  //      studying in<strong> ${year}</strong> B.Tech Degree in <strong>${department}</strong> during the year ${academic_year}.
  //      </p><br/>

  //       <div class="new"><p>This certificate is issued to enable him to apply for Educational Loan.</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });

  //     }


  //     if (reason == "passport") {
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //    <meta charset="UTF-8">
  //    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>

  //     <p> This is to certify that ${gender}.${name} ${dad} ${father} is a student of our<br><br>
  //      college,studying in ${year} Year B. Tech Degree in ${department} Branch during the year <br><br>
  //      ${academic_year}. Her original certificates of both 10 th and 12 th held herewith in our <br><br>college and the same
  //     will be returned only after the completion of ${self} degree.<br><br><br>
  //       Hence this bonafide is issued for the purpose of application of passport along<br><br>with the
  //     attested copies of the above documents.</p></div>
  //     </div>
  //     </center>
  // </div>


  //    <style>
  //    body{
  //      padding:0px;
  //      margin:0px;
  //    }
  //        .container{
  //          display: flex;
  //          flex-direction: column;
  //          justify-content: center; /
  //           align-items: center; 
  //           height:100vh;
  //          position:relative;
  //        }
  //        .new{
  //          padding:10px
  //        }
  //        p{
  //          letter-spacing:2px;
  //          word-spacing:5px;
  //        }
  //        h3{
  //          position:absolute;
  //          right:20px;
  // bottom:70%;
  //        }
  //    </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });
  //     }

  //     if(reason==="scholarship"){
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p> This is to certify that ${gender}.${name} ${dad} ${father} is bonafide student of
  //      this <br><br>
  //      college, studying in ${year} Year B.Tech Degree in ${department} Branch during
  //      the academic <br><br>year ${academic_year}.<br><br><br>

  //      This certificate is issued to enable her to apply for Nalavariyam</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });

  //     }

  //     if(reason=="course completion"){
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p> This is to Certify that ${gender}.${name} (${reg}) is a bonafide
  //      student of our college studying final Year B.Tech (${department}) course during the
  //      academic year ${academic_year}. She has secured 8.198 CGPA upto 7 th semester. She had attended all
  //      the semester examinations (I semester to VII semester). There is no backlog of arrears.<br/>
  //      The Viva examination and the commencement of final semester examination is yet to
  //      start and would as announced by Anna University.<br/>
  //      We have no objections in the student joining in TCS before the completion of ${self} all
  //      examinations.</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //           line-height: 2.3;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });

  //     }
  //     if(reason==="scholarship"){
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p> This is to certify that ${gender}.${name} ${dad} ${father} is bonafide student of
  //      this <br><br>
  //      college, studying in ${year} Year B.Tech Degree in ${department} Branch during
  //      the academic <br><br>year ${academic_year}.<br><br><br>

  //      This certificate is issued to enable her to apply for Nalavariyam</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });

  //     }

  //     if(reason=="Income tax"){
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p>This is to certify that ${gender}.${name} ${dad}.${father} is a bonafide
  //      student of this college, studying in ${year} Year B.Tech Degree in ${department}
  //      Branch during the academic year ${academic_year}.
  //      This certificate is issued to enable him to apply for his mother’s Income Tax purpose.</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //           line-height: 2.3;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });
  //     }


  //     if(reason=="others"){
  //       printJs({
  //         printable: `
  // <html>
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // </head>
  // <body>
  // <div class="container">
  // <h3>Date : ${formalDate}</h3>
  // <center>
  // <h2><strong><u>BONAFIDE CERTIFICATE</u></strong></h2><br>
  //      <p>This is to certify that ${gender}.${name} ${dad}.${father} is a bonafide
  //      student of this college, studying in ${year} Year B.Tech Degree in ${department}
  //      Branch during the academic year ${academic_year}.
  //      This certificate is issued to enable him to apply for his mother’s Income Tax purpose.</p></div>
  //      </div>
  //      </center>
  // </div>


  //     <style>
  //     body{
  //       padding:0px;
  //       margin:0px;
  //     }
  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: center; /
  //            align-items: center; 
  //            height:100vh;
  //           position:relative;
  //         }
  //         .new{
  //           padding:10px
  //         }
  //         p{
  //           letter-spacing:2px;
  //           word-spacing:5px;
  //           line-height: 2.3;
  //         }
  //         h3{
  //           position:absolute;
  //           right:20px;
  // bottom:70%;
  //         }
  //     </style>
  // </body>
  // </html>
  // `,
  //         type: 'raw-html',
  //       });
  //     }
  // // if(reason==="Bank loan"){
  // //   <div>
  // //   <ReactToPrint
  // //   trigger={() => <button>Print this out!</button>}
  // //   content={() => componentRef}
  // // />
  // //   <ComponentToPrint ref={(el) => (componentRef = el)} />
  // //   </div>
  // // }

  //   };

  function accept(reg) {
    setreg(reg)
    setBtn(!button)

  }
  //   const handle=useReactToPrint({
  //     content:()=>(
  //             componentRef.current

  //       ),
  //     print:()=>(
  // <div>
  //   <h2>Bonafide</h2>
  // </div>
  //     )
  // })


  // addhistory


  const addhistory = async (name, year, department, reason, reg, father, cgpa, sem, gen, mode,email) => {
    try {
      const history = await axios.post("http://localhost:3001/psna/addhistory", {
        data: {
          name, year, department, reason, reg, father, cgpa, sem, gen, mode,email
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


  async function reject(email, reg) {
    setreg(reg)
    setBtn(!button)
    try {
      const response = await axios.post('http://localhost:3001/psna/cordinator', {
        data: {
          email: email
        }
      });
      if (response.data.message.acknowledged === true) {
        toast.warn("Rejected Successfully")
      }
      //  console.log(response.data)
      fetchData()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="containers">
      <div className='logo' style={{ padding: '30px', backgroundColor: '#2eab38', display: 'flex', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex' }} className="image">
          <img src={psnalogo} alt='psnalogo' />

        </div>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', marginLeft: '30px' }} className="fullscreen">



          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }} className="log">
            <h3>Logout</h3>
            <button onClick={logout} style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none' }}><LucideLogOut /></button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row', alignItems: 'baseline', marginBottom: '0px', backgroundColor: 'white' }} className="offscreen">


        <div className="nav-linkss" >
          <Link to="/main">Home</Link>
          <Link to="./Edit">Edit Tutor</Link>
          <Link to="/psna/bonafide_history">History</Link>
          <Link to="/reset">Reset</Link>
          {/* <Link to="./EditHod">Edit Hod</Link> */}
        </div>
      </div>




      <div className="data-container">
        <br />
        {list.map(data => (
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
      <ToastContainer />
    </div>
  )
}

export default Cordinator
