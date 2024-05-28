import { React, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import logo from '../logo3.png'
import bg from '../bg.avif'
// import image from '../4374549.jpg'
import image from '../contact 1.avif'

const Contact = () => {

  const [fname, setfname] = useState('')
  const [email, setemail] = useState('')
  const [lname, setlname] = useState('')
  const [phone, setphone] = useState('')
  const [msg, setmsg] = useState('')
  const [auth, setauth] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  console.log("State", location.state)
  const { authent } = location.state || { authent: 'not' };

  // const {auth} = location.state.authent || {authent : 'not'}
  const { user } = location.state || { user: 'notfound' }; // Get the user value from the state
  console.log(authent, user)


  // const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const tohome=()=>{
    navigate('/',{state:{user:user,authent:authent}});
    }
  const tosign = () => {
    navigate('/sign_text', { state: { user: user, authent: authent } });
  }


  const tocontact = () => {
    navigate('/contactus', { state: { user: user, authent: authent } });
  }

  const toabout = () => {
    navigate('/aboutus', { state: { user: user, authent: authent } });
  }
  const tospeech = () => {
    navigate('/speech', { state: { user: user, authent: authent } });
  }
  const tosignup = () => {
    navigate('/signup', { state: { user: user, authent: authent } });
  }
  const tologin = () => {
    console.log(authent, location.state.user)
    navigate('/login', { state: { user: user, authent: authent } });
  }


  const totext = () => {
    navigate('/text_sign', { state: { user: user, authent: authent } });
  }

  const handlesubmit = () => {
    // if (fname == '' || email == '' || msg == '') {
    //   alert('field was empty')
    // }
    // else {
      if (!isValidEmail || !isValidFname  || !isValidLname || !isValidPhoneNumber ) {
        seterror_msg(true)
      }
      else 
      {
        axios
          .post('http://127.0.0.1:8000/contact/', { 'fname': fname, 'email': email, 'msg': msg, 'lname': lname, 'phone': phone }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            setfname('')
            setemail('')
            setmsg('')
            setlname('')
            setphone('')
            console.log(response.data.state)
            setsubmit(true)
            setsuccess_msg(true)
          })
          .catch((error) => {
            console.error(error)
          })
      }

    // }
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const [submit, setsubmit] = useState(false)

  const [error_msg, seterror_msg] = useState(false)
  const [success_msg, setsuccess_msg] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLname, setIsValidLname] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  //=================================== Fname ====================================
  const [isFocused, setIsFocused] = useState(false);
  const [fname_format, setfname_format] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

  };
  const validateFname = (val) => {
    const inputVal = val.trim(); // Trim the input value to remove leading and trailing spaces
    setfname(inputVal);

    // Check if the input contains only alphabetical characters
    const isValidInput = /^[a-zA-Z]+$/.test(inputVal);

    // Check if the input is not empty
    const isNotEmpty = inputVal !== '';

    // Update isValidLname state based on validations
    setIsValidFname(isNotEmpty);
    setfname_format(isValidInput);
  }
  //==============================================================================
  //=================================== Lname ====================================
  const [isFocused1, setIsFocused1] = useState(false);
  const [lname_format, setlname_format] = useState(false);
  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const validateLname = (val) => {
    const inputVal = val.trim(); // Trim the input value to remove leading and trailing spaces
    setlname(inputVal);

    // Check if the input contains only alphabetical characters
    const isValidInput = /^[a-zA-Z]+$/.test(inputVal);

    // Check if the input is not empty
    const isNotEmpty = inputVal !== '';

    // Update isValidLname state based on validations
    setIsValidLname(isNotEmpty);
    setlname_format(isValidInput);
  }


  //===============================================================================


  //=================================== EMAIL ====================================
  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValid);
  };
  const [isFocused3, setIsFocused3] = useState(false);
  const handleFocus3 = () => {
    setIsFocused3(true);
    setIsValidEmail(email.trim() !== '');

  };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  // Function to handle input change
  const handleChange3 = (e) => {
    const inputVal = e.target.value;
    setemail(inputVal);
    setIsValidEmail(inputVal.trim() !== '');
  };
  //===============================================================================


  //=================================== Phone number ====================================
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/.test(phoneNumber);    
    setIsValidPhoneNumber( phonePattern)
  };
  const [isFocused2, setIsFocused2] = useState(false);
  const handleFocus2 = () => {
    setIsFocused2(true);
    validatePhoneNumber(phone);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  // Function to handle input change
  const handleChange2 = (e) => {
    const inputVal = e.target.value;
    setphone(inputVal);
    setIsValidPhoneNumber(inputVal.trim() !== '');
  };
  //===============================================================================
  const [isFocused4, setIsFocused4] = useState(false);
  const handleFocus4 = () => {
    setIsFocused4(true);
  };

  const handleBlur4 = () => {
    setIsFocused4(false);
  };
  
  const [fname_changed, setfanme_changed] = useState(false)
  const [lname_changed, setlanme_changed] = useState(false)
  const [passwd_changed, setpasswd_changed] = useState(false)
  const [date_changed, setdate_changed] = useState(false)
  const [email_changed, setemail_changed] = useState(false)

  return (
    <>
      {/* <div className='bg-gradient-to-tr   from-green-600 via-green-600 via-40% to-blue-600 min-h-screen ' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} > */}
      <div className='bg-[#e9eaec] min-h-screen' >
        <nav className=' py-5 px-5 bg-white'>
          <div className='flex items-center justify-between'>
            <div>
              <button  onClick={tohome}  className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
            </div>
            <div className='hidden sm:flex lg:flex-row gap-7'>
              <a onClick={tosign}>
                <button className='text-black    text-lg '>Sign to Text</button>
              </a>
              {authent === 'True' && (
                <>
                  <a onClick={totext}>
                    <button className='text-black  text-lg rounded-md'>Text to Sign</button>
                  </a>
                  <a onClick={tospeech}>
                    <button className='text-black  text-lg '>Speech to Sign</button>
                  </a>
                </>
              )}
              <a onClick={toabout}>
                <button className='text-black  text-lg rounded-md'>About us</button>
              </a>
              <a onClick={tocontact}>
                <button className='text-black  text-lg border-b-2 border-black'>Contact us</button>
              </a>
              {authent === 'True' ? (
                <>
                   <a onClick={tologin}>
                <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md '>Log out</button>
                {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
              </a>
                </>
              ):(
              <a onClick={tologin}>
                <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md '>Log in</button>
                {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
              </a>
              )} 
              <a onClick={tosignup}>
                <button className='text-white px-3 py-1 text-lg rounded-md font-semibold border-2 border-blue-500 bg-blue-500  '>Sign up</button>
              </a>
            </div>
            <div className='sm:hidden'>
              <button
                className='text-white  text-lg rounded-md'
                onClick={toggleDropdown}
              >
                Menu
              </button>
            </div>
          </div>
          {isDropdownOpen && (
            <div className='sm:hidden md:hidden mt-4 '>
              <div className='flex flex-col gap-2'>
                <a onClick={tosign}>
                  <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Sign to Text</button>
                </a>
                <a onClick={toabout}>
                  <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>About us</button>
                </a>
                {authent === 'True' && (
                  <>
                    <a onClick={totext}>
                      <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
                    </a>
                    <a onClick={tospeech}>
                      <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Speech to Sign</button>
                    </a>
                  </>
                )}
                <a onClick={tocontact}>
                  <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
                </a>
                <a onClick={tologin}>
                  <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
                </a>
                <a onClick={tosignup}>
                  <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
                </a>
              </div>
            </div>
          )}
        </nav>
        {error_msg && (
          <div id="alert-4" class="brightness-110 animate-pulse brightness-1250 absolute right-2 bottom- z-20 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 " role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">
              Please fill the information in right format
            </div>
            <button type="button" onClick={() => (seterror_msg(false))} class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-800 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-4" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}

        {success_msg && (
          <div id="alert-3" class="h-14 px-4  pt-0 top-[50px] mt-16 right-[15%] w-[70%] brightness-110 absolute  bottom- z-20 animate-pulse flex items-center  px-4 mb- text-green-800 rounded-lg bg-green-50 " role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">
              Your message was sent successfully
            </div>
            <button type="button" onClick={() => setsuccess_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}


        <div className='pb- pt- mt-1'>
          <div style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }} className='shadow-black shadow-lg rounded-2xl bg-white xs:w-full md:w-max 2xl:w-[70%] sm:w-96 xl:w-max   pt-1 mt-7   mx-auto pt '>
            <div className='justify-center flex flex-row origin-center '>
              <div>
                {/* <img src={image} className='w-[100%] mb-10 opacity-90' /> */}
                <img src={image} className='absolute ml-5 w-[35%] h-[80%] mb-10 opacity-90' />
              </div>
              <div className='w-[180%] right-0'>
                <div className=' rounded-lg  bg-white ml-[500px]   pt-1 mt-10   mx-auto pt'>
                  <form className='justify-center origin-center '>
                    <h1 className='text-xl mt-5'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold   text-3xl text-blue-700'>Contact us</span></h1>

                    <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
                      <input
                        type='text'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setfname(e.target.value);
                          validateFname(e.target.value);
                          setfanme_changed(true);
                        }}
                        placeholder='First name'
                        value={fname}
                        className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                      </input>
                      {fname_changed && (
                        !isValidFname ?
                          (
                            <p className='text-red-500 text-sm absolute mt-[48px] ml-2'>First name is required</p>
                          )
                          :
                          (
                            !fname_format && (
                              <p className='text-red-500 text-sm absolute mt-[48px] ml-2'>First name should only contain alphabets</p>
                            )
                          )
                      )}
                      <input
                        type='text'
                        onBlur={handleBlur1}
                        onFocus={handleFocus1}
                        onChange={(e) => {
                          setlname(e.target.value);
                          validateLname(e.target.value);
                          setlanme_changed(true)
                        }}
                        placeholder='Last name' value={lname}
                        className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                      </input>
                      {lname_changed && (
                        !isValidLname ?
                          (
                            <p className='text-red-500 text-sm absolute mt-[117px] ml-2'>Last name is required</p>
                          )
                          :
                          (
                            !lname_format && (
                              <p className='text-red-500 text-sm absolute mt-[117px] ml-2'>Last name should only contain alphabets</p>
                            )
                          )
                      )}
                      <input
                        type='text'
                        onBlur={handleBlur3}
                        onFocus={handleFocus3}
                        onChange={(e) => {
                          setemail(e.target.value);
                          validateEmail(e.target.value);
                          setemail_changed(true);
                        }}
                        placeholder='E-mail'
                        value={email}
                        className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                      </input>
                      {email == "" && !submit && email_changed && (
                        <p className='text-red-500 text-sm absolute mt-[185px] ml-2'>Email required</p>
                      )}
                      {email != "" && !isValidEmail && !submit && email_changed && (
                        <p className='text-red-500 text-sm absolute mt-[185px] ml-2'>Please enter valid email address</p>
                      )}
                      <input
                        type='text'
                        onChange={(e) => {
                          setphone(e.target.value);
                          validatePhoneNumber(e.target.value);
                          setdate_changed(true)
                        }}
                        onBlur={handleBlur2}
                        onFocus={handleFocus2}
                        placeholder='Phone number'
                        value={phone}
                        className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                      </input>
                      {date_changed && !submit && (
                        phone == "" ?
                          (
                            <p className='text-red-500 text-sm absolute mt-[254px] ml-2'>Phone number is required</p>
                          )
                          :
                          (
                            !isValidPhoneNumber  && (
                              <p className='text-red-500 text-sm absolute mt-[254px] ml-2'>Invalid phone number</p>
                            )
                          )
                      )}
                      {/* {!isValidPhoneNumber && date_changed && (
                        <p className='text-red-500 text-sm absolute mt-[254px] ml-2'>Invalid Phone Number</p>
                      )} */}
                      <textarea type='text' 
                       onBlur={handleBlur4}
                       onFocus={handleFocus4}
                      onChange={(e) => (
                        setmsg(e.target.value),
                        setpasswd_changed(true)
                        )} 
                      placeholder='Message' 
                      value={msg} 
                      className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></textarea>

                      {msg == "" && !submit && passwd_changed && (
                        <p className='text-red-500 text-sm absolute mt-[345px] ml-2'>Message required</p>
                      )}
                      {/* <input type='text' placeholder='Full name' className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input> */}
                    </div>

                  </form>
                  <button onClick={handlesubmit} className='bg-gradient-to-tl font-sans  bg-blue-500 px-3 py-1 mb-10 rounded hover:scale-110  text-lg w-[70%] text-white outline outline-white'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='min-h-fit'>
                    <div  className='shadow-black shadow-2xl rounded-lg  bg-white xs:w-full md:w-96 2xl:w-96 sm:w-96 xl:w-96   pt-1 mt-10   mx-auto pt'>
                        <form className='justify-center origin-center '>
                            <h1 className='text-xl mt-5'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold  text-2xl text-black'>Contact us</span></h1>
                            
                                <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
                                     <input type='text'  onChange={(e) => (setfname(e.target.value))} placeholder='First name' value={fname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setlname(e.target.value))} placeholder='Last name' value={lname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setemail(e.target.value))} placeholder='E-mail' value={email} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <input type='text' onChange={(e) => (setphone(e.target.value))} placeholder='Phone number' value={phone} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></input>
                                     <textarea type='text' onChange={(e) => (setmsg(e.target.value))} placeholder='Message' value={msg} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'></textarea>
                                </div>
                            
                        </form>
                        <button onClick={handlesubmit} className='px-3 py-1 mb-5 rounded hover:scale-110 bg-gray-900 text-lg font-mono text-white outline outline-white'>Submit</button>
                    </div>
                </div> */}

      </div>
    </>
  )
}

export default Contact

{/* <div className='bg-[url("https://source.unsplash.com/1820x680/?code")] min-h-screen opacity-[85%]'>
<div className="p-5">
  <h1 className="text-2xl font-bold mb-4 text-white">About Us</h1>
  <p className='text-white'>
    Welcome to our website! We specialize in converting sign language into alphabetic letters based on the signs captured by the camera. Additionally, we provide the capability to translate text into sign language. Our goal is to bridge the communication gap between individuals who use sign language and those who communicate using written language.
  </p> 
</div>
 </div> */}