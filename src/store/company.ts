import { create } from 'zustand';
import { fetchCompaniesGet, fetchCompaniesGetById } from '../services/fetchCompanies';
import { CompanyFormData } from '@/types';
interface CompanyState {
    company: CompanyFormData | null;
    companies: CompanyFormData[];
    fetchCompanies: () => Promise<void>;
    fetchCompany: (companyId: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
    company: null,
    companies: [],

    fetchCompanies: async () => {
        try {
            const companies = await fetchCompaniesGet();
            set({ companies });
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    },

    fetchCompany: async (companyId: string) => {
        try {
            const company = await fetchCompaniesGetById(companyId);
            set({ company });
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    }
}));