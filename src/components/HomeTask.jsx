import {useState} from 'react'
import Home from './Home'
import NewTask from './NewTask'

const HomeTask = ({ setSignInGranted, uid }) => {
  const [newTask, setNewTask] = useState(1);
  return (
    <div>
      {newTask ? (
        <Home
          setNewTask={setNewTask}
          uid={uid}
          newTask={newTask}
          setSignInGranted={setSignInGranted}
        />
      ) : (
        <NewTask setNewTask={setNewTask} uid={uid} />
      )}
    </div>
  );
};

export default HomeTask
