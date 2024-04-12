import { useState,useEffect } from "react";
import Task from "../Task";
import NoTask from "../NoTask";
import { BsSearch } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../supabase";

const Home = ({ setNewTask, setSignInGranted, uid }) => {
  const [name, setName] = useState(null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect( () =>  {
    async function handle() {
      const { data: users, error } = await supabase
        .from("users")
        .select('*')
        .eq('uuid', uid);
      setName(users[0].username.toUpperCase());
      setProjects(users[0].task );
    }
    handle();
  }, [uid])

  async function deleteTask(title) {
    try{
      const updatedProjects = projects.filter(
        (project) => project.title !== title
      );
      
      const { error } = await supabase
      .from("users")
      .update({ task: updatedProjects })
      .eq("uuid", uid);
      
      if (error) {
        toast.error("Error deleting task:", error);
      }

      setProjects(updatedProjects);
      toast.success("Task deleted successfully");

    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
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
            setNewTask(0);
          }}
          className="lg:text-lg md:text-md sm:hidden font-medium rounded-2xl absolute right-[4rem] bg-slate-200 p-3"
        >
          CREATE TASK
        </button>
        <button
          onClick={() => {
            setNewTask(0);
          }}
          className="lg:hidden md:hidden sm:text-sm font-medium rounded-2xl absolute right-[4rem] bg-slate-200 p-3"
        >
          <AiOutlinePlus className="text-xl" />
        </button>
        <button
          className="text-lg font-medium rounded-3xl absolute right-0 bg-slate-200 p-3"
          onClick={() => {
            toast.warning("SignOut Successfully !");
            setSignInGranted(0);
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
              //   const updatedProjects = projects.filter(
              //     (project) => project.title === search
              //   );
              //   setProjects(updatedProjects);
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
        {projects && projects.length  ? (
          projects.map((project, index) => (
            <Task
              key={index}
              title={project.title}
              date={project.date}
              description={project.description}
              deleteTask={deleteTask}
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
