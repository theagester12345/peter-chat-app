const EVENT = {
    connection:"connection",
    CLIENT:{
        CREATE_ROOM: "CREATE ROOM",
        SEND_ROOT_MESSAGE:"SEND_ROOT_MESSAGE",
        JOIN_ROOMS: "JOIN_ROOMS",
    },
    SERVER: {
        ROOMS:"ROOMS",
        JOINED_ROOMS: "JOINED_ROOMS",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    } 
};

export default EVENT;