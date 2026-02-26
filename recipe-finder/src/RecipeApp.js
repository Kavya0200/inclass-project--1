import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import RecipeList from './RecipeList.js';
import Favorites from './Favorites.js';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [ingredient, setIngredient] = useState('chicken');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [ingredient, isVegetarian]);

  const fetchRecipes = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
      const data = await response.json();
      let filtered = data.meals || [];
      
      if (isVegetarian) {
        filtered = filtered.filter(recipe => 
          !recipe.strIngredient1?.toLowerCase().includes('chicken') &&
          !recipe.strIngredient1?.toLowerCase().includes('beef') &&
          !recipe.strIngredient1?.toLowerCase().includes('pork')
        );
      }
      setRecipes(filtered);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const toggleDetails = (recipeId) => {
    setExpandedId(prev => prev === recipeId ? null : recipeId);
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#e74c3c',
        fontSize: '2.5rem',
        marginBottom: '10px'
      }}>
        🍲 Recipe Finder
      </h1>
      
      <SearchBar
        ingredient={ingredient}
        onIngredientChange={setIngredient}
        isVegetarian={isVegetarian}
        onVegetarianChange={setIsVegetarian}
      />
      
      <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.2rem' }}>
        <strong>🍽️ {recipes.length} recipes | ❤️ {favorites.length} favorites</strong>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', fontSize: '1.5rem', padding: '40px' }}>
          ⏳ Loading recipes...
        </div>
      )}

      <RecipeList
        recipes={recipes}
        favorites={favorites}
        expandedId={expandedId}
        onToggleFavorite={toggleFavorite}
        onToggleDetails={toggleDetails}
      />

      <Favorites recipes={recipes} favorites={favorites} />
    </div>
  );
};

export default RecipeApp;
