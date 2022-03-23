import './App.css';
import ResultPage from './components/ResultPage';
import SearchPage from './components/SearchPage';
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <SearchPage />
        </Route>
        <Route path="/results">
          <ResultPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
