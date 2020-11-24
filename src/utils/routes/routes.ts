import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import SignUp from '../../pages/signup/SignUp';

export default [
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
    }
]