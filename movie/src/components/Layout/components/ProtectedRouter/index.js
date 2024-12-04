import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const userRole = useSelector(state => state.account.role);
    console.log(userRole)
    if (isAdminRoute  === true && userRole == 'Admin') {
         return (<>{props.children}</>)
     } else {
         return (<NotPermitted />)
     }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/loginAdmin' replace />
            }
        </>
    )
}

export default ProtectedRoute;

