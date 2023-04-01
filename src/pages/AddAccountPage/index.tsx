import "./index.scss";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import useStorage, { AccountItem } from "../../hooks/useStorage";
import { useHistory } from "react-router";
import { GeneratePasswordModal } from "../../components/GeneratePasswordModal";

export const AddAccountPage = () => {
  const { saveStoreAccounts, customCategories } = useStorage();
  const { AccountsState } = useGlobalContext();
  const history = useHistory();
  const [successToast] = useIonToast();

  const [filteredApp, setFilteredApp] = useState<any[]>([]);

  //Input form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [app, setApp] = useState({ name: "", icon: "" });

  //Error Form
  const [errorEmail, setErrorEmail] = useState({ status: false, message: "" });
  const [errorName, setErrorName] = useState({ status: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: "",
  });
  const [errorCategory, setErrorCategory] = useState({
    status: false,
    message: "",
  });
  const [errorApp, setErrorApp] = useState({
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
    setErrorName({ status: false, message: "" });
    setErrorEmail({ status: false, message: "" });
    setErrorPassword({ status: false, message: "" });
    setErrorCategory({ status: false, message: "" });
    setErrorApp({ status: false, message: "" });

    let errors = 0;
    // Controlli per Valiadazione
    if (name.length === 0) {
      errors++;
      setErrorName({
        status: true,
        message: "Il nome dell'account è richiesto!",
      });
    }

    if (category.length === 0) {
      errors++;
      setErrorCategory({
        status: true,
        message: "Seleziona una categoria!",
      });
    }

    if (category.length > 0 && category === "Altro" && app.name.length === 0) {
      errors++;
      setErrorApp({
        status: true,
        message: "Inserisci il nome dell'app!",
      });
    }

    if (category.length > 0 && category !== "Altro" && app.name.length === 0) {
      errors++;
      setErrorApp({
        status: true,
        message: "Seleziona un app!",
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
        message: "La password deve essere di almeno 4 caratteri!",
      });
    }

    // Se non ci sono errori
    if (errors === 0) {
      const newAccount: AccountItem = {
        id: new Date().getTime() + "",
        email,
        password,
        name,
        category,
        app,
      };
      const updateAccounts = [newAccount, ...AccountsState.accounts];
      AccountsState.setAccounts(updateAccounts);
      history.push("/app/passwords");
      successToast({
        message: `Account ${name} aggiunto!`,
        duration: 2000,
        position: "top",
        color: "success",
      });
      await saveStoreAccounts(updateAccounts);
      setEmail("");
      setPassword("");
      setName("");
      setCategory("");
      setApp({ name: "", icon: "" });
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
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                  onIonFocus={() => {
                    setCurrentInputRef("name");
                  }}
                ></IonInput>
                {errorName.status && (
                  <IonNote color="danger">{errorName.message}</IonNote>
                )}
              </IonItem>

              {/* Category */}
              <IonItem>
                <IonLabel position="stacked">
                  <h1>Categoria</h1>
                </IonLabel>
                <IonSelect
                  aria-label="Category"
                  interface="action-sheet"
                  placeholder="Seleziona una categoria"
                  onIonChange={(e) => {
                    setCategory(e.detail.value);
                    if (e.detail.value === "Altro") {
                      setApp({ name: "", icon: "" });
                    }
                    const filteredApps = customCategories.filter((item) => {
                      if (item.category === e.detail.value) {
                        return item;
                      }
                    });
                    setFilteredApp(filteredApps);
                  }}
                  value={category}
                >
                  {customCategories.map((item, index) => {
                    return (
                      <IonSelectOption key={index} value={item.category}>
                        {item.category}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
                {errorCategory.status && (
                  <IonNote color="danger">{errorCategory.message}</IonNote>
                )}
              </IonItem>

              {/* App */}
              {category.length > 0 && category !== "Altro" && (
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Applicazione</h1>
                  </IonLabel>
                  <IonSelect
                    aria-label="app"
                    interface="action-sheet"
                    placeholder="Seleziona un app"
                    onIonChange={(e) => {
                      const [name, icon] = e.detail.value.split(",");
                      setApp({
                        name: name,
                        icon: icon,
                      });
                    }}
                  >
                    {filteredApp[0].apps.map((item: any, index: number) => (
                      <IonSelectOption
                        key={index}
                        value={`${item.name},${item.icon}`}
                      >
                        {item.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                  {errorApp.status && (
                    <IonNote color="danger">{errorApp.message}</IonNote>
                  )}
                </IonItem>
              )}

              {/* Custom App */}
              {category.length > 0 && category === "Altro" && (
                <IonItem>
                  <IonLabel position="stacked">
                    <h1>Nome App</h1>
                  </IonLabel>
                  <IonInput
                    id="app"
                    placeholder="Inserisci il nome dell'app"
                    value={app.name}
                    onIonChange={(e) =>
                      setApp({ name: e.detail.value!, icon: "default.png" })
                    }
                    onIonFocus={() => {
                      setCurrentInputRef("app");
                    }}
                  ></IonInput>
                  {errorApp.status && (
                    <IonNote color="danger">{errorApp.message}</IonNote>
                  )}
                </IonItem>
              )}

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
              {/* Password */}
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
