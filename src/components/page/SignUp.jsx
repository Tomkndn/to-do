import {useState} from 'react'
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignUp = ({setSignIn}) => {

      const [input, setInput] = useState({email: "", password: "" });
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
        
        const db = getDatabase();
        // creating a new user
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
                // console.log(userCredential.user.uid);
                set(ref(db, "users/" + userCredential.user.uid), {
                  username: input.name,
                  email: email,
                  password: password,
                })
                .then(() => {
                  toast.success("SignUp successfully")
                });
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
      <ToastContainer />
      <div
        // method='POST'
        className="rounded-md border-2 sm:w-[80%] bg-white lg:p-20 md:p-14 sm:p-6"
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <h2 className="lg:text-5xl font-bold lg:mb-3 md:text-3xl sm:text-lg sm:mb-1">
          JOIN US...
        </h2>

        <p className="lg:text-lg md:text-md sm:text-xs font-light">
          Fill your name, email and password for sign up.
        </p>
        {error ? (
          <p className="lg:my-3 lg:text-lg md:my-2 md:text-md sm:my-1 sm:text-xs font-light bg-red-300 text-black">
            {error}
          </p>
        ) : null}

        <div className="lg:my-3 md:my-2 sm:my-1">
          <input
            type="name"
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-xs border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 "
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
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-xs border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 "
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
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-xs border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 "
            onChange={handleChange}
            value={input.password}
            name="password"
            required
            autoComplete="true"
            placeholder="Password"
          />
        </div>
        <ul className="lg:text-sm lg:p-3 md:p-2 text-xs sm:hidden">
          <li className="text-slate-700">
            Passwords must contain at least 1 upper case letter.
          </li>
          <li className="text-slate-700">
            Password length must be greater than 7 and less than 21.
          </li>
        </ul>
        <hr className="border my-2 border-slate-400" />

        <div className="lg:block flex ">
          <button
            type="submit"
            onClick={handleSubmit}
            className="lg:w-[100%] w-[45%] md:inline lg:my-2 my-1 lg:text-lg p-1 md:text-md sm:text-sm transition duration-200 ease-in-out text-white lg:p-1 rounded-md bg-cyan-600 hover:bg-cyan-700"
          >
            Sign Up
          </button>

          <button
            onClick={() => {
              setSignIn(1);
            }}
            className="lg:hidden w-[45%] transition md:text-md sm:text-sm  duration-200 ease-in-out p-1 rounded-md hover:bg-gray-200"
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setSignIn(1);
            }}
            className="w-[100%] md:hidden sm:hidden transition text-md duration-200 ease-in-out p-1 rounded-md hover:bg-gray-200"
          >
            HAVE AN ACCOUNT? SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
