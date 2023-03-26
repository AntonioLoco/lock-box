import "./index.scss";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonSpinner color="light" name="lines"></IonSpinner>
      </IonContent>
    </IonPage>
  );
};

export default LoadingPage;
