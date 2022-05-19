import LogoutButton from "../pages/components/LogoutButton"
import { useSockets } from "../context/socket.context"
import { useLayoutEffect, useRef } from "react";
import EVENT from "../config/events";
import styles from "../styles/Room.module.css"



export default function RoomsContainer (){

    const {socket,roomId,rooms}=useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom (){
        const roomName = newRoomRef.current.value || ''

        if(!roomName) return;

        socket.emit(EVENT.CLIENT.CREATE_ROOM,{roomName})

        //reset room name 
        newRoomRef.current.value=""

    }


    function handleJoinRoom(key){

        if(key == roomId) return 

        socket.emit(EVENT.CLIENT.JOIN_ROOMS,key);

    }

    return (
        <nav className={styles.wrapper}>
        <div className={styles.createRoomWrapper}>
          <input ref={newRoomRef} placeholder="Room name" />
          <button className="action" onClick={handleCreateRoom}>
            CREATE ROOM
          </button>
        </div>
  
        <ul className={styles.roomList}>
          {Object.keys(rooms).map((key) => {
            return (
              <div key={key}>
                <button
                  disabled={key === roomId}
                  title={`Join ${rooms[key].name}`}
                  onClick={() => handleJoinRoom(key)}
                >
                  {rooms[key].name}
                </button>
              </div>
            );
          })}
        </ul>
      </nav>
    )

}