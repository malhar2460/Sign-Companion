import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactDOM } from 'react'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import EarthCanvas from './Earth'
import logo from '../logo3.png' 
import bg from '../bg.avif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faUsers, faComments } from '@fortawesome/free-solid-svg-icons';
// import Image from 'templates/frontend/src/cont/assets/images';

// import right_banner from '../assets/images/about-us-image.jpg'
import right_banner from '../mission.avif'
// import left_banner from '../assets/images/left-infos.jpg'
import left_banner from '../tech.avif'
// import values from '../assets/images/core-values.jpg';
import values from '../values.jpg';
// import Box  from '../geo/Box'
import { useInView } from 'react-intersection-observer';
// import { useHistory } from 'react-router-dom';
import axios from 'axios'
import indexHtmlContent from './indexhtml';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Aboutus = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [uname, setusernam] = useState('')
  const { user } = location.state || { user: 'notfound' };
  const { authent } = location.state || { user: 'not' };
  console.log(location.state)
  const tosign = () => {
    navigate('/sign_text', { state: { user: user, authent: authent } });
  }


  const tocontact = () => {
    navigate('/contactus', { state: { user: user, authent: authent } });
  }

  const toabout = () => {
    navigate('/aboutus', { state: { user: user, authent: authent } });
  }
  const tohome = () => {
    navigate('/', { state: { user: user, authent: authent } });
  }


  const tologin = () => {
    console.log(authent, location.state.user)
    navigate('/login', { state: { user: user, authent: authent } });
  }

  const tospeech = () => {
    navigate('/speech', { state: { user: user, authent: authent } });
  }
  const totext = () => {
    navigate('/text_sign', { state: { user: user, authent: authent } });
  }
  const tosignup = () => {
    navigate('/signup', { state: { user: user, authent: authent } });
  }



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  const fadeInVariants = {
    hidden: { opacity: 0 },   // Initial style (fully transparent)
    visible: { opacity: 1 },  // Target style (fully opaque)
  };
  const control = useAnimation()
  const [ref, inview] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  useEffect(() => {
    if (inview) {
      // If the element is in view, start the fade-in animation
      control.start({
        opacity: 1,
        x: 0,
        transition: { duration: 1, type: "tween" }, // Set the animation duration
      });
    } else {
      // If the element is not in view, set opacity to 0 to hide it
      control.start({ opacity: 0, x: 100 });
    }
  }, [control, inview])

  // //==============================MIC WORKS======================================
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }
  //=============================================================================
  return (
    // <div className='bg-black   min-h-screen' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
    <div className=' min-h-screen bg-[#F3F5FC] overflow-y-auto overflow-x-hidden'  > 

      <nav className=' py-5 px-5 bg-white '>
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
                  <button className='text-black  text-lg '>Speech to Sign</button>
                </a>
              </>
            )}
            <a onClick={toabout}>
              <button className='text-black  text-lg border-b-2 border-black'>About us</button>
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
              ):(
              <a onClick={tologin}>
                <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md '>Log in</button>
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
      <div className='flex flex-col xl:flex xl:flex-row md:flex md:flex-col 2xl:flex 2xl:flex-row '>


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
        {/* <div className='bg-white'>
          <div>
            Show microphone status
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            Start and stop buttons
            <button onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening({ continuous: true })}>
              {listening ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
          </div>
        </div> */}

        {/* EARTH */}
        {/* <motion.div
               ref={ref}
               initial={{ opacity: 0, x: 100 }}
               animate={control}
        // variants={slideIn("right", "tween", 0.2, 1)}
        className='md:h-[430px] h-[350px] w-full mx-auto'
      >
        <EarthCanvas />
      </motion.div> */}

        {/* <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={control}
        className="mt-8  float-right"
      > */}
        {/* <div style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)' }} className="pt-8 pb-5 mt-16 text-lg bg-transparent  whitespace-pre-line mx-48 bg-white">
          <h1 className="text-2xl text-black font-bold mb-10 font-serif "><span className='rounded-lg outline outline-black py-1 px-2'>About Us</span></h1>
          <p className="text-gray-950 mb-4">
            Welcome to our website! We offer a free and accessible platform that
            enables users to convert sign language into text and text into sign
            language.
          </p>
          <p className="text-gray-950 mb-4">
            Our mission is to bridge the communication gap between individuals
            who are deaf or hard of hearing and those who communicate primarily
            through spoken language. We aim to provide a seamless experience for
            users to express themselves and understand others effectively.
          </p>
          <p className="text-gray-950 mb-4">
            With our innovative sign language recognition technology, users can
            simply do sign language gestures or enter text, and our platform
            will convert them into written text
          </p>
          <p className="text-gray-950">
            We believe in inclusivity and empowering individuals by promoting
            equal access to communication. Our team is dedicated to improving
            and expanding our services to make sign language more accessible to
            everyone.
          </p>
          <p className="text-gray-950">
            Get started today and experience the power of communication without
            barriers!
          </p>
          <a onClick={tosignup}>
            <button className="mt-7 mb-2 px-4 py-2 rounded-lg shadow-md shadow-black bg-green-600 text-white outline outline-green-600">
              Sign up
            </button>
          </a>
        </div> */}
        <div className="container mx-auto px- py-2 w-[150%] " style={{WebkitScrollbar: 'scrollbar-width: none'}}>
          <div className='bg-white mx-[10%] no pt-7 overflow-auto overflow-x-hidden overflow-y-auto h-[630px] text-center pb-3 rounded-3xl ' style={{ boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',WebkitScrollbar: 'scrollbar-width: none' }}>
            <h2 className="text-3xl font-bold text-purple text-blue-700 text-center mb-8">Welcome to Our Website!</h2>

            <div className=" my-5">
              <div className="">
                <p className="text-lg text-center ">
                  We offer a free and accessible platform that enables users to convert sign language into text or text and speech into sign language.
                </p>
              </div>
            </div>

            <div className="flex flex-row  mx-[100px] my-5">
              <div className="md:w-1/2 pt-9">
                <h3 className="text-2xl ml-44 font-semibold flex items-center mb-4"><FontAwesomeIcon icon={faUsers} className="mr-2" />Our Mission</h3>
                <p className='text-xl'>
                  Our mission is to bridge the communication gap between individuals who are deaf or hard of hearing and those who communicate primarily through spoken language. We aim to provide a seamless experience for users to express themselves and understand others effectively.
                </p>
              </div>
              <div className="ml-[70px]">
                {/* <div className='h-max w-max'>
                    <left_banner/>
                  </div> */}
                {/* <img src={right_banner} alt="Mission" width={400} height={300} className="rounded-lg " /> */}
                <img src={right_banner} alt="Mission" width={300} height={10} className="rounded-lg ml-20 h-[300px] w-[350px]" />
              </div>
            </div>

            <div className="flex flex-row mx-[100px]">
              <div className="mx-[100px]">
                {/* <div>
              </div> */}
                <img src={left_banner} alt="Technology" width={350} height={300} className="rounded-lg " />
              </div>
              <div className="w-1/2  pt-[8%]">
                <h3 className="text-2xl ml-40 font-semibold flex items-center mb-4"><FontAwesomeIcon icon={faComments} className="mr-2" />Our Technology</h3>
                <p className='text-xl'>
                  With our innovative sign language recognition technology, users can simply do sign language gestures or enter text or speech, and our platform will convert them into written text.
                </p>
              </div>
            </div>
            <div className="flex flex-row  mx-[100px] my-5">
              <div className="md:w-1/2 pt-9">
                <h3 className="text-2xl ml-44 font-semibold flex items-center mb-4"><FontAwesomeIcon icon={faHandsHelping} className="mr-2" />Our Values</h3>
                <p className='text-xl'>
                We believe in inclusivity and empowering individuals by promoting equal access to communication. Our team is dedicated to improving and expanding our services to make sign language more accessible to everyone.
                </p>
              </div>
              <div className="ml-[70px]">
                {/* <div className='h-max w-max'>
                    <left_banner/>
                  </div> */}
                <img src={values} alt="Mission" width={400} height={300} className="rounded-lg " />
              </div>
            </div>
            {/* <div className="flex flex-row mx-[200px]">
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold flex items-center mb-4"><FontAwesomeIcon icon={faHandsHelping} className="mr-2" />Our Values</h3>
                <p>
                  We believe in inclusivity and empowering individuals by promoting equal access to communication. Our team is dedicated to improving and expanding our services to make sign language more accessible to everyone.
                </p>
              </div>
            </div> */}
          </div>
        </div>
        {/* </motion.div> */}
      </div>

    </div>

  )
}

export default Aboutus
