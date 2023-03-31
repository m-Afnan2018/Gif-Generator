import './App.css';
import Heading from './components/Heading';
import Random from './components/Random';
import Search from './components/Search';

function App() {
  return (
    <div className="App background">
      <Heading/>
      <Random/>
      <Search/>
    </div>
  );
}

export default App;
