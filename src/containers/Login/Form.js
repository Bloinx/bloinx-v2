/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { AccountContext } from "./accountContext";


export function Form(props) {
    
    const [active, setActive] = useState("signin");
    const switchToSignup = () => {
        setActive("signup");
    };

    const switchToSignin = () => {
        setActive("signin");
    };

    
    const switchToForgotPassword = () => {
        setActive("forgotPassword");
    };

    const contextValue = { switchToSignup, switchToSignin, switchToForgotPassword };


    return (
        <>
            <AccountContext.Provider value={contextValue}>
                {active === "signin" && (<LoginForm />)}
                {active === "signup" && (<SignupForm />)}
                {active === "forgotPassword" && (<ForgotPasswordForm />)}
            </AccountContext.Provider>
        </>
    );
};