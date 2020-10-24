import React, { Fragment, useEffect, useState } from "react";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);


    //Delete Function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
            setTodos(todos.filter(todo => todo.todo_id != id))
        } catch (error) {
            console.log(error.message)
        }
    }


    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment>
            <h1>List Todos</h1>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>Edit</td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}
                            >
                                Delete
              </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
