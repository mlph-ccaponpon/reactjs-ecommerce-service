import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import Newsfeed from '../../pages/newsfeed/Newsfeed';
import ServiceInfo from '../../pages/services/ServiceInfo';
import ServiceTable from '../../pages/services/ServiceTable';
import SignUp from '../../pages/signup/SignUp';
import UserTable from '../../pages/users/UserTable';
import { Role } from '../../store/entities/User';

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
        protected: Role.GUEST.value
    },
    {
        path: "/sign-up",
        exact: true,
        component: SignUp,
        protected: Role.GUEST.value
    },
    {
        path: "/users",
        exact: true,
        component: UserTable,
        protected: Role.ADMIN.value
    },
    {
        path: "/services",
        exact: true,
        component: ServiceTable,
        protected: Role.ADMIN.value
    },
    {
        path: "/newsfeed/:id",
        exact: true,
        component: ServiceInfo,
        protected: Role.CUSTOMER.value
    },
    {
        path: "/newsfeed",
        exact: true,
        component: Newsfeed,
        protected: Role.CUSTOMER.value
    }
];

export default routes;