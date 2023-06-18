import { Navigate } from "react-router-dom"




export const AuthProtectedRoute=({auth,user, children})=>{



if( auth && !localStorage.getItem('access_token')){

return <Navigate  to="/auth/login" replace ></Navigate>


}


if(!auth && localStorage.getItem('access_token')){

    return <Navigate  to="/home" replace ></Navigate>

}


return children

}