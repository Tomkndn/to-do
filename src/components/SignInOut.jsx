import {useState} from 'react'
import SignIn from './page/SignIn'
import SignUp from './page/SignUp'

const SignInOut = ({ setSignInGranted, setUid }) => {
  const [signIn, setSignIn] = useState(1);
  return (
    <div>
      {signIn ? (
        <SignIn
          setSignInGranted={setSignInGranted}
          setSignIn={setSignIn}
          setUid={setUid}
        />
      ) : (
        <SignUp setSignIn={setSignIn} />
      )}
    </div>
  );
};

export default SignInOut
