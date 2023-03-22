import "./index.scss";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  chevronBackOutline,
  copyOutline,
  eye,
  eyeOffOutline,
} from "ionicons/icons";

const ShowPasswordPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { AccountsState } = useGlobalContext();
  const accountShow = AccountsState.accounts.filter(
    (account) => account.id == id
  );
  const [showPassword, setShowPassword] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const printHiddenPassword = (length: number) => {
    return Array(length)
      .fill("")
      .map((index) => {
        return <span>*</span>;
      });
  };

  return (
    <IonPage>
      <IonContent className="show-password-page">
        <IonFab vertical="top" horizontal="start">
          <IonFabButton size="small" onClick={() => history.goBack()}>
            <IonIcon icon={chevronBackOutline} />
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
                  <IonButton fill="outline">
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
                  <IonButton fill="outline">
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
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setEditModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              illum quidem recusandae ducimus quos reprehenderit. Veniam,
              molestias quos, dolorum consequuntur nisi deserunt omnis id illo
              sit cum qui. Eaque, dicta.
            </p>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ShowPasswordPage;
