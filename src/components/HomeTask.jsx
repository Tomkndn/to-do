import {useState} from 'react'
import Home from './Home'
import NewTask from './NewTask'

const HomeTask = ({ setSignInGranted }) => {
  const [newTask, setNewTask] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      {newTask ? (
        <Home
          setNewTask={setNewTask}
          title={title}
          date={date}
          description={description}
          setSignInGranted={setSignInGranted}
        />
      ) : (
        <NewTask
          setNewTask={setNewTask}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
        />
      )}
    </div>
  );
};

export default HomeTask
