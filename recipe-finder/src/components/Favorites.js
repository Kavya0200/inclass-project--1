const Favorites = ({ recipes, favorites }) => {
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.idMeal));

  if (favoriteRecipes.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2rem',
        color: '#e74c3c',
        marginBottom: '25px'
      }}>
        ❤️ Your Favorites ({favoriteRecipes.length})
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            style={{
              background: 'linear-gradient(135deg, #fff5f5, #ffebee)',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(231, 76, 60, 0.15)'
            }}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                margin: '0 auto 15px',
                display: 'block',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>
              {recipe.strMeal}
            </h3>
            <span style={{
              background: '#e74c3c',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              ❤️ Saved!
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
