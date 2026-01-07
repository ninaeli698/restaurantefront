// src/components/MenuItem.jsx
import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Componente de tarjeta horizontal para cada ítem del menú
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.item - Datos del ítem del menú
 * @param {Function} props.onSelect - Función al seleccionar el ítem
 */
const MenuItem = ({ item, onSelect }) => {
  const {
    name,
    description,
    price,
    image,
    badges = []
  } = item;

  /**
   * Formatea el precio a formato monetario
   * @param {number} price - Precio del ítem
   * @returns {string} Precio formateado
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  /**
   * Renderiza los badges según el tipo
   * @param {Array} badges - Lista de badges
   * @returns {JSX.Element} Badges renderizados
   */
  const renderBadges = (badges) => {
    const badgeConfig = {
      'Desayunos': { label: 'Desayunos', class: 'badge-desayunos' },
      'sin-gluten': { label: 'Sin Gluten', class: 'badge-sin-gluten' },
      'picante': { label: 'Picante', class: 'badge-picante' },
      'Almuerzos': { label: 'Almuerzos', class: 'badge-almuerzos' },
      'recomendado': { label: 'Recomendado', class: 'badge-recomendado' }
    };

    return badges.slice(0, 2).map((badge) => {
      const config = badgeConfig[badge];
      if (!config) return null;
      
      return (
        <span key={badge} className={config.class}>
          {config.label}
        </span>
      );
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in cursor-pointer"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className="flex">
        {/* Imagen del plato */}
        <div className="w-24 h-24 flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-2">
                Sin imagen
              </span>
            </div>
          )}
        </div>

        {/* Información del plato */}
        <div className="flex-1 p-3 min-w-0">
          {/* Header con nombre y precio */}
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate pr-2">
              {name}
            </h3>
            <span className="font-bold text-orange-600 text-sm flex-shrink-0">
              {formatPrice(price)}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2">
            {description}
          </p>

          {/* Badges y botón de acción */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {renderBadges(badges)}
              {badges.length > 2 && (
                <span className="badge bg-gray-100 text-gray-600">
                  +{badges.length - 2}
                </span>
              )}
            </div>

            {/* Botón de agregar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="flex-shrink-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors duration-200 shadow-sm"
              aria-label={`Ver detalles de ${name}`}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;