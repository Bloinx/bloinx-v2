import React, {  useContext, useState } from "react";
import {
    Input,
    Button,
    Space,
    IconKey,
    IconMail,
    IconUser,
    IconLock,
    IconArchive,
    Select,
    IconPhone
} from '@supabase/ui';
import supabase from "../../supabase";

import { AuthContext } from "./authContext";


export default function  SignupForm (props) {
    const { switchToSignin } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [alias, setAlias] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender ] = useState('');
    
    const OnChangeInput = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "nombre":
                setNombre(e.target.value);
                break;
            case "apellido":
                setApellido(e.target.value);
                break;
            case "telefono":
                setTelefono(e.target.value);
                break;

            default:
                break;
        }
    }
    const handleSignup = async () => {
        console.log(email);
        //setLoading(true);
        const { user, error } = await supabase.auth.signUp({
            email,  
            password,
            nombre,
            apellido,
            telefono,
        });
        if (user) {
            //go to dashboard
        }
        if (error) {
            //setErrorData({ status: true, data: error.message });
            console.log("error");
        }
    }

    return (
        <>
           


                <Space size={6} direction={'vertical'}>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Correo"
                            size="tiny"
                            name="email"
                            value={email}
                            autoComplete="email"    
                            icon={<IconMail size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Usuario"
                            size="tiny"
                            name="alias"
                            value={alias}
                            icon={<IconUser size={21} stroke={'#666666'} />} 

                        />
                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Contraseña"
                            size="tiny"
                            name="password"
                            value={password}
                            type="password"
                            autoComplete="current-password"
                            icon={<IconKey size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Repetir Contraseña"
                            size="tiny"
                            type="password"
                            name="password2"
                            value={password2}
                            autoComplete="current-password"
                            icon={<IconKey size={21} stroke={'#666666'} />}
                        />

                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Nombre"
                            name="nombre"
                            value={nombre}
                            size="tiny"
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Apellido"
                            size="tiny"
                            name="apellido"
                            value={apellido}
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Telefono"
                            name="telefono"
                            value={telefono}
                            size="tiny"
                            icon={<IconPhone size={21} stroke={'#666666'} />}
                        />
                        <Select label="Genero" 
                        name="gender"
                        value={gender}
                        icon={<IconUser />}>
                            <Select.Option>Masculino</Select.Option>
                            <Select.Option>Femenino</Select.Option>
                        </Select>
                    </Space>    
                        <Space size={1} direction={'vertical'}>
                            <Button
                                htmlType="Button"
                                type="primary"
                                style={{ "backgroundColor": "#f58f98", width: "100%" }} q
                                icon={<IconLock size={21} />}
                            >
                                Registrar
                            </Button>
                        </Space>
                        <Space size={1} direction={'vertical'}>
                            <Button
                                htmlType="Button"
                                type="link"
                                size="tiny"
                                onClick={switchToSignin}
                                style={{ "color": "#f58f98" }}
                            >
                                ¿Ya tienes una cuenta?
                            </Button>

                        </Space>
                    </Space> 
                    </>
    );
};

