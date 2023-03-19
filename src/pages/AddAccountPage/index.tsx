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
import useStorage from "../../hooks/useStorage";

export const AddAccountPage: React.FC = () => {
  const { createAccount } = useStorage();

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
            placeholder="Inserisci l'email"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton onClick={handleAdd}>Aggiungi</IonButton>
      </IonContent>
    </IonPage>
  );
};
