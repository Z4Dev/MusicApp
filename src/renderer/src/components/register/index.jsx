import './style.css';
import { React, useRef,useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';;
import { AiOutlineCheck } from 'react-icons/ai';
import { BsShieldX } from 'react-icons/bs';
import {MdOutlineLockClock} from 'react-icons/md';

const register = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [Input,setInput] = useState(
        {
            email: false,
            password: false,
            repeat_password: false
        }
    )
    const handleemail = () => {
        if(emailRef.current.value) {
            if(!Input.email) {
                setInput(Object.assign({}, Input, { email: true }))
            }
        }
        else {
            if(Input.email) {
                setInput(Object.assign({}, Input, { email: false }))
            }
        }
    }

    const handlepass = () => {
        if(passwordRef.current.value) {
            if(!Input.password) {
                setInput(Object.assign({}, Input, { password: true }))
            }
        }
        else {
            if(Input.password) {
                setInput(Object.assign({}, Input, { password: false }))
            }
        }
    }


    return (
        <div className="register_page">
            <div className="header">
                <div className="header_title">Are you a member? <span className='header_subtitle'>Login</span></div>
            </div>
            <div className="form">

                <div className="form_input">
                    <div className="inline">
                        <FaUser className='icon' size={20}/>
                        <input type="text" placeholder='Email' className="form_inputs" onChange={handleemail} ref={emailRef}/>
                        {Input.email?
                            <AiOutlineCheck className='second_icon' color={'#55A940'} size={18}/>:
                            <BsShieldX className='second_icon' color={'#C02B2B'} size={18}/>
                        }
                    </div>
                    <div className="separator"></div>
                </div>

                <div className="form_input spacing">
                    <div className="inline">
                        <MdOutlineLockClock className='icon2 icon' size={22}/>
                        <input type="password" placeholder='Password' className="form_inputs" onChange={handlepass} ref={passwordRef}/>
                        {Input.password?
                            <AiOutlineCheck className='second_icon' color={'#55A940'} size={18}/>:
                            <BsShieldX className='second_icon' color={'#C02B2B'} size={18}/>
                        }
                    </div>
                    <div className="separator"></div>
                </div>
                
            </div>
        </div>
    )
}

export default register;