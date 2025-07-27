import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
})

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("jwt_token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    },
)

export const productApi = {
    getAll: () => api.get("/products"),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post("/products", data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
}

export default api
