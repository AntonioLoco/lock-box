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
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useStorage, { AccountItem } from "../../hooks/useStorage";

export const PasswordsPage = () => {
  const { saveStoreAccounts } = useStorage();
  const { AccountsState } = useGlobalContext();

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
          {AccountsState.accounts.map((account) => (
            <IonItem key={account.id}>
              <h2>Account: {account.website}</h2>
              <h4>Email: {account.email}</h4>
              <h4>Password: {account.password}</h4>
              <IonButton
                onClick={() => {
                  const updatedAccounts = AccountsState.accounts.filter(
                    (item) => item.id !== account.id
                  );
                  AccountsState.setAccounts(updatedAccounts);
                  saveStoreAccounts(updatedAccounts);
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
