

import React from 'react';
import { Search, ArrowLeft } from 'lucide-react';

/**
 * Header de la aplicación con navegación y búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {string} props.restaurantName - Nombre del restaurante
 */
const Header = ({ restaurantName = "Nombre del Restaurante" }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Barra de navegación superior */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Botón de volver */}
          <button 
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => window.history.back()}
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </button>
          
          {/* Logo/Nombre del restaurante */}
          <h1 className="text-lg font-semibold text-gray-800 truncate max-w-[200px]">
            {restaurantName}
          </h1>
          
          {/* Botón de búsqueda */}
          <button 
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Imagen destacada del restaurante */}
      <div className="relative h-48 bg-gradient-to-r from-orange-400 to-red-500">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-1">{restaurantName}</h2>
            <div className="flex items-center justify-center space-x-1">
              <span className="text-yellow-300">✦✦✦✦✦</span>
              <span className="text-sm">(5 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;