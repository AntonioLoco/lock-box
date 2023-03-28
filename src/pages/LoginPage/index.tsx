import "../RegisterPage/index.scss";
import { IonContent, IonPage, useIonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PinKeyboard from "../../components/PinKeyboard";
import useStorage from "../../hooks/useStorage";

export const LoginPage: React.FC = () => {
  const { pinCode } = useStorage();
  const history = useHistory();
  const [pin, setPin] = useState("");
  const [errorToast] = useIonToast();
  const [successLoginToast] = useIonToast();

  useEffect(() => {
    if (pin.length === 5) {
      if (pin === pinCode) {
        history.push("/app");
        setTimeout(() => {
          successLoginToast({
            message: "Benvenuto",
            duration: 1000,
            position: "top",
            color: "dark",
          });
        }, 500);
        setPin("");
      } else {
        errorToast({
          message: "Pin errato!",
          duration: 1500,
          color: "danger",
          position: "top",
        });
        setPin("");
      }
    }
  }, [pin]);

  return (
    <IonPage>
      <IonContent className="auth-page">
        <div className="header-page">
          <h1>Login</h1>
        </div>
        <div className="container">
          <div className="pin">
            {new Array(5).fill("").map((el, index) => {
              if (index < pin.length) {
                return <div className="letter" key={index}></div>;
              } else {
                return (
                  <div className="underscore" key={index}>
                    _
                  </div>
                );
              }
            })}
          </div>
          <PinKeyboard setPin={setPin} pin={pin} />
        </div>
      </IonContent>
    </IonPage>
  );
};
