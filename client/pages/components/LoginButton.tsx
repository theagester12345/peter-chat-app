import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton () {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return(
        <button className="action">
               <a href="/api/auth/login">Login</a>
            </button>

    )
}