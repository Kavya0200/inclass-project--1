const RecipeList = ({ recipes, favorites, expandedId, onToggleFavorite, onToggleDetails }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    }}>
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            border: '1px solid #eee'
          }}
        >
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
            <button
              onClick={() => onToggleFavorite(recipe.idMeal)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: 'none',
                background: favorites.includes(recipe.idMeal) ? '#e74c3c' : 'rgba(255,255,255,0.9)',
                color: favorites.includes(recipe.idMeal) ? 'white' : '#333',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              ❤️
            </button>
          </div>

          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3rem', color: '#333' }}>
            {recipe.strMeal}
          </h3>

          <button
            onClick={() => onToggleDetails(recipe.idMeal)}
            style={{
              width: '100%',
              padding: '12px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            {expandedId === recipe.idMeal ? '👀 Hide Details' : '👁️ Show Details'}
          </button>

          {expandedId === recipe.idMeal && (
            <div>
              <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                <strong>Category:</strong> {recipe.strCategory || 'N/A'} | 
                <strong> Area:</strong> {recipe.strArea || 'N/A'}
              </p>
              <div>
                <strong style={{ display: 'block', marginBottom: '10px' }}>Ingredients:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Array.from({ length: 20 }, (_, i) => {
                    const ingredient = recipe[`strIngredient${i + 1}`];
                    const measure = recipe[`strMeasure${i + 1}`];
                    if (ingredient?.trim()) {
                      return (
                        <span
                          key={i}
                          style={{
                            background: '#fff3cd',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            color: '#856404'
                          }}
                        >
                          {measure?.trim()} {ingredient}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
