import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import Services from '../../pages/services/Services';
import SignUp from '../../pages/signup/SignUp';
import Users from '../../pages/users/Users';

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
        component: Users,
        protected: null
    },
    {
        path: "/services",
        exact: true,
        component: Services,
        protected: null
    }
];

export default routes;