import {Navigate} from "react-router-dom";

import {useAuth} from "../context/AuthContext";


function ProtectedRoute({children,role}){

    const {user}=useAuth();


    // User is not logged in

    if(!user){

        return <Navigate to="/login" replace/>;

    }


    // User doesn't have required role

    if(role && user.role!==role){

        if(user.role==="Student"){

            return <Navigate to="/student/profile" replace/>;

        }


        if(user.role==="Teacher"){

            return <Navigate to="/teacher/profile" replace/>;

        }

    }


    return children;

}


export default ProtectedRoute;
