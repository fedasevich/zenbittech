import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { GlobalStyles } from './components/Global.ts';
import { setupStore } from './store/store.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <Toaster position="top-right" reverseOrder={false} />

    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
