import { getDatabase, ref, push} from "firebase/database";
import {useState} from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewTask = ({setNewTask,uid}) => {

    const [input, setInput] = useState({ title: "", date: "", description: ""});
    const db = getDatabase();
    function createTask(e){
      e.preventDefault();
      const data = {
      title: input.title,
      date: input.date,
      description: input.description,
      }
      const newTaskRef = push(ref(db, "users/" + uid +"/task"),data);
      newTaskRef
      .then(() => {
        toast.success('Task added successfully');
      })
      .catch((error) => {
        toast.error('Error adding task:', error);
      });
      setNewTask(1)
    }

    const handleChange = (e) => {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <ToastContainer />
      <form className="rounded-md border-2  relative bg-white lg:p-20 p-10 sm:p-5 sm:mx-9 ">
        <AiOutlineArrowLeft
          className="absolute lg:top-9 lg:left-7 md:top-5 md:left-5 sm:top-2 sm:left-3 cursor-pointer lg:text-4xl md:text-2xl sm:text-lg"
          onClick={() => {
            setNewTask(1);
          }}
        />
        <h2 className="lg:text-5xl md:text-3xl sm:text-xl font-bold mb-3">
          Create a new task.
        </h2>

        <p className="lg:text-lg md:text-sm sm:text-xs font-light">
          Provide information about the task you wish to complete.
        </p>

        <div className="my-3">
          <input
            type="text"
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-sm border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200"
            id="exampleInputtext"
            placeholder="title"
            name="title"
            onChange={handleChange}
            value={input.title}
            required
          />
        </div>
        <div className="my-3 ">
          <input
            type="date"
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-sm border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200"
            name="date"
            onChange={handleChange}
            value={input.date}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-sm border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200"
            id="exampleInputTextArea"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={input.description}
            required
          />
        </div>
        <hr className="border border-slate" />

        <button
          onClick={createTask}
          className="w-[100%] lg:my-2 my-2 lg:text-lg p-1 md:text-md sm:text-sm transition duration-200 ease-in-out text-white lg:p-1 rounded-md bg-cyan-600 hover:bg-cyan-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default NewTask
