
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import '../Newstyle.css'
import { LucideArrowLeft, LucideEye, LucideEyeOff } from 'lucide-react';
import CryptoJS from 'crypto-js';



function LoginForm() {

    const [display, setDisplay] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [remail, setrEmail] = useState("")
    const [rpassword, setrPassword] = useState("")
    const [code, setcode] = useState("")
    const navigate = useNavigate()
    const [otp, setotp] = useState("")
    const [forgot, setforgot] = useState(true)
    const [femail, setfemail] = useState("")
    const [fpass, setfpass] = useState("")
    const [disp, setdisp] = useState(true)
    const [type, settype] = useState("password")
    const [type1, settype1] = useState("password")
    const [type2, settype2] = useState("password")
    const [disp2, setdisp2] = useState(true)
    const [disp3, setdisp3] = useState(true)
    const [key, setkey] = useState("")
    const [resetKey, setresetKey] = useState("")


    // Submit function
    async function submit() {
        setDisplay(false)
        try {
            const response = await axios.post('https://psna-mohammed-developer.onrender.com/psna/login', {
                data: {
                    email: email,
                    password: password
                }
            }
            )
            if (response.data.message === "user logined") {
                const name = response.data.verify.name
                const email = response.data.verify.email
                Cookies.set('name', name)
                Cookies.set('email', email)
                Cookies.set('token', response.data.token)
                navigate("/main")
            }
            else if (response.data.message === "incorrect password or email") {
                toast.error("Incorrect password or email")
            }
            else if (response.data.message === "user not found") {
                toast.error("User not found")
            }

            else {

                toast.error("Logined Failed")
            }

        }
        catch (error) {
            console.error('Error:', error);
        };
    }


    //   getcode



    async function getcode() {
        try {
            const res = await axios.post('https://psna-mohammed-developer.onrender.com/psna/getcode', {
                data: {
                    name: name,
                    email: remail
                }
            }
            )
            if(res.data.email)
            {
                if(res.data.email==remail)
                {
                    toast.success("OTP Sent")
                }
                else{
                    toast.warn("Try Again")
                }
            }
            if(res.data.message=="invalid mail")
            {
                toast.warn("Register With Psnacet Email")
            }
            if(res.data.message=="Only for student")
            {
                toast.warning(" Only for student Registration")
            }
           
            if (res.data.key) {
                const encrpt_data = res.data.key
                const bytes = CryptoJS.AES.decrypt(encrpt_data, "bonafideforpsna123")
                const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)
                setkey(decryptedValue)
            }



        }
        catch (err) {
            console.log(err)
        }
    }

    //register


    async function submits() {
        setDisplay(true)
        if (key != code) {
            toast.error("Wrong OTP")
        }
        else {
            try {
                if (name == "" && remail == "" && password == "") {
                    toast.error("Fill The Details")
                }
                else {
                    const response = await axios.post('https://psna-mohammed-developer.onrender.com/psna/register', {
                        data: {
                            name: name,
                            email: remail,
                            password: rpassword,
                        }
                    }
                    )

                    if (response.data.message === "Registered Failed") {
                        toast.error("Register Failed")

                    }

                    if (response.data.error) {
                        toast.error("Register Failed")

                    }
                    if (response.data.message === "invalid email") {
                        toast.error("Register with psna email")

                    }
                    if (response.data.message === "Incorrect code") {
                        toast.error("Incorrect code")
                    }
                    if (response.data.message === "user already exists") {
                        toast.error("User already exists")
                    }
                    if (response.data.message === "registered successfully") {
                        toast.success("Register Successfully")
                    }

                }


            }
            catch (error) {
                console.log('Error:', error);
            };
        }

    }


    //prevent default

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
        }
        catch (err) {
            console.log(err)
        }

    };

    const forgototp = async () => {
        if (femail !== "") {
            try {
                const forgotResponse = await axios.post("https://psna-mohammed-developer.onrender.com/psna/forgotpassword", {
                    data: {
                        email: femail
                    }
                })
                if (forgotResponse.data.code) {
                    const encrpted_data = forgotResponse.data.code
                    const bytes = CryptoJS.AES.decrypt(encrpted_data, "bonafideforpsna123")
                    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)
                    setresetKey(decryptedValue)
                }


                if (forgotResponse.data.message == "You Don't Have An Account") {
                    toast.error("You Don't Have An Account")
                }

            }

            catch (err) {
                console.log(err)
            }
        }
        else {
            toast("Enter The Email")
        }
    }

    const change = async () => {
        if (otp == "") {
            toast.warning("Enter The OTP")
        }
        if (resetKey != otp) {
            toast.error("Wrong OTP")
        }
        else {
            try {
                const changepass = await axios.put("https://psna-mohammed-developer.onrender.com/psna/forgotverify", {
                    data: {
                        email: femail,
                        password: fpass
                    }
                })
                if (changepass.data.status === "created sucessfully") {
                    toast.success("Updated Sucessfully")
                }
                if (changepass.data.error) {
                    toast.error("Incorrect code")
                }
            }
            catch (err) {
                toast.warn("Restart The Website")
            }
        }


    }



    return (
        <div className='full'>
            <div className="container">
                <input type="checkbox" id="flip" />
                <div className="cover">
                    <div className="front">
                        {display && <div className="text">
                            <center><b><span className="text-1">P S N A</span></b></center>
                            <center><b><span className="text-2">COLLEGE OF ENGINEERING AND TECHNOLOGY</span></b></center>
                        </div>}
                    </div>
                    <div className='back'>
                        {display === false && <div className="text" style={{ fontWeight: 'bolder', color: 'white' }}>
                            <center><b><span className="text-1">P S N A</span></b></center>
                            <center><b><span className="text-2">COLLEGE OF ENGINEERING AND TECHNOLOGY</span></b></center>
                        </div>}
                    </div>
                </div>
                <div className="forms">
                    <div className="form-content">
                        {forgot ? <div className="login-form">
                            <div className="title">Login</div>
                            <form onSubmit={handleSubmit}>
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} required />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input type={type} placeholder="Enter your password" required value={password} onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                        {disp && <button onClick={() => {
                                            setdisp(false)
                                            settype("text")
                                        }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'>
                                            <LucideEyeOff />
                                        </button>}
                                        {disp === false && <button onClick={() => {
                                            setdisp(true)
                                            settype("password")
                                        }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'><LucideEye /></button>}
                                    </div>
                                    <div className="text"><a onClick={() => setforgot(false)}>Forgot password?</a></div>
                                    <div className="button input-box">
                                        <input type="submit" value="Submit" onClick={submit} />
                                    </div>
                                    <div className="text sign-up-text"><span onClick={() => setDisplay(false)}>Don't have an account?</span> <label htmlFor="flip" onClick={() => setDisplay(false)}>Register now</label></div>
                                </div>
                            </form>
                        </div> :
                            <div className="login-form">
                                <button style={{ marginBottom: '20px', background: 'transparent', border: 'none', outline: 'none' }} onClick={() => setforgot(true)}><LucideArrowLeft /></button>
                                <div className="title">Update Password</div>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-boxes">
                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <input type="text" placeholder="Enter your email" required onChange={(e) => setfemail(e.target.value)} value={femail} />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type="password" placeholder="Enter your OTP" required onChange={(e) => {
                                                setotp(e.target.value)
                                            }} />
                                        </div>
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input type={type1} placeholder="Create New Password" required onChange={(e) => setfpass(e.target.value)} />
                                            {disp2 && <button onClick={() => {
                                                setdisp2(false)
                                                settype1("text")
                                            }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'>
                                                <LucideEyeOff />
                                            </button>}
                                            {disp2 === false && <button onClick={() => {
                                                setdisp2(true)
                                                settype1("password")
                                            }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'><LucideEye /></button>}
                                        </div>
                                        <div className="button input-box">
                                            <input type="button" value="Get The OTP" onClick={forgototp} />
                                        </div>
                                        {otp !== "" && <div className="button input-box">
                                            <input type="submit" value="Submit" onClick={change} />
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        }




                        <div className="signup-form">
                            <div className="title">Register</div>
                            <form onSubmit={handleSubmit}>
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-user"></i>
                                        <input type="text" placeholder="Enter your name" required value={name} onChange={(e) => {
                                            setName(e.target.value)
                                        }} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input type="text" placeholder="Enter your email" required value={remail} onChange={(e) => {
                                            setrEmail(e.target.value)
                                        }} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input type={type2} placeholder="Enter your password" required value={rpassword} onChange={(e) => {
                                            setrPassword(e.target.value)
                                        }} />
                                        {disp3 && <button onClick={() => {
                                            setdisp3(false)
                                            settype2("text")
                                        }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'>
                                            <LucideEyeOff />
                                        </button>}
                                        {disp3 === false && <button onClick={() => {
                                            setdisp3(true)
                                            settype2("password")
                                        }} style={{ border: 'none', outline: 'none', background: 'transparent' }} type='button'><LucideEye /></button>}
                                    </div>
                                    <div className="input-box">

                                        <i className="fas fa-lock"></i>
                                        <input type="password" placeholder="Enter your Code" required value={code} onChange={(e) => {
                                            setcode(e.target.value)
                                        }} />
                                    </div>
                                    {remail !== "" &&


                                        <div className="text sign-up-text"><label onClick={getcode}>Get Code</label> </div>

                                    }
                                    <div className="button input-box">
                                        <input type="submit" value="Submit" onClick={submits} />
                                    </div>
                                    <div className="text sign-up-text"><span htmlFor="flip" onClick={() => setDisplay(true)}>Already have an account?</span> <label htmlFor="flip" onClick={() => setDisplay(true)}>Login now</label></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
            <div style={{ position: 'fixed', bottom: '10px', right: '10px', color: 'white', opacity: '0.5' }} className='watermark'>

                <ol>
                    <p style={{ marginBottom: '5px' }}>Developed By </p>
                    <li><i>R.Mohammed ( IT )</i></li>
                    <li><i>S.Mohammed Bahardeen ( IT )</i></li>
                </ol>
            </div>
        </div>
    );
}

export default LoginForm;
