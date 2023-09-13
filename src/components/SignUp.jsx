// import React from 'react'

const SignUp = ({setSignIn}) => {
    function signInHandler(){
        setSignIn(1)
    }
  return (
    <div className='flex items-center justify-center'>

      <div className='rounded-md border-2   bg-white p-10'>

        <h2 className='text-3xl font-bold mb-3'>JOIN US...</h2>
        
        <p className='text-sm font-light'>Fill your name, email and password for sign up.</p>
        
        <div className="my-3 ">
            
          <input type="name" className="p-2 w-[25rem] border text-base border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Username'/>
            
        </div>
        <div className="my-3 ">
            
          <input type="email" className="p-2 w-[25rem] border text-base border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Email'/>
            
        </div>
        <div className="mb-3">
            
          <input type="password" className="border border-slate-300 text-base rounded-md p-2 w-[25rem] hover:bg-slate-100 active:border-cyan-200" id="exampleInputPassword1" placeholder='Password' />
            
        </div>
        <ul className="text-sm">
          <li>Passwords must contain at least 1 upper case letter.</li>
          <li>Password length must be greater than 7 and less than 21.</li>
        </ul>
        <hr className='border-[1px] bg-black'/>
        
        <button type="submit" className="w-[100%] my-2 transition duration-200 ease-in-out text-white p-1 rounded-md bg-cyan-600 hover:bg-cyan-700">Sign Up</button>
        
        <button onClick={signInHandler} className="w-[100%] transition duration-200 ease-in-out text-xs p-1 rounded-md hover:bg-gray-200 ">HAVE AN ACCOUNT? SIGN In</button>
        
      </div>
      
    </div>
  )
}

export default SignUp;
