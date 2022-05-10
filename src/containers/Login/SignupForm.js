import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";


export default function SignupForm(props) {
    const { switchToSignin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [alias, setAlias] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('');

    const OnChangeInput = (e) => {
        switch (e.target.name) {
            case "alias":
                setAlias(e.target.value)
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "password2":
                setPassword2(e.target.value);
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
        
        const { user, session, error } = await supabase.auth.signUp(
            {
                "alias": alias,
                "email": email,
                "password": password,
                "firstname": nombre,
                "lastname": apellido,
                "phone": telefono                
            },
            {
                data: {
                    first_name: 'John',
                    age: 27,
                }
            }
        
        );
        console.log(user);
        console.log(session);
        console.log(error);
        if (user) {
            console.log("Usuario creado con exito ");
            navigate("/register");
            //go to dashboard
        }
        if (error) {
            //setErrorData({ status: true, data: error.message });\
            console.log("error");
        }
    };


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
                            onChange={OnChangeInput}
                            icon={<IconMail size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Usuario"
                            size="tiny"
                            name="alias"
                            value={alias}
                            autoComplete="email"
                            onChange={OnChangeInput}

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
                            onChange={OnChangeInput}
                            autoComplete="current-password"
                            icon={<IconKey size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Repetir Contraseña"
                            size="tiny"
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={OnChangeInput}
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
                            onChange={OnChangeInput}
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Apellido"
                            size="tiny"
                            name="apellido"
                            value={apellido}
                            onChange={OnChangeInput}
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Telefono"
                            name="telefono"
                            value={telefono}
                            size="tiny"
                            onChange={OnChangeInput}
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
                            onClick={handleSignup}      
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

