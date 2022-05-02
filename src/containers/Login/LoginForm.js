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
import supabase from "../../supabase";

export default function LoginForms(props) {
    const { switchToSignup } = useContext(AuthContext);
    const { switchToForgotPassword } = useContext(AuthContext);
    const [loading, setLoading] = useState(false); 






    return (
        <>

<form>            <Space direction={'vertical'}>
                <Space direction={'vertical'}>
                    <Input
                        label="Usdsuario"
 
                       style={{ width: '100%' }}
                        autoComplete="email"
                        icon={<IconMail size={21} stroke={'#666666'} />}
                        size="tiny"
                        name="email"
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        icon={<IconKey stroke={'#666666'} />}
                        size="tiny"
                        name="password"
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
	</form>                
        </>
    );
};

