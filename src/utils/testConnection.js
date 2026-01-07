// src/utils/testConnection.js
import axios from 'axios';

export const testBackendConnection = async () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  try {
    console.log('🔍 Probando conexión con el backend...');
    console.log(`🌐 URL: ${API_URL}`);
    
    // Probar endpoint de restaurant
    const response = await axios.get(`${API_URL}/api/restaurant/`, {
      timeout: 5000
    });
    
    console.log('✅ Conexión exitosa!');
    console.log('📊 Datos recibidos:', response.data);
    return true;
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('⚠️  El backend no está corriendo o la URL es incorrecta');
      console.error('💡 Asegúrate de que:');
      console.error('   1. El servidor de Django esté corriendo');
      console.error('   2. La URL en .env sea correcta');
      console.error('   3. CORS esté configurado en Django');
    }
    
    return false;
  }
};