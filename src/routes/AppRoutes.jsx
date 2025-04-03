import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthScreen from '../containers/auth/screens/auth.screen';
import Layout from '../layouts/_Layout';
import AuthRegister from '../containers/auth/screens/auth.register';
import ProductContainer from '../containers/products/product.container';
import PrivateRoute from '../components/PrivateRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={"/login"} element={
                <Layout>
                    <AuthScreen />
                </Layout>
            } />
            
            <Route path={"*"} element={
                <Layout>
                    <AuthScreen />
                </Layout>
            } />
            
            <Route path="/register" element={
                <Layout>
                    <AuthRegister />
                </Layout>
            } />
            
            <Route path="/products" element={
                <PrivateRoute>
                    <Layout>
                        <ProductContainer />
                    </Layout>
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;