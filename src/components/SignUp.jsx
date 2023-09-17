import {useState} from 'react'
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { firebaseApp } from "../firebase";

const SignUp = ({setSignIn}) => {

    function signInHandler(){
        setSignIn(1)
    }

      const [input, setInput] = useState({ name:"", email: "", password: "" });
      const [error, setError] = useState(null);

      // initialised auth instance
      const auth = getAuth(firebaseApp);

      // handle form submit
      const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        // let name = input.name;
        let email = input.email;
        let password = input.password;

        // creating a new user
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            console.log(userCredential.user);
            alert("SignUp Successfully.")
            setSignIn(1)
            // ...
          })
          .catch((err) => {
            if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
              setError("The password is too weak.");
            } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
              setError("The email address is already in use.");
            } else {
              setError("Some error occured!!!. try later");
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
        method='POST'
        className="rounded-md border-2   bg-white p-20"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="text-5xl font-bold mb-3">JOIN US...</h2>

        <p className="text-lg font-light">
          Fill your name, email and password for sign up.
        </p>
        {error ? (
          <p className="my-3 text-lg font-light bg-red-300 text-black">
            {error}
          </p>
        ) : null}

        <div className="my-3 ">
          <input
            type="name"
            className="p-2 w-[25rem] border text-lg border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border"
            name="name"
            onChange={handleChange}
            value={input.name}
            required
            autoComplete="true"
            placeholder="Username"
          />
        </div>
        <div className="my-3 ">
          <input
            type="email"
            className="p-2 w-[25rem] border text-lg border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border"
            name="email"
            onChange={handleChange}
            value={input.email}
            required
            autoComplete="true"
            placeholder="Email"
          />
        </div>
        <div className="">
          <input
            type="password"
            className="border border-slate-300 text-lg rounded-md p-2 w-[25rem] hover:bg-slate-100 active:border-cyan-200"
            onChange={handleChange}
            value={input.password}
            name="password"
            required
            autoComplete="true"
            placeholder="Password"
          />
        </div>
        <ul className="text-sm p-3">
          <li className="text-slate-700">
            Passwords must contain at least 1 upper case letter.
          </li>
          <li className="text-slate-700">
            Password length must be greater than 7 and less than 21.
          </li>
        </ul>
        <hr className="border border-slate-400" />

        <button
          type="submit"
          // onClick={handleSubmit}
          className=" text-lg w-[100%] my-2 transition duration-200 ease-in-out text-white p-1 rounded-md bg-cyan-600 hover:bg-cyan-700"
        >
          Sign Up
        </button>

        <button
          onClick={signInHandler}
          className="w-[100%] transition duration-200 ease-in-out text-md p-1 rounded-md hover:bg-gray-200 "
        >
          HAVE AN ACCOUNT? SIGN IN
        </button>
      </form>
    </div>
  );
}

export default SignUp;
