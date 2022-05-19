import '../styles/globals.css'
import SocketProvider from '../context/socket.context'
import {Auth0Provider} from '@auth0/auth0-react'

const domain = process.env.REACT_APP_DOMAIN_NAME;
const client_id = process.env.REACT_APP_CLIENT_ID;

function MyApp({ Component, pageProps }) {
  return <Auth0Provider
    domain={domain}
    clientId={client_id}
    redirectUri='http//localhost:3000'
    >
      <SocketProvider>
      <Component {...pageProps} />
    
      </SocketProvider>

    </Auth0Provider>
   
   
}

export default MyApp
