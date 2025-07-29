import React, { useState } from 'react';
import * as spoonacularApi from '../services/spoonacularApi';
import { LoadingSpinner } from './index';

const ApiTestComponent: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResults([]);

    const results: string[] = [];

    // Test 1: Check API health
    results.push('🔄 Testing API connection...');
    setTestResults([...results]);

    const isHealthy = await spoonacularApi.checkApiHealth();
    if (isHealthy) {
      results.push('✅ API connection successful');
      setIsConnected(true);
    } else {
      results.push('❌ API connection failed - Please check your API key');
      setIsConnected(false);
      setTestResults([...results]);
      setIsLoading(false);
      return;
    }

    // Test 2: Get cuisines
    results.push('🔄 Testing cuisines endpoint...');
    setTestResults([...results]);
    
    const cuisinesResult = await spoonacularApi.getCuisines();
    if (cuisinesResult.success) {
      results.push(`✅ Cuisines loaded: ${cuisinesResult.data.length} available`);
    } else {
      results.push('❌ Failed to load cuisines');
    }

    // Test 3: Get diet types
    results.push('🔄 Testing diet types endpoint...');
    setTestResults([...results]);
    
    const dietsResult = await spoonacularApi.getDietTypes();
    if (dietsResult.success) {
      results.push(`✅ Diet types loaded: ${dietsResult.data.length} available`);
    } else {
      results.push('❌ Failed to load diet types');
    }

    // Test 4: Search recipes
    results.push('🔄 Testing recipe search...');
    setTestResults([...results]);
    
    const searchResult = await spoonacularApi.searchRecipes({ 
      query: 'pasta', 
      number: 3 
    });
    
    if (searchResult.success) {
      results.push(`✅ Recipe search successful: ${searchResult.data.recipes.length} recipes found`);
      results.push(`📊 Total available: ${searchResult.data.totalResults} recipes`);
    } else {
      results.push(`❌ Recipe search failed: ${searchResult.message}`);
    }

    // Test 5: Get suggestions
    results.push('🔄 Testing autocomplete suggestions...');
    setTestResults([...results]);
    
    const suggestionsResult = await spoonacularApi.getAutocompleteSuggestions('pizza');
    if (suggestionsResult.success) {
      results.push(`✅ Suggestions loaded: ${suggestionsResult.data.length} suggestions`);
    } else {
      results.push('❌ Failed to load suggestions');
    }

    setTestResults([...results]);
    setIsLoading(false);
  };

  const getStatusColor = () => {
    if (isConnected === null) return 'text-gray-500';
    return isConnected ? 'text-green-600' : 'text-red-600';
  };

  const getStatusText = () => {
    if (isConnected === null) return 'Not tested';
    return isConnected ? 'Connected' : 'Connection failed';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🧪 Spoonacular API Test</h2>
        <p className="text-gray-600 mb-4">
          Test your API connection and functionality
        </p>
        
        <div className={`text-lg font-semibold ${getStatusColor()}`}>
          Status: {getStatusText()}
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={testApiConnection}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <LoadingSpinner 
              variant="inline" 
              size="sm" 
              showIcon={false} 
              showDots={false}
              className="w-6 h-6"
            />
          ) : (
            '🚀 Run API Tests'
          )}
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Test Results:</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {testResults.map((result, index) => (
              <div 
                key={index}
                className="text-sm font-mono bg-white p-2 rounded border-l-4 border-blue-400"
              >
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Setup Instructions:</h4>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>Get your free API key from <a href="https://spoonacular.com/food-api" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">spoonacular.com</a></li>
          <li>Add <code className="bg-yellow-100 px-1 rounded">VITE_SPOONACULAR_API_KEY=your_key_here</code> to your .env file</li>
          <li>Restart your development server</li>
          <li>Click "Run API Tests" to verify everything works</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiTestComponent;
