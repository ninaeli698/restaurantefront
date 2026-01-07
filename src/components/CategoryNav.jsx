

import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Navegación sticky de categorías con scroll horizontal
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.categories - Lista de categorías
 * @param {string} props.activeCategory - ID de la categoría activa
 * @param {Function} props.onCategoryClick - Función al hacer clic en categoría
 */
const CategoryNav = ({ categories = [], activeCategory, onCategoryClick }) => {
  const scrollContainerRef = React.useRef(null);

  /**
   * Maneja el scroll horizontal con los botones de flecha
   * @param {string} direction - Dirección del scroll ('left' o 'right')
   */
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 relative">
        {/* Botón de scroll izquierdo */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-0 bottom-0 w-8 bg-white flex items-center justify-center z-10 shadow-sm"
          aria-label="Scroll izquierdo"
        >
          <ChevronRight size={16} className="transform rotate-180 text-gray-400" />
        </button>

        {/* Contenedor de categorías con scroll horizontal */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 py-3 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Botón de scroll derecho */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 w-8 bg-white flex items-center justify-center z-10 shadow-sm"
          aria-label="Scroll derecho"
        >
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Estilos para ocultar scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryNav;