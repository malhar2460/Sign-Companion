import React, { useState } from "react";
import axios from 'axios';

export default function Modal() {
  const [email, setemail] = useState('')
  const [already_msg, setalready_msg] = useState(false)
  const [passwd, setpasswd] = useState('')
  const [changed_passwd, setchanged_passwd] = useState('')
  const [error_msg, seterror_msg] = useState(false)
  const [success_msg, setsuccess_msg] = useState(false)
  const [showModal, setShowModal] = React.useState(false);
  const [mail, setmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [change, setchange] = useState(false)

  const onSubmit = () => {
    if (!isValidEmail) {
      seterror_msg(true)
    }
    else {
      axios
        .post('http://127.0.0.1:8000/mail/', { 'inputemail': email }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          if (response.data.status == 'failed') {
            setalready_msg(true)
            // setErrorMessage('Unregistered email');
          }
          else {
            setsuccess_msg(true)
            setpasswd("")
            setchanged_passwd("")
            setErrorMessage('');
            // alert("Mail sent successfully")
            setchange(true)
          }
        })
        .catch((error) => {
          console.error("Eror from handle prediction", error);
        });
      // setShowModal(false)
    }

  }


  const onSubmit1 = () => {
    if (!isValidEmail) {
      seterror_msg(true)
    }
    else {
      alert(email)
      axios
        .post('http://127.0.0.1:8000/change_password/', { 'email': email, 'passwd': changed_passwd, 'changed_password': passwd }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          if (response.data.status == 'failed') {
            seterror_msg(true)
            // setErrorMessage('Unregistered email');
          }
          else {
            setsuccess_msg(true)
            setErrorMessage('');
            // alert("Mail sent successfully")
            setchange(true)
          }
        })
        .catch((error) => {
          console.error("Eror from handle prediction", error);
        });
      // setShowModal(false)
    }

  }


  const handleclose = () => {
    setShowModal(false)
    setchange(false)
  }
  //=================================== EMAIL ====================================
  const [isValidEmail, setIsValidEmail] = useState(true);

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
  const [isFocused4, setIsFocused4] = useState(false);
  const [isValidPass, setIsValidPass] = useState(true);
  const [passwd_changed, setpasswd_changed] = useState(false)

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
    setpasswd(inputVal);
    setIsValidPass(inputVal.trim() !== '' && inputVal.length >= 8);
    setpasswd_changed(true);
  };


  return (
    <>
      <button
        className="text-blue-600 text-left ml-3"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Forgot Password?
      </button>
      {showModal && !change && (
        <>
          <div
            className="scale-110  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            {error_msg && (
              <div id="alert-4" class="brightness-110 w- animate-pulse brightness-1250 absolute top-20 right-40 bottom- z-50 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 " role="alert">
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


            {already_msg && (
              <div id="alert-2" class="absolute top-24 right-20 bottom- z-20 animate-pulse  w- flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 " role="alert">
                <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div class="ms-3 text-sm font-medium">
                  {errorMessage}
                </div>
                <button type="button" onClick={() => setalready_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-2" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            )}
            <div className="relative w-[40%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-blue-700 ml-3">
                    Forgot Password
                  </h3>
                  <button
                    className=" background-transparent font-bold uppercase  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleclose}
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
                <div className="relative pt-5 pl-5 pr-5 flex-auto">

                  <div>
                    <input
                      type='text'
                      onBlur={handleBlur3}
                      onFocus={handleFocus3}
                      onChange={(e) => {
                        setemail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      placeholder='E-mail'
                      value={email}
                      className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                    </input>
                    {email == "" && (
                      <p className='text-red-500 mt-2  ml-2'>Email required</p>
                    )}
                    {!isValidEmail && isFocused3 && email != "" && (
                      <p className='text-red-500 mt-2  ml-2'>Invalid email format</p>
                    )}

                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleclose}
                  >
                    Close
                  </button> */}
                  <button
                    className="bg-gradient-to-tl w-[100%]  bg-blue-500 px-2 py-1 mb-  self-center rounded  text-white text-lg font-serif  active:bg-emerald-600   shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSubmit}
                  // setShowModal(false)
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 mt-7 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {showModal && change && (
        <>
          <div
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >


            {success_msg && (
              <div id="alert-3" class="absolute top-16 right-20 bottom- z-20  animate-pulse flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 " role="alert">
                <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div class="ms-3 text-sm font-medium">
                  Password changed successfully
                </div>
                <button type="button" onClick={() => setsuccess_msg(false)} class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-3" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            )}
 {error_msg && (
              <div id="alert-4" class="brightness-110 w- top-16 right-20 animate-pulse brightness-1250 absolute  bottom- z-50 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 " role="alert">
                <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="sr-only">Info</span>
                <div class="ms-3 text-sm font-medium">
                  Incorrect password
                </div>
                <button type="button" onClick={() => (seterror_msg(false))} class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-800 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-4" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
            )}
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-blue-700 ml-3">
                    Change Password
                  </h3>
                  <button
                    className="ml-36 mr-2 background-transparent font-bold uppercase  text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleclose}
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
                <div className="relative px-6 pb-6 flex-auto ">
                <div className="mb-5">
                    <input
                      type='text'
                      onBlur={handleBlur3}
                      onFocus={handleFocus3}
                      onChange={(e) => {
                        setchanged_passwd(e.target.value);
                        // validateEmail(e.target.value);
                      }}
                      placeholder='Changed password'
                      value={changed_passwd}
                      className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                    </input>
                    {
                      changed_passwd == ""  && (
                      <p className='absolute mt-[-5px] ml-2 text-red-500 text-sm'>Changed password required</p>
                      )}
                    {/* <label ><span className="mx-2">New password :</span>
                      <input onChange={(e) => { console.log(e.target.value); setchanged_passwd(e.target.value); }} type="text" /></label>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
                  </div>
                  <div className="mt-2">
                    <input
                      type='text'
                      onBlur={handleBlur4}
                      onFocus={handleFocus4}
                      onChange={(e) => {
                        setpasswd(e.target.value);
                        setIsValidPass(e.target.value.trim());
                        setpasswd_changed(true);
                      }}
                      placeholder='New password'
                      value={passwd}
                      className='placeholder-slate-600 py-3 px-3 w-[100%] rounded-md  focus:outline focus:outline-2 focus:outline-blue-700'>
                    </input>
                    {passwd === "" && passwd_changed && (
                      <p className='absolute mt-[-3px] ml-2 text-red-500 text-sm'>Password required</p>
                    )}
                    {!hasRequiredChars(passwd) && passwd !== "" && passwd_changed && (
                      <p className='absolute mt-[-3px] ml-2 text-red-500 text-sm'>
                        At least 8 character, 1 alphabet, 1 digit, and 1 special character
                      </p>
                    )}
                    {/* <label ><span className="mx-2">Changed password :</span>
                      <input onChange={(e) => { console.log(e.target.value); setpasswd(e.target.value); }} type="text" /></label>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
                  </div>
                
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleclose}
                  >
                    Close
                  </button> */}
                  <button
                    className="bg-gradient-to-tl w-[100%] mt-2 bg-blue-500 px-2 py-1 mb-  self-center rounded  text-white text-lg font-serif  "
                    type="button"
                    onClick={onSubmit1}
                  // setShowModal(false)
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 mt-7 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}