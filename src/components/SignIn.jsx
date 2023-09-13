import './SignIn';

const SignIn = ({setSignIn}) => {
    function signUpHandler(){
        setSignIn(0)
    }
  return (
    <div className='flex items-center justify-center'>

      <div className='rounded-md border-2   bg-white p-10'>

        <h2 className='text-3xl font-bold mb-3'>Hello!</h2>
        
        <p className='text-sm font-light'>Fill your email and password to sign in.</p>
        
        <div className="my-3 ">
            
            <input type="email" className="p-2 w-[25rem] border text-base border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' required/>
            
        </div>
        <div className="mb-3">
            
            <input type="password" className="border border-slate-300 text-base rounded-md p-2 w-[25rem] hover:bg-slate-100 active:border-cyan-200" id="exampleInputPassword1" placeholder='Password' required/>
            
        </div><hr className='border-[1px] bg-black'/>
        
        <button type="submit" className="w-[100%] my-2 transition duration-200 ease-in-out text-white p-1 rounded-md bg-cyan-600 hover:bg-cyan-700">Sign In</button>
        
        <button onClick={signUpHandler} className="w-[100%] transition duration-200 ease-in-out text-xs p-1 rounded-md hover:bg-gray-200 ">DON&apos;T HAVE AN ACCOUNT? SIGN UP NOW!</button>
        
      </div>
      
    </div>
  )
}

export default SignIn;
