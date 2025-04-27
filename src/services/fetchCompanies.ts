import { CompanyFormData } from '@/types';
import { apiFetch } from './api';

export const fetchCompaniesPost = async (data: CompanyFormData) => {
    try {
        const  companies = await apiFetch('POST', 'companies', data);
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

export const fetchCompaniesGet = async () => {
    try {
        const companies = await apiFetch('GET', 'companies');
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

export const fetchCompaniesGetById = async (id: string) => {
    try {
        const  companies = await apiFetch('GET', `companies/${id}`);
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

export const fetchCompaniesPut = async (id: string, data: CompanyFormData) => {
    try {
        const companies = await apiFetch('PUT', `companies/${id}`, data);
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

export const fetchCompaniesDelete = async (id: string) => {
    try {
        const companies = await apiFetch('DELETE', `companies/${id}`);
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};