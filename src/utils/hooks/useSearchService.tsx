import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { searchServiceRequest } from '../../store/actions/serviceActions';
import { Service } from '../../store/entities/Service';

export default function useSearchService(searchTerm: string, isSortByRating: boolean) {
    const serviceList : Service[] = useSelector((state: RootStateOrAny) => state.service.serviceList);
    const dispatch = useDispatch();

    function fetchSearchServices() {
        let filteredServices = [...serviceList];
        if(searchTerm) {
            const searchTermLowercase = searchTerm.toLowerCase().trim();
            filteredServices = serviceList.filter(service => (service.name.toLowerCase().includes(searchTermLowercase) || service.category.toLowerCase().includes(searchTermLowercase)));
        }
        if(isSortByRating) {
            filteredServices.sort((a, b) => (a.rating <= b.rating) ? 1 : -1);
        }

        dispatch(searchServiceRequest(filteredServices));
    }

    useEffect(() => {
        fetchSearchServices();
     }, [searchTerm, isSortByRating]);
}
