import { AbsoluteCenter } from '@chakra-ui/react';
import React from 'react';
import { Toaster } from "../components/ui/toaster";

const Layout = ({ children }) => {
    return (
        <AbsoluteCenter>
            <Toaster />
            {children}
        </AbsoluteCenter>
    );
};

export default Layout;