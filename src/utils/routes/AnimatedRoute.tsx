import { motion } from 'framer-motion'
import React from 'react'
import { Route } from 'react-router-dom'

export default function AnimatedRoute({children, ...rest} : {children: React.ReactNode, key?: number; path: string; exact?: boolean}) {
    return (
        <Route {...rest}>
            <motion.div 
                initial={{ x: 100 }} 
                animate={{ x: 0, transition: {type: "spring"} }}
                exit={{ opacity: 0 }}>
                {children}
            </motion.div>
        </Route>
    )
}
