import {useState} from 'react'

import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  const [signIn,setSignIn] = useState(1)
  return (
    <>
    {signIn?
    <SignIn setSignIn={setSignIn}/>:
    <SignUp setSignIn={setSignIn}/>
    }
    </>
  )
}

export default App
