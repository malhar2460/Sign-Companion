// // import { React, useState, useEffect } from 'react'
// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import axios from 'axios'
// // import bg from '../bg.avif'
// // import sign1 from '../signup.jpg'
// // import { motion, useAnimation } from 'framer-motion'
// // import { useInView } from 'react-intersection-observer'
// // import logo from '../logo3.png'
// // import sign2 from '../signup2.png'
// // import sign3 from '../Mobile login-amico.svg'
// // const Signup = () => {
// //   const [fname, setfname] = useState('')
// //   const [lname, setlname] = useState('')
// //   const [date, setdate] = useState('')
// //   const [passwd, setpasswd] = useState('')
// //   // const [passwdr, setpasswdr] = useState('')
// //   const [email, setemail] = useState('')
// //   const [auth, setauth] = useState('')

// //   const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// //   const location = useLocation()
// //   const navigate = useNavigate()
// //   const { authent } = location.state || { authent: 'not' };
// //   const { user } = location.state || { user: 'notfound' }; // Get the user value from the state

// //   const tosign = () => {
// //     navigate('/', { state: { user: user, authent: authent } });
// //   }


// //   const tocontact = () => {
// //     navigate('/contactus', { state: { user: user, authent: authent } });
// //   }

// //   const toabout = () => {
// //     navigate('/aboutus', { state: { user: user, authent: authent } });
// //   }


// //   const tologin = () => {
// //     console.log(authent, location.state.user)
// //     navigate('/login', { state: { user: user, authent: authent } });
// //   }


// //   const tospeech = () => {
// //     navigate('/speech', { state: { user: user, authent: authent } });
// //   }

// //   const totext = () => {
// //     navigate('/text_sign', { state: { user: user, authent: authent } });
// //   }
// //   const tosignup = () => {
// //     navigate('/signup', { state: { user: user, authent: authent } });
// //   }


// //   const handlesubmit = () => {
// //     console.log("fname", fname, 'lname', lname, "\nPasswd", passwd, "\nemail", email)
// //     if (fname == '' || date == '' || lname == '' || passwd == '' || email == '') {
// //       // alert('field was empty')
// //     }
// //     else {
// //       if (!isValidEmail) {
// //         alert('Invalid email format');
// //         return;
// //       }
// //       else {
// //         // if (passwd.localeCompare(passwdr) == 0) {
// //         axios
// //           .post('http://127.0.0.1:8000/signup/', { 'fname': fname, 'lname': lname, 'date': date, 'passwd': passwd, 'email': email }, { headers: { 'Content-Type': 'application/json' } })
// //           .then((response) => {
// //             setauth(response.data.auth)
// //             if (response.data.auth === 'False') {
// //               alert('The user already exists')
// //             }
// //             else {
// //               alert('Successfull')
// //               setfname('')
// //               setlname('')
// //               setdate('')
// //               setpasswd('')
// //               // setpasswdr('')
// //               setemail('')
// //             }
// //             console.log(response.data.state)
// //           })
// //           .catch((error) => {
// //             console.error(error)
// //           })
// //         // }
// //         // else {
// //         //   alert('Confirm password was not the same')
// //         // }
// //       }
// //     }
// //   }


// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   const toggleDropdown = () => {
// //     setIsDropdownOpen(!isDropdownOpen);
// //   }

// //   const control = useAnimation()
// //   const [ref, inview] = useInView({
// //     triggerOnce: false,
// //     threshold: 0.4
// //   })
// //   useEffect(() => {
// //     if (inview) {
// //       control.start({
// //         opacity: 1,
// //         y: 0,
// //         transition: { duration: 0.7, type: "tween" },
// //       });
// //     } else {
// //       control.start({
// //         opacity: 0,
// //         y: 50
// //       })
// //     }
// //   }, [control, inview])


// //   return (
// //     <>
// //       {/* <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen'>
// //             <nav className='bg-black py-5 min-w-max px-5'>
// //            For Large 
// //           <div className='flex items-center justify-between'>
// //             <div className=''>
// //               <button className='text-white lg:text-xl md:text-base sm:text-sm '>logo</button>
// //             </div>
// //             <div className=' lg:text-md md:text-base sm:text-sm flex lg:flex-row sm:flex-wrap lg:gap-7 md:gap-4 sm:gap-3'>
// //               <a  onClick={tosign}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Sign to Text</button></a>
// //               <a onClick={totext}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Text to Sign</button></a>
// //               <a onClick={toabout}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>About us</button></a>
// //             <a  onClick={tocontact}><button className='text-white outline outline-white outline-2 px-2 py-1 rounded-md shadow-md  shadow-white hover:scale-110 hover:delay-75'>Contact us</button></a>
// //               <Link to="/login" onClick={tologin}><button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md  shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button></Link>
// //               <Link to="/signup"><button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md  shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600'>Sign up</button></Link>
// //             </div>
// //           </div>
// //         </nav>
// //                 <div className='min-h-screen min-w-full  '>
// //                     <div className='outline outline-black bg-black  w-96 pt-1 mt-10 object-center align-middle  mx-auto pt'>
// //                         <form className=''>
// //                             <h1 className='text-xl mt-5'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rouded rounded-lg outline outline-white text-white'>Sign up</span></h1>
// //                             <div>
// //                             <div className='grid grid-cols-2 mt-8 pr-12'>
// //                                 <div className='text-right pr-3 pl-0'>
// //                                     <lable className='text-white'>Username :</lable>
// //                                 </div>
// //                                 <div>
// //                                 <input required type='text' name='username' onChange={(e) => { setusername(e.target.value) }} className=' text-black outline outline-2 outline-black focus:outline-2 focus:outline-black '></input><br/><br/>
// //                                 </div>
// //                                 <div className='text-right pr-3'>
// //                                     <lable className='text-white'>Password : </lable><br></br>
// //                                 </div>
// //                                 <div>
// //                                     <input type='password' name='passwd' onChange={(e) => { setpasswd(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
// //                                 </div>
// //                                 <div className='text-right pr-3'>
// //                                     <lable className='text-white'>Confirm-password : </lable><br></br>
// //                                 </div>
// //                                 <div>
// //                                     <input type='password' name='passwd' onChange={(e) => { setpasswdr(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
// //                                 </div>
// //                                 <div className='text-right pr-3'>
// //                                     <lable className='text-white'>E-mail : </lable><br></br>
// //                                 </div>
// //                                 <div className=''>
// //                                 <input type='text' name='passwd' onChange={(e) => { setemail(e.target.value) }} className=' text-black outline outline-2 outline-black'></input><br/><br/>
// //                                 </div>
// //                             </div>
// //                             </div>
// //                         </form>
// //                         <button onClick={handlesubmit} className='px-2 py-1 mb-5 rounded hover:scale-90 bg-black text-white outline outline-white'>Submit</button>
// //                     </div>
// //                 </div>
// //             </div> */}
// //       <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
// //         {/* <div className=' min-h-fit'> */}
// //         <nav className=' py-5 px-5   '>
// //           <div className='flex items-center justify-between'>
// //             <div>
// //               <button className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
// //             </div>
// //             <div className='hidden sm:flex lg:flex-row gap-7'>
// //               <a onClick={tosign}>
// //                 <button className='text-black    text-lg '>Sign to Text</button>
// //               </a>
// //               {authent === 'True' && (
// //                 <>
// //                   <a onClick={totext}>
// //                     <button className='text-black  text-lg rounded-md'>Text to Sign</button>
// //                   </a>
// //                   <a onClick={tospeech}>
// //                     <button className='text-black  text-lg '>Speech to Sign</button>
// //                   </a>
// //                 </>
// //               )}
// //               <a onClick={toabout}>
// //                 <button className='text-black  text-lg'>About us</button>
// //               </a>
// //               <a onClick={tocontact}>
// //                 <button className='text-black  text-lg '>Contact us</button>
// //               </a>
// //               <a onClick={tologin}>
// //                 <button className='text-black    text-lg rounded-md '>Log in</button>
// //               </a>
// //               <a onClick={tosignup}>
// //                 <button className='text-black  text-lg  border-b-2  border-black '>Sign up</button>
// //               </a>
// //             </div>
// //             <div className='sm:hidden'>
// //               <button
// //                 className='text-white  text-lg rounded-md'
// //                 onClick={toggleDropdown}
// //               >
// //                 Menu
// //               </button>
// //             </div>
// //           </div>
// //           {isDropdownOpen && (
// //             <div className='sm:hidden md:hidden mt-4 '>
// //               <div className='flex flex-col gap-2'>
// //                 <a onClick={tosign}>
// //                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Sign to Text</button>
// //                 </a>
// //                 <a onClick={toabout}>
// //                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>About us</button>
// //                 </a>
// //                 {authent === 'True' && (
// //                   <>
// //                     <a onClick={totext}>
// //                       <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
// //                     </a>
// //                     <a onClick={tospeech}>
// //                       <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Speech to Sign</button>
// //                     </a>
// //                   </>
// //                 )}
// //                 <a onClick={tocontact}>
// //                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
// //                 </a>
// //                 <a onClick={tologin}>
// //                   <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
// //                 </a>
// //                 <a onClick={tosignup}>
// //                   <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
// //                 </a>
// //               </div>
// //             </div>
// //           )}
// //         </nav>
// //         <div className='pb-[50px]'>
// //           <div className='outline outline-black rounded-2xl bg-white xs:w-full md:w-full 2xl:w-[50%] sm:w-full xl:w-full pt-1 mt-10   mx-auto '>
// //             <div className='flex flex-row shadow-lg shadow-black'>
// //               <div className='w-screen'>
// //                 <h1 className='text-xl mt-16'><span className='shadow-md shadow-white pt-1 pb-2 px-1 rounded  font-semibold text-3xl text-black'>Sign up</span></h1>

// //                 <form>
// //                   <div className='flex flex-col gap-5 mx-auto my-8  w-[70%]  content-center'>
// //                     <input name='fname' onChange={(e) => { setfname(e.target.value) }} type='text' placeholder='First name' value={fname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700' required></input>
// //                     <input type='text' name='lname' onChange={(e) => { setlname(e.target.value) }} placeholder='Last name' value={lname} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700' required></input>
// //                     <input type='password' name='passwd' onChange={(e) => { setpasswd(e.target.value) }} placeholder='Password' value={passwd} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700' required></input>
// //                     {/* <input type='password' name='passwd' onChange={(e) => { setpasswdr(e.target.value) }} placeholder='Confirm-password' value={passwdr} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'required></input> */}
// //                     <input type='date' name='date' onChange={(e) => { setdate(e.target.value) }} placeholder='Date of birth' value={date} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700' required></input>
// //                     <input name='passwd' onChange={(e) => { setemail(e.target.value) }} type='text' placeholder='E-mail' value={email} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700' required></input>
// //                     <button type='submit' onClick={handlesubmit} className='px-2 py-1 mb-5 w-20 justify-center self-center rounded hover:scale-110 bg-gray-900 text-lg font-serif text-white outline outline-white bg-gradient-to-tl from-purple-950 to-purple-500'>Submit</button>
// //                   </div>
// //                 </form>
// //               </div>
// //               <div>
// //                 <img src={sign3} className='mr-96 w-full h-full  scale-[120%] ' />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// // export default Signup

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import bg from '../bg.avif';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import logo from '../logo3.png';
// import sign3 from 'D:/Desktop/Python/facerecognition/backend/templates/frontend/src/signup3.avif';

// const Signup = () => {
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [date, setDate] = useState('');
//   const [passwd, setPasswd] = useState('');
//   const [email, setEmail] = useState('');
//   const [auth, setAuth] = useState('');  
//   const [isValidEmail, setIsValidEmail] = useState(true);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { authent } = location.state || { authent: 'not' };
//   const { user } = location.state || { user: 'notfound' }; // Get the user value from the state



//     const tosign = () => {
//     navigate('/', { state: { user: user, authent: authent } });
//   }


//   const tocontact = () => {
//     navigate('/contactus', { state: { user: user, authent: authent } });
//   }

//   const toabout = () => {
//     navigate('/aboutus', { state: { user: user, authent: authent } });
//   }


//   const tologin = () => {
//     console.log(authent, location.state.user)
//     navigate('/login', { state: { user: user, authent: authent } });
//   }


//   const tospeech = () => {
//     navigate('/speech', { state: { user: user, authent: authent } });
//   }

//   const totext = () => {
//     navigate('/text_sign', { state: { user: user, authent: authent } });
//   }
//   const tosignup = () => {
//     navigate('/signup', { state: { user: user, authent: authent } });
//   }

//   const [submit,setsubmit] = useState(false)

//   const handlesubmit = () => {
//     setsubmit(true)
//     console.log('fname', fname, 'lname', lname, '\nPasswd', passwd, '\nemail', email);
//     if (fname === '' || date === '' || lname === '' || passwd === '' || email === '') {
//       // alert('All fields are required');
//     } else if (!isValidEmail) {
//       alert('Invalid email format');
//     } else {
//       axios
//         .post('http://127.0.0.1:8000/signup/', { fname, lname, date, passwd, email }, { headers: { 'Content-Type': 'application/json' } })
//         .then((response) => {
//           setAuth(response.data.auth);
//           if (response.data.auth === 'False') {
//             alert('The user already exists');
//           } else {
//             alert('Successfully signed up');
//             setFname('');
//             setLname('');
//             setDate('');
//             setPasswd('');
//             setEmail('');
//           }
//           console.log(response.data.state);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   };
//   const [isValidFname, setIsValidFname] = useState(false);
//   const [isValidLname, setIsValidLname] = useState(false);
//   const [isValidPass, setIsValidPass] = useState(false);
//   const [isValidDate, setIsValidDate] = useState(false);

//   const validateEmail = (email) => {
//     const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     setIsValidEmail(isValid);
//   };
//   const validatefname = (fname) => {
//     if(fname == '')
//     {setIsValidFname(false)}
//     else 
//     {setIsValidFname(true)}
//   };
//   const validatelname = (lname) => {
//     if(lname == '')
//     {setIsValidLname(false)}
//     else 
//     {setIsValidLname(true)}
//   };
//   const validatepass = (passwd) => {
//     if(passwd == '')
//     {setIsValidPass(false)}
//     else 
//     {setIsValidPass(true)}
//   };
//   const validatedate = (date) => {
//     const today = new Date();
//     const inputDate = new Date(date);

//     if (date === '') {
//         setIsValidDate(false);
//     } else if (inputDate > today) {
//         setIsValidDate(false);
//     } else {
//         setIsValidDate(true);
//     }
// };


//   // Add this useEffect to trigger email validation on each email change
//   useEffect(() => {
//       validateEmail(email);
//   }, [email]);
//   useEffect(() => {

//       validatefname(fname);

//   }, [fname]);
//   useEffect(() => {
//     validatelname(lname);
//   }, [lname]);
//   useEffect(() => {
//     validatepass(passwd);
//   }, [passwd]);
//   useEffect(() => {
//     validatedate(date);
//   }, [date]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const control = useAnimation();
//   const [ref, inview] = useInView({
//     triggerOnce: false,
//     threshold: 0.4,
//   });
//   useEffect(() => {
//     if (inview) {
//       control.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.7, type: 'tween' },
//       });
//     } else {
//       control.start({
//         opacity: 0,
//         y: 50,
//       });
//     }
//   }, [control, inview]);

//   return (
//     <>
//       <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//         <nav className=' py-5 px-5   '>
//           <div className='flex items-center justify-between'>
//             <div>
//               <button className='absolute top-3'>
//                 <img src={logo} className='h-8 w-52'></img>
//               </button>
//             </div>
//             <div className='hidden sm:flex lg:flex-row gap-7'>
//               <a onClick={tosign}>
//                 <button className='text-black    text-lg '>Sign to Text</button>
//               </a>
//               {authent === 'True' && (
//                 <>
//                   <a onClick={totext}>
//                     <button className='text-black  text-lg rounded-md'>Text to Sign</button>
//                   </a>
//                   <a onClick={tospeech}>
//                     <button className='text-black  text-lg rounded-md'>Speech to Sign</button>
//                   </a>
//                 </>
//               )}
//               <a onClick={toabout}>
//                 <button className='text-black  text-lg'>About us</button>
//               </a>
//               <a onClick={tocontact}>
//                 <button className='text-black  text-lg '>Contact us</button>
//               </a>
//               <a onClick={tologin}>
//                 <button className='text-black    text-lg rounded-md '>Log in</button>
//               </a>
//               <a onClick={tosignup}>
//                 <button className='text-black  text-lg  border-b-2  border-black '>Sign up</button>
//               </a>
//             </div>
//             <div className='sm:hidden'>
//               <button className='text-white  text-lg rounded-md' onClick={toggleDropdown}>
//                 Menu
//               </button>
//             </div>
//           </div>
//           {isDropdownOpen && (
//             <div className='sm:hidden md:hidden mt-4 '>
//               <div className='flex flex-col gap-2'>
//                 <a onClick={tosign}>
//                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Sign to Text</button>
//                 </a>
//                 <a onClick={toabout}>
//                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>About us</button>
//                 </a>
//                 <a onClick={totext}>
//                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
//                 </a>
//                 <a onClick={tospeech}>
//                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Speech to Sign</button>
//                 </a>
//                 <a onClick={tocontact}>
//                   <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Contact us</button>
//                 </a>
//                 <a onClick={tologin}>
//                   <button className='text-white outline outline-blue-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-blue-600 hover:scale-110 hover:delay-75 bg-blue-600'>Log in</button>
//                 </a>
//                 <a onClick={tosignup}>
//                   <button className='text-white outline outline-green-600 outline-2 px-2 py-1 rounded-md shadow-md shadow-green-600 hover:scale-110 hover:delay-75 bg-green-600 '>Sign up</button>
//                 </a>
//               </div>
//             </div>
//           )}
//         </nav>
//         <div className='pb-[50px] mt-'>
//           <div style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)' }} className=' rounded-2xl bg-white xs:w-full md:w-full 2xl:w-[50%] sm:w-full xl:w-full pt-1 mt-8   mx-auto '>
//             <div  className='flex flex-row '>
//               <div className='w-screen'>
//                 <h1 className='text-xl mt-10'>
//                   <span className='shadow-md  shadow-white pb-2 px-1 rounded  font-semibold text-3xl text-purple-700'>Sign up</span>
//                 </h1>

//                 {/* <form> */}
//                   {/* <div className='flex flex-col gap-5 mx-auto my-8  w-[80%]  content-center'> */}
//                   <div className={`flex flex-col gap-5 mx-auto my-8  w-[80%]  content-center ${isValidFname ? '' : 'gap-1'} ${isValidLname ? '' : 'gap-1'} ${isValidPass ? '' : 'gap-1.5'} ${isValidDate ? '' : 'gap-1.5'}`}>
//                     <input
//                       name='fname'
//                       onChange={(e) => {
//                         setFname(e.target.value);
//                       }}
//                       type='text'
//                       placeholder='First name'
//                       value={fname}
//                       className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 `}
//                       required
//                     ></input>
//                     {!isValidFname && submit && (
//                       <p className='text-red-500 text-sm '>Invalid First name</p>
//                     )}
//                     <input
//                       type='text'
//                       name='lname'
//                       onChange={(e) => {
//                         setLname(e.target.value);
//                       }}
//                       placeholder='Last name'
//                       value={lname}
//                       className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  gap-5 focus:outline focus:outline-2 focus:outline-blue-700 `}
//                       required
//                     ></input>
//                        {!isValidLname && submit && (
//                       <p className='text-red-500 text-sm '>Invalid Last name</p>
//                     )}
//                     <input
//                       type='password'
//                       name='passwd'
//                       onChange={(e) => {
//                         setPasswd(e.target.value);
//                       }}
//                       placeholder='Password'
//                       value={passwd}
//                       className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  gap-5 focus:outline focus:outline-2 focus:outline-blue-700 `}
//                       required
//                     ></input>
//                      {!isValidPass && submit && (
//                       <p className='text-red-500 text-sm '>Invalid Password</p>
//                     )}
//                     {/* <input type='password' name='passwd' onChange={(e) => { setpasswdr(e.target.value) }} placeholder='Confirm-password' value={passwdr} className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'required></input> */}
//                     <input
//                       type='date'
//                       name='date'
//                       onChange={(e) => {
//                         setDate(e.target.value);
//                       }}
//                       placeholder='Date of birth'
//                       value={date}
//                       className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  gap-5 focus:outline focus:outline-2 focus:outline-blue-700 `}
//                       required
//                     ></input>
//                      {!isValidDate && submit && (
//                       <p className='text-red-500 text-sm '>Invalid Date</p>
//                     )}
//                     <input
//                       name='passwd'
//                       onChange={(e) => {
//                         setEmail(e.target.value);
//                       }}
//                       type='text'
//                       placeholder='E-mail'
//                       value={email}
//                       className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  gap-5 focus:outline focus:outline-2 focus:outline-blue-700 `}
//                       required
//                     ></input>
//                     {!isValidEmail && submit && (
//                       <p className='text-red-500 text-sm'>Invalid email format</p>
//                     )}
//                       <p  className=''>Already have an account? <button onClick={tologin} className='text-blue-600'>Log in</button></p>
//                     <button
//                       type='submit'
//                       onClick={handlesubmit}
//                       className='px-2 py-1 mt- w-[100%]  justify-center self-center rounded hover:scale-110 bg-gray-900 text-lg font-serif text-white outline outline-white bg-gradient-to-tl from-purple-950 to-purple-500'
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 {/* </form> */}
//               </div>
//               <div className='mr-5'>
//                 <img src={sign3} className='mr-9 w-screen h-full opacity-90' />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../bg.avif';
import logo from '../logo3.png';
// import sign3 from 'D:/Desktop/Python/facerecognition/backend/templates/frontend/src/signup3.avif';
import sign3 from '../signup5.avif';

const Signup = () => {
  const [error_msg, seterror_msg] = useState(false)
  const [success_msg, setsuccess_msg] = useState(false)
  const [already_msg, setalready_msg] = useState(false)
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [date, setDate] = useState('');
  const [passwd, setPasswd] = useState('');
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLname, setIsValidLname] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  const [inputType, setInputType] = useState('text');
  const location = useLocation();
  const navigate = useNavigate();
  const { authent } = location.state || { authent: 'not' };
  const { user } = location.state || { user: 'notfound' };

  const tosign = () => {
    navigate('/sign_text', { state: { user: user, authent: authent } });
  };

  const tocontact = () => {
    navigate('/contactus', { state: { user: user, authent: authent } });
  };
  const tohome = () => {
    navigate('/', { state: { user: user, authent: authent } });
  }
  const toabout = () => {
    navigate('/aboutus', { state: { user: user, authent: authent } });
  };

  const tologin = () => {
    navigate('/login', { state: { user: user, authent: authent } });
  };

  const tospeech = () => {
    navigate('/speech', { state: { user: user, authent: authent } });
  };

  const totext = () => {
    navigate('/text_sign', { state: { user: user, authent: authent } });
  };

  const tosignup = () => {
    navigate('/signup', { state: { user: user, authent: authent } });
  };

  const handlesubmit = () => {
    setSubmit(true);
    if (!isValidEmail || !isValidFname || !isValidLname || !isValidDate || !isValidPass) {
      seterror_msg(true)
    }
    else {
      axios
        .post('http://127.0.0.1:8000/signup/', { fname, lname, date, passwd, email }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          if (response.data.auth == 'False') {
            setalready_msg(true)
          }
          else {
            setsuccess_msg(true)
            localStorage.setItem('user_name',fname)
            setFname("")
            setLname("")
            setEmail("")
            setPasswd("")
            setDate("")
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValid);
  };

  // useEffect(() => {
  //   if (submit) {
  //     setIsValidFname(fname.trim() !== '');
  //     setIsValidLname(lname.trim() !== '');
  //     setIsValidPass(passwd.trim() != '');
  //     setIsValidDate(date.trim() !== '');
  //     validateEmail(email);
  //   }
  // }, [submit, fname, lname, passwd, date, email]);

  //=================================== Fname ====================================
  const [isFocused, setIsFocused] = useState(false);
  const [fname_format, setfname_format] = useState(false);
  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  const handleBlur = () => {
    setIsFocused(false);

  };
  const validateFname = (val) => {
    const inputVal = val.trim(); // Trim the input value to remove leading and trailing spaces
    setFname(inputVal);

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
  // const handleFocus1 = () => {
  //   setIsFocused1(true);
  // };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const validateLname = (val) => {
    const inputVal = val.trim(); // Trim the input value to remove leading and trailing spaces
    setLname(inputVal);

    // Check if the input contains only alphabetical characters
    const isValidInput = /^[a-zA-Z]+$/.test(inputVal);

    // Check if the input is not empty
    const isNotEmpty = inputVal !== '';

    // Update isValidLname state based on validations
    setIsValidLname(isNotEmpty);
    setlname_format(isValidInput);
  }


  //===============================================================================

  //=================================== date ====================================
  const validateDate = (dateString) => {
    // Convert the input string to a Date object
    const inputDate = new Date(dateString);
    // Get the current date
    const currentDate = new Date();
    // Calculate the minimum age (e.g., 18 years)
    const minimumAge = 100;
    // Calculate the minimum date of birth
    const minimumDOB = new Date(currentDate.getFullYear() - minimumAge, currentDate.getMonth(), currentDate.getDate());

    // Check if the input date is a valid date and is not in the future
    if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
      return false;
    }

    // Check if the input date is within the acceptable range
    if (inputDate < minimumDOB) {
      return false;
    }

    return true;
  };
  const [isFocused2, setIsFocused2] = useState(false);
  // const handleFocus2 = () => {
  //   setIsFocused2(true);
  //   setIsValidDate(validateDate(date.trim()));

  // };

  const handleBlur2 = () => {
    setIsFocused2(false);
    setInputType('text');
  };

  // Function to handle input change
  const handleChange2 = (e) => {
    setdate_changed(true)
    const inputVal = e.target.value;
    setDate(inputVal);
    setIsValidDate(inputVal.trim() !== '');
  };
  //===============================================================================

  //=================================== EMAIL ====================================
  const [isFocused3, setIsFocused3] = useState(false);
  // const handleFocus3 = () => {
  //   setIsFocused3(true);
  //   setIsValidEmail(email.trim() !== '');

  // };

  const handleBlur3 = () => {
    setIsFocused3(false);
  };

  // Function to handle input change
  const handleChange3 = (e) => {
    const inputVal = e.target.value;
    setEmail(inputVal);
    setIsValidEmail(inputVal.trim() !== '');
  };
  //===============================================================================


  //=================================== Password ====================================
  const [isFocused4, setIsFocused4] = useState(false);
  // const handleFocus4 = () => {
  //   setIsFocused4(true);
  //   setIsValidPass(passwd.trim() != '');

  // };

  // const handleBlur4 = () => {
  //   setIsFocused4(false);
  // };

  // // Function to handle input change
  // const handleChange4 = (e) => {
  //   const inputVal = e.target.value;
  //   setEmail(inputVal);
  //   setIsValidPass(inputVal.trim() != '');
  // };
  //===============================================================================


  const handleFocus = () => {
    setIsFocused(true);
    setIsValidFname(fname.trim() !== ''); // Trigger validation for first name when it gains focus
  };

  const handleFocus1 = () => {
    setIsFocused1(true);
    setIsValidLname(lname.trim() !== ''); // Trigger validation for last name when it gains focus
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
    setInputType('date');
    setIsValidDate(validateDate(date.trim())); // Trigger validation for date when it gains focus
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
    setIsValidEmail(email.trim() !== ''); // Trigger validation for email when it gains focus
  };
  // const handleFocus4 = () => {
  //   setIsFocused4(true);
  //   setIsValidPass(validatePassword(passwd.trim())); // Trigger validation for password when it gains focus
  // };

  const validatePassword = (password) => {
    const hasCharacter = /[a-zA-Z]/.test(password); // Check if the password contains at least one character
    const hasDigit = /\d/.test(password); // Check if the password contains at least one digit
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check if the password contains at least one special character

    // Return true if all conditions are met
    return hasCharacter && hasDigit && hasSpecialChar;
  };



  const [fname_changed, setfanme_changed] = useState(false)
  const [lname_changed, setlanme_changed] = useState(false)
  const [passwd_changed, setpasswd_changed] = useState(false)
  const [date_changed, setdate_changed] = useState(false)
  const [email_changed, setemail_changed] = useState(false)
  const hasRequiredChars = (password) => {
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
    return hasAlphabet && hasDigit && hasSpecialChar && password.length >= 8;
  };
  
  const handleFocus4 = () => {
    setIsFocused4(true);
    setIsValidPass(passwd.trim() !== ''); // Trigger validation for password when it gains focus
  };
  
  const handleBlur4 = () => {
    setIsFocused4(false);
  };
  
  const handleChange4 = (e) => {
    const inputVal = e.target.value;
    setPasswd(inputVal);
    setIsValidPass(inputVal.trim() !== '' && inputVal.length >= 8);
    setpasswd_changed(true);
  };




  return (
    <>
      {/* <div className=' bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
      {/* <div className='bg-gradient-to-tr from-black via-green-600 to-gray-500 min-h-screen' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
        <div className='bg-[#F3F5FC]'>
        <nav className=' py-5 px-5 bg-white'>
          <div className='flex items-center justify-between '>
            <div>
              <button onClick={tohome} className='absolute top-3'>
                <img src={logo} className='h-8 w-52 '></img>
              </button>
            </div>
            <div className='hidden sm:flex lg:flex-row gap-7'>
              <a onClick={tosign}>
                <button className='text-black    text-lg  '>Sign to Text</button>
                {/* <button className='text-[#6E778C]    text-xl  '>Sign to Text</button> */}
              </a>
              {authent === 'True' && (
                <>
                  <a onClick={totext}>
                    <button className='text-black    text-lg  rounded-md'>Text to Sign</button>
                    {/* <button className='text-[#6E778C]  text-xl  rounded-md'>Text to Sign</button> */}
                  </a>
                  <a onClick={tospeech}>
                    <button className='text-black    text-lg  rounded-md'>Speech to Sign</button>
                    {/* <button className='text-[#6E778C]  text-xl  rounded-md'>Speech to Sign</button> */}
                  </a>
                </>
              )}
              <a onClick={toabout}>
                <button className='text-black    text-lg '>About us</button>
                {/* <button className='text-[#6E778C]  text-xl '>About us</button> */}
              </a>
              <a onClick={tocontact}>
                <button className='text-black    text-lg  '>Contact us</button>
                {/* <button className='text-[#6E778C]  text-xl  '>Contact us</button> */}
              </a>
              {authent === 'True' ? (
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
                <button className='text-white px-3 py-1 text-lg rounded-md font-semibold border-2 border-blue-500 bg-blue-500 '>Sign up</button>
                {/* <button className='text-[#6E778C]  text-xl      '>Sign up</button> */}
              </a>
            </div>
            <div className='sm:hidden'>
              <button className='text-white  text-lg rounded-md' onClick={toggleDropdown}>
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
                <a onClick={totext}>
                  <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
                </a>
                <a onClick={tospeech}>
                  <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Speech to Sign</button>
                </a>
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
          <div id="alert-4" class="brightness-110 animate-pulse flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 " role="alert">
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
          <div id="alert-3" class="animate-pulse flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 " role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">
              New account has been created successfully
            </div>
            <button type="button" onClick={() => setsuccess_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}

        {already_msg && (
          <div id="alert-2" class="animate-pulse flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 " role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div class="ms-3 text-sm font-medium">
              User already exists
            </div>
            <button type="button" onClick={() => setalready_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-2" aria-label="Close">
              <span class="sr-only">Close</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}


        <div className='pb-[0px] top-0 mx-auto scale-90'>
          {/* <div style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)' }} className=' rounded-2xl bg-white w-[70%] pt-1 mt-8 mx-auto'> */}
          <div style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)' }} className=' rounded-2xl bg-white w-[60%] h-[6%] pt- mt-4 mx-auto'>
            <div className='flex flex-row '>
              <div className='w-screen'>
                <h1 className='text-xl mt-10'>
                  <span className='shadow-md  shadow-white pb-2 px-1 rounded font-semibold text-4xl text-blue-700'>Sign up</span>
                </h1>
                <div className={`flex flex-col mx-auto my-8 w-[80%] content-center gap-6`}>
                  <input
                    name='fname'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFname(e.target.value);
                      validateFname(e.target.value);
                      setfanme_changed(true)
                    }}
                    type='text'
                    placeholder='First name'
                    value={fname}
                    className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 ${(!isValidFname && !isFocused) && 'border-red-500'}`}
                    required
                  />
                  {/* {!isValidFname && isFocused && (
                    <p className='text-red-500 text-sm absolute mt-[55px] ml-2'>First name is required</p>
                  )} */}
                  {
                    !isValidFname && fname_changed ?
                      (
                        <p className='text-red-500 text-sm absolute mt-[49px] ml-2'>First name is required</p>
                      )
                      :
                      (
                        !fname_format && fname_changed && (
                          <p className='text-red-500 text-sm absolute mt-[49px] ml-2'>First name should only contain alphabets</p>
                        )
                      )
                  }
                  <input
                    type='text'
                    name='lname'
                    onBlur={handleBlur1}
                    onFocus={handleFocus1}
                    onChange={(e) => {
                      setLname(e.target.value);
                      validateLname(e.target.value);
                      setlanme_changed(true)
                    }}
                    placeholder='Last name'
                    value={lname}
                    className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 ${(!isValidLname && submit) || (!isValidLname && lname !== '') && 'border-red-500'}`}
                    required
                  />
                  {
                    !isValidLname && lname_changed ?
                      (
                        <p className='text-red-500 text-sm absolute mt-[120px] ml-2'>Last name is required</p>
                      )
                      :
                      (
                        !lname_format && lname_changed && (
                          <p className='text-red-500 text-sm absolute mt-[120px] ml-2'>Last name should only contain alphabets</p>
                        )
                      )
                  }
                  <input
                    type='password'
                    name='passwd'
                    // onChange={handleChange4}
                    onBlur={handleBlur4}
                    onFocus={handleFocus4}
                    onChange={(e) => {
                      setPasswd(e.target.value);
                      setIsValidPass(e.target.value.trim());
                      setpasswd_changed(true);
                    }}
                    // onBlur={() => setIsValidPass(passwd.trim() !== '')}
                    placeholder='Password'
                    value={passwd}
                    className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 ${(!isValidPass && submit) || (!isValidPass && passwd !== '') && 'border-red-500'}`}
                    required
                  />
                  {/* {passwd == "" && passwd_changed && (
                    <p className='absolute mt-[193px] ml-2 text-red-500 text-sm'>Password required</p>
                  )}
                  {!isValidPass && passwd != "" && passwd_changed  && (
                    <p className='absolute mt-[193px] ml-2 text-red-500 text-sm'>Password must have one alphabet,digit and special character</p>
                  )} */}
                  {passwd === "" && !submit && passwd_changed && (
                    <p className='absolute mt-[193px] ml-2 text-red-500 text-sm'>Password required</p>
                  )}
                  {!hasRequiredChars(passwd) && passwd !== "" && passwd_changed && (
                    <p className='absolute mt-[193px] ml-2 text-red-500 text-sm'>
                      At least 8 character, 1 alphabet, 1 digit, and 1 special character
                    </p>
                  )}
                  <input
                    type={inputType}
                    name='date'
                    onChange={handleChange2}
                    onBlur={handleBlur2}
                    onFocus={handleFocus2}

                    // onChange={(e) => {
                    //   setDate(e.target.value);
                    //   setIsValidDate(e.target.value.trim() !== '');
                    // }}
                    // onBlur={() => setIsValidDate(date.trim() !== '')}
                    placeholder='Date of birth'
                    value={date}
                    className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 ${(!isValidDate && submit) || (!isValidDate && date !== '') && 'border-red-500'}`}
                    required
                  />
                  {date.trim() == "" && !submit && date_changed && (
                    <p className='text-red-500 text-sm absolute mt-[266px] ml-2'>Date Required</p>
                  )}
                  {date.trim() != "" && !isValidDate && !submit && date_changed && (
                    <p className='text-red-500 text-sm absolute mt-[266px] ml-2'>Invalid Date</p>
                  )}
                  <input
                    name='email'
                    // onChange={handleChange3}
                    onBlur={handleBlur3}
                    onFocus={handleFocus3}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                      setemail_changed(true)
                    }}
                    // onBlur={() => validateEmail(email)}
                    type='text'
                    placeholder='E-mail'
                    value={email}
                    className={`placeholder-slate-600 py-3 px-3 w-[100%] rounded-md gap-5 focus:outline focus:outline-2 focus:outline-blue-700 ${(!isValidEmail && submit) || (!isValidEmail && email !== '') && 'border-red-500'}`}
                    required
                  />
                  {/* {(!isValidEmail && isFocused3 && !submit) || (!isValidEmail && submit && isFocused3) && (
                    <p className='text-red-500 text-sm absolute mt-[340px] ml-2'>Invalid email format</p>
                  )} */}
                  {email == "" && !submit && email_changed && (
                    <p className='text-red-500 text-sm absolute mt-[340px] ml-2'>Email required</p>
                  )}
                  {email != "" && !submit && !isValidEmail && email_changed && (
                    <p className='text-red-500 text-sm absolute mt-[340px] ml-2'>Please enter valid email address</p>
                  )}

                  <p className=''>Already have an account? <button onClick={tologin} className='text-blue-600'>Log in</button></p>
                  <button
                    type='submit'
                    onClick={handlesubmit}
                    className='px-2 py-1 mt- w-[100%] justify-center self-center rounded hover:scale-110  text-lg font-serif text-white outline outline-white bg-blue-500'>
                    Submit
                  </button>
                </div>
              </div>
              <div className='mr-'>
                <img src={sign3} className='left-0 mr- w-screen h-full opacity-90 rounded-r-3xl' alt='' />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;