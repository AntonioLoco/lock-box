import "./index.scss";
import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonPage,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  chevronBackOutline,
  closeOutline,
  copyOutline,
  eye,
  eyeOffOutline,
  trashBinOutline,
} from "ionicons/icons";
import { Clipboard } from "@capacitor/clipboard";
import useStorage from "../../hooks/useStorage";
import { GeneratePasswordModal } from "../../components/GeneratePasswordModal";

const ShowPasswordPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { AccountsState } = useGlobalContext();
  const [accountShow, setAccountsShow] = useState(
    AccountsState.accounts.filter((account) => account.id == id)
  );
  const { saveStoreAccounts } = useStorage();
  const [showPassword, setShowPassword] = useState(false);

  //Clipboard
  const [toastClipboard] = useIonToast();

  //Delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAlert] = useIonAlert();
  const [deleteToast] = useIonToast();

  //Edit Modal
  const [editModal, setEditModal] = useState(false);
  const [editToast] = useIonToast();
  const [modalGeneratePassword, setModalGeneratePassword] = useState(false);

  //Input Modal
  const [website, setWebsite] = useState(accountShow[0].website);
  const [linkWebsite, setLinkWebsite] = useState(accountShow[0].linkWebsite);
  const [email, setEmail] = useState(accountShow[0].email);
  const [password, setPassword] = useState(accountShow[0].password);

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

  const contentRef = useRef<HTMLIonContentElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [currentInput, setCurrentInputRef] = useState("");

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

  const printHiddenPassword = (length: number) => {
    return Array(length)
      .fill("")
      .map((_, index) => {
        return <span key={index}>*</span>;
      });
  };

  const writeToClipboard = async (type: string, string: string) => {
    await Clipboard.write({ string });

    const { value } = await Clipboard.read();
    if (value === string) {
      toastClipboard({
        message: `${type} copied to clipboard`,
        duration: 2000,
        position: "top",
      });
    }
  };

  const deletePassword = async (id: string, name: string) => {
    setDeleteLoading(true);
    const newAccounts = AccountsState.accounts.filter(
      (account) => account.id !== id
    );
    console.log(newAccounts);
    await saveStoreAccounts(newAccounts);
    AccountsState.setAccounts(newAccounts);
    history.goBack();
    deleteToast({
      message: `Account ${name} eliminato con successo!`,
      duration: 1500,
      position: "top",
      color: "success",
    });
  };

  //funzione base check email
  const isEmail = (email: string) => {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
      email
    );
  };

  const handleEditPassword = async (e: any, id: string, name: string) => {
    e.preventDefault();
    setErrorWebSite({ status: false, message: "" });
    setErrorLink({ status: false, message: "" });
    setErrorEmail({ status: false, message: "" });
    setErrorPassword({ status: false, message: "" });

    let errors = 0;
    // Controlli per Valiadazione
    if (website.length === 0) {
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
    } else if (!isEmail(email)) {
      errors++;
      setErrorEmail({ status: true, message: "L'email non è corretta!" });
    }

    if (password.length <= 4) {
      errors++;
      setErrorPassword({
        status: true,
        message: "La password deve essere di almeno 4 caratteri",
      });
    }

    if (errors === 0) {
      const editAccount = {
        id,
        email,
        password,
        website,
        linkWebsite,
      };

      const oldAccounts = AccountsState.accounts.filter(
        (account) => account.id !== id
      );
      const updatedAccounts = [editAccount, ...oldAccounts];
      await saveStoreAccounts(updatedAccounts);
      AccountsState.setAccounts(updatedAccounts);
      setAccountsShow([editAccount]);
      setEditModal(false);
      editToast({
        message: `Account edit with success!`,
        color: "success",
        position: "top",
        duration: 1500,
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="show-password-page">
        {deleteLoading ? (
          ""
        ) : (
          <>
            <header>
              <div className="navbar">
                <IonButton size="small" onClick={() => history.goBack()}>
                  <IonIcon icon={chevronBackOutline} />
                </IonButton>
                <h1>{accountShow[0].website}</h1>
                <IonButton
                  size="small"
                  onClick={() => {
                    deleteAlert({
                      header: `Sei sicuro di voler eliminare l'account ${accountShow[0].website} ?`,
                      buttons: [
                        {
                          text: "Cancel",
                          role: "cancel",
                        },
                        {
                          text: "Yes",
                          role: "confirm",
                          handler: () => {
                            deletePassword(
                              accountShow[0].id,
                              accountShow[0].website
                            );
                          },
                        },
                      ],
                    });
                  }}
                >
                  <IonIcon icon={trashBinOutline} color="danger" />
                </IonButton>
              </div>
            </header>
            <main>
              <div className="photo">
                <img
                  src={`https://besticon-demo.herokuapp.com/icon?url=${accountShow[0].linkWebsite}&size=80..120..200`}
                />
              </div>

              <IonList>
                <IonItem>
                  <div className="card">
                    <h3>Sito Web</h3>
                    <p>{accountShow[0].linkWebsite}</p>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="card">
                    <h3>Email or Username</h3>
                    <p>{accountShow[0].email}</p>
                    <div className="buttons">
                      <IonButton
                        fill="outline"
                        onClick={() =>
                          writeToClipboard(
                            "Email or Username",
                            accountShow[0].email
                          )
                        }
                      >
                        <IonIcon icon={copyOutline} color="primary" />
                      </IonButton>
                    </div>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="card">
                    <h3>Password</h3>
                    <p>
                      {showPassword
                        ? accountShow[0].password
                        : printHiddenPassword(accountShow[0].password.length)}
                    </p>
                    <div className="buttons">
                      <IonButton
                        fill="outline"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <IonIcon
                          icon={showPassword ? eye : eyeOffOutline}
                          color="primary"
                        />
                      </IonButton>
                      <IonButton
                        fill="outline"
                        onClick={() =>
                          writeToClipboard("Password", accountShow[0].password)
                        }
                      >
                        <IonIcon icon={copyOutline} color="primary" />
                      </IonButton>
                    </div>
                  </div>
                </IonItem>
              </IonList>
            </main>
            {/* Button Edit Modal */}
            <IonFab vertical="bottom" className="edit-button">
              <IonButton onClick={() => setEditModal(true)}>Edit</IonButton>
            </IonFab>

            {/* Modal Edit */}
            <IonModal isOpen={editModal}>
              <IonContent className="edit-modal" ref={contentRef}>
                <header>
                  <div className="navbar">
                    <IonButton onClick={() => setEditModal(false)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                    <h1>Edit</h1>
                  </div>
                </header>
                <main>
                  <form
                    onSubmit={(e) =>
                      handleEditPassword(
                        e,
                        accountShow[0].id,
                        accountShow[0].website
                      )
                    }
                  >
                    {/* Name Account */}
                    <IonItem>
                      <IonLabel position="stacked">
                        <h1>Name</h1>
                      </IonLabel>
                      <IonInput
                        id="name"
                        value={website}
                        onIonChange={(e) => setWebsite(e.detail.value!)}
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
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        onIonFocus={() => {
                          setCurrentInputRef("password");
                        }}
                      ></IonInput>
                      {errorPassword.status && (
                        <IonNote color="danger">
                          {errorPassword.message}
                        </IonNote>
                      )}
                    </IonItem>

                    <IonButton type="submit">Edit</IonButton>
                  </form>
                  <div
                    id="keyboardHeight"
                    style={{ height: `${keyboardHeight}px` }}
                  ></div>
                </main>
              </IonContent>
              <GeneratePasswordModal
                isOpen={modalGeneratePassword}
                setIsOpen={setModalGeneratePassword}
                setPasswordForm={setPassword}
              />
            </IonModal>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShowPasswordPage;
