import "./index.scss";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonAlert,
} from "@ionic/react";
import {
  addCircleOutline,
  lockClosedOutline,
  logOutOutline,
} from "ionicons/icons";
import React from "react";

//Router
import { Redirect, Route, useHistory } from "react-router";

// Pages
import { PasswordsPage } from "../../pages/PasswordsPage";
import { AddAccountPage } from "../../pages/AddAccountPage";
import ShowPasswordPage from "../../pages/ShowPasswordPage";

import { Plugins } from "@capacitor/core";

export const MyTabs: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/passwords" component={PasswordsPage} />
        <Route path="/app/password/:id" component={ShowPasswordPage} />
        <Route path="/app/add-account" component={AddAccountPage} />
        <Route exact path="/app">
          <Redirect to="/app/passwords" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="passwords" href="/app/passwords">
          <IonIcon icon={lockClosedOutline} />
          <IonLabel>Passwords</IonLabel>
        </IonTabButton>
        <IonTabButton tab="add-account" href="/app/add-account">
          <IonIcon icon={addCircleOutline} />
          <IonLabel>Add</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="logout"
          onClick={() =>
            presentAlert({
              header: "Sei sicuro di voler uscire?",
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel",
                },
                {
                  text: "Logout",
                  role: "confirm",
                  handler: () => {
                    Plugins.App.exitApp();
                    // history.push("/login");
                  },
                },
              ],
            })
          }
        >
          <IonIcon icon={logOutOutline} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
