import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { Modal, Form, Divider, Row, Col, Input, message, notification } from 'antd';
const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/personal');
    const userRole = useSelector(state => state.account.role);

    if (isAdminRoute  === true && userRole == 'user') {
         return (<>{props.children}</>)
     } else {

         return (<NotPermitted />)
     }
}

const ProtectedRouteUser = (props) => {
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
                <>
                <Navigate to='/login' replace />
                {notification.error({
                message: 'Not logged in',
                description: 'Please login to view this page',
                })}
                
                </>
                
            }
        </>
    )
}

export default ProtectedRouteUser;

