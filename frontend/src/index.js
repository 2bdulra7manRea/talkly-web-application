import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {QueryClientProvider , QueryClient} from "react-query"

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient} >
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
