import "./index.scss";
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
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
import React, { useState } from "react";
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

const ShowPasswordPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { AccountsState } = useGlobalContext();
  const accountShow = AccountsState.accounts.filter(
    (account) => account.id == id
  );
  const { saveStoreAccounts } = useStorage();
  const [showPassword, setShowPassword] = useState(false);

  //Clipboard
  const [toastClipboard] = useIonToast();

  //Delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAlert] = useIonAlert();
  const [deleteToast] = useIonToast();

  //Edit
  const [editModal, setEditModal] = useState(false);
  const [editToast] = useIonToast();

  //Form
  const [website, setWebsite] = useState(accountShow[0].website);
  const [linkWebsite, setLinkWebsite] = useState(accountShow[0].linkWebsite);
  const [email, setEmail] = useState(accountShow[0].email);
  const [password, setPassword] = useState(accountShow[0].password);

  const printHiddenPassword = (length: number) => {
    return Array(length)
      .fill("")
      .map((index) => {
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
      duration: 3000,
      position: "top",
      color: "success",
    });
  };

  const handleEditPassword = async (e: any, id: string, name: string) => {
    e.preventDefault();
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
    setEditModal(false);
    editToast({
      message: `Account edit with success!`,
      color: "success",
      position: "top",
      duration: 3000,
    });
  };

  return (
    <IonPage>
      <IonContent className="show-password-page">
        {deleteLoading ? (
          ""
        ) : (
          <>
            <IonFab vertical="top" horizontal="start">
              <IonFabButton size="small" onClick={() => history.goBack()}>
                <IonIcon icon={chevronBackOutline} />
              </IonFabButton>
            </IonFab>
            <IonFab vertical="top" horizontal="end">
              <IonFabButton
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
              </IonFabButton>
            </IonFab>
            <header>
              <h1>{accountShow[0].website}</h1>
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
              <IonContent className="edit-modal">
                <IonFab vertical="top" horizontal="start">
                  <IonFabButton
                    size="small"
                    onClick={() => setEditModal(false)}
                  >
                    <IonIcon icon={closeOutline} />
                  </IonFabButton>
                </IonFab>
                <header>
                  <h1>Edit</h1>
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
                      <IonLabel position="stacked">Name</IonLabel>
                      <IonInput
                        value={website}
                        onIonChange={(e) => setWebsite(e.detail.value!)}
                      ></IonInput>
                    </IonItem>

                    {/* Link Website */}
                    <IonItem>
                      <IonLabel position="stacked">Link Web</IonLabel>
                      <IonInput
                        value={linkWebsite}
                        onIonChange={(e) => setLinkWebsite(e.detail.value!)}
                      ></IonInput>
                    </IonItem>

                    {/* Email or Username */}
                    <IonItem>
                      <IonLabel position="stacked">Email or Username</IonLabel>
                      <IonInput
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                      ></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position="stacked">Password</IonLabel>
                      <IonInput
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                      ></IonInput>
                    </IonItem>

                    <IonButton type="submit">Edit</IonButton>
                  </form>
                </main>
              </IonContent>
            </IonModal>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShowPasswordPage;
