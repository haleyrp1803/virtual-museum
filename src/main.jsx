/**
 * Browser entry point.
 *
 * Loads global styling, runs development-only cross-file data validation, and
 * mounts the React application inside Strict Mode.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { assertValidCourseData } from './data/validateCourseData.js'

// Run cross-file ID checks only while developing locally. Production output
// remains unchanged, while broken navigation/data references fail loudly.
if (import.meta.env.DEV) assertValidCourseData()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
