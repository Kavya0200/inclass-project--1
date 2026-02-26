const SearchBar = ({ ingredient, onIngredientChange, isVegetarian, onVegetarianChange }) => {
  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '15px',
      margin: '20px 0',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }}>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => onIngredientChange(e.target.value)}
        placeholder="🍗 Enter ingredient (chicken, pasta, etc.)"
        style={{
          width: '100%',
          padding: '15px 20px',
          border: '2px solid #ddd',
          borderRadius: '10px',
          fontSize: '1.1rem',
          marginBottom: '15px',
          boxSizing: 'border-box'
        }}
      />
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        color: '#555'
      }}>
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={(e) => onVegetarianChange(e.target.checked)}
          style={{ width: '20px', height: '20px' }}
        />
        🥬 Show vegetarian recipes only
      </label>
    </div>
  );
};

export default SearchBar;
