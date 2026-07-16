import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UnitOperationProvider } from './context/UnitOperationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnitOperationProvider>
      <App />
    </UnitOperationProvider>
  </StrictMode>,
)
