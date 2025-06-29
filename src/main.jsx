import BookContext from '../context/BookContext.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BookContext>
    <BrowserRouter>
    <Toaster
            position="top-center"
            reverseOrder={false}
          />
      <App />
    </BrowserRouter>
  </BookContext>


)
