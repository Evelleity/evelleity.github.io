import React from 'react'
import ReactDOM from 'react-dom/client'
// Switch to new design implementation. Original App kept in App.jsx for fallback.
import AppNew from './AppNew.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNew />
  </React.StrictMode>,
)
