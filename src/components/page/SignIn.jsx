import "./SignIn";
import { useState } from 'react'
import { firebaseApp } from "../../firebase";
import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ setSignIn, setSignInGranted, setUid }) => {
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
        setUid(userCredential.user.uid)
        // ...
      })
      .then(()=>{toast.success("Login Successfully !");})
      setSignInGranted(1)
      .catch((err) => {
        if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
          ) {
            setError("The email address or password is incorrect");
            toast.error("Input Valid Credentials.")
          } else {
            toast.error(err.code);
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
      <ToastContainer />
      <form
        className="rounded-md border-2 bg-white w-[40%] lg:p-20 md:p-14 sm:p-6 sm:w-[70%]"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold lg:text-5xl lg:mb-3 md:text-3xl sm:text-xl sm:mb-1">
          Hello!
        </h2>

        <p className="lg:text-lg md:text-md sm:text-sm font-light">
          Fill your email and password to sign in.
        </p>
        {error ? (
          <p className="lg:my-3 lg:text-lg md:my-2 md:text-md sm:my-1 sm:text-sm font-light bg-red-300 text-black">
            OOPS!!! {error}
          </p>
        ) : null}

        <div className="lg:my-3 md:my-2 sm:my-1">
          <input
            type="email"
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-sm border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 "
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
            className="border w-[100%] border-slate-300 lg:text-lg md:text-md sm:text-sm rounded-md lg:p-2 p-1  hover:bg-slate-100 active:border-cyan-200 "
            onChange={handleChange}
            placeholder="password"
            value={input.password}
            required
            name="password"
            autoComplete="true"
          />
        </div>
        <hr className="border-[1px] bg-black" />

        <div className="lg:block flex ">
          <button
            type="submit"
            className="lg:w-[100%] w-[45%] md:inline lg:my-2 my-1 lg:text-lg p-1 md:text-md sm:text-sm transition duration-200 ease-in-out text-white lg:p-1 rounded-md bg-cyan-600 hover:bg-cyan-700"
          >
            Sign In
          </button>

          <button
            onClick={() => {
              setSignIn(0);
            }}
            className="lg:hidden w-[45%] transition md:text-md sm:text-sm  duration-200 ease-in-out p-1 rounded-md hover:bg-gray-200"
          >
            SIGN UP
          </button>
          <button
            onClick={() => {
              setSignIn(0);
            }}
            className="w-[100%] md:hidden sm:hidden transition text-md duration-200 ease-in-out p-1 rounded-md hover:bg-gray-200"
          >
            DON&apos;T HAVE AN ACCOUNT? SIGN UP NOW!
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
