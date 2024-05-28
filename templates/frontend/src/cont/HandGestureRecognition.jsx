import React, { useState, useRef, useEffect } from 'react';
import {Link, useLocation,useParams,useNavigate} from 'react-router-dom'
import axios from 'axios';
import bg from '../bg.avif'
import logo from '../logo3.png'
import About_sign from '../cont/About_sign'
const HandGestureRecognition = ({ onGuestIdUpdate }) => {


  // const [duration,setduration] = useState(0)
  // const [source,setsource] = useState('')


  // ANOTHER FOR GUEST REALTED
    const [guestId, setGuestId] = useState("None");
    
  // useEffect(() => {
  //   fetchLastGuestId();
  // }, []);

  // const [duration, setDuration] = useState(0);
  // const [source, setSource] = useState('');

  // useEffect(() => {
  //   // Function to update the duration on the server
  //   const updateDurationOnServer = () => {
  //     const departureTime = new Date().getTime();
  //     const durationInSeconds = Math.floor((departureTime - arrivalTime) / 1000); // Duration in seconds

  //     // Send the duration and source information to the backend
  //     const sourceUrl = document.referrer || 'Direct'; // Retrieve the source URL or consider it as Direct if not available
  //     setSource(sourceUrl);

  //     // Make a request to your Django backend API endpoint to store the duration and source information
  //     axios.post('http://127.0.0.1:8000/data/', { 'duration': durationInSeconds, 'source': sourceUrl }, { headers: { 'Content-Type': 'application/json' } })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error while updating duration on the server", error);
  //       });
  //   };

  //   // Function to start the ping mechanism
  //   const startPing = () => {
  //     const intervalId = setInterval(() => {
  //       updateDurationOnServer();
  //     }, 60000); // Send a ping every 60 seconds (adjust as needed)
      
  //     // Clear the interval when the component unmounts or the tab is closed
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   };

  //   // Retrieve the arrival time from localStorage
  //   const arrivalTime = parseInt(localStorage.getItem('arrivalTime'), 10);

  //   // Add an event listener to handle the beforeunload event
  //   const handleBeforeUnload = () => {
  //     updateDurationOnServer();
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Start the ping mechanism
  //   startPing();

  //   // Clear the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // GUEST RELATED CODE 
  // const fetchLastGuestId = () => {
  //   // Make an API request to the Django backend to fetch the last guest ID
  //   const endpoint = 'http://127.0.0.1:8000/guest_last';
    
    

  //   axios
  //   .get('http://127.0.0.1:8000/guest_last/')
  //   .then((response) => {
  //       console.log(response.data)
  //       const lastGuestId = response.data.lastGuestId;
  //       const newGuestId = lastGuestId + 1;
  //       setGuestId(newGuestId);
  //       onGuestIdUpdate(newGuestId);
  //       localStorage.setItem('guest_id',newGuestId)
  //       updateDatabase(newGuestId);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch last guest ID:', error);
  //     });
  // };

  // const updateDatabase = (id) => {
  //   // Make an API request to the Django backend to update the guest ID
  //   const endpoint = 'http://127.0.0.1:8000/guest/';
  //   const data = {
  //     guest_id: id
  //     // Additional data you want to send to the backend can be added here
  //   };

  //   axios.post(endpoint, data)
  //     .then(response => {
  //       console.log('Guest ID updated successfully!');
  //     })
  //     .catch(error => {
  //       console.error('Failed to update guest ID:', error);
  //     });
  // };

  const [showModal, setShowModal] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [uname,setusername] = useState('')
  const [image, setImage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [cameraError, setCameraError] = useState(false);
  const [timer, setTimer] = useState(3);
  const [imgb, setimgb] = useState(2);
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [sentence, setSentence] = useState('');
  const location = useLocation();
  const {user} = location.state || {user:'Guest'} //GUEST RELATED
  // const { authent } = location.state || { authent: 'not' };

  const authent = location?.state?.authent || 'not';
  console.log(authent)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // if(location.state.authent == undefined)
  // {
  //   const {authent} = location.state.authent
  //   authent = 'not'
  // }
  // else
  // {
  //   const {authent} = location.state.authent
  // }

  // useEffect(() => {
  //   setusername(user);
  // }, [user]);

  useEffect(() => {
    if (location.state && location.state.user) {
      setusername(user);
    }
  }, []);

  

  const tologin=()=>{
    stopWebCam()
    stopVideoCapture();
    navigate('/login',{state:{user:uname,authent:authent}});
      }
  
  const tosign=()=>{
    stopWebCam()
    stopVideoCapture();
    navigate('/sign_text',{state:{user:uname,authent:authent}});
      }
      const tosignup=()=>{
        stopWebCam()
        stopVideoCapture();
        navigate('/signup',{state:{user:uname,authent:authent}});
          }
      const tocontact=()=>{

        stopVideoCapture()
        stopWebCam()
        navigate('/contactus',{state:{user:user,authent:authent}});
        }
        
        
      const tospeech=()=>{
        stopWebCam()
        stopVideoCapture()
        navigate('/speech',{state:{user:user,authent:authent}});
        }      
        const tohome=()=>{
          navigate('/',{state:{user:user,authent:authent}});
          }
        const toabout=()=>{
          
          stopWebCam()
          stopVideoCapture()
        navigate('/aboutus',{state:{user:user,authent:authent}});
        }
      
  const totext=()=>{
    
    // stopVideoCapture()
    // stopWebCam()
    navigate('/text_sign',{state:{user:uname,authent:authent}});
      }

  useEffect(() => {
    startVideoCapture();

    return () => {
      stopVideoCapture();
    };
  }, []);
  
  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      captureImage();
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {

    startVideoCapture();

    const handleBeforeUnload = () => {
      stopVideoCapture();
      stopWebCam();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      stopVideoCapture();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  // const stopWebCam = () => {
  //   this.state.localStream.getTracks().forEach((track) => {
  //     track.stop();
      
  //   });
  // };

  // const stopWebCam = () => {
  //   const tracks = videoRef.current.srcObject.getTracks();
  //   tracks.forEach((track) => {
  //     track.stop();
  //   });
  // };
  const stopWebCam = () => {
    const video = videoRef.current;
    const stream = video?.srcObject;
    if (video && stream) {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
      video.pause(); // Pause the video
      video.srcObject = null; // Clear the video source object
  
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop(); // Stop each media track
      });
    }
  };
  
  
  


  const handleTimerChange = (event) => {
    setSelectedTimer(parseInt(event.target.value));
  };


  const startVideoCapture = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        setCameraError(true);
      });
  };

  // const stopVideoCapture = () => {
  //   const stream = videoRef.current.srcObject;
  //   if (stream) {
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track) => {
  //       track.stop();
  //     });
  //     videoRef.current.srcObject = null;
  //   }
  // };
  const stopVideoCapture = () => {
    const video = videoRef.current;
    const stream = video?.srcObject;
  
    if (video && stream) {
      video.pause();
      video.muted = true;
      video.srcObject = null;
  
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  };
  

  // const stopVideoCapture = () => {
  //   if (videoRef.current && videoRef.current.stopVideoCapture) {
  //     videoRef.current.stopVideoCapture();
  //   }
  //   const video = videoRef.current;
  //   const stream = video?.srcObject;
  //   if (video && stream) {
  //     video.pause();
  //     video.muted = true;
  //     video.srcObject = null;
  //     const tracks = stream.getTracks();
  //     tracks.forEach((track) => {
  //       track.stop();
  //     });
  //   }
  // };
  

  // const captureImage = () => {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  //   const imageUrl = canvas.toDataURL('image/png');
  //   setImage(imageUrl);
  //   setTimer(0); // Reset the timer
  //   handlePrediction()
  // };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/png');
    setImage(imageUrl);
    setTimer(0); // Reset the timer
  };
  



  const handlePrediction = () => {
    try
    {
      // if(guestId != null)
      // {
      //   console.log("From guest_id")
      //   axios
      //     .post('http://127.0.0.1:8000/video-stream/', { 'image_data': image,'guest_id':guestId}, { headers: { 'Content-Type': 'application/json' } })
      //     .then((response) => {
      //       setPrediction(response.data.result);
      //       setSentence((prevSentence) => prevSentence + response.data.result);
      //     })
      //     .catch((error) => {
      //       console.error("Eror from handle prediction",error);
      //     });
      // }
      if(location.state.user != null)
      {
        console.log("From user_id",location.state.user[0][0])
        axios
          .post('http://127.0.0.1:8000/video-stream/', { 'image_data': image,'user_id':location.state.user[0][0]}, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            setPrediction(response.data.result);
            setSentence((prevSentence) => prevSentence + response.data.result);
          })
          .catch((error) => {
            console.error("Eror from handle prediction",error);
          });
      }
      else
      {
        console.log("Guest from prediction")
        axios
          .post('http://127.0.0.1:8000/video-stream/', { 'image_data': image,'user_id':"none"}, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            setPrediction(response.data.result);
            setSentence((prevSentence) => prevSentence + response.data.result);
          })
          .catch((error) => {
            console.error("Eror from handle prediction",error);
          });
      }
    }
    catch(error)
    {
      console.log("from pre",error)
    }
  };

//   useEffect(() => {
//     axios
//     .get('http://127.0.0.1:8000/user/')
//     .then(response => {
//       setimgb(response.data.sign)
//     });
// },[handlePrediction]);
 

  if (cameraError) {
    return (
      <div>
        <h1>Camera Access Error</h1>
        <p>Unable to access the camera. Please make sure you have granted permission to access the camera and try again.</p>
      </div>
    );
  }


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  


  return (
    <html>
      <head>
      </head> 
      <body >
      <div className='bg-white min-h-screen' >
    {/* <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001), rgba(0, 0, 0, 0.4)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-h-screen bg-white"> */}
    <div className="min-h-screen bg-[#e9eaec]">
    <nav className=' py-5 px-5 bg-white'>
      
      <div className='flex items-center justify-between'>
        <div>
          <button  onClick={tohome} className='absolute top-3'><img src={logo} className='h-8 w-52'></img></button>
        </div>
        <div className='hidden sm:flex lg:flex-row gap-7'>
          <a onClick={tosign}>
            <button className='text-black border-b-2 border-black   text-lg '>Sign to Text</button>
          </a>
          {authent === 'True' && (
              <>
          <a onClick={totext}>
            <button   className='text-black  text-lg rounded-md'>Text to Sign</button>
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
              <button className='text-white px-3 py-1 text-lg rounded-md font-semibold border-2 border-blue-500 bg-blue-500   '>Sign up</button>
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
    {sessionStorage.getItem('modal') && (
    <div className="opacity-40 fixed inset-0 bg-black"></div>
  )}
    <div style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }} className=' bg-white ml-[5%] mr-[5%] scale-95 py-2 pb-8 mt-5 rounded-2xl'>
    
    <h1 className='text-4xl my-3  text-black font- font-sans'><span className=''>Sign Language Translator</span></h1>
    {/* <p>{user}</p> */}
      <div className=' my-5 mt-7 mb-8'>
        {/* <select value={hands} onChange={handlehands}  name="" id="">
          <option value={1}>1 hand</option>
          <option value={2}>2 hands</option>
        </select> */}
        <select value={selectedTimer} onChange={handleTimerChange} className='mx-5 border bg-white text-black border-black py-[0.4%] px-1 rounded-md shadow-sm shadow-black'>
          <option value={1}>1 second</option>
          <option value={2}>2 seconds</option>
          <option value={3}>3 seconds</option>
        </select> 
        <button onClick={() => setTimer(selectedTimer)} className='mx-5 text-black border border-black  px-1 py-[0.4%] rounded-md hover:scale-110 shadow-sm shadow-black hover:shadow-md hover:shadow-black'>Click Photo</button>
        <button onClick={() => setShowModal(true)}>
          <About_sign/>
        </button>
        {timer > 0 && <p className='mt-4'>Timer: {timer}</p>}
      </div>
      <div className='flex flex-col xl:flex xl:flex-row md:flex md:flex-row gap-3 mx-[13.2%] ml-[13%]'>
        <video ref={videoRef} autoPlay playsInline className='h-96 mt-0 outline outline-black rounded-md'></video>
        <canvas ref={canvasRef} style={{ display: 'none' }} className='mt-0'></canvas>
        {image && <img src={image} alt="Photo yet not taken" onLoad={handlePrediction} className='mt-0 h-96 outline outline-black rounded-md' />}
      </div>
      <div className='mt-6  grid grid-flow-col w-96 ml-[13%]'>
        <div>
          {prediction && <p className='text-xl mr-96 w-max'><span className='outline outline-2 px-2 rounded-md bg-white text-black py-[5.5%] font-sans '>Prediction</span> : {prediction}</p>}
        </div>
        <div>
          {sentence && <p className='text-xl ml-7 w-max'><span className='outline outline-2 px-2 rounded-md bg-white text-black py-[5.5%] font-sans '>Sentence</span> :  {sentence}</p>}
        </div>
      </div>
    </div>   
  </div>
  </div>
      </body>
    </html>
    
  );
};

export default HandGestureRecognition;


// import React, { useState } from 'react';
// import axios from 'axios';

// const HandGestureRecognition = () => {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', image);

//     try {
//       const response = await axios.post('http://localhost:8000/video-stream/', formData);
//       setStatus(response.statusText);
//       setPrediction(response.data.result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div>
//       <h1>Hand Gesture Recognition</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button type="submit" disabled={!image}>
//           Predict
//         </button>
//       </form>
//       {status && <p>Status: {status}</p>}
//       {prediction && <p>Prediction: {prediction}</p>}
//     </div>
//   );
// };

// export default HandGestureRecognition;




// import React, { useEffect, useRef, useState } from 'react';

// const HandGestureRecognition = () => {
//   const videoRef = useRef();
//   // const [prediction, setPrediction] = useState('');

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     const socket = new WebSocket('ws://127.0.0.1:8000/video-stream/'); // Update the WebSocket URL accordingly

//     socket.onmessage = (event) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         videoElement.src = e.target.result;
//       };
//       reader.readAsDataURL(event.data);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch('http://localhost:8000/prediction/'); // Update the API endpoint URL accordingly
//   //       const data = await response.json();
//   //       setPrediction(data.prediction);
//   //     } catch (error) {
//   //       console.error('Error fetching hand gesture prediction:', error);
//   //     }
//   //   };

//   //   const interval = setInterval(fetchData, 1000); // Fetch the prediction every second
//   //   return () => clearInterval(interval);
//   // }, []);

//   return (
//     <div>
//       <h1>Hand Gesture Recognition</h1>
//       {/* <img src="{% url 'index' %}" /> */}
//       <video ref={videoRef} autoPlay muted />
//       {/* <p>Prediction: {prediction}</p> */}
//     </div>
//   );
// };

//===========================================//
// SUCCESSFUL IN SENDING THE DATA TO BACKEND //
//===========================================//


// import React, { useState } from 'react';

// const HandGestureRecognition = () => {
//   const [videoStream, setVideoStream] = useState(null);
//   const [recorder, setRecorder] = useState(null);

//   const startCapture = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.ondataavailable = handleDataAvailable;
//     mediaRecorder.start();
//     setVideoStream(stream);
//     setRecorder(mediaRecorder);
//   };

//   const stopCapture = () => {
//     if (recorder) {
//       recorder.stop();
//       videoStream.getTracks().forEach((track) => track.stop());
//       setVideoStream(null);
//       setRecorder(null);
//     }
//   };

  // const handleDataAvailable = (event) => {
  //   if (event.data.size > 0) {
  //     const formData = new FormData();
  //     formData.append('video', event.data);
  //     fetch('http://localhost:8000/video-stream/', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Process the response data from the Django backend
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error('Error processing video:', error);
  //       });
  //   }
  // };

//   return (
//     <div>
//       <h1>Hand Gesture Recognition</h1>
//       <video id="videoElement" autoPlay muted />
//       <button onClick={startCapture}>Start</button>
//       <button onClick={stopCapture}>Stop</button>
//     </div>
//   );
// };

// export default HandGestureRecognition;


