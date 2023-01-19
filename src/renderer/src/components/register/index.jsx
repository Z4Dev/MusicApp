import './style.css';
import { React, useRef,useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';;
import { AiOutlineCheck } from 'react-icons/ai';
import { BsShieldX } from 'react-icons/bs';
import {MdOutlineLockClock,MdFacebook} from 'react-icons/md';
import {IoLogoGoogle} from 'react-icons/io'

const register = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const rpasswordRef = useRef(null)
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
            else {
                if(Input.repeat_password) {
                    if(passwordRef.current.value != rpasswordRef.current.value) {
                        setInput(Object.assign({}, Input, { repeat_password: false }))
                    }
                }
                else {
                    if(passwordRef.current.value == rpasswordRef.current.value) {
                        setInput(Object.assign({}, Input, { repeat_password: true }))
                    }
                }
            }
        }
        else {
            if(Input.password) {
                setInput(Object.assign({}, Input, { password: false }))
            }
            if(Input.repeat_password) {
                setInput(Object.assign({}, Input, { repeat_password: false }))
            }
        }
    }

    const handlerpass = () => {
        if(passwordRef.current.value == rpasswordRef.current.value) {
            if(Input.password && !Input.repeat_password) {
                setInput(Object.assign({}, Input, { repeat_password: true }))
            }
        }
        else {
            if(Input.repeat_password) {
                setInput(Object.assign({}, Input, { repeat_password: false }))
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
                        <input type="text" placeholder='Email' className="form_inputs" onChange={handleemail} ref={emailRef} maxLength={28}/>
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
                        <input type="password" placeholder='Password' className="form_inputs" onChange={handlepass} ref={passwordRef} maxLength={15}/>
                        {Input.password?
                            <AiOutlineCheck className='second_icon' color={'#55A940'} size={18}/>:
                            <BsShieldX className='second_icon' color={'#C02B2B'} size={18}/>
                        }
                    </div>
                    <div className="separator"></div>
                </div>

                <div className="form_input spacing">
                    <div className="inline">
                        <MdOutlineLockClock className='icon2 icon' size={22}/>
                        <input type="password" placeholder='Repeat Password' className="form_inputs" onChange={handlerpass} ref={rpasswordRef}/>
                        {Input.repeat_password?
                            <AiOutlineCheck className='second_icon' color={'#55A940'} size={18} maxLength={15}/>:
                            <BsShieldX className='second_icon' color={'#C02B2B'} size={18}/>
                        }
                    </div>
                    <div className="separator"></div>
                </div>
                <div className="button">Sign Up</div>
                <div className="text_or">Or</div>
                <div className="button_login"><IoLogoGoogle size={24} color={"#FFFFFF"} className='login_logo'/> Continue With Google</div>
                <div className="button_login2"><MdFacebook size={24} color={"#FFFFFF"} className='login_logo2'/> Continue With Facebook</div>
            </div>
        </div>
    )
}

export default register;