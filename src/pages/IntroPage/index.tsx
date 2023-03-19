import "./index.scss";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React from "react";
import { arrowForward } from "ionicons/icons";

export const IntroPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="intro-page">
        <div className="container">
          <div className="logo">
            <h1>LockBox</h1>
          </div>
          <div className="description">
            <h2>Securely store and access all your passwords in one place</h2>
          </div>
          <IonButton className="btn-started" routerLink="/register">
            <IonLabel>Get Started</IonLabel>
            <IonIcon icon={arrowForward} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
