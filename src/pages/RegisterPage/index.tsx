import "./index.scss";
import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useStorage from "../../hooks/useStorage";
import PinKeyboard from "../../components/PinKeyboard";

export const RegisterPage: React.FC = () => {
  const { createPinCode } = useStorage();
  const history = useHistory();
  const [pin, setPin] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createPinCode(pin);
    history.push("/app");
    setPin("");
  };

  useEffect(() => {
    if (pin.length === 5) {
      createPinCode(pin);
      history.push("/app");
      setPin("");
    }
  }, [pin]);

  return (
    <IonPage>
      <IonContent className="auth-page">
        <div className="header-page">
          <h1>Create your Security Pin</h1>
        </div>
        <div className="container">
          <div className="pin">
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
          <PinKeyboard setPin={setPin} pin={pin} />
        </div>
      </IonContent>
    </IonPage>
  );
};
