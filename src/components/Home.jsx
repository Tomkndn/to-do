// import React from 'react'

const Home = ({ setNewTask, setSignInGranted }) => {
  return (
    <div className="flex justify-center flex-col items-center mx-[20rem]">
      <div className="flex mt-[3.5rem] relative mb-8 w-[100%]">
        <h2 className="text-4xl font-semibold text-slate-100">
          Get things done.
        </h2>

        <button
          onClick={() => {
            setNewTask(0);
          }}
          className="text-lg font-medium rounded-2xl absolute right-[20%] bg-slate-200 p-3"
        >
          CREATE TASK
        </button>
        <button
          className="text-lg font-medium rounded-3xl absolute right-0 bg-slate-200 p-3"
           onClick={() => {
            setSignInGranted(0);
          }}
        >
          LOG OUT
        </button>
      </div>

      <hr className="border-2 w-[100%] border-slate-400" />

      <div className="flex relative w-[100%] mt-5">
        <input
          className="p-3 pl-12 w-[20rem] text-black-800 hover:bg-slate-300 rounded-lg bg-slate-200"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />

        <div className="absolute right-0">
          <select className="p-3  text-gray-500 hover:bg-slate-300 transition duration-200 ease-in-out bg-slate-200 border rounded-md shadow-sm outline-none  focus:border-indigo-600">
            <option>No filter</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Home
