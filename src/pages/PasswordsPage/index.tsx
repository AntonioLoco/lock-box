import "./index.scss";
import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  isPlatform,
} from "@ionic/react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import React, { useEffect, useState } from "react";
import useStorage, { AccountItem } from "../../hooks/useStorage";
import { chevronForwardOutline } from "ionicons/icons";
import emptySvg from "../../assets/svg/empty-password.svg";

export const PasswordsPage: React.FC = () => {
  const { AccountsState } = useGlobalContext();
  const { customCategories } = useStorage();
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchAccount, setSearchAccount] = useState<AccountItem[]>([]);

  useEffect(() => {
    if (nameFilter.length > 0 && categoryFilter !== "All") {
      const filterAccounts = AccountsState.accounts.filter((account) => {
        if (categoryFilter === account.category) {
          if (
            account.name.substring(0, nameFilter.length).toLowerCase() ===
            nameFilter.toLowerCase()
          ) {
            return account;
          }
        }
      });
      setSearchAccount(filterAccounts);
    } else if (nameFilter.length > 0) {
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
    } else if (categoryFilter !== "All") {
      const filterAccounts = AccountsState.accounts.filter(
        (account) => account.category === categoryFilter
      );

      setSearchAccount(filterAccounts);
    }
  }, [nameFilter, categoryFilter]);

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
              <img src={emptySvg} alt="empty password" />
            </div>
          )}
          {AccountsState.accounts.length > 0 && (
            <>
              <IonSearchbar
                className="search-bar"
                value={nameFilter}
                onIonChange={(e) => setNameFilter(e.detail.value!)}
              ></IonSearchbar>
              <div className="filter-categories">
                <IonChip
                  className={categoryFilter === "All" ? "active" : ""}
                  onClick={() => setCategoryFilter("All")}
                >
                  All
                </IonChip>
                {customCategories.map((category, index) => {
                  return (
                    <IonChip
                      key={index}
                      className={
                        categoryFilter === category.category ? "active" : ""
                      }
                      onClick={() => setCategoryFilter(category.category)}
                    >
                      {category.category}
                    </IonChip>
                  );
                })}
              </div>
              <IonList>
                {/* Se c'e un filtro mosto array filtrato */}
                {(nameFilter.length > 0 || categoryFilter !== "All") &&
                  searchAccount.length > 0 &&
                  searchAccount.map((account) => (
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
                      {isPlatform("android") && (
                        <IonIcon icon={chevronForwardOutline} slot="end" />
                      )}
                    </IonItem>
                  ))}

                {/* Se non ho filtri mostro tutti gli account */}
                {nameFilter.length === 0 &&
                  categoryFilter === "All" &&
                  AccountsState.accounts.map((account) => (
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
                      {isPlatform("android") && (
                        <IonIcon icon={chevronForwardOutline} slot="end" />
                      )}
                    </IonItem>
                  ))}

                {/* Se ho il filtro ma l'array filtrato è vuoto */}
                {(nameFilter.length > 0 || categoryFilter !== "All") &&
                  searchAccount.length === 0 && (
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
