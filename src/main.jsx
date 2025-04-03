import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';


createRoot(document.getElementById('root')).render(
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
)
