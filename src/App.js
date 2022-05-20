import React, {useContext} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import "./style/style.css";
import {apiTransport} from "./transport/api.transport";
import {Context} from "./index";


function App() {
  const getKey = sessionStorage.getItem('token');
  const { user } = useContext(Context);

  apiTransport.authValidation(getKey)
      .then((resp) => {
          user.setIsAuth(true);
      });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
        <div style={{position: "relative",}}>
            <div id="footer" className="copyright">Кафедра высшей математики УрФУ</div>
        </div>
    </div>
  );
}
export default App;
