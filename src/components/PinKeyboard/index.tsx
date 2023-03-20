import "./index.scss";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { backspaceOutline } from "ionicons/icons";

const PinKeyboard = ({
  pin,
  setPin,
}: {
  pin: string;
  setPin: (c: string) => void;
}) => {
  const handleClick = (e: any) => {
    if (pin.length < 5) {
      const num = e.target.innerText;
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.substring(0, pin.length - 1));
    }
  };
  return (
    <IonGrid className="pinKeyboard">
      <IonRow>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            1
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            2
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            3
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            4
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            5
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            6
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            7
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            8
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            9
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol></IonCol>
        <IonCol>
          <IonButton fill="outline" onClick={handleClick}>
            0
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            fill="outline"
            className="backspace-button"
            onClick={handleDelete}
          >
            <IonIcon icon={backspaceOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PinKeyboard;
