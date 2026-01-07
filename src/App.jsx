import React from 'react';
import MenuPage from './pages/MenuPage';
import { useMenu } from './hooks/useMenu';
import './styles/globals.css';

function App() {
  const { menuData, loading } = useMenu();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <MenuPage menuData={menuData} />
    </div>
  );
}

export default App;