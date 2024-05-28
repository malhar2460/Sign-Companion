// import { React, useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom'

// import login from '../login1.jpg'
// import login from '../bg5.avif'
// import login from '../bg5.jpg'
import login from '../login4.jpg'
import logo from '../logo3.png'

import bg from '../bg.avif'
// import bg from '../assets/images/video-bg.jpg'



import Modal from './Modal'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion'
import moduleName from 'react-three-fiber'
import { useInView } from 'react-intersection-observer'
// import login from '../login1.jpg';

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const closed_eye = <FontAwesomeIcon icon={faSlash} />;
const Login = ({ onUserLogin }) => {
  const [error_msg, seterror_msg] = useState(false)
  const [success_msg, setsuccess_msg] = useState(false)
  const [already_msg, setalready_msg] = useState(false)
  const [passwd, setpasswd] = useState('');
  const [auth, setauth] = useState('');
  const navigate = useNavigate();
  const [uname, setusernam] = useState('');
  const location = useLocation();

  const [username, setusername] = useState('');
  const { user } = location.state || { user: 'notfound' }; // Get the user value from the state
  const { authent } = location.state || { authent: 'not' };

  const [isValidEmail, setIsValidEmail] = useState(true);

  // Get stored auth and user from localStorage during component initialization
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedUser = localStorage.getItem('user');
    if (storedAuth) {
      setauth(storedAuth);
      onUserLogin(storedUser);
      setusernam(storedUser);

    } else {
      setauth(authent);
      onUserLogin(user);
      setusernam(user);

    }
  }, [user, authent, onUserLogin]);

  const tosign = () => {
    navigate('/sign_text', { state: { user: uname, authent: auth } });
  };

  const tosignup = () => {
    navigate('/signup', { state: { user: uname, authent: auth } });
  };

  const tologin = () => {
    navigate('/login', { state: { user: uname, authent: auth } });
  };

  const tocontact = () => {
    navigate('/contactus', { state: { user: uname, authent: auth } });
  };
  const tohome = () => {
    navigate('/', { state: { user: uname, authent: auth } });
  }
  const toabout = () => {
    navigate('/aboutus', { state: { user: uname, authent: auth } });
  };

  const toadmin = () => {
    navigate('/admin', { state: { user: uname, authent: auth } });
  };

  const totext = () => {
    navigate('/text_sign', { state: { user: uname, authent: auth } });
  };

  const towelcome_admin = () => {
    navigate('/welcome_admin', { state: { user: uname, authent: auth } });
  };
  
  const towelcome = () => {
    navigate('/welcome', { state: { user: uname, authent: auth } });
  };

  const tospeech = () => {
    navigate('/speech', { state: { user: user, authent: authent } });
  }

  const handlelogout = () => {
    localStorage.setItem('auth', 'False');
    localStorage.setItem('user', 'notfound');
    setauth('False');
    setusernam('None');
  };

  const [submit, setsubmit] = useState(false)
  localStorage.setItem('admin',false)
  localStorage.setItem('user',false)

  const handlesubmit = () => {
    console.log("Username ", username, " Password", passwd);
    setsubmit(true)
    if (username == 'malhar@gmail.com' && passwd == 'admin@0105') {
      localStorage.setItem('admin',true)
      towelcome_admin()
      // toadmin()
    }
    else {
      axios
        .post('http://127.0.0.1:8000/login/', { 'username': username, 'passwd': passwd }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          setauth(response.data.auth);
          if (response.data.auth == 'False') {
            seterror_msg(true)
            // alert('Authorization Failed');
          }
          else if (response.data.auth === 'Email') {
            setalready_msg(true)
          }
          else {
            handle_success()
            // alert('Successful');

            setauth(response.data.auth);
            setusernam(response.data.id);
            localStorage.setItem('user',true)
            localStorage.setItem('user_name',response.data.fname)
            setusername('');
            setpasswd('');

            // Set the auth and user values in localStorage after successful login
            localStorage.setItem('auth', response.data.auth);
            localStorage.setItem('user', response.data.id);
            // window.self.location.reload()
            towelcome()
          }
          console.log(response.data.auth);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }

  const handle_success = () => {
    setsuccess_msg(true)
  }


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const control = useAnimation()
  const [ref, inview] = useInView({
    triggerOnce: false,
    threshold: 0.4
  })
  useEffect(() => {
    if (inview) {
      control.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, type: "tween" },
      });
    } else {
      control.start({
        opacity: 0,
        y: 50
      })
    }
  }, [control, inview])
  const [showPassword, setShowPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };


  //=================================== EMAIL ====================================
  const validateEmail = (username) => {
    const value = username.trim() !== ''
    setemail_req(!value)
    if (value) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
      setIsValidEmail(isValid);
    }
  };
  const [email_req, setemail_req] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const handleFocus3 = () => {
    setIsFocused3(true);
    const value = username.trim() !== ''
    // alert(value)
    setemail_req(!value)
    setIsValidEmail(username.trim() !== '');

  };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  //===============================================================================
  //=================================== Password ====================================
  const [isFocused4, setIsFocused4] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);
  const handleFocus4 = () => {
    setIsFocused4(true);
    setIsValidPass(passwd.trim() != '');

  };

  const handleBlur4 = () => {
    setIsFocused4(false);
  };

  //===============================================================================


  const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic for handling the forgot password functionality here
      console.log('Forgot password form submitted with email:', email);
      // You may want to send an API request to handle the forgot password process
      // After handling, close the modal
      onClose();
    };

    return (
      <div className={`modal ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      {/* <div className='bg-gradient-to-tr from-black via-blue-600 to-gray-400 min-h-screen' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
      <div className='bg-[#e9eaec] min-h-screen overflow-y-hidden overflow-x-hidden' >
        {/* <div className='bg-gradient-to-t from-purple-500 via-purple-400 via-5% to-white min-h-screen '> */}
        <nav className=' py-5 px-5 bg-white '>
          <div className='flex items-center justify-between'>
            <div>
              <button onClick={tohome} className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
            </div>
            <div className='hidden sm:flex lg:flex-row gap-7'>
              <a onClick={tosign}>
                <button className='text-black   text-lg '>Sign to Text</button>
              </a>
              {auth === 'True' && (
                <>
                  <a onClick={totext}>
                    <button className='text-black  text-lg rounded-md'>Text to Sign</button>
                  </a>
                  <a onClick={tospeech}>
                    <button className='text-black  text-lg rounded-md'>Speech to Sign</button>
                  </a>
                </>
              )}
              <a onClick={toabout}>
                <button className='text-black  text-lg rounded-md'>About us</button>
              </a>
              <a onClick={tocontact}>
                <button className='text-black  text-lg rounded-md'>Contact us</button>
              </a>
              {auth === 'True' ? (
                <>
                   <a onClick={tologin}>
                <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md'>Log out</button>
                {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
              </a>
                </>
              ):(
              <a onClick={tologin}>
                <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md'>Log in</button>
                {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
              </a>
              )}
              <a onClick={tosignup}>
                <button className='text-white px-3 py-1 text-lg rounded-md font-semibold border-2 border-blue-500 bg-blue-500'>Sign up</button>
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
                {auth === 'True' && (
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

        {success_msg && (
          <div id="alert-3" class="absolute h-14 px-4 mt-0 pt-0 top-14 w-[100%] right-2 bottom- z-20 animate-pulse flex items-center p- mb-4 text-green-800 rounded-lg bg-green-50 " role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">
              Login was successfully
            </div>
            <button type="button" onClick={() => setsuccess_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}

        <div className='pb-20 pt-10 scale-110 '>
          <div style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }} className='shadow-black shadow-sm rounded-2xl bg-white xs:w-full md:w-max 2xl:w-[50%] sm:w-96 xl:w-max   pt-1 mt-10   mx-auto pt '>
            <div className='justify-center flex flex-row origin-center '>
              <div className='ml-5'>
                {/* <img src={login} className='w-max h-full opacity-90' /> */}
                <img src={login} className='w-[150%] h-[80%] mt-5 opacity-100' />
              </div>
              <div className='w-[90%] justify-center'>
                {auth === 'True' ? (
                  <>
                    <button onClick={handlelogout} className='text-2xl my-[50%] text-white px-3 py-2 rounded-md font- border-2 shadow-black shadow-md border-blue-500 bg-blue-500 '>Log out</button>
                  </>
                ) : (
                  <>

                    <h1 className='text-xl mt-16'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded font-semibold  text-3xl text-blue-700'>Log in</span></h1>
                    {error_msg && (
                      <div id="alert-4" class="brightness-110 w-[90%] ml-7 z-20 animate-pulse h-14 px-4 mx-2 mt-2 pt-0 top-14 flex items-center p-  mb-4 text-blue-800  bg-blue-50 " role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div class="ms-3 text-sm font-medium">
                          Wrong Password
                        </div>
                        <button type="button" onClick={() => (seterror_msg(false))} class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-800 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-4" aria-label="Close">
                          <span class="sr-only">Close</span>
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {already_msg && (
                      <div id="alert-2" class=" w-[90%] ml-7 z-20 animate-pulse h-14 px-4 mx-2 mt-2 pt-0 top-14  flex items-center  mb-4 text-red-800 rounded-lg bg-red-50 " role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div class="ms-3 pr-8 text-sm font-medium">
                          User does not exists
                        </div>
                        <button type="button" onClick={() => setalready_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-2" aria-label="Close">
                          <span class="sr-only">Close</span>
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className={`flex flex-col mx-auto ${error_msg || already_msg || success_msg ? "mb-8" : "m-8"}   w-[70%]  content-center gap-5 `}>

                      <input type='text'
                        onBlur={handleBlur3}
                        onFocus={handleFocus3}
                        onChange={(e) => {
                          setusername(e.target.value);
                          validateEmail(e.target.value);
                        }}
                        //  onChange={(e) => (setusername(e.target.value))} 
                        placeholder='E-mail'
                        value={username}
                        className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700 `}></input>
                      { 
                      
                        email_req ?
                          (
                            <p className='text-red-500 text-sm absolute mt-[46px] ml-2'>Email is required</p>
                          )
                          :
                          (
                            !isValidEmail && (
                              <p className='text-red-500 text-sm absolute mt-[46px] ml-2'>Please enter valid email address</p>
                            )
                          )
                    
                      }
                      {/* {!isValidEmail && isFocused3 && (
                        <p className='text-red-500 text-sm absolute mt-[50px] ml-2'>Invalid Email</p>
                      )} */}
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          onBlur={handleBlur4}
                          onFocus={handleFocus4}
                          onChange={(e) => {
                            setpasswd(e.target.value);
                            setIsValidPass(e.target.value.trim() !== '');
                          }}
                          // onChange={(e) => setpasswd(e.target.value)}
                          placeholder='Password'
                          value={passwd}
                          className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md focus:outline focus:outline-2 focus:outline-blue-700 `}
                        />
                        {!isValidPass  && (
                          <p className='text-red-500 text-sm  absolute mt- ml-2'>Password required</p>
                        )}
                        <div className=''>
                          <i
                            // className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer "
                            className={`absolute transform -translate-y-1/2 right-3 cursor-pointer top-1/2`}
                            style={{ fontSize: '1.2rem', marginBottom: submit ? '400px' : '0px' }}
                            onClick={togglePasswordVisiblity}
                          // style={{ fontSize: '1.2rem' }}
                          >
                            <i
                              style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0', cursor: 'pointer' }}
                            >
                              {eye}
                            </i>
                            <i
                              style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                right: '0',
                                cursor: 'pointer',
                                display: showPassword ? 'none' : 'inline',
                              }}
                            >
                              {closed_eye}
                            </i>
                          </i>
                        </div>
                      </div>


                      {/* <button className='text-blue-600 text-left ml-3'>Forgot password?</button> */}

                      {/* =======================FORGOT PASSWORD======================= */}
                      <Modal />
                      {/* ==========================================================--- */}

                      <button onClick={handlesubmit} className='w-[100%] font-sans   bg-blue-500 px-2 py-1 mb-  self-center rounded hover:scale-110 text-white text-lg '>Submit</button>
                      {/* <button onClick={tosignup} className=''>Submit</button> */}



                      <p className='mb-8'>Don't have an account? <button onClick={tosignup} className='text-blue-600'>Sign up</button></p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

