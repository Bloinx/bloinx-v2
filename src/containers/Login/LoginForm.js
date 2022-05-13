import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Input,
    Button,
    Space,
    IconKey,
    IconMail,
    IconLock,
    Alert
} from '@supabase/ui';
import { AuthContext } from "./authContext";
import supabase from "../../supabase";

export default function LoginForms(props) {
    const { switchToSignup } = useContext(AuthContext);
    const { switchToForgotPassword } = useContext(AuthContext);
    const {setMessage} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const OnChangeInput = (e) => {

        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }

    }
    const handleLogin = async () => {
 
        //setLoading(true);
        const { user, error } = await supabase.auth.signIn({email, password});
        console.log(user);  
        console.log(error);
        if (user) {
             console.log("sesion iniciada");

            navigate("/register");
            //go to dashboard\
        }
        if (error) {
            setMessage(error.message,2);
            console.log("error");
        }
    };




    return (
        <>

            <Space direction={'vertical'}>
                <Space direction={'vertical'}>
                    <Input
                        label="Usdsuario"

                        style={{ width: '100%' }}
                        autoComplete="email"
                        icon={<IconMail size={21} stroke={'#666666'} />}
                        size="tiny"
                        name="email"
                        value={email}
                        onChange={OnChangeInput}
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        icon={<IconKey stroke={'#666666'} />}
                        size="tiny"
                        name="password"
                        value={password}
                        onChange={OnChangeInput}
                    />
                </Space>
                <Space direction={'vertical'}>
                    <Button
                        htmlType="Entrar"
                        type="primary"
                        size="tiny"
                        style={{ "backgroundColor": "#f58f98", "width": "100%" }}
                        icon={<IconLock size={21} />}
                        onClick={handleLogin}
                        loading={false}
                        block
                    >
                        Entrar
                    </Button>
                </Space>
                <Space direction="horizontal" style={{ textAlign: 'center' }} size={2}>
                    <Button
                        type="link"
                        onClick={switchToSignup}
                        style={{ "color": "#f58f98" }}
                        size="tiny"
                        block
                    >
                        ¿No tienes una cuenta?
                    </Button>
                    <Button
                        type="link"
                        onClick={switchToForgotPassword}
                        style={{ "color": "#f58f98" }}
                        size="tiny"
                        block
                    >

                        ¿Olvidaste tu contraseña?
                    </Button>



                </Space>

            </Space>
        </>
    );
};

