import { Route, Switch } from "react-router";
import AllFilms from "./components/AllFilms/AllFilms";
import Film from "./components/Film/Film";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Singup";
import User from "./components/User/User";
import Admin from './components/Admin/Admin';
import AdminFilms from "./components/Admin/AdminFilms/AdminFilms";
import './app.scss';
import EditFilm from "./components/Admin/EditFilm/EditFilm";
import AddFilm from "./components/Admin/AddFilm/AddFilm";
import Logout from "./components/Logout/Logout";

const App = () =>{
  return (
    <div className="App container">
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
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/admin/films">
          <AdminFilms/>
        </Route>
        <Route path="/admin/add">
          <AddFilm/>
        </Route>
        <Route path="/admin/:title">
          <EditFilm/>
        </Route>

        <Route path="/admin">
          <Admin/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
