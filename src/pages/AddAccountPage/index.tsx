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
import { useEffect, useRef, useState } from "react";
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

  const contentRef = useRef<HTMLIonContentElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [currentInput, setCurrentInputRef] = useState("");

  useEffect(() => {
    // Se la tastiera è gia aperta
    if (keyboardHeight !== 0) {
      console.log("Tastiera già aperta");
      console.log(currentInput);
      let scrollOffset = document.getElementById(currentInput)?.offsetTop!;
      if (currentInput === "password") {
        scrollOffset += 100;
      } else {
        scrollOffset += 50;
      }
      contentRef.current?.scrollToPoint(0, scrollOffset, 300);
    }

    window.addEventListener("keyboardDidShow", onKeyboardShow);
    window.addEventListener("keyboardDidHide", onKeyboardHide);

    return () => {
      window.removeEventListener("keyboardDidShow", onKeyboardShow);
      window.removeEventListener("keyboardDidHide", onKeyboardHide);
    };
  }, [currentInput]);

  const onKeyboardShow = (e: any) => {
    console.log(currentInput);

    setKeyboardHeight(e.keyboardHeight);
    let scrollOffset = document.getElementById(currentInput)?.offsetTop!;
    if (currentInput === "password") {
      scrollOffset += 100;
    } else {
      scrollOffset += 50;
    }
    contentRef.current?.scrollToPoint(0, scrollOffset, 300);
  };

  const onKeyboardHide = () => {
    setKeyboardHeight(0);
    setCurrentInputRef("");
    contentRef.current?.scrollToPoint(0, 0, 300);
  };

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
      <IonContent
        className="add-account-page"
        scrollEvents={true}
        ref={contentRef}
      >
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
                id="name"
                placeholder="es. Facebook"
                value={webSite}
                onIonChange={(e) => setWebSite(e.detail.value!)}
                onIonFocus={() => {
                  setCurrentInputRef("name");
                }}
              ></IonInput>
            </IonItem>

            {/* Link Website */}
            <IonItem>
              <IonLabel position="stacked">
                <h1>Link Web</h1>
              </IonLabel>
              <IonInput
                id="link"
                placeholder="es. www.facebook.com"
                value={linkWebsite}
                onIonChange={(e) => setLinkWebsite(e.detail.value!)}
                onIonFocus={() => {
                  setCurrentInputRef("link");
                }}
              ></IonInput>
            </IonItem>

            {/* Email or Username */}
            <IonItem>
              <IonLabel position="stacked">
                <h1>Email or Username</h1>
              </IonLabel>
              <IonInput
                id="email"
                placeholder="Inserisci la tua email o username"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                onIonFocus={() => {
                  setCurrentInputRef("email");
                }}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                <h1>Password</h1>
              </IonLabel>
              <IonInput
                id="password"
                placeholder="Inserisci o genera la tua password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                onIonFocus={() => {
                  setCurrentInputRef("password");
                }}
              ></IonInput>
            </IonItem>

            <IonButton type="submit">Save</IonButton>
          </form>
          <div
            id="keyboardHeight"
            style={{ height: `${keyboardHeight}px`, width: "100%" }}
          ></div>
        </main>
      </IonContent>
    </IonPage>
  );
};
