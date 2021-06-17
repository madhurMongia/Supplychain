import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import {AuthProvider} from "./components/contexts/authContext";
import {BlockProvider} from "./components/contexts/blockContext";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render( <BrowserRouter>
<BlockProvider>
<AuthProvider>
<App />
</AuthProvider>
</BlockProvider>
</BrowserRouter>,
     document.getElementById('root'));

