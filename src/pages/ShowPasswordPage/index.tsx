import "./index.scss";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import React from "react";
import { useHistory, useParams } from "react-router";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { chevronBackOutline } from "ionicons/icons";

const ShowPasswordPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { AccountsState } = useGlobalContext();
  const accountShow = AccountsState.accounts.filter(
    (account) => account.id == id
  );

  return (
    <IonPage>
      <IonContent className="show-password-page">
        <header>
          <h1>{accountShow[0].website}</h1>
        </header>
        <main>
          <div className="photo">
            <img
              src={`https://besticon-demo.herokuapp.com/icon?url=${accountShow[0].linkWebsite}&size=80..120..200`}
            />
          </div>
        </main>

        <IonFab vertical="top" horizontal="start">
          <IonFabButton size="small" onClick={() => history.goBack()}>
            <IonIcon icon={chevronBackOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ShowPasswordPage;
