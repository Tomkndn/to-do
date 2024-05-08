import { useState } from 'react'
import { supabase } from '../../supabase';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { toast } from "react-toastify";

const NewTask = ({setNewTask,uid}) => {

  const [input, setInput] = useState({ title: "", filter: "Pending", description: "" });
  
  async function createTask(e){
    e.preventDefault();
    const newTask = {
    title: input.title,
    filter: input.filter,
    description: input.description,
    }
    try {
      // Fetch existing JSON data
      const { data, error } = await supabase
        .from('users')
        .select('task')
        .eq('uuid', uid);

      if (error) {
        throw error;
      }

      // Extract existing JSON data or initialize to an empty array if it doesn't exist yet
      const existingData = data ? data[0].task || [] : [];

      // Append new task
      const newData = [...existingData, newTask ];

      // Update the JSON column in the database
      const { error: updateError } = await supabase
      .from("users")
      .update({ task: newData })
      .eq("uuid", uid);
      
      if (updateError) {
        throw updateError;
      } else {
        toast.success("Task added successfully");
        setNewTask(1);
      }
        
    } catch (error) {
      console.error('Error adding task:', error.message);
      toast.error("Error adding task:", error);
    }
  }

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
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
          <select
            className="lg:p-2 p-1 w-[100%] border lg:text-lg md:text-md sm:text-sm text-gray-400 border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200"
            name='filter'
            onChange={handleChange}
            value={input.filter}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>
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
