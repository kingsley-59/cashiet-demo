import { Outlet, Navigate } from 'react-router';

const ProtectRoute =  () => {
    let token =localStorage.getItem('_tt');
    let revoke =localStorage.getItem('xxrevxx');
    if (revoke == 'danger') {
        localStorage.removeItem('_tt')
        localStorage.removeItem('xxrevxx')
        return  <Navigate to='/user-revoked' />;
    }{
        return token ? <Outlet /> : <Navigate to='/sign-in' />;

    }
}

export default ProtectRoute;