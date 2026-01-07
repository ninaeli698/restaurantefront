

// src/pages/MenuPage.jsx
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import MenuItem from '../components/MenuItem';
import ItemModal from '../components/ItemModal';

/**
 * Página principal que muestra el menú completo
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.menuData - Datos del menú desde la API
 * @param {Function} props.onItemSelect - Función para seleccionar un ítem
 * @param {Object} props.selectedItem - Ítem actualmente seleccionado
 * @param {boolean} props.isModalOpen - Estado del modal
 * @param {Function} props.onCloseModal - Función para cerrar el modal
 */
const MenuPage = ({ 
  menuData, 
  onItemSelect, 
  selectedItem, 
  isModalOpen, 
  onCloseModal 
}) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  /**
   * Maneja el clic en una categoría
   * @param {string} categoryId - ID de la categoría seleccionada
   */
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Establece la primera categoría como activa por defecto
  React.useEffect(() => {
    if (menuData?.categories?.length > 0 && !activeCategory) {
      setActiveCategory(menuData.categories[0].id);
    }
  }, [menuData, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header restaurantName={menuData?.restaurantName} />
      
      {/* Navegación de Categorías */}
      {menuData?.categories && (
        <CategoryNav 
          categories={menuData.categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      )}
      
      {/* Lista de Ítems por Categoría */}
      <div className="container mx-auto px-4 max-w-2xl">
        {menuData?.categories?.map((category) => (
          <section 
            key={category.id}
            ref={(el) => categoryRefs.current[category.id] = el}
            className="mb-8 scroll-mt-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sticky top-16 bg-gray-50 py-2 z-10">
              {category.name} 
              <span className="text-sm text-gray-500 font-normal ml-2">
                ({category.items?.length || 0})
              </span>
            </h2>
            
            <div className="space-y-4">
              {category.items?.map((item) => (
                <MenuItem 
                  key={item.id}
                  item={item}
                  onSelect={() => onItemSelect(item)}
                />
              ))}
              
              {(!category.items || category.items.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No hay ítems en esta categoría
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Modal de Detalle del Ítem */}
      <ItemModal 
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={onCloseModal}
      />
    </div>
  );
};

export default MenuPage;