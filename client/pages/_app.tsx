import '../styles/globals.css'
import SocketProvider from '../context/socket.context'
import { UserProvider } from '@auth0/nextjs-auth0'


function MyApp({ Component, pageProps }) {
  return (
    
       <SocketProvider>
         <UserProvider>
         <Component {...pageProps} />
         </UserProvider>
      
    
      </SocketProvider>

   
     
  )
  
   
   
}

export default MyApp
