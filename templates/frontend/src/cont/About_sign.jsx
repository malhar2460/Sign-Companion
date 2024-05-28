import React, { useState, useEffect } from "react";
import axios from 'axios';
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

export default function About_sign() {
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

    const handleclose = () => {
        sessionStorage.setItem('modal',false)
        setShowModal(false)
        setchange(false)
    }

    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const Clean = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    useEffect(() => {
        if (showModal) {
            // Scroll to the top of the document when the modal is shown
            document.documentElement.scrollTop = 0;
        }
    }, [showModal]);
    return (
        <>
            <button
                className=" text-left  ml-3 py-[0.4%] text-black border border-black    px-1  rounded-md hover:scale-110 shadow-sm shadow-black hover:shadow-md hover:shadow-black "
                type="button"
                onClick={() => setShowModal(true)}
            >
                Know about signs
            </button>
            {showModal && !change && (
                <>
                    <div
                        style={{ scrollbarWidth: "none" }} className="top-0 scale-110 ml-[22%] rounded-lg overflow-y-scroll  w-[60%] mb-20 mt-10 h-[85%] pt-[30%] justify-center items-center flex overflow-x-hidden  fixed bg-white inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  w-[100%] mb-6 mt-0 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-blue-700 ml-3">
                                        Indian sign language 
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
                                {/* <div className="relative pt-5 pl-5 pr-5 flex-auto"> */}
                                <div className="flex flex-row flex-wrap justify-center mx-2 mt-5 gap-2 mb-10">
                                    {Clean.map((item, index) => (
                                        <div key={index} className={item === ' ' ? "flex items-center justify-center w-28 h-28" : "outline outline-2 outline-black group pt-1 hover:scale-[106%]"}>
                                            {item !== ' ' && <p className="font-semibold group-hover:scale-110">{item}</p>}
                                            {item !== ' ' &&   <img key={item} src={require('../' + item + '.jpg')} className="w-28 h-28" alt="" /> }
                                            
                                        </div>
                                    ))}
                                </div>

                                {/* </div> */}

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 rounded-2xl fixed inset-0 z-40 bg-black"></div>
                </>
            )}

        </>
    );
}