import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
// import bg from '../bg.avif'
import logo from '../logo3.png'
// import right_banner from '../assets/images/banner-right.png'
import right_banner from '../assets/images/blue_home_shadow.png'
import left_banner from '../assets/images/banner-left.png'

const Home = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { authent } = location.state || { authent: 'not' };

    // const {auth} = location.state.authent || {authent : 'not'}
    const { user } = location.state || { user: 'notfound' }; // Get the user value from the state

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const tosign = () => {
        navigate('/sign_text', { state: { user: user, authent: authent } });
    }


    const tocontact = () => {
        navigate('/contactus', { state: { user: user, authent: authent } });
    }

    const toabout = () => {
        navigate('/aboutus', { state: { user: user, authent: authent } });
    }


    const tologin = () => {
        console.log(authent, location.state?.user)
        navigate('/login', { state: { user: user, authent: authent } });
    }

    const tohome = () => {
        navigate('/', { state: { user: user, authent: authent } });
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
    return (
        <div  style={{ backgroundImage: `url(${right_banner})`, backgroundSize: 'contain', backgroundPosition: 'right', backgroundRepeat: 'no-repeat', width: '100%', height: '700px' }}>
            {/* <div className='' style={{ backgroundImage: `url(${left_banner})`, backgroundSize: 'contain', backgroundPosition: 'left', backgroundRepeat: 'no-repeat', width: '100%', height: '500px', backgroundPositionY: '50px' }}> */}
            <div className='' >
                <nav className='bg-white py-5 px-5'>

                    <div className='flex items-center justify-between'>
                        <div>
                            <button onClick={tohome} className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
                        </div>
                        <div className='hidden sm:flex lg:flex-row gap-7'>
                            <a onClick={tosign}>
                                <button className='text-black     text-lg '>Sign to Text</button>
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
                            <a onClick={(e) => { e.preventDefault(); tocontact(); }}>
                                <button className='text-black  text-lg rounded-md'>Contact us</button>
                            </a>
                            {authent === 'True' ? (
                                <>
                                    <a onClick={tologin}>
                                        <button className='text-blue-500 border-2 px-3 py-1 border-blue-500   text-lg font-semibold rounded-md'>Log out</button>
                                        {/* <button className='text-[#6E778C]    text-xl  rounded-md '>Log in</button> */}
                                    </a>
                                </>
                            ) : (
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
                                {authent === 'True' && (
                                    <>
                                        <a onClick={totext}>
                                            <button className='w-full outline outline-white outline-1 px-2 py-1 text-white'>Text to Sign</button>
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
                <div className=''>
                    <p className='text-3xl text-left font-semibold  w-[35%] mt-28 ml-40 rounded-[20%] shadow-black shadow-lg px-20 py-10 bg-transparent'>
                        Dive into the world of <span className='text-blue-500'>Indian Sign Language</span> with <span className='text-blue-800'>Sign Companion</span>
                        <p className='text-base mt-5'>Welcome to our website! We offer a free and accessible platform that enables users to convert sign language into text and text into sign language.
                            Our mission is to bridge the communication gap between individuals who are deaf or hard of hearing and those who communicate primarily through spoken language. We aim to provide a seamless experience for users to express themselves and understand others effectively.</p>
                        <button onClick={tologin} className='text-white bg-gradient-to-tl  from-blue-950 to-blue-500 mx-2 mt-5 px-2 py-1.5 hover:scale-110  text-lg rounded-lg'>Log in</button>
                        <button onClick={tosignup} className='text-white bg-gradient-to-tl  from-blue-950 to-blue-500 mx-2 mt-5 px-2 py-1.5 hover:scale-110  text-lg rounded-lg'>Sign up</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home
