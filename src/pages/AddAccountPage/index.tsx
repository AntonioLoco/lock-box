import "./index.scss";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useStorage, { AccountItem } from "../../hooks/useStorage";
import { useHistory } from "react-router";

export const AddAccountPage = () => {
  const { saveStoreAccounts } = useStorage();
  const { AccountsState } = useGlobalContext();
  const history = useHistory();
  const [successToast] = useIonToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webSite, setWebSite] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const newAccount: AccountItem = {
      id: new Date().getTime() + "",
      email,
      password,
      website: webSite,
      linkWebsite,
    };
    const updateAccounts = [newAccount, ...AccountsState.accounts];
    AccountsState.setAccounts(updateAccounts);
    history.push("/app/passwords");
    successToast({
      message: `Account ${webSite} aggiunto!`,
      duration: 2000,
      position: "top",
      color: "success",
    });
    await saveStoreAccounts(updateAccounts);
    setEmail("");
    setPassword("");
    setWebSite("");
    setLinkWebsite("");
  };
  return (
    <IonPage>
      <IonContent className="add-account-page">
        <header>
          <h1>Aggiungi un Account</h1>
        </header>
        <main>
          <form onSubmit={(e) => handleAdd(e)}>
            {/* Name Account */}
            <IonItem>
              <IonLabel position="stacked">
                <h1>Name</h1>
              </IonLabel>
              <IonInput
                placeholder="es. Facebook"
                value={webSite}
                onIonChange={(e) => setWebSite(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {/* Link Website */}
            <IonItem>
              <IonLabel position="stacked">
                <h1>Link Web</h1>
              </IonLabel>
              <IonInput
                placeholder="es. www.facebook.com"
                value={linkWebsite}
                onIonChange={(e) => setLinkWebsite(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {/* Email or Username */}
            <IonItem>
              <IonLabel position="stacked">
                <h1>Email or Username</h1>
              </IonLabel>
              <IonInput
                placeholder="Inserisci la tua email o username"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                <h1>Password</h1>
              </IonLabel>
              <IonInput
                placeholder="Inserisci o genera la tua password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonButton type="submit">Save</IonButton>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};
