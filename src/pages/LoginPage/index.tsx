import "../RegisterPage/index.scss";
import { IonContent, IonNote, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PinKeyboard from "../../components/PinKeyboard";
import useStorage from "../../hooks/useStorage";

export const LoginPage: React.FC = () => {
  const { pinCode } = useStorage();
  const history = useHistory();
  const [pin, setPin] = useState("");
  const [errorPin, setErrorPin] = useState(false);

  useEffect(() => {
    if (pin.length === 1 && errorPin) {
      setErrorPin(false);
    }
    if (pin.length === 5) {
      if (pin === pinCode) {
        history.push("/app");
        setPin("");
      } else {
        setErrorPin(true);
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
            <div>
              {new Array(5).fill("").map((el, index) => {
                if (index < pin.length) {
                  return (
                    <span className="letter" key={index}>
                      {pin[index]}
                    </span>
                  );
                } else {
                  return <span key={index}>_</span>;
                }
              })}
            </div>
            {errorPin && <IonNote color="danger">Pin is incorrect!</IonNote>}
          </div>
          <PinKeyboard setPin={setPin} pin={pin} />
        </div>
      </IonContent>
    </IonPage>
  );
};
