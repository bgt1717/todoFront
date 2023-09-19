

import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios'; // Import axios
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get('https://todoback-t8h2.onrender.com/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('https://todoback-t8h2.onrender.com/update/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('https://todoback-t8h2.onrender.com/delete/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>TODO LIST</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div> <h2> No Record</h2> </div>
                    :
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                                    : <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}> {todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;

