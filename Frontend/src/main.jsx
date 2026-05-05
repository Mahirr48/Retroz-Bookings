import { createRoot } from 'react-dom/client'
import "./Style/index.css"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

document.documentElement.classList.toggle(
  "dark",
  savedTheme ? savedTheme === "dark" : prefersDark
);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
