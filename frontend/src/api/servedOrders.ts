import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const servedOrdersAPI = {
    // Get all served orders with optional table number filter
    getAll: async (tableNumber?: number) => {
        const params = tableNumber ? { tableNumber } : {};
        const response = await axios.get(`${API_URL}/served-orders`, {
            ...getAuthHeaders(),
            params,
        });
        return response.data;
    },

    // Get specific served order by ID
    getById: async (id: string) => {
        const response = await axios.get(`${API_URL}/served-orders/${id}`, getAuthHeaders());
        return response.data;
    },

    // Get bill data for reprinting
    getBillData: async (id: string) => {
        const response = await axios.get(`${API_URL}/served-orders/${id}/bill`, getAuthHeaders());
        return response.data;
    },
};
