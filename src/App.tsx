import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

//Basic Ionic CSS
import "./general.scss";

/* Theme variables */
import "./theme/variables.scss";

//Storage
import useStorage, { AccountItem } from "./hooks/useStorage";

//Global Context
import { MyGlobalContext } from "./hooks/useGlobalContext";

//Pages
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MyTabs } from "./components/MyTabs";
import { useEffect, useState } from "react";
import { IntroPage } from "./pages/IntroPage";
import LoadingPage from "./pages/LoadingPage";

import { StatusBar } from "@capacitor/status-bar";

setupIonicReact();

const App: React.FC = () => {
  const { pinCode, loading, StoreAccounts } = useStorage();
  const [accounts, setAccounts] = useState<AccountItem[]>([]);

  useEffect(() => {
    StatusBar.setBackgroundColor({ color: "#5c60f7" });
  }, []);

  useEffect(() => {
    if (!loading) {
      setAccounts(StoreAccounts);
    }
  }, [loading]);

  return (
    <MyGlobalContext.Provider
      value={{ AccountsState: { accounts, setAccounts } }}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              {loading ? (
                <LoadingPage />
              ) : pinCode ? (
                <Redirect to="/login" />
              ) : (
                <IntroPage />
              )}
            </Route>

            <Route path="/login" component={LoginPage} />
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
