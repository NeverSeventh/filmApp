import { Route, Switch } from "react-router";
import AllFilms from "./components/AllFilms/AllFilms";
import Film from "./components/Film/Film";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Singup";
import User from "./components/User/User";
import './app.scss';

const App = () =>{
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/film/:title">
        <Film/>
        </Route>
        <Route path="/film">
        <AllFilms/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/user">
          <User/>
        </Route>
        <Route>
          <Signup path="/signup"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
