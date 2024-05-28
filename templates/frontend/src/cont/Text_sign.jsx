import { React, useEffect, useState, useRef } from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import bg from '../bg.avif'
import Modal from 'react-modal';

import image from './HandGestureRecognition'
import logo from '../logo3.png'
import A from '../A.jpg'
import B from '../B.jpg'
import C from '../C.jpg'
import D from '../D.jpg'
import E from '../E.jpg'
import F from '../F.jpg'
import G from '../G.jpg'
import H from '../H.jpg'
import I from '../I.jpg'
import J from '../J.jpg'
import K from '../K.jpg'
import L from '../L.jpg'
import M from '../M.jpg'
import N from '../N.jpg'
import O from '../O.jpg'
import P from '../P.jpg'
import Q from '../Q.jpg'
import R from '../R.jpg'
import S from '../S.jpg'
import T from '../T.jpg'
import U from '../U.jpg'
import V from '../V.jpg'
import W from '../W.jpg'
import X from '../X.jpg'
import Y from '../Y.jpg'
import Z from '../Z.jpg'

const Text_sign = () => {

  // const [images,setimage] = useState[null]
  const [cameraError, setCameraError] = useState(false);
  const [txt, settxt] = useState('')
  const [uname, setusername] = useState('')
  const videoRef = useRef(null);
  const [Clean, setclean] = useState([])
  const location = useLocation()
  const { user } = location.state || { user: 'notfound' }
  const { authent } = location.state || { authent: 'not' }
  const [btext, setbtext] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(location.state.user);
    }
  }, [location.state]);

  const tocontact = () => {
    navigate('/contactus', { state: { user: user, authent: authent } });
  }
  const tohome = () => {
    navigate('/', { state: { user: user, authent: authent } });
  }
  const toabout = () => {
    navigate('/aboutus', { state: { user: user, authent: authent } });
  }

  const tosign = () => {
    navigate('/sign_text', { state: { user: uname, authent: authent } });
  }

  const tosignup = () => {
    navigate('/signup', { state: { user: uname, authent: authent } });
  }

  const tologin = () => {
    navigate('/login', { state: { user: uname, authent: authent } });
  }

  const totext = () => {
    navigate('/text_sign', { state: { user: uname, authent: authent } });
  }


  const tospeech = () => {
    navigate('/speech', { state: { user: user, authent: authent } });
  }



  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (item) => {
    setSelectedItem(item);
    setShowModal(!showModal);
  };

  const closemodal = () => {
    setShowModal(false)
  }
  const openmodal = () => {
    setShowModal(true)
  }
  useEffect(() => {
    if (showModal) {
        // Scroll to the top of the document when the modal is shown
        document.documentElement.scrollTop = 0;
    }
}, [showModal]);



  // useEffect(() => {
  //   extchar()
  // },[txt])

  const extchar = () => {
    var Clr = []
    var clrb = ''
    for (let i = 0; i < txt.length; i++) {
      console.log(txt[i])
      if (txt[i].match(/^[A-Za-z ]+$/)) {
        // console.log(txt[i].toUpperCase())
        Clr = Clr.concat(txt[i].toUpperCase())
        clrb = clrb.concat(txt[i].toLowerCase())
        setclean(Clr)
      }
      else {
        setclean([' '])
        alert('Only the alphabets will be processed')
        window.self.location.reload()
      }
      openmodal()
    }

    console.log("text", clrb.toString())
    console.log("uesr_id", location.state.user[0][0])
    axios
      .post('http://127.0.0.1:8000/text/', { 'text': clrb.toString(), 'user_id': location.state.user[0][0] }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });

    toggleModal()
  }
  useEffect(() => {
    if(localStorage.getItem('user') == 'false')
  {
    navigate('/login', { state: { user: user, authent: authent } });
  }
  else{
    console.log("USER ",localStorage.getItem('user'))
  }

  }, []); 

  // const getsign = async () => {
  //  axios
  //  .get('https://127.0.0.1:8000/sign')
  //  .then((response) =>
  //   setimage = response.data.sign
  //  ) 
  //  .catch((error) => {
  //   console.log(error)
  //  })
  // }


  // const handletext = () => {
  //   axios
  //     .post('http://127.0.0.1:8000/text/', { 'text': btext,'user_id':location.state[0][0] }, { headers: { 'Content-Type': 'application/json' } })
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <>

      {/* <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-h-screen bg-white"> */}
      <div  className="min-h-screen bg-[#e9eaec]">
        <nav className=' py-5 px-5  bg-white '>
          <div className='flex items-center justify-between'>
            <div>
              <button onClick={tohome} className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
            </div>
            <div className='hidden sm:flex lg:flex-row gap-7'>
              <a onClick={tosign}>
                <button className='text-black    text-lg '>Sign to Text</button>
              </a>
              {authent === 'True' && (
                <>
                  <a onClick={totext}>
                    <button className='text-black  text-lg border-b-2 border-black'>Text to Sign</button>
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
                <button className='text-black  text-lg '>Contact us</button>
              </a>
              {authent === 'True' ? (
                <>
                  <a onClick={tologin}>
                    <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md '>Log out</button>
                    {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
                  </a>
                </>
              ) : (
                <a onClick={tologin}>
                  <button className='text-black    text-lg  rounded-md '>Log in</button>
                  {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
                </a>
              )}
              <a onClick={tosignup}>
                <button className='text-white px-3 py-1 text-lg rounded-md font-semibold border-2 border-blue-500 bg-blue-500 '>Sign up</button>
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
        {/* {uname} */}
        {/* <div>
      <h1 className='text-5xl my-3 text-center snap-center sm:justify-center md:justify-center lg:justify-center justify-center'>Enter your text</h1>
      <textarea  onChange={(e) => (settxt(e.target.value))}  className='outline outline-black mt-5 font-serif text-lg shadow-md shadow-black w-[60%] h-36 px-1'></textarea><br></br><br></br>
      <button onClick={extchar} className='rounded-md bg-green-600 text-white px-2 py-1 font-serif text-lg shadow-sm shadow-black hover:scale-110 hover:delay-75'>Submit</button>
       <div className="flex-wrap grid grid-cols-10 mx-16 mt-5  gap-2 mb-10">
          {Clean.map((item) => (
            item === ' '  ? (
              <>
                <div>
                <img key={item} src={require("../white.png")} alt="" />
                </div>
                </>
            ) : (
              <>
              <div className='outline outline-2 outline-black group pt-1 hover:scale-[106%]'>
                <p className='font-semibold group-hover:scale-110 '>{item}</p>
              <img key={item} src={require('../' + item + '.jpg')} className=' ' alt="" ></img>
              </div> </>
            )
          ))}
        </div>
      </div> */}
        {/* <table style={{boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"}} className='table-auto w-[95%]  rounded-3xl ml-9 mt-[2%] shadow-black shadow-sm bg-white'> */}
        <table style={{boxShadow:"5px 5px 10px rgba(0, 0, 0, 0.1)"}} className='table-auto w-[95%]  rounded-3xl ml-9 mt-[2%] shadow-black shadow-sm bg-white'>
          <tr>
            <td className='w-[35%] text-lg  rounded-lg  text-left pl-10 py-5 pr-5 outline-black border-r-2 border-black '>
              <div>
                {/* <pre> */}
                <p className='text-3xl mb-3 text-center font-sans'>Instructions</p><br></br>
                <ul className='list-disc font-sans font-semibold'>
                  <li>
                    Enter only alphabetical characters (A-Z, a-z) in the input field.
                  </li><br></br>
                  <li>
                    Avoid using numbers, symbols, or special characters.
                  </li><br></br>
                  <li>
                    Capitalization doesn't matter but standard capitalization is recommended.
                  </li><br></br>
                  <li>
                    Click "Convert" to start the process.
                  </li><br></br>
                  <li>
                    Wait for the conversion to finish (may take a few moments).
                  </li><br></br>
                  <li>
                    The resulting sign language alphabets will be displayed.
                  </li><br></br>
                </ul>
                {/* </pre> */}
              </div>
            </td>
            <td style={{textAlign:'unset'}} className='w-[75%]'>
              <div>
                <p className='text-4xl font-sans  mb-[5%]'>Text to sign</p>
                {/* <h1 className='text-5xl my-3 text-center snap-center sm:justify-center md:justify-center lg:justify-center justify-center'>Enter your text</h1> */}
                <textarea placeholder='Enter your text'
                  onChange={(e) => settxt(e.target.value)}
                  className='placeholder-gray-900 w-[90%]  font-sans text-lg px-2 outline outline-[2px] outline-black focus:outline focus:outline-black mx-5 h-36 top-[0px] mb-8 rounded-lg'
                ></textarea>
                <br /><br />
                <button
                  onClick={extchar}
                  className='rounded-md  scale-150  bg-blue-500 w-28 text-white px-2 py-1 font-sans text-lg '
                >
                  Convert
                </button>
                {/* <div className="flex flex-wrap justify-center mx-2 sm:mx-16 mt-5 gap-2 mb-10">
                {Clean.map((item) => (
                  item === ' ' ? (
                    <div className="flex items-center justify-center w-28 h-28"> 
                      <img className='bg-transparent' key={item} alt="" />
                    </div>
                  ) : (
                    <div className="outline outline-2 outline-black group pt-1 hover:scale-[106%]">
                      <p className="font-semibold group-hover:scale-110">{item}</p>
                      <img key={item} src={require('../' + item + '.jpg')} className="w-28 h-28" alt="" /> 
                    </div>
                  )
                ))}
              </div> */}
                {showModal  && (
                  <>
                    <div
                      className="scale-110 w-[100%] my-20 pt-[0%] justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-[100%] my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t ">
                            <h3 className="text-3xl font-semibold text-blue-700 ml-3">
                              Sign for given text
                            </h3>
                            <button
                              className=" background-transparent font-bold uppercase  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={closemodal}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>

                            </button>

                          </div>
                          {/*body*/}
                          {/* <div className="relative pt-5 pl-5 pr-5 flex-auto"> */}

                          <div className="flex flex-wrap justify-center  gap-2 mb-10 ">
                            {Clean.map((item) => (
                              item === ' ' ? (
                                <div className="flex items-center justify-center w-28 h-28"> {/* Add w-16 and h-16 classes */}
                                  <img className='bg-transparent' key={item} alt="" />
                                </div>
                              ) : (
                                <div className="outline outline-2 outline-black group pt-1 hover:scale-[106%]">
                                  <p className="font-semibold group-hover:scale-110 mx-[50px]">{item}</p>
                                  <img key={item} src={require('../' + item + '.jpg')} className="w-28 h-28" alt="" /> {/* Add w-16 and h-16 classes */}
                                </div>
                              )
                            ))}
                          </div>

                          {/* </div> */}

                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}
                {/* {showModal && (
              <>
              
                  <button
                    className=" background-transparent ml-[97%] font-bold uppercase  text-sm outline-none focus:outline-none  ease-linear transition-all duration-150"
                    type="button"
                    onClick={closemodal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-wrap justify-center mx-2 sm:mx-16 mt-5 gap-2 mb-10">
                    {Clean.map((item) => (
                      item === ' ' ? (
                        <div className="flex items-center justify-center w-28 h-28"> 
                          <img className='bg-transparent' key={item} alt="" />
                        </div>
                      ) : (
                        <div className="outline outline-2 outline-black group pt-1 hover:scale-[106%]">
                          <p className="font-semibold group-hover:scale-110 mx-[50px]">{item}</p>
                          <img key={item} src={require('../' + item + '.jpg')} className="w-28 h-28" alt="" /> 
                        </div>
                      )
                    ))} 
                  </div>
                  </>
                )} */}

              </div>
            </td>

          </tr>
        </table>


      </div>
    </>
  )
}

export default Text_sign
