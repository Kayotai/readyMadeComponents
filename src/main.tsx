import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './globalStyles/index.css'
import './globalStyles/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
