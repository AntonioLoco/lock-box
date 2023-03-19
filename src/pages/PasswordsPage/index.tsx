import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import useStorage from "../../hooks/useStorage";

export const PasswordsPage: React.FC = () => {
  const { accounts, deleteAccount } = useStorage();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Passwords Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
