import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import Newsfeed from '../../pages/newsfeed/Newsfeed';
import ServiceInfo from '../../pages/services/ServiceInfo';
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
    },
    {
        path: "/newsfeed/service",
        exact: true,
        component: ServiceInfo,
        protected: null
    },
    {
        path: "/newsfeed",
        exact: true,
        component: Newsfeed,
        protected: null
    }
];

export default routes;