// src/components/BackendDiagnostic.jsx
import React, { useState } from 'react';
import { testBackendConnection } from '../hooks/useMenu';

const BackendDiagnostic = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostic = async () => {
    setLoading(true);
    const testResults = await testBackendConnection();
    setResults(testResults);
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #007bff',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '400px',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <h4 style={{ marginTop: 0, color: '#007bff' }}>🔧 Diagnóstico Backend</h4>
      
      <button 
        onClick={runDiagnostic}
        disabled={loading}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {loading ? 'Probando...' : 'Ejecutar Diagnóstico'}
      </button>
      
      {results && (
        <div>
          <h5>Resultados:</h5>
          {results.map((result, index) => (
            <div key={index} style={{
              marginBottom: '8px',
              padding: '8px',
              background: result.success ? '#d4edda' : '#f8d7da',
              borderRadius: '4px',
              borderLeft: `4px solid ${result.success ? '#28a745' : '#dc3545'}`
            }}>
              <div style={{ fontWeight: 'bold' }}>
                {result.success ? '✅' : '❌'} {result.endpoint}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Status: {result.status || 'N/A'}
              </div>
              {result.error && (
                <div style={{ fontSize: '11px', color: '#721c24' }}>
                  Error: {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        <strong>URL Backend:</strong> http://127.0.0.1:8000
      </div>
    </div>
  );
};

export default BackendDiagnostic;