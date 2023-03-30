import "./index.scss";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonThumbnail,
} from "@ionic/react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import React, { useEffect, useState } from "react";
import { AccountItem } from "../../hooks/useStorage";

export const PasswordsPage: React.FC = () => {
  const { AccountsState } = useGlobalContext();
  const [nameFilter, setNameFilter] = useState("");
  const [searchAccount, setSearchAccount] = useState<AccountItem[]>([]);

  useEffect(() => {
    if (nameFilter.length > 0) {
      const filterAccounts = AccountsState.accounts.filter((account) => {
        if (
          account.name.substring(0, nameFilter.length).toLowerCase() ===
          nameFilter.toLowerCase()
        ) {
          return account;
        } else {
          return;
        }
      });
      setSearchAccount(filterAccounts);
    }
  }, [nameFilter]);

  return (
    <IonPage>
      <IonContent className="passwords-page">
        <header>
          <h1>My Passwords</h1>
        </header>
        <main>
          {AccountsState.accounts.length === 0 && (
            <div className="empty-password">
              <h1>Nessuna Password!</h1>
              <IonButton routerLink="/app/add-account">Aggiungi</IonButton>
            </div>
          )}
          {AccountsState.accounts.length > 0 && (
            <>
              <IonSearchbar
                className="search-bar"
                value={nameFilter}
                onIonChange={(e) => setNameFilter(e.detail.value!)}
              ></IonSearchbar>
              <IonList>
                {/* Se c'e un filtro mosto array filtrato */}
                {nameFilter.length > 0 &&
                  searchAccount.length > 0 &&
                  searchAccount.map((account, index) => (
                    <IonItem
                      key={account.id}
                      routerLink={`/app/password/${account.id}`}
                    >
                      <IonThumbnail slot="start">
                        <img
                          alt={account.app.name}
                          src={require(`../../assets/icons/${account.app.icon}`)}
                        />
                      </IonThumbnail>
                      <IonLabel>
                        <h2>{account.name}</h2>
                        <h6>{account.app.name}</h6>
                      </IonLabel>
                      {/* <IonIcon icon={chevronForwardOutline} slot="end" /> */}
                    </IonItem>
                  ))}

                {/* Se non ho filtri mostro tutti gli account */}
                {nameFilter.length === 0 &&
                  AccountsState.accounts.map((account, index) => (
                    <IonItem
                      key={account.id}
                      routerLink={`/app/password/${account.id}`}
                    >
                      <IonThumbnail slot="start">
                        <img
                          alt={account.app.name}
                          src={require(`../../assets/icons/${account.app.icon}`)}
                        />
                      </IonThumbnail>
                      <IonLabel>
                        <h2>{account.name}</h2>
                        <h6>{account.app.name}</h6>
                      </IonLabel>
                      {/* <IonIcon icon={chevronForwardOutline} slot="end" /> */}
                    </IonItem>
                  ))}

                {/* Se ho il filtro ma l'array filtrato è vuoto */}
                {nameFilter.length > 0 && searchAccount.length === 0 && (
                  <div className="not-found">
                    <h1>Nessun risultato trovato!</h1>
                  </div>
                )}
              </IonList>
            </>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};
