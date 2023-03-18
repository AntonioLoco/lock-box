import { useEffect, useState } from "react"
import { Storage } from "@ionic/storage";

export interface AccountItem {
    id: number,
    email: string,
    password: string,
    website: string
}

const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [loading, setLoading] = useState(true);
    const [pinCode, setPinCode] = useState<string | null>("");
    const [accounts, setAccounts] = useState<AccountItem[]>([]);

    useEffect(() => {
        setLoading(true);
        const initStorage = async () => {
            const newStore = new Storage({
                name: "lockboxDB"
            });
            const store = await newStore.create();
            setStore(store);

            const storePinCode = await store.get("pin_code") || null;
            setPinCode(storePinCode);

            const storedAccounts = await store.get("accounts") || [];
            setAccounts(storedAccounts);

            setLoading(false);
        }

        initStorage();
        }, [])

        // PIN ACTION
        const createPinCode = async(pin: string) => {
            setPinCode(pin);
            store?.set("pin_code", pin);
        }

        // ACCOUNTS ACTION
        const createAccount = async (email: string, password: string, website: string) => {
            const newAccount = {
                id: new Date().getTime(),
                email,
                password,
                website
            }
            const updatedAccounts = [...accounts, newAccount];
            setAccounts(updatedAccounts);
            store?.set("accounts", updatedAccounts);
        }

        const deleteAccount = async (id: number) => {
            const updatedAccounts = accounts.filter((account) => account.id !== id);
            setAccounts(updatedAccounts);
            store?.set("accounts", updatedAccounts)
        }

        return { loading, pinCode, createPinCode , accounts, createAccount, deleteAccount };
}

export default useStorage