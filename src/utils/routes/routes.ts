import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import ServiceTable from '../../pages/services/ServiceTable';
import SignUp from '../../pages/signup/SignUp';
import UserTable from '../../pages/users/UserTable';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home, 
        protected: null
    },
    {
        path: "/login",
        exact: true,
        component: Login,
        protected: null
    },
    {
        path: "/sign-up",
        exact: true,
        component: SignUp,
        protected: null
    },
    {
        path: "/users",
        exact: true,
        component: UserTable,
        protected: null
    },
    {
        path: "/services",
        exact: true,
        component: ServiceTable,
        protected: null
    }
];

export default routes;