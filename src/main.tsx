import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { BlogProvider } from './providers/BlogProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogProvider>
    <App />
    </BlogProvider>
  </StrictMode>,
)
