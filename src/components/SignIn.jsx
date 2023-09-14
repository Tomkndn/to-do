import "./SignIn";
import { useState } from 'react'
import { firebaseApp } from "../firebase";
import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignIn = ({ setSignIn, setSignInGranted }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // initialised auth instance
  const auth = getAuth(firebaseApp);

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let email = input.email;
    let password = input.password;

    // sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // ...
        setSignInGranted(1)
      })
      .catch((err) => {
        if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
        ) {
          setError("The email address or password is incorrect");
        } else {
          console.log(err.code);
          alert(err.code);
        }
      });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form
        className="rounded-md border-2 w-[50%] bg-white p-28"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="text-5xl font-bold mb-3">Hello!</h2>

        <p className="text-lg font-light">
          Fill your email and password to sign in.
        </p>
        {error ? (
          <p className="my-3 text-lg font-light bg-red-300 text-black">
            OOPS!!! {error}
          </p>
        ) : null}

        <div className="my-3 ">
          <input
            type="email"
            className="p-2 w-[100%] border text-lg border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border"
            onChange={handleChange}
            placeholder="email"
            value={input.email}
            required
            name="email"
            autoComplete="true"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="border w-[100%] border-slate-300 text-lg rounded-md p-2  hover:bg-slate-100 active:border-cyan-200"
            onChange={handleChange}
            placeholder="password"
            value={input.password}
            required
            name="password"
            autoComplete="true"
          />
        </div>
        <hr className="border-[1px] bg-black" />

        <button
          type="submit"
          className="w-[100%] my-2 text-lg transition duration-200 ease-in-out text-white p-1 rounded-md bg-cyan-600 hover:bg-cyan-700"
        >
          Sign In
        </button>

        <button
          onClick={() => {
            setSignIn(0);
          }}
          className="w-[100%] transition text-md duration-200 ease-in-out p-1 rounded-md hover:bg-gray-200"
        >
          DON&apos;T HAVE AN ACCOUNT? SIGN UP NOW!
        </button>
      </form>
    </div>
  );
};

export default SignIn;
