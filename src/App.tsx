import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

//Basic Ionic CSS
import "./general.scss";

/* Theme variables */
import "./theme/variables.scss";

//Storage
import useStorage from "./hooks/useStorage";

//Global Context
import { MyGlobalContext } from "./hooks/useGlobalContext";

//Pages
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MyTabs } from "./components/MyTabs";
import { useState } from "react";
import { IntroPage } from "./pages/IntroPage";

setupIonicReact();

const App: React.FC = () => {
  const { pinCode, loading, StoreAccounts } = useStorage();
  const [accounts, setAccounts] = useState(StoreAccounts);
  return (
    <MyGlobalContext.Provider
      value={{ AccountsState: { accounts, setAccounts } }}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              {loading ? "Loading" : pinCode ? <LoginPage /> : <IntroPage />}
            </Route>

            <Route path="/register" component={RegisterPage} />

            <Route path="/app">
              <MyTabs />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </MyGlobalContext.Provider>
  );
};

export default App;
