import {useState} from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const SignInOut = ({ setSignInGranted }) => {
  const [signIn, setSignIn] = useState(1);
  return (
    <div>
      {signIn ? (
        <SignIn setSignInGranted={setSignInGranted} setSignIn={setSignIn} />
      ) : (
        <SignUp setSignIn={setSignIn} />
      )}
    </div>
  );
};

export default SignInOut
