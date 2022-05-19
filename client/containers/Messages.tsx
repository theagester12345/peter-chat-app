import {useEffect, useRef } from "react";
import EVENT from "../config/events";
import { useSockets } from "../context/socket.context"
import LogoutButton from "../pages/components/LogoutButton"
import styles from "../styles/Message.module.css"



export default function MessagesContainer (){

    const {socket,messages,roomId,email,setMessage} = useSockets();
    
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);


    function handleSendMessage(){
        const message = newMessageRef.current.value;

        if(!String(message).trim()){
            return;
        }


        socket.emit(EVENT.CLIENT.SEND_ROOT_MESSAGE, {roomId,message,email});

        const date = new Date();


        setMessage([
            ...messages,{
                email:"You",
                message,
                time:`${date.getHours()}:${date.getMinutes()}`
            }
        ])


        newMessageRef.current.value=""
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    if(!roomId){
        return <div/>;
    } 








    return (
        <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map(({ message, email, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {email} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.messageBox}>
        <textarea
          rows={1}
          placeholder="Type Text Here ...."
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
    )


 


  

}