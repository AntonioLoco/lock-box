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
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MyTabs } from "./components/MyTabs";
import { useState } from "react";

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

          <Route path="/app">
            <MyTabs />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
