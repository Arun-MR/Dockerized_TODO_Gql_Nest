"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery, useMutation, gql, ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';


// const SIGNUP_MUT = gql`
//   mutation Signup($email: String!, $password: String!) {
//     signup(createUserInput: { email: $email, password: $password }) {
//       id
//       email
//     }
//   }
// `;
const SIGNUP_MUT = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(createUserInput: { email: $email, password: $password }) {
      email
      token
    }
  }
`;
  

export default function Signup () {
    const router = useRouter();
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]= useState('')

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
        router.push('/home');
    }
  },[user])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const result = await signup({ variables: { email, password } });
        console.log('Signup result:', result);
        if(result?.data?.signup?.token){
            localStorage.setItem("user",result?.data?.signup?.token)
            setUser(localStorage.getItem("user")||"")
        }
        console.log(user,"user token ")
        // Handle successful signup (e.g., store token, redirect, etc.)
      } catch (err) {
        if (err instanceof ApolloError) {
            // Handle ApolloError
            console.error('ApolloError:', err.message);
            console.error('GraphQL Errors:', err.graphQLErrors);
            console.error('Network Errors:', err.networkError);
          } else {
            // Handle other types of errors
            console.error('Other Error:', err);
          }
      }
  };

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email</label> <br />
        <input 
         className="bg-yellow-400"
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /> <br />
        <label>Password</label> <br />
        <input 
         className="bg-yellow-400"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        /> <br />
        <button type="submit" className="bg-white text-black mt-10">Signup</button>
      </form>
    </>
  );
}
