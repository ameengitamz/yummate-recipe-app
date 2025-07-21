import React from 'react';
import ApiTestComponent from '../components/ApiTestComponent';

const ApiTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <ApiTestComponent />
      </div>
    </div>
  );
};

export default ApiTestPage;
