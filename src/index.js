import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebseContext } from './Store/Context';
import firebase from './Firebase/config';
import Context from './Store/Context';


ReactDOM.render(
<FirebseContext.Provider value={firebase}>
<Context>
<App />
</Context>
</FirebseContext.Provider>
,document.getElementById('root'));
