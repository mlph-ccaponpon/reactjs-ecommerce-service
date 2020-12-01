import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../store/entities/User';
import AnimatedRoute from './AnimatedRoute'

export default function AuthRoleRoute({children, currUser, roleList, ...routeProps} : {children: React.ReactNode, currUser: User, roleList: string[], key?: number; path: string; exact?: boolean}) {
    const history = useHistory();
    const isValidUser = (currUser !== null && currUser.role && roleList.includes(currUser.role));
    
    useLayoutEffect(() => {
        if(!isValidUser) {
            history.replace("/");
        }
    }, [])

    return (
        <AnimatedRoute {...routeProps}>
            <div>
                {children}
            </div>
        </AnimatedRoute>
    );
}
