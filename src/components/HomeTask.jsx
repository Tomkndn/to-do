import {useState} from 'react'
import Home from './page/Home'
import NewTask from './page/NewTask'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeTask = ({ setSignInGranted, uid }) => {
  const [newTask, setNewTask] = useState(1);
  return (
    <div>
      {newTask ? (
        <Home
          setNewTask={setNewTask}
          uid={uid}
          setSignInGranted={setSignInGranted}
        />
      ) : (
        <NewTask setNewTask={setNewTask} uid={uid} />
      )}
      <ToastContainer/>
    </div>
  );
};

export default HomeTask
