import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar llamadas a la API
 * @param {Function} apiFunction - Función de la API a ejecutar
 * @returns {Object} Estado y funciones para manejar la API
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      setData(result);
      
      return result;
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};

/**
 * Hook para manejar listas de datos con operaciones CRUD
 */
export const useApiList = (fetchFunction) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchFunction();
      setItems(result || []);
      
      return result;
    } catch (err) {
      setError(err.message || 'Error al cargar los datos');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  const addItem = useCallback((newItem) => {
    setItems(prev => [...prev, newItem]);
  }, []);

  const updateItem = useCallback((id, updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const reset = useCallback(() => {
    setItems([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    removeItem,
    reset
  };
};