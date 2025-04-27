import { LocationFormData } from '@/types';
import { apiFetch } from './api';

export const fetchLocationsPost = async (data: LocationFormData, companyId: string) => {
    try {
        const locations = await apiFetch('POST', `companies/${companyId}/locations`, data);
        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};

export const fetchLocationsGet = async (companyId: string) => {
    try {
        const locations = await apiFetch('GET', `companies/${companyId}/locations`);
        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};

export const fetchLocationsGetById = async (companyId: string, id: string) => {
    try {
        const locations = await apiFetch('GET', `companies/${companyId}/locations/${id}`);
        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};

export const fetchLocationsPut = async (companyId: string, id: string, data: LocationFormData) => {
    try {
        const locations = await apiFetch('PUT', `companies/${companyId}/locations/${id}`, data);
        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};

export const fetchLocationsDelete = async (companyId: string, id: string) => {
    try {
        const locations = await apiFetch('DELETE', `companies/${companyId}/locations/${id}`);
        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
};
