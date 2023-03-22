import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useStorage, { AccountItem } from "../../hooks/useStorage";

export const AddAccountPage = () => {
  const { saveStoreAccounts } = useStorage();
  const { AccountsState } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webSite, setWebSite] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");

  const handleAdd = async () => {
    const newAccount: AccountItem = {
      id: new Date().getTime() + "",
      email,
      password,
      website: webSite,
      linkWebsite,
    };
    const updateAccounts = [...AccountsState.accounts, newAccount];
    AccountsState.setAccounts(updateAccounts);
    await saveStoreAccounts(updateAccounts);
    setEmail("");
    setPassword("");
    setWebSite("");
    setLinkWebsite("");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Crea un Account</h1>
        <IonItem>
          <IonLabel position="floating">Nome Piattaforma</IonLabel>
          <IonInput
            placeholder="Inserisci l'email"
            value={webSite}
            onIonChange={(e) => setWebSite(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            placeholder="Inserisci l'email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            placeholder="Inserisci la tua password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Link WebSite</IonLabel>
          <IonInput
            placeholder="www.facebook.com"
            value={linkWebsite}
            onIonChange={(e) => setLinkWebsite(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={handleAdd}>Aggiungi</IonButton>
      </IonContent>
    </IonPage>
  );
};
