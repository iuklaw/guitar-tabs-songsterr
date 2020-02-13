import React from 'react';
import Tabs from './Tabs';
import SearchBar from './SearchBar';

import '../css/Main.css'
import ScrollButton from './ScrollButton';

const App = () => {
  return (
    <div className="App">
      <SearchBar />
      <Tabs />
      <ScrollButton />
    </div>
  );
}

export default App;
