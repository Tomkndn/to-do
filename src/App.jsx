import './App.css'
import {useState} from 'react'
import SignInOut from './components/SignInOut'
import HomeTask from './components/HomeTask'

function App() {

  const [signInGranted,setSignInGranted] = useState(0);

  return (
    <>
      {signInGranted ? (
        <HomeTask setSignInGranted={setSignInGranted} />
      ) : (
        <SignInOut setSignInGranted={setSignInGranted} />
      )}
    </>
  );
}

export default App
