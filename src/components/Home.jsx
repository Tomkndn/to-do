import { getDatabase, ref, child,get,onValue,remove} from "firebase/database";
import { useEffect } from "react";
import { useState} from 'react'
import Task from "./Task";
import NoTask from "./NoTask";
import { BsSearch } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ setNewTask, setSignInGranted, uid}) => {
  const [name, setName] = useState(null);
  const [empty, setEmpty] = useState(0);
  const [projects,setProjects] = useState([]);

  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const starCountRef = ref(db, "users/" + uid + "/task");
  get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    setName(snapshot.val().username);
    if (snapshot.exists()&&projects.length) {
      setEmpty(1);
    } else {
      setEmpty(0);
    }
    });

    useEffect(() => {
      onValue(starCountRef, (snapshot) => {
        const newProject = []
        Object.values(snapshot.val()).forEach((val) => {
          const data = {
            title :val.title,
            date :val.date,
            description :val.description,
          }
          newProject.push(data);
        });
        setProjects(newProject)
      });
    }, [uid]);

    function deleteTask(title){
      // alert("Hello")
      const updatedProjects = projects.filter(
        (project) => project.title !== title
      );
      setProjects(updatedProjects);

      get(starCountRef)
      .then((snapshot) => {
          const tasks = snapshot.val();
          // Find the task with the matching title and delete it
          Object.keys(tasks).forEach((taskId) => {
            if (tasks[taskId].title === title) {
              const taskRefToDelete = ref(db, `users/${uid}/task/${taskId}`);
              remove(taskRefToDelete)
                .then(() => {
                  toast.error("Task deleted successfully");
                  // Update the state if needed
                })
                .catch((error) => {
                  toast.error("Error deleting task:", error);
                });
            }
          });
        
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    }

    function SignOut() {
      toast.warning("SignOut Successfully !");
    }

  return (
    <div className="flex justify-center flex-col items-center mx-[20rem]">
      <div className="flex mt-[3.5rem] relative mb-7 w-[100%]">
        <h2 className="text-3xl font-semibold text-slate-100">
          <span className="text-5xl text-red-300">{name}!!!</span> Get your
          things done.
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
          onClick={()=>{SignOut();setSignInGranted(0);}}
        >
          <BiLogIn className="text-3xl" />
        </button>
      </div>
      <hr className="border-2 w-[100%] border-slate-400" />
      <div className="flex relative w-[100%] my-5">
        <div className="flex relative">
          <BsSearch className="z-10 absolute left-2 text-2xl top-3 text-slate-500" />
          <input
            className="p-3 pl-12 w-[20rem] text-black-800 hover:bg-slate-300 rounded-lg bg-slate-200"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="absolute right-0">
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
