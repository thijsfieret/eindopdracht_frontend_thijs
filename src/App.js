import './App.css';
import './App.css';
import React, {useContext} from "react";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/homePage/Home";
import Politiebureaus from "./pages/Politiebureaus";
import AlleOpsporingsberichten from "./pages/AlleOpsporingsberichten";
import Searched from "./pages/Searched";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import TopMenu from "./components/TopMenu";
import Wijkagenten from "./pages/Wijkagenten";
import VermisteVolwassenen from "./pages/Vermistevolwassenen";
import VermisteKinderen from "./pages/Vermistekinderen";

function App() {

    const { isAuthenticated } = useAuth();

  return (
      <BrowserRouter>
          <TopMenu/>
          <Switch>
              <Route exact path="/"> <Home /></Route>
              <Route path="/Politiebureaus"> <Politiebureaus/></Route>
              <Route path="/AlleOpsporingsberichten"> <AlleOpsporingsberichten/></Route>
              <Route path="/searched/:search"> <Searched/></Route>
              <Route path="/Vermistevolwassenen"> <VermisteVolwassenen/></Route>
              <Route path="/signup" ><Signup/> </Route>
              <Route path="/wijkagenten" ><Wijkagenten/> </Route>
              <Route path="/Vermistekinderen" ><VermisteKinderen/> </Route>
              <AuthContextProvider><Route path="/login"> <Login/></Route></AuthContextProvider>
              <AuthContextProvider> <Route path="/Profile"> {isAuthenticated  ? <Profile /> : <Redirect to="/" />} </Route> </AuthContextProvider>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
