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
import { useHistory } from "react-router";
import useStorage from "../../hooks/useStorage";

export const LoginPage: React.FC = () => {
  const { pinCode } = useStorage();
  const history = useHistory();
  const [pin, setPin] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (pin === pinCode) {
      history.push("/app");
      setPin("");
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Pin</IonLabel>
            <IonInput
              type="password"
              value={pin}
              onIonChange={(e) => setPin(e.detail.value!)}
            />
          </IonItem>
          <IonButton type="submit">Login</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};
