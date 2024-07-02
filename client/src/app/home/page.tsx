"use client"
import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation addTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      title
    }
  }
`;

const USERS_QUERY=gql`
query {
  findAllTodos {
    title
    id
  }
}
`

const UsersList = () => {
  const [title, setTitle] = useState('');

  const [addTodo] = useMutation(ADD_TODO)
  const { loading, error, data,refetch } = useQuery(USERS_QUERY);

const handleClick=async ()=>{
 const todoAdded = await addTodo({
  variables: {
    createTodoInput: {
      title
    }
  }
}) 
//  console.log(data, "todo create query<<<<<<");
 refetch()
}


  return (
    <div className='flex justify-center align-center text-center mt-10'>
      <div className='flex-col'>

      <h1>List of TODO s</h1>
      <div>
        <input className='text-black' type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <button className='bg-yellow-400 mt-10 mb-10 px-5 py-2 rounded'onClick={handleClick}>Add ToDo</button>
        </div>
      <ul>
        {data?data?.findAllTodos.map(todo => (
          <li key={todo.id}>
            {todo.id }------
            {todo.title}
          </li>
        )):""}
      </ul>
        </div>
    </div>
  );
};

export default UsersList;