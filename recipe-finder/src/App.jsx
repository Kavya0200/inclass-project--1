import React, { useState, useEffect } from 'react';

function App() {
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
    if (!ingredient.trim()) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
      const data = await response.json();
      let filtered = data.meals || [];
      
      if (isVegetarian) {
        filtered = filtered.filter(recipe => {
          const ing1 = recipe.strIngredient1 ? recipe.strIngredient1.toLowerCase() : '';
          return !ing1.includes('chicken') && !ing1.includes('beef') && !ing1.includes('pork');
        });
      }
      setRecipes(filtered);
    } catch (error) {
      console.log('Error fetching recipes:', error);
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
    setExpandedId(prev => (prev === recipeId ? null : recipeId));
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          min-height: 100vh !important;
          overflow-x: hidden !important;
          background: #667eea !important;
        }
        #root {
          max-width: 100% !important;
          width: 100vw !important;
          margin: 0 !important;
          padding: 0 !important;
          display: block !important;
        }
        * {
          box-sizing: border-box !important;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

          <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800',
              background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.8))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
               Recipe Finder
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
              Discover delicious meals with your ingredients ✨
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            padding: '30px',
            borderRadius: '25px',
            marginBottom: '30px',
            maxWidth: '700px',
            margin: '0 auto 40px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <input
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder=" Enter ingredient (chicken, pasta, beef...)"
              style={{
                width: '100%',
                padding: '18px 25px',
                border: 'none',
                borderRadius: '20px',
                fontSize: '1.2rem',
                background: 'rgba(20, 19, 19, 0.9)',
                marginBottom: '20px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                outline: 'none'
              }}
            />
            <label style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '12px', fontSize: '1.2rem', color: 'white', cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#4ade80' }}
              />
              🥬 Vegetarian recipes only
            </label>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px',
            marginBottom: '40px', fontSize: '1.5rem', color: 'white', fontWeight: '600'
          }}>
            <span>🍽️ {recipes.length} recipes found</span>
            <span>❤️ {favorites.length} favorites</span>
          </div>
          {loading && (
            <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
              <div style={{
                width: '60px', height: '60px',
                border: '6px solid rgba(255,255,255,0.3)',
                borderTop: '6px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              <h2>Loading delicious recipes... </h2>
            </div>
          )}
          {!loading && recipes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(255,255,255,0.8)' }}>
              <div style={{ fontSize: '5rem', marginBottom: '15px' }}>🔍</div>
              <h2>No recipes found</h2>
              <p>Try "chicken", "pasta", "beef", or "vegetable" 😊</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px'
            }}>
              {recipes.map((recipe) => (
                <div key={recipe.idMeal} style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '25px', overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => toggleFavorite(recipe.idMeal)}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: 'none',
                        background: favorites.includes(recipe.idMeal) 
                          ? 'linear-gradient(135deg, #ff4757, #ff6b6b)' 
                          : 'rgba(255,255,255,0.95)',
                        color: favorites.includes(recipe.idMeal) ? '#ffffff' : '#333333',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                      }}
                    >
                      ❤️
                    </button>
                  </div>

                  <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#2d3748', marginBottom: '15px' }}>
                      {recipe.strMeal}
                    </h3>
                    <button
                      onClick={() => toggleDetails(recipe.idMeal)}
                      style={{
                        width: '100%', padding: '12px', marginTop: 'auto',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', border: 'none', borderRadius: '12px',
                        fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
                      }}
                    >
                      {expandedId === recipe.idMeal ? '👀 Hide Details' : '👁️ Show Details'}
                    </button>
                    {expandedId === recipe.idMeal && (
                      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                        <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#4a5568' }}>
                          <strong>Category:</strong> {recipe.strCategory} <br/>
                          <strong>Origin:</strong> {recipe.strArea}
                        </p>
                        <strong style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Ingredients:</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {Array.from({ length: 20 }, (_, i) => {
                            const ing = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            if (ing && ing.trim()) {
                              return (
                                <span key={i} style={{
                                  background: '#fff3cd', color: '#856404',
                                  padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold'
                                }}>
                                  {measure?.trim()} {ing}
                                </span>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {favorites.length > 0 && (
            <div style={{
              marginTop: '60px', padding: '40px',
              background: 'rgba(255,255,255,0.1)', borderRadius: '25px'
            }}>
              <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
                ❤️ Your Favorites ({favorites.length})
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {recipes.filter(r => favorites.includes(r.idMeal)).map(recipe => (
                  <div key={recipe.idMeal} style={{
                    background: 'white', padding: '20px', borderRadius: '20px',
                    textAlign: 'center', width: '200px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{
                      width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px'
                    }}/>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#333' }}>{recipe.strMeal}</h4>
                    <span style={{ color: '#ff4757', fontWeight: 'bold' }}>❤️ Saved</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default App;
