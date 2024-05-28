import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactDOM } from 'react'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react';
import { BoxGeometry } from 'three'
import EarthCanvas from './Earth'
// import Box  from '../geo/Box'
import logo from '../logo3.png'
import bg from '../bg.avif'
import { useInView } from 'react-intersection-observer';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import indexHtmlContent from './indexhtml';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
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

const Speech = () => {
  
  const scrollableContainerRef = useRef(null);

  const [Clean, setclean] = useState([])
  const [txt, settxt] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const [uname, setusername] = useState('')
  let { user } = location.state || { user: 'notfound' };
  // const { authent } = location.state || {user:'not'};
  const authent = location?.state?.authent || 'not';
  // console.log(location.state.authent)
  user = localStorage.getItem('user')
  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(location.state.user);
    }
  }, [location.state]);
  const tosign = () => {
    handleBeforeUnload()
    navigate('/sign_text', { state: { user: user, authent: authent } });
  }


  const tocontact = () => {
    handleBeforeUnload()
    navigate('/contactus', { state: { user: user, authent: authent } });
  }
  const tohome = () => {
    handleBeforeUnload()

    navigate('/', { state: { user: user, authent: authent } });
  }
  const toabout = () => {
    handleBeforeUnload()
    navigate('/aboutus', { state: { user: user, authent: authent } });
  }

  const tospeech = () => {
    handleBeforeUnload()
    navigate('/speech', { state: { user: user, authent: authent } });
  }


  const tologin = () => {
    // console.log(authent,location.state.user)
    navigate('/login', { state: { user: user, authent: authent } });
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
  
  const totext = () => {
    handleBeforeUnload()
    navigate('/text_sign', { state: { user: user, authent: authent } });
  }
  const tosignup = () => {
    handleBeforeUnload()
    navigate('/signup', { state: { user: user, authent: authent } });
  }

  const handleBeforeUnload = (event) => {
    // Customize the message you want to show in the confirmation dialog
    axios
      .post('http://127.0.0.1:8000/speech/', { 'transcript': transcript, 'user_id': user }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response.data.response)
        console.log(response.data.state)
      })
      .catch((error) => {
        console.error(error)
      })

  };

  



  const [content, setContent] = useState([]);
  // const containerRef = useRef(null);

  // Add new content dynamically (you can replace this with your logic)
  // const addNewContent = () => {
  // const newContent = `New Content ${content.length + 1}`;
  // setContent((prevContent) => [...prevContent, newContent]);
  // };

  // Scroll to the bottom of the container when content changes
  // useEffect(() => {
  // containerRef.current.scrollTop = containerRef.current.scrollHeight;
  // }, [content]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const extchar = () => {
    var Clr = []
    var clrb = ''
    let i = 0
    // console.log("Inside extchar")
    for (let i = 0; i < transcript.length; i++) {
      // console.log(transcript[i])
      if (transcript[i].match(/^[A-Za-z ]+$/)) {
        // console.log(transcript[i].toUpperCase())
        Clr = Clr.concat(transcript[i].toUpperCase())
        clrb = clrb.concat(transcript[i].toLowerCase())
        setclean(Clr)
      }
      else {
        setclean([' '])
        //   alert('Only the alphabets will be processed')
        window.self.location.reload()
      }
    }
  }
  //==============================MIC WORKS======================================
  //   const {
  //     transcript,
  //     listening,
  //     resetTranscript,
  //     browserSupportsSpeechRecognition
  //   } = useSpeechRecognition();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ continuous: true, onEnd: extchar, });

  const reset = () => {
    axios
      .post('http://127.0.0.1:8000/speech/', { 'transcript': transcript, 'user_id': user }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response.data.response)
        console.log(response.data.state)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    extchar();
    // Other logic or dependencies for useEffect...
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  //=============================================================================
  const handleSpeechRecognition = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };



  // ... (previous code)

  // Scroll to the bottom of the page when Clean state is updated


  // ... (previous code)

  const addNewContent = () => {
    const newContent = `New Content ${Clean.length + 1}`;
    setclean((prevContent) => [...prevContent, newContent]);
    scrollToBottom(); // Call scrollToBottom after updating Clean state
  };


  // useEffect(() => {
  //   scrollToBottom();
  // }, [Clean]); // Scroll when the Clean prop changes

  const scrollToBottom = () => {
    console.log("in")
    if (scrollableContainerRef.current) {
      const scrollableContainer = scrollableContainerRef.current;
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  return (
    // <div  className='bg-white min-h-screen '  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
    <div className='bg-[#e9eaec] min-h-screen ' >
      <nav className=' py-5 px-5 bg-white'>
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
                  <button className='text-black  text-lg rounded-md'>Text to Sign</button>
                </a>
                <a onClick={tospeech}>
                  <button className='text-black border-b-2 border-black text-lg '>Speech to Sign</button>
                </a>
              </>
            )}
            <a onClick={toabout}>
              <button className='text-black  text-lg rounded-md'>About us</button>
            </a>
            <a onClick={tocontact}>
              <button className='text-black  text-lg rounded-md'>Contact us</button>
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

      <div class="grid grid-rows-3 grid-flow-col  h-[520px] w-[90%] ml-20 mt-[50px]  bg-white rounded-2xl">
        <div class="h-20 col-start-1 row-start-1 ">
          <div class=" text-4xl font-sans mt-[35px] ">
            Speech to sign
          </div>
        </div>
        <div class="row-start-1 col-start-1 mt-[20%] ">
          <div class='h-20 origin-center'>
            {/* Show microphone status */}
            {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            {/* Start and stop buttons */}

            <button onClick={handleSpeechRecognition} class='mx-2 px-3 py-1 text-xl rounded-md font-semibold border-2 border-blue-500 bg-blue-500   text-white'>
              {listening ? 'Stop microphone' : 'Start microphone'}
            </button>
            <button onClick={() => { resetTranscript(); reset(); }} class='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-bold rounded-md '>Reset</button>

            {/* <textarea placeholder={transcript} onChange={() => extchar()}></textarea> */}
            {/* <p onChange={() => extchar()} class='text-lg'>{transcript}</p> */}
          </div>
        </div>
        {/* <div className='col-start-2 row-start-1 w-[100px]'>10</div> */}
        <div className={`row-span-3 w-[100%] overflow-y-auto col-span-2 border-black border-l-2 ${Clean.length === 0 ? 'mr-[690px]' : ''}`} ref={scrollableContainerRef}>
          <div className="overflow-auto overflow-x-hidden mr-0">
            <div className="flex flex-wrap justify-center mx-2 sm:mx-16 mt-5 gap-2 mb-10">
              {Clean.map((item, index) => (
                item === ' ' ? (
                  <div key={index} className="flex items-center justify-center w-28 h-28">
                    <img src={require("../white.png")} alt="" className="bg-transparent opacity-0" />
                  </div>
                ) : (
                  <div key={index} className="outline outline-2 outline-black group pt-1 hover:scale-[106%]">
                    <p className="font-semibold group-hover:scale-110">{item}</p>
                    <img src={require(`../${item}.jpg`)} className="w-28 h-28" alt="" />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div class="col-start-1 row-start-1 mt-[30%] ">
          <p class='text-3xl  font-sans'>
            Instructions
          </p>
          <br></br>
          <ul class='list- text-[17px] font-sans text-center ml-2'>
            <li>Navigate to the speech-to-sign feature within the application or website.</li>
            <li>Ensure that your device's microphone is enabled and accessible to the application.</li>
            <li>Click on the "Start Recording" or similar button to initiate speech input.</li>
            <li>Speak clearly and enunciate each word distinctly to improve speech recognition accuracy.</li>
            <li>Wait for the speech recognition process to transcribe your speech into text.</li>
            <li>Once speech recognition is complete, review the transcribed text displayed on the screen.</li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col xl:flex xl:flex-row md:flex md:flex-col 2xl:flex 2xl:flex-row'>
        {/* <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={control}
        className=" mx-auto h-fit w-fit scale-150"
        >
        {/* xl:h-[52%] xl:w-[27%] md:h-[45%] md:w-[22%] 
        {/* h-[52%] w-[27%] 
        <EarthCanvas />
      </motion.div> */}
        <div className=''>

          <div>
            {/* <div
        ref={containerRef}
        style={{
          overflowY: 'auto',
          maxHeight: '200px', // Adjust as needed
          // border: '1px solid #ccc',
        }}
      ></div> */}


          </div>
        </div>

      </div>

    </div>
  )
}

export default Speech
