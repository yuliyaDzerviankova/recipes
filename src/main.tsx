import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CardDetails } from "./components/common"
import { Provider } from "./components/ui/provider"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<CardDetails />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
