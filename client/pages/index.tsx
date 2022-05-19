import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'
import { useAuth0 } from '@auth0/auth0-react'
import { useRef } from 'react'


import Login from '../containers/Login'
import MainPage from '../containers/mainpage'
import RoomsContainer from '../containers/Rooms'
import MessagesContainer from '../containers/Messages'




export default function Home() {
  const {socket,email,setEmail} = useSockets();

  const emailRef = useRef(null);

  function handleSetEmail (){
    const value = emailRef.current.value
    if(!value){
      return
    }

    setEmail(value);

    localStorage.setItem("email",value);


  }

   
  const {isAuthenticated} = useAuth0();

  return (
    <div>
      {!email && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={emailRef} />
            <button className="action" onClick={handleSetEmail}>
              START
            </button>
          </div>
        </div>
      )}
      {email && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
   
  )
}
