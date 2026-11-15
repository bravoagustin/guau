import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/700.css'
import '@fontsource/national-park/400.css'
import '@fontsource/national-park/700.css'
import './tokens.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
