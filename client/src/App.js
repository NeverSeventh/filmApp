import { Route, Switch } from "react-router";
import AllFilms from "./components/AllFilms/AllFilms";
import Film from "./components/Film/Film";


const App = () =>{
  return (
    <div className="App">
      <Switch>
        <Route path="/film/:title">
        <Film/>
        </Route>
        <Route path="/film">
        <AllFilms/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
