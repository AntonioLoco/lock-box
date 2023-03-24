import "./index.scss";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonThumbnail,
} from "@ionic/react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

export const PasswordsPage = () => {
  const { AccountsState } = useGlobalContext();

  return (
    <IonPage>
      <IonContent className="passwords-page">
        <header>
          <h1>My Passwords</h1>
        </header>
        <main>
          <IonSearchbar className="search-bar"></IonSearchbar>
          <IonList>
            {AccountsState.accounts.map((account) => (
              <IonItem
                key={account.id}
                routerLink={`/app/password/${account.id}`}
              >
                <IonThumbnail slot="start">
                  <img
                    alt={account.website}
                    src={`https://besticon-demo.herokuapp.com/icon?url=${account.linkWebsite}&size=80..120..200`}
                  />
                </IonThumbnail>
                <IonLabel>
                  <h2>{account.website}</h2>
                  <h6>{account.email}</h6>
                </IonLabel>
                {/* <IonIcon icon={chevronForwardOutline} slot="end" /> */}
              </IonItem>
            ))}
          </IonList>
        </main>
      </IonContent>
    </IonPage>
  );
};
