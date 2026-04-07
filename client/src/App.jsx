import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      alert(data.message);
      setName('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send data');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Add User to Database</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter a name" 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;