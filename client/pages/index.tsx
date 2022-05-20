import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'
import { useAuth0 } from '@auth0/auth0-react'
import { useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'


import Login from '../containers/Login'
import RoomsContainer from '../containers/Rooms'
import MessagesContainer from '../containers/Messages'
import MainPage from '../containers/MainPage'




export default function Home() {
  const {socket,email,setEmail} = useSockets();

  const {user,error,isLoading} = useUser();
 

  const emailRef = useRef(null);

  function handleSetEmail (){
    const value = emailRef.current.value
    if(!value){
      return
    }

    


  }

   
 if (user)
 {
  setEmail(user.email);

  localStorage.setItem("email",user.email);
   return (

  <div className={styles.container}>
  <RoomsContainer />
  <MessagesContainer />
</div>

   )
 }


 return (
     <div className={styles.usernameWrapper}>
    <div className={styles.usernameInner}>
      <Login/>
    </div>
  </div>
 )

  
}
