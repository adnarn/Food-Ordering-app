import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './stores/rootStore.js';
import { CartProvider } from './stores/contex/CartContex.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
      <Provider store={store}>
            <App />
      </Provider>
  </CartProvider>,
)