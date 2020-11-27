import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../store/entities/User';
import AnimatedRoute from './AnimatedRoute'

export default function GuestRoute({children, currUser, ...routeProps} : {children: React.ReactNode, currUser: User, key?: number; path: string; exact?: boolean}) {
    const history = useHistory();
    const isValidUser = (currUser === null);
    
    useLayoutEffect(() => {
        if(!isValidUser) {
            history.replace("/");
        }
    }, [])

    return (
        <AnimatedRoute {...routeProps}>
            {isValidUser && (
                <div>
                    {children}
                </div>
            )} 
        </AnimatedRoute>
    );
}
