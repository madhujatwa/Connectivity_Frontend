import { useState } from 'react';
import './App.css';
import UserCreate from './components/UserCreate';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <UserCreate/>
    </>
  );
}

export default App;
