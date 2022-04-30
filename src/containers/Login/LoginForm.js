import React, { useContext, useState } from "react";
import {
    Input,
    Button,
    Space,
    IconKey,
    IconMail,
    IconLock
} from '@supabase/ui';
import { AccountContext } from "./accountContext";
import supabase from "../../supabase";

export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const { switchToForgotPassword } = useContext(AccountContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleProviderSignIn = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signIn(
            {  })
        if (error) setError(error.message)
        setLoading(false)
    
    }


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
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        icon={<IconKey stroke={'#666666'} />}
                        size="tiny"
                    />
                </Space>
                <Space direction={'vertical'}>
                    <Button
                        htmlType="Entrar"
                        type="primary"
                        size="tiny"
                        style={{ "backgroundColor": "#f58f98", "width": "100%" }}
                        icon={<IconLock size={21} />}
                        loading={loading}
                        block
                    >
                        Entrar
                    </Button>
                </Space>
                <Space direction="horizontal" style={{ textAlign: 'center' }} size ={2}>
                    <Button 
                        type="link"
                        size="tiny"
                        onClick={switchToSignup}
                        style={{ "color": "#f58f98" }}                    
                    >
                        ¿No tienes una cuenta?
                    </Button>
                    <Button
                        type="link"
                        size="tiny"
                        onClick={switchToForgotPassword}  
                        style={{ "color": "#f58f98" }}   
                    >
                        ¿Olvidaste tu contraseña?
                    </Button>

                </Space>    
            </Space>
                
        </>
    );
}
