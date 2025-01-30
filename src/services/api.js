import axios from "axios";

const API_URL = "https://carreira-api-production.up.railway.app/vagas"; // Porta correta do backend

const api = axios.create({
  baseURL: API_URL,
});

export default api;