import './App.css'
import {useState} from 'react'
import SignInOut from './components/SignInOut'
import HomeTask from './components/HomeTask'

function App() {

  const [signInGranted,setSignInGranted] = useState(0);
  const [uid, setUid] = useState(null);

  return (
    <>
      {signInGranted ? (
        <HomeTask uid={uid} setSignInGranted={setSignInGranted} />
      ) : (
        <SignInOut setUid={setUid} setSignInGranted={setSignInGranted} />
      )}
    </>
  );
}

export default App
