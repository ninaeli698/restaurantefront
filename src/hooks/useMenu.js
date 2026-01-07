import { useState, useEffect } from 'react';
import axios from 'axios';

// URL DE TU BACKEND DJANGO
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const useMenu = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_BASE_URL}/api/menu/`;
      console.log('🌐 Conectando a:', url);
      
      const response = await api.get('/api/menu/');
      console.log('✅ API respondió:', response.status);
      console.log('📦 Datos crudos:', response.data);
      
      // VERIFICAR ESTRUCTURA
      if (response.data.categories) {
        console.log(`📊 ${response.data.categories.length} categorías encontradas`);
        response.data.categories.forEach((cat, i) => {
          console.log(`  Categoría ${i}: "${cat.nombre}" con ${cat.items?.length || 0} ítems`);
          cat.items?.forEach((item, j) => {
            console.log(`    Ítem ${j}: "${item.nombre}" - ${item.images?.length || 0} imágenes`);
          });
        });
      }
      
      const transformedData = transformApiData(response.data);
      console.log('✨ Datos transformados:', transformedData);
      
      setMenuData(transformedData);
      
    } catch (err) {
      console.error('❌ Error en fetchMenuData:', err);
      console.error('Detalles:', err.response?.data || err.message);
      
      setError('No se pudo cargar el menú. Mostrando datos de ejemplo.');
      const fallbackData = getFallbackData();
      setMenuData(fallbackData);
      
    } finally {
      setLoading(false);
    }
  };

  // Transformar datos de la API de Django al formato del frontend
  const transformApiData = (apiData) => {
    console.log('📊 Transformando datos de la API:', apiData);
    
    // Si no hay categorías, devolver estructura vacía
    if (!apiData.categories || apiData.categories.length === 0) {
      return {
        restaurantName: apiData.restaurantName || "Mi Restaurante",
        description: "Menú digital",
        categories: []
      };
    }
    
    // Transformar cada categoría
    const transformedCategories = apiData.categories.map(category => {
      // Transformar cada ítem dentro de la categoría
      const transformedItems = category.items?.map(item => {
        // Obtener imágenes como array de URLs
        const itemImages = item.images?.map(img => img.image_url) || [];
        
        // Si no hay imágenes, usar fallback
        const images = itemImages.length > 0 
          ? itemImages 
          : [
              `https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&crop=center&auto=format`,
              `https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&h=600&fit=crop&crop=center&auto=format`
            ];
        
        return {
          id: item.id,
          name: item.nombre,  // Transformar 'nombre' a 'name'
          description: item.descripcion || "",
          price: parseFloat(item.precio) || 0,  // Convertir string a número
          images: images,
          badges: item.badges ? [item.badges] : [],  // Convertir string a array
          rating: parseFloat(item.rating) || 4.5,
          ingredients: item.ingredients || [],
          preparation_time: item.preparation_time || "15-20 min",
          portions: item.portions || "1 persona"
        };
      }) || [];
      
      return {
        id: category.id,
        name: category.nombre,  // Transformar 'nombre' a 'name'
        items: transformedItems
      };
    });
    
    return {
      restaurantName: apiData.restaurantName || "Mi Restaurante",
      description: "Menú digital en tiempo real",
      categories: transformedCategories
    };
  };

  // Datos de ejemplo mientras no hay conexión
  const getFallbackData = () => {
    return {
      restaurantName: " Niña Eli",
      description: "Conexión establecida - Cargando datos...",
      categories: [
        {
          id: 1,
          name: "Cargando...",
          items: [
            {
              id: 1,
              name: "Conectando con la base de datos",
              description: "Los datos del menú se están cargando",
              price: 0,
              images: [
                "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&crop=center&auto=format"
              ],
              badges: ["recomendado"],
              rating: 4.5,
              ingredients: ["Actualizando en tiempo real..."]
            }
          ]
        }
      ]
    };
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return {
    menuData,
    loading,
    error,
    refetch: fetchMenuData
  };
};
