import "./index.scss";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import useStorage from "../../hooks/useStorage";

export const HomePage: React.FC = () => {
  const { accounts, createAccount, deleteAccount } = useStorage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webSite, setWebSite] = useState("");

  const handleAdd = async () => {
    await createAccount(email, password, webSite);
    setEmail("");
    setPassword("");
    setWebSite("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page Title</IonTitle>
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
            placeholder="Inserisci l'email"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={handleAdd}>Aggiungi</IonButton>

        <h2>Lista degli Account</h2>
        <IonList>
          {accounts.map((account) => (
            <IonItem key={account.id}>
              <h2>Account: {account.website}</h2>
              <h4>Email: {account.email}</h4>
              <h4>Password: {account.password}</h4>
              <IonButton
                onClick={() => {
                  deleteAccount(account.id);
                }}
              >
                X
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
