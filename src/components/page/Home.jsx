import { useState } from "react";
import Task from "../Task";
import NoTask from "../NoTask";
import { BsSearch } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const [name, setName] = useState(null);
  const [empty, setEmpty] = useState(0);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");



  return (
    <div className="flex justify-center flex-col items-center lg:mx-[18rem] mx-5 ">
      <div className="flex mt-[3.5rem] relative mb-7 sm:mb-4 w-[100%]">
        <h2 className="lg:text-3xl md:text-xl sm:text-md font-semibold text-slate-100">
          <span className="lg:text-5xl md:text-3xl sm:text-3xl text-red-300">
            {name}!!!
          </span>{" "}
          <div className="sm:hidden">Get your things done.</div>
        </h2>

        <button
          onClick={() => {
            // setNewTask(0);
          }}
          className="lg:text-lg md:text-md sm:hidden font-medium rounded-2xl absolute right-[4rem] bg-slate-200 p-3"
        >
          CREATE TASK
        </button>
        <button
          onClick={() => {
            // setNewTask(0);
          }}
          className="lg:hidden md:hidden sm:text-sm font-medium rounded-2xl absolute right-[4rem] bg-slate-200 p-3"
        >
          <AiOutlinePlus className="text-xl" />
        </button>
        <button
          className="text-lg font-medium rounded-3xl absolute right-0 bg-slate-200 p-3"
          onClick={() => {
          }}
        >
          <BiLogIn className="lg:text-3xl md:text-2xl sm:text-xl" />
        </button>
      </div>
      <hr className="border-2 w-[100%] border-slate-400" />
      <div className="flex relative w-[100%] lg:my-5 md:my-3 sm:my-3">
        <div className="flex relative">
          <BsSearch className="z-10 absolute left-2 text-2xl sm:text-lg top-3 sm:top-4 text-slate-500" />
          <input
            className="p-3 pl-12 w-[20rem] sm:w-[100%] text-black-800 hover:bg-slate-300 rounded-lg bg-slate-200"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              const updatedProjects = projects.filter(
                (project) => project.title === search
              );
              setProjects(updatedProjects);
            }}
            value={search}
            aria-label="Search"
          />
        </div>
        <div className="absolute right-0 sm:hidden">
          <select className="p-3  text-gray-500 hover:bg-slate-300 transition duration-200 ease-in-out bg-slate-200 border rounded-md shadow-sm outline-none  focus:border-indigo-600">
            <option>No filter</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
      <div className="w-[100%]">
        {empty ? (
          projects.map((project, index) => (
            <Task
              key={index}
              title={project.title}
              date={project.date}
              description={project.description}
              // deleteTask={deleteTask}
            />
          ))
        ) : (
          <NoTask />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
