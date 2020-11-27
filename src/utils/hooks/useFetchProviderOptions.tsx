import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux';
import { Role, User } from '../../store/entities/User';

export default function useFetchProviderOptions() {
    const userList: User[] = useSelector((state: RootStateOrAny) => state.user.userList);
    const [providerOptions, setProviderOptions] = useState([] as any);

    function fetchProviders() {
        const filteredProvider : any[] = [];
        userList.filter(user => user.role === Role.PROVIDER.value).forEach(
            providerData => {
                const provider = {label: providerData.name, value: providerData.uid};
                filteredProvider.push(provider);
            }
        )
        setProviderOptions(filteredProvider);
    }

    useEffect(() => {
        fetchProviders();
     }, [userList]);

    return [providerOptions];
}
