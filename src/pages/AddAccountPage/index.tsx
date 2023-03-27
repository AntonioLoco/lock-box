import "./index.scss";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNavLink,
  IonNote,
  IonPage,
  useIonToast,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useStorage, { AccountItem } from "../../hooks/useStorage";
import { useHistory } from "react-router";
import { GeneratePasswordModal } from "../../components/GeneratePasswordModal";

export const AddAccountPage = () => {
  const { saveStoreAccounts } = useStorage();
  const { AccountsState } = useGlobalContext();
  const history = useHistory();
  const [successToast] = useIonToast();

  //Input form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webSite, setWebSite] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");
  //Error Form
  const [errorEmail, setErrorEmail] = useState({ status: false, message: "" });
  const [errorWebSite, setErrorWebSite] = useState({
    status: false,
    message: "",
  });
  const [errorLink, setErrorLink] = useState({ status: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: "",
  });

  //For Keyboard Controll
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [currentInput, setCurrentInputRef] = useState("");

  const [modalGeneratePassword, setModalGeneratePassword] = useState(false);

  //Function Keyboard
  const onKeyboardShow = (e: any) => {
    setKeyboardHeight(e.keyboardHeight);
    let scrollOffset = document.getElementById(currentInput)?.offsetTop!;
    if (currentInput === "password") {
      scrollOffset += 100;
    } else {
      scrollOffset += 20;
    }
    contentRef.current?.scrollToPoint(0, scrollOffset, 300);
  };

  const onKeyboardHide = () => {
    setKeyboardHeight(0);
    setCurrentInputRef("");
    contentRef.current?.scrollToPoint(0, 0, 300);
  };

  //Function Add Account
  const handleAdd = async (e: any) => {
    e.preventDefault();
    setErrorWebSite({ status: false, message: "" });
    setErrorLink({ status: false, message: "" });
    setErrorEmail({ status: false, message: "" });
    setErrorPassword({ status: false, message: "" });

    let errors = 0;
    // Controlli per Valiadazione
    if (webSite.length === 0) {
      errors++;
      setErrorWebSite({
        status: true,
        message: "Il nome dell'account è richiesto!",
      });
    }

    if (linkWebsite.length === 0) {
      errors++;
      setErrorLink({
        status: true,
        message: "Il link del sito è richiesto!",
      });
    }

    if (email.length === 0) {
      errors++;
      setErrorEmail({
        status: true,
        message: "Un email o username è richiesto!",
      });
    }

    if (password.length <= 4) {
      errors++;
      setErrorPassword({
        status: true,
        message: "La password deve essere di almeno 4 caratteri",
      });
    }

    // Se non ci sono errori
    if (errors === 0) {
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
    }
  };

  useEffect(() => {
    // Se la tastiera è gia aperta
    if (keyboardHeight !== 0) {
      let scrollOffset = document.getElementById(currentInput)?.offsetTop!;
      if (currentInput === "password") {
        scrollOffset += 100;
      } else {
        scrollOffset += 20;
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
  return (
    <IonPage>
      <IonContent
        className="add-account-page"
        scrollEvents={true}
        ref={contentRef}
      >
        <div className="container">
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
                {errorWebSite.status && (
                  <IonNote color="danger">{errorWebSite.message}</IonNote>
                )}
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
                {errorLink.status && (
                  <IonNote color="danger">{errorLink.message}</IonNote>
                )}
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
                {errorEmail.status && (
                  <IonNote color="danger">{errorEmail.message}</IonNote>
                )}
              </IonItem>

              <IonItem>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IonLabel position="stacked">
                    <h1>Password</h1>
                  </IonLabel>
                  <a
                    color="primary"
                    style={{ fontSize: ".8rem", marginBottom: "-15px" }}
                    onClick={() => setModalGeneratePassword(true)}
                  >
                    Genera la Password
                  </a>
                </div>
                <IonInput
                  id="password"
                  placeholder="Inserisci o genera la tua password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  onIonFocus={() => {
                    setCurrentInputRef("password");
                  }}
                ></IonInput>
                {errorPassword.status && (
                  <IonNote color="danger">{errorPassword.message}</IonNote>
                )}
              </IonItem>

              <IonButton type="submit">Save</IonButton>
            </form>
            <div
              id="keyboardHeight"
              style={{
                height: `${keyboardHeight}px`,
                width: "100%",
              }}
            ></div>
          </main>
        </div>
      </IonContent>

      <GeneratePasswordModal
        isOpen={modalGeneratePassword}
        setIsOpen={setModalGeneratePassword}
        setPasswordForm={setPassword}
      />
    </IonPage>
  );
};
