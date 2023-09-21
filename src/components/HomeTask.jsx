import {useState} from 'react'
import Home from './page/Home'
import NewTask from './page/NewTask'

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
    </div>
  );
};

export default HomeTask
