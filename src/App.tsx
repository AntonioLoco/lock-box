import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

//Basic Ionic CSS
import "./general.scss";

/* Theme variables */
import "./theme/variables.scss";

//Storage
import useStorage from "./hooks/useStorage";

//Pages
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

setupIonicReact();

const App: React.FC = () => {
  const { pinCode, loading } = useStorage();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            {loading ? "Loading" : pinCode ? <LoginPage /> : <RegisterPage />}
          </Route>

          <Route exact path="/home" component={HomePage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
