import { Box, Button, Field, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toaster } from "../../../components/ui/toaster";
import { authService } from '../../../service/auth.service';

const AuthScreen = ({ children }) => {
    const { login } = authService;

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { ok, value } = await login(formData);

        if (!ok) {
            toaster.create({
                title: "Credenciales incorrectas.",
                type: 'error'
            })
            return;
        }

        localStorage.setItem('accessToken', value.accessToken);

        toaster.create({
            title: "Loggeado satisfactoriamente.",
            type: 'success'
        });

        navigate('/products');
    };

    return (
        <form style={{ border: '1px solid rgba(205, 201, 201, 0.87)', width: 350, padding: 40, borderRadius: 14 }} onSubmit={handleSubmit}>
            <Text fontWeight={800} fontSize={25}>
                Login
            </Text>
            <br />
            <Field.Root required>
                <Field.Label>
                    Email <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your email" onChange={handleChange} name='email' />
                <Field.HelperText>We'll never share your email.</Field.HelperText>
                <br />
                <Field.Label>
                    Password <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your password" type='password' onChange={handleChange} name='password' />
                <Field.HelperText>We'll never share your credentials.</Field.HelperText>
            </Field.Root>
            <br />
            <Button width={'100%'} type='submit'>
                <Text fontWeight={800}>
                    Login
                </Text>
            </Button>
            <br />
            <br />
            <Button width={'100%'} variant={'ghost'} onClick={() => navigate('/register')}>
                <Text fontWeight={800}>
                    Register
                </Text>
            </Button>
        </form>
    );
};

export default AuthScreen;