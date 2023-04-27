import axios from 'axios';


export const fetchTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, todo);
    return response.data;
};

export const updateTodo = async (id, todo) => {
    console.log('called', id);

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
};