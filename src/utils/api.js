import axios from 'axios';


export const fetchTodos = async () => {
    console.log(process.env.API_URL);
    const response = await axios.get(process.env.API_URL);
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, todo);
    return response.data;
};

export async function sendTodo() {
    const todo = {
        title: "Test Todo",
        description: "This is a test todo",
        completed: false
    };
    const newTodo = await createTodo(todo);
    console.log(newTodo);
}