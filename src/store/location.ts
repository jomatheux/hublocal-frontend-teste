import { create } from 'zustand';
import { fetchLocationsGet, fetchLocationsGetById } from '../services/fetchLocations';
import { LocationFormData } from '@/types';
interface LocationState {
    locations: LocationFormData[] | string[];
    location: LocationFormData | string
    fetchLocations: (companyId: string) => Promise<void>;
    fetchLocation: (companyId: string, locationId: string) => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
    locations: [],
    location: '',

    fetchLocations: async (companyId: string) => {
        try {
            const locations = await fetchLocationsGet(companyId);
            set({ locations });
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    },

    fetchLocation: async (companyId: string, locationId: string) => {
        try {
            const location = await fetchLocationsGetById(companyId, locationId);
            set({ location });
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    }
}));
