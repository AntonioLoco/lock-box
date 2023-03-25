import "./index.scss";
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRange,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { close, copyOutline } from "ionicons/icons";
import { useState } from "react";
import { RangeValue } from "@ionic/core";
import { Clipboard } from "@capacitor/clipboard";
import { useHistory } from "react-router";

export const GeneratePasswordModal = ({
  isOpen,
  setIsOpen,
  setPasswordForm,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  setPasswordForm: (password: string) => void;
}) => {
  const [passwordGenerate, setPasswordGenerate] = useState("");
  const [passwordLength, setPasswordLength] = useState<RangeValue>(6);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [alertError] = useIonAlert();
  const [alertSuccess] = useIonAlert();
  const [toastClipboard] = useIonToast();

  const generatePassword = () => {
    const passwordComponents = [];

    if (!uppercase && !lowercase && !numbers) {
      alertError({
        header: "Errore",
        message: "Inserisci più campi!",
        buttons: ["OK"],
      });

      return;
    }

    if (lowercase) {
      passwordComponents.push("abcdefghijklmnopqrstuvwxyz");
    }

    if (uppercase) {
      passwordComponents.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if (numbers) {
      passwordComponents.push("0123456789");
    }

    if (symbols) {
      passwordComponents.push("!£$%&-@_*?#[]{}()");
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomComponent = Math.floor(
        Math.random() * passwordComponents.length
      );

      const randomElement = Math.floor(
        Math.random() * passwordComponents[randomComponent].length
      );

      password += passwordComponents[randomComponent][randomElement];
    }

    setPasswordGenerate(password);
    setPasswordForm(password);
    alertSuccess({
      header: "Password Generata!",
      message: "La password è stata aggiunta!",
      buttons: [
        {
          text: "Continua",
          role: "confirm",
          handler: () => {
            setIsOpen(false);
          },
        },
        {
          text: "Annulla",
          role: "cancel",
        },
      ],
    });
  };

  const writeToClipboard = async (type: string, string: string) => {
    await Clipboard.write({ string });

    const { value } = await Clipboard.read();
    if (value === string) {
      toastClipboard({
        message: `${type} copied to clipboard`,
        duration: 1500,
        position: "top",
      });
    }
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent className="modal-generate-password">
        <header>
          <div className="navbar">
            <IonButton onClick={() => setIsOpen(false)}>
              <IonIcon icon={close} />
            </IonButton>
            <h1>Generate password</h1>
          </div>
        </header>
        <main>
          <IonItem>
            <IonLabel position="stacked">
              <h1>Password</h1>
            </IonLabel>
            <div className="password-generate">
              <h4>{passwordGenerate}</h4>
              <IonButton
                className="copy-btn"
                fill="outline"
                onClick={() => writeToClipboard("Password", passwordGenerate)}
              >
                <IonIcon icon={copyOutline} />
              </IonButton>
            </div>
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
                <h1>Password Length</h1>
              </IonLabel>
              <h4>{passwordLength as number}</h4>
            </div>
            <IonRange
              step={1}
              min={4}
              max={16}
              value={passwordLength}
              ticks={true}
              snaps={true}
              onIonChange={({ detail }) => {
                setPasswordLength(detail.value);
              }}
            ></IonRange>
          </IonItem>

          <IonItem>
            <IonCheckbox
              slot="start"
              checked={uppercase}
              onIonChange={() => setUppercase(!uppercase)}
            ></IonCheckbox>
            <IonLabel>include uppercase letter</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={lowercase}
              onIonChange={() => setLowercase(!lowercase)}
            ></IonCheckbox>
            <IonLabel>include lowercase letter</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={numbers}
              onIonChange={() => setNumbers(!numbers)}
            ></IonCheckbox>
            <IonLabel>include numbers</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              checked={symbols}
              onIonChange={() => setSymbols(!symbols)}
            ></IonCheckbox>
            <IonLabel>include symbols</IonLabel>
          </IonItem>
          <IonButton className="generate-button" onClick={generatePassword}>
            Generate
          </IonButton>
        </main>
      </IonContent>
    </IonModal>
  );
};
