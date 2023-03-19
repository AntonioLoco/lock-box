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
    const [StoreAccounts, setStoreAccounts] = useState<AccountItem[]>([]);

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
            setStoreAccounts(storedAccounts);

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
        const saveStoreAccounts = async (updatedAccounts: AccountItem[]) => {
            setStoreAccounts(updatedAccounts);
            store?.set("accounts", updatedAccounts);
        }

        return { loading, pinCode, createPinCode, StoreAccounts,saveStoreAccounts };
}

export default useStorage