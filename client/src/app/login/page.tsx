"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const LOGIN_MUT =gql`
mutation login($email:String!,$password:String!){
login (loginUser:{email:$email,password:$password}){
email
token
}
}
`;

export default function Login() {
  const router= useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('') 
 
  const [logins, { data, loading, error }] = useMutation(LOGIN_MUT);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {
  const result = await logins({variables:{email, password}, context: {
    headers: {
      AuthorizationContext: 'Bearer your-token-here',
    },
  },})  
  console.log(result,"<<<<result")
  if(result?.data?.login?.token){
    localStorage.setItem("user",result?.data?.login?.token)
    setUser(localStorage.getItem("user")||"")
}
} catch (error) {
  console.log("error logging in :",error)
}

  };

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
        router.push('/home');
    }
  },[user])

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
        <button type="submit" className="bg-white text-black mt-10">Login</button>
      </form>
    </>
  );
}
