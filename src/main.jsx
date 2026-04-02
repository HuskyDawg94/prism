import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Landing from './Landing.jsx'

function Root() {
  const [entered, setEntered] = useState(() => {
    return !!localStorage.getItem('prism_entered')
  })

  function handleEnter() {
    localStorage.setItem('prism_entered', 'true')
    setEntered(true)
  }

  if (entered) {
    return <App />
  }
  return <Landing onEnter={handleEnter} />
}

createRoot(document.getElementById('root')).render(<Root />)