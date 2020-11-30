import React, { useState } from 'react'

export default function useDebounce() {
    const [typingTimeout, setTypingTimeout] = useState(0);

    function debounce(func: any, wait = 500) {
        clearTimeout(typingTimeout);

        const timeout = setTimeout(() => func(), wait);

        setTypingTimeout(timeout);
    }

    return debounce;
}
