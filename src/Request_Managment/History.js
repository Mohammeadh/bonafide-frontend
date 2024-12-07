import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import psnalogo from '../images/psnalogo.png'
import Cookies from "js-cookie"
import { LucidePrinter } from "lucide-react"
import { useNavigate } from "react-router-dom"

function History() {

const nav=useNavigate()

  const [history, sethistory] = useState([])
  const [name,setname]=useState("")
  const [display, setDisplay] = useState(false)
  const [print, setprint] = useState(true)
  const [content1, setContent1] = useState("")
  const [content2, setContent2] = useState("")
  const [heading, setHeading] = useState("Bonafide Certificate")
  const[edit,setEdit]=useState(true)
  const[faculty,setfaculty]=useState("Hod-IT")
  const [id,setid]=useState(0)
  useEffect(() => {
    fetchData()
    fetchdatas()
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
      if (verify.data.message === "cordinator" || verify.data.message === "hod" || verify.data.message === "adminHod" ||verify.data.message === "seceratory") {
        setDisplay(true)
      }
    }
  }

  // check

  const check = (name, year, department, gender, reason, reg, father, cgpa, sem) => {
    const currentDate = new Date();
    const years = currentDate.getFullYear();

    var dad, self, academic_year
    if (gender == "Mr") {
      dad = "S/O"
      self = "him"

    }
    if (gender == "Ms") {
      var dad = "D/O"
      self = "him"
    }
    if (year == "1st") {
      academic_year = `${years}-${years + 4}`
    }
    if (year == "2nd") {
      academic_year = `${years - 1}-${years + 3}`
    }
    if (year == "3rd") {
      academic_year = `${years - 2}-${years + 2}`
    }
    if (year == "4th") {
      academic_year = `${years - 3}-${years + 1}`
    }
    if (reason == "Bank loan") {
      setContent1(`This is to certify that ${gender}.${name}  is a bonafide student of this college,studying in ${year} B.Tech Degree in ${department} during the year ${academic_year}.`)
      setContent2(`This certificate is issued to enable him to apply for Educational Loan`)
      setfaculty("HOD-IT")
    }
    if (reason == "course completion") {
      setContent1(` This is to Certify that ${gender}.${name} (${reg}) is a bonafide student of our college studying final Year B.Tech (${department}) course during the academic year ${academic_year}. She has secured ${cgpa} CGPA upto ${sem} semester. She had attended allthe semester examinations (1 semester to ${sem} semester). There is no backlog of arrears.<br/>`)
      setContent2(`The Viva examination and the commencement of final semester examination is yet to start and would as announced by Anna University. We have no objections in the student joining in TCS before the completion of ${self} allexaminations`)
      setfaculty("HOD-IT")
    }
    if (reason == "scholarship") {
      setContent1(`This is to certify that ${gender}.${name} ${dad} ${father} is bonafide student of this college, studying in ${year} Year B.Tech Degree in ${department} Branch during the academic ${academic_year} `)
      setContent2(`This certificate is issued to enable her to apply for Nalavariyam`)
      setfaculty("HOD-IT")
    }
    if (reason == "passport") {
      
      setContent1(`This is to certify that ${gender}.${name} ${dad} ${father} is a student of our college, studying in ${year} Year B. Tech Degree in ${department} Branch during the year ${academic_year}. Her original certificates of both 10 th and 12 th held herewith in our college and the same will be returned only after the completion of ${self} degree. `)
      setContent2(`This certificate is issused to enable ${self} to apply passport.`)
      setfaculty("Principal")
    }
    if (reason == "Income tax") {
      setContent1(`This is to certify that ${gender}.${name} ${dad}.${father} is a bonafide student of this college, studying in ${year} Year B.Tech Degree in ${department} Branch during the academic year ${academic_year}.`)
      setContent2(` This certificate is issued to enable him to apply for his mother’s Income Tax purpose.`)
      setfaculty("HOD-IT")
    }
  }


  // handle


  const handle = (name, year, department, gender, reason, reg, father, cgpa, sem) => {
    const currentDate = new Date();
    const years = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formalDate = `${day}-${month}-${years}`;

    check(name, year, department, gender, reason, reg, father, cgpa, sem)


    if (reason == "Bank loan") {

      console.log(content1)
      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        display: flex; 
        justify-content: center; 
        align-items: center;
        height: 100vh;
      }
      h2 {
        font-size: 24px;
    
      }
      p{
        letter-spacing:2px;
       word-spacing:5px;
      line-height: 2.3;
      text-indent: 15%;
      }
      .p2{
        text-indent: 5%;
      }
      // h3{
      //   float:right;
      //   margin-bottom:20px;
      // }
      .date{
        display: flex; 
        justify-content: flex-end; 
        align-items: center;
      }
      .bonafide{
        display: flex; 
        justify-content: center; 
        align-items: center;
      }
      .hod{
        display: flex; 
        justify-content: flex-end; 
        align-items: center;
        margin-top:50px
      }
    </style>
  </head>
  <body>
  <div class="main">
  <div class="date">
  <h3>Date:${formalDate}</h3></div>
  <div class="bonafide">
  <h2>Bonafide Certificate</h2>
  </div>
    <p>${content1}</p>
    <p class="p2">${content2}</p>
    <br>
    <div class="hod"><h2>${faculty}</h2></div
  </div>

  </body>
</html>
  `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
    // course completion
    if (reason == "course completion") {
      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            display: flex; 
            justify-content: center; 
            align-items: center;
            height: 100vh;
          }
          h2 {
            font-size: 24px;
        
          }
          p{
            letter-spacing:2px;
           word-spacing:5px;
          line-height: 2.3;
          text-indent: 15%;
          }
          .p2{
            text-indent: 5%;
          }
          // h3{
          //   float:right;
          //   margin-bottom:20px;
          // }
          .date{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
          }
          .bonafide{
            display: flex; 
            justify-content: center; 
            align-items: center;
          }
          .hod{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
            margin-top:50px
          }
        </style>
      </head>
      <body>
      <div class="main">
      <div class="date">
      <h3>Date:${formalDate}</h3></div>
      <div class="bonafide">
      <h2>Bonafide Certificate</h2>
      </div>
        <p>${content1}</p>
        <p class="p2">${content2}</p>
        <br>
        <div class="hod"><h2>${faculty}</h2></div
      </div>
    
      </body>
    </html>
      `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    // scholarship


    if (reason == "scholarship") {

      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            display: flex; 
            justify-content: center; 
            align-items: center;
            height: 100vh;
          }
          h2 {
            font-size: 24px;
        
          }
          p{
            letter-spacing:2px;
           word-spacing:5px;
          line-height: 2.3;
          text-indent: 15%;
          }
          .p2{
            text-indent: 5%;
          }
          // h3{
          //   float:right;
          //   margin-bottom:20px;
          // }
          .date{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
          }
          .bonafide{
            display: flex; 
            justify-content: center; 
            align-items: center;
          }
          .hod{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
            margin-top:50px
          }
        </style>
      </head>
      <body>
      <div class="main">
      <div class="date">
      <h3>Date:${formalDate}</h3></div>
      <div class="bonafide">
      <h2>Bonafide Certificate</h2>
      </div>
        <p>${content1}</p>
        <p class="p2">${content2}</p>
        <br>
        <div class="hod"><h2>${faculty}</h2></div
      </div>
    
      </body>
    </html>
      `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    //passport

    if (reason == "passport") {
      console.log("not a check function")
      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            display: flex; 
            justify-content: center; 
            align-items: center;
            height: 100vh;
          }
          h2 {
            font-size: 24px;
        
          }
          p{
            letter-spacing:2px;
           word-spacing:5px;
          line-height: 2.3;
          text-indent: 15%;
          }
          .p2{
            text-indent: 5%;
          }
          // h3{
          //   float:right;
          //   margin-bottom:20px;
          // }
          .date{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
          }
          .bonafide{
            display: flex; 
            justify-content: center; 
            align-items: center;
          }
          .hod{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
            margin-top:50px
          }
        </style>
      </head>
      <body>
      <div class="main">
      <div class="date">
      <h3>Date:${formalDate}</h3></div>
      <div class="bonafide">
      <h2>Bonafide Certificate</h2>
      </div>
        <p>${content1}</p>
        <p class="p2">${content2}</p>
       <br>
        <div class="hod"><h2>${faculty}</h2></div>
      </div>
    
      </body>
    </html>
      `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }

    //Income tax


    if (reason == "Income tax") {

      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            display: flex; 
            justify-content: center; 
            align-items: center;
            height: 100vh;
          }
          h2 {
            font-size: 24px;
        
          }
          p{
            letter-spacing:2px;
           word-spacing:5px;
          line-height: 2.3;
          text-indent: 15%;
          }
          .p2{
            text-indent: 5%;
          }
          // h3{
          //   float:right;
          //   margin-bottom:20px;
          // }
          .date{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
          }
          .bonafide{
            display: flex; 
            justify-content: center; 
            align-items: center;
          }
          .hod{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
            margin-top:50px
          }
        </style>
      </head>
      <body>
      <div class="main">
      <div class="date">
      <h3>Date:${formalDate}</h3></div>
      <div class="bonafide">
      <h2>Bonafide Certificate</h2>
      </div>
        <p>${content1}</p>
        <p class="p2">${content2}</p>
        <br>
        <div class="hod"><h2>${faculty}</h2></div
      </div>
    
      </body>
    </html>
      `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }



    if (reason == "others") {
      console.log("not a check function")
      const printWindow = window.open('', '', 'width= 2480,height=3508');
      printWindow.document.open();
      printWindow.document.write(`
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            display: flex; 
            justify-content: center; 
            align-items: center;
            height: 100vh;
          }
          h2 {
            font-size: 24px;
        
          }
          p{
            letter-spacing:2px;
           word-spacing:5px;
          line-height: 2.3;
          text-indent: 15%;
          }
          .p2{
            text-indent: 5%;
          }
          // h3{
          //   float:right;
          //   margin-bottom:20px;
          // }
          .date{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
          }
          .bonafide{
            display: flex; 
            justify-content: center; 
            align-items: center;
          }
          .hod{
            display: flex; 
            justify-content: flex-end; 
            align-items: center;
            margin-top:50px
          }
        </style>
      </head>
      <body>
      <div class="main">
      <div class="date">
      <h3>Date:${formalDate}</h3></div>
      <div class="bonafide">
      <h2>${heading}</h2>
      </div>
        <p>${content1}</p>
        <p class="p2">${content2}</p>
        <br>
        <div class="hod"><h2>${faculty}</h2></div
      </div>
    
      </body>
    </html>
      `)
      printWindow.document.execCommand('print', false, null);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  }

  const fetchdatas = async () => {
    const data = await axios.get("http://localhost:3001/psna/addhistory")
    console.log(data.data.index)
    if (data.data.message) {
      sethistory(data.data.message)
    }
  }

  const SearchHistory=(query)=>{
    if(query==null || query=="")
    {
    fetchdatas()
    }
    const newList=history.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  sethistory(newList);
  };
 
  const historyPrint=()=>{
    const printWindow = window.open('', '', 'width=2480,height=3508');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head></head>
        <body>
        <style>
        h2{
          text-align: center;
          color: green;
          margin-bottom: 20px;
          font-weight:bolder;

        }
        </style>
          <div class="print">
          <h2>Bonafide History</h2>

            ${history.map(his => (
              `<div key=${his._id}>
                <p style={{ textTransform: 'capitalize' }}><b>Name : </b> ${his.name}</p>
                <p><b>Department : </b> ${his.department}</p>
                <p><b>Father's Name : </b> ${his.father}</p>
                <p><b>Reason : </b> ${his.reason}</p>
                <p><b>Year : </b> ${his.year}</p>
                <p><b>Reg no : </b> ${his.reg}</p>
                <p>Date of Receiving : ${his.date}</p>
                <hr/>
                <br/>
             
              </div>`
            )).join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.execCommand('print', false, null);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }

  return (
    <div className="containers">

      {
        display === true &&
        <div>

          <div className='logo' style={{ padding: '30px', backgroundColor: '#2eab38', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }} className="image">
              <img src={psnalogo} alt='psnalogo' />

            </div>

          </div>
          <br />
          <div style={{alignItems:'center',display:'flex',justifyContent:'center',marginBottom:'10px'}}>
<input type="text" placeholder="Search by Name..." onChange={(e)=>SearchHistory(e.target.value)}
      style={{padding:'20px',borderRadius:'10px',outline:'none',fontWeight:'bolder',textTransform:'capitalize',width:'400px'}}
/>
          </div>

          <div style={{position:"fixed",right:"25px",top:"55px"}}>
          <button onClick={historyPrint}
          style={{background:'transparent',border:'none'}}
          ><LucidePrinter/></button>
          </div>

          <div className="data-container">
            {history.map(his => (
              <div className="data" key={his._id}>
                <p style={{ textTransform: 'capitalize' }}><b>Name : </b> {his.name}</p>
                <p><b>Department : </b> {his.department}</p>
                <p><b>Father's Name : </b> {his.father}</p>
                <p><b>Reason : </b> {his.reason}</p>
                <p><b>Year : </b> {his.year}</p>
                <p><b>Reg no : </b> {his.reg}</p>
                <p>Date of Recieving : {his.date}</p>
                {his.mode &&<p>{his.mode}</p>}
          



                <div>
                  {print &&
                    <button onClick={() => {
                      check(his.name, his.year, his.department, his.gender, his.reason, his.reg, his.father, his.cgpa, his.sem)
                      setprint(false)
                      setid(his.reg)
                    }
                    }>Print</button>
                  }
                  {(print==false && id==his.reg) &&
                    <div >
                      <button onClick={() => {

                        handle(his.name, his.year, his.department, his.gender, his.reason, his.regNo, his.Father, his.cgpa, his.sem)
                        setid(0)
                        setprint(true)
                      }
                      }
                      style={{margin:'10px'}}
                      >Confirm</button>
                      <button onClick={()=>{
                        setprint(true)
                        setid(0)
                        setContent1("")
                        setContent2("")
                        setHeading("")
                      }
                        }>Cancel</button>
                      <div>
                    <br/>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '60%' }}>
                  <textarea placeholder="Enter the content 1" onChange={(e) => setContent1(e.target.value)} value={content1
                  } style={{ borderRadius: '10px', padding: '15px' }} />
                  <textarea placeholder="Enter the content 2" onChange={(e) => setContent2(e.target.value)} value={content2} style={{ borderRadius: '10px', padding: '15px' }} />
                  <textarea placeholder="Enter the Faculty..." onChange={(e) => setfaculty(e.target.value)} value={faculty} style={{ borderRadius: '10px', padding: '15px' }} />
                  {his.reason == "others" && <div>
                    <textarea placeholder="Enter the Heading" onChange={(e) => setHeading(e.target.value)} value={heading} style={{ borderRadius: '10px', padding: '15px' }} />
                  </div>}
                </div>
            </div><br />
                      
                      </div>
                
                  }

                </div>












              </div>
            ))}
          </div>
        </div>
      }


    </div>
  )
}
export default History
