import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api/Api.js';

function List() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // redirect to login if token missing
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        async function getUsers() {
            try {
                const response = await api.get('https://jsonplaceholder.typicode.com/todos');
                const data = response.data;
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        }
        getUsers();
    }, []);

    return (
        <>
            <h1>List page</h1>
            {users.map((user) => (
                <p key={user.id}>{user.title}</p>
            ))}
        </>
    );
}

export default List;