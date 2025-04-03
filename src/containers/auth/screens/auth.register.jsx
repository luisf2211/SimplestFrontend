import { Button, Field, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { authService } from '../../../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { toaster } from "../../../components/ui/toaster";

const AuthRegister = () => {
    const { register } = authService;

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { ok } = await register(formData);
        
        if (!ok) {
            toaster.create({
                title: "El usuario ya existe.",
                type: 'error'
            })
            return;
        }

        console.log('Form submitted:', formData);
        
        toaster.create({
            title: "Usuario creado satisfactoriamente.",
            type: 'success'
        });

        navigate('/login');
    };

    return (
        <form style={{ border: '1px solid rgba(205, 201, 201, 0.87)', width: 350, padding: 40, borderRadius: 14 }} onSubmit={handleSubmit}>
            <Text fontWeight={800} fontSize={25}>
                Register
            </Text>
            <br />
            <Field.Root required>
                <Field.Label>
                    Name <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your name" name='name' onChange={handleChange}/>
                <Field.HelperText>We'll never share your name.</Field.HelperText>
                <br />
                <Field.Label>
                    Email <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your email" name='email' onChange={handleChange} />
                <Field.HelperText>We'll never share your email.</Field.HelperText>
                <br />
                <Field.Label>
                    Password <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your password" type='password' name='password' onChange={handleChange}/>
                <Field.HelperText>We'll never share your credentials.</Field.HelperText>
            </Field.Root>
            <br />
            <Button width={'100%'} type='submit'>
                <Text fontWeight={800}>
                    Register
                </Text>
            </Button>
        </form>
    );
};

export default AuthRegister;