import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuraMetals from './AuraMetals.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuraMetals />
  </StrictMode>,
)
