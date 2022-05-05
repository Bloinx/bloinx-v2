import React, { useContext, useState } from "react";
import {
    Input,
    Button,
    Space,
    IconKey,
    IconMail,
    IconLock
} from '@supabase/ui';
import { AuthContext } from "./authContext";
import <su></su>pabase from "../../supabase";

export default function LoginForms(props) {
    const {switchToSignup } = useContext(AuthContext);
    const {switchToForgotPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const OnChangeInput = (e) => {
    
    switch (e.target.name) {
        console.table(e.target);
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
        console.log(email);
        //setLoading(true);
        const { user, error } = await supabase.auth.signIn({
          email,
          password,
        });
        if (user) {
        //go to dashboard\
        }
        if (error) {
          //setErrorD""""ata({ status: true, data: error.message });
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
                <Space direction="horizontal" style={{ textAlign: 'center' }} size ={2}>
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

