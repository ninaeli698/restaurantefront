
// src/components/ItemModal.jsx
import React from 'react';
import { X, Star, Minus, Plus } from 'lucide-react';

/**
 * Modal de detalle del ítem del menú
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Estado de apertura del modal
 * @param {Object} props.item - Datos del ítem seleccionado
 * @param {Function} props.onClose - Función para cerrar el modal
 */
const ItemModal = ({ isOpen, item, onClose }) => {
  const [quantity, setQuantity] = React.useState(1);

  /**
   * Maneja el cierre del modal
   */
  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  /**
   * Maneja el cambio de cantidad
   * @param {string} operation - Operación a realizar ('increment' o 'decrement')
   */
  const handleQuantityChange = (operation) => {
    setQuantity(prev => {
      if (operation === 'increment') return prev + 1;
      if (operation === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Si el modal no está abierto o no hay ítem, no renderizar nada
  if (!isOpen || !item) return null;

  const {
    name,
    description,
    price,
    image,
    badges = [],
    rating = 4.2,
    reviewCount = 42
  } = item;

  /**
   * Formatea el precio
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  /**
   * Renderiza las estrellas de rating
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  /**
   * Renderiza los badges en el modal
   */
  const renderBadges = (badges) => {
    const badgeConfig = {
      'vegano': { label: 'Vegano', class: 'badge-vegano' },
      'sin-gluten': { label: 'Sin Gluten', class: 'badge-sin-gluten' },
      'picante': { label: 'Picante', class: 'badge-picante' },
      'vegetariano': { label: 'Vegetariano', class: 'badge-vegetariano' },
      'recomendado': { label: 'Recomendado', class: 'badge-recomendado' }
    };

    return badges.map((badge) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="relative">
          {/* Imagen del plato */}
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}

          {/* Botón de cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-600 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Nombre y rating */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-gray-600">
                {rating} ({reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {renderBadges(badges)}
            </div>
          )}

          {/* Selector de cantidad */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-orange-600">
              {formatPrice(price * quantity)}
            </span>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus size={20} />
              </button>
              
              <span className="text-lg font-semibold text-gray-800 min-w-[30px] text-center">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange('increment')}
                className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Nota especial (placeholder para futura funcionalidad) */}
          <div className="mb-6">
            <button className="w-full text-left py-3 px-4 border border-gray-300 rounded-lg text-gray-600 hover:border-orange-300 transition-colors">
              + Agregar nota especial para la cocina
            </button>
          </div>

          {/* Botón de acción principal */}
          <button 
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md"
            onClick={() => {
              // Aquí irá la lógica para agregar al pedido en el futuro
              console.log(`Agregado: ${quantity} x ${name}`);
              handleClose();
            }}
          >
            AGREGAR AL PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;