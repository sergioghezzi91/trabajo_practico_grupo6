import { API_CONFIG } from '../constants/config';

/**
 * Clase base para manejar las peticiones HTTP
 */
class ApiService {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Método genérico para realizar peticiones HTTP
   * @param {string} endpoint - Endpoint de la API
   * @param {object} options - Opciones de la petición (method, body, headers)
   * @returns {Promise} - Respuesta de la API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      
      // Si la respuesta está vacía (204 No Content), retornar null
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error en ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Petición GET
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * Petición POST
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data
    });
  }

  /**
   * Petición PUT
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data
    });
  }

  /**
   * Petición DELETE
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Instancia singleton del servicio API
export const apiService = new ApiService();