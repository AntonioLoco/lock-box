import { useEffect, useState } from "react"
import { Storage } from "@ionic/storage";
import { categories, category } from "../categories";

export interface AccountItem {
    id: string,
    email: string,
    password: string,
    name: string,
    category: string,
    app: {
        name: string,
        icon: string
    }
}

const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [loading, setLoading] = useState(true);
    const [pinCode, setPinCode] = useState<string | null>("");
    const [StoreAccounts, setStoreAccounts] = useState<AccountItem[]>([]);
    const [customCategories, setCustomCategories] = useState<category[]>([]);

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

            const storedCategories = await store.get("categories") || categories;
            setCustomCategories(storedCategories);

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

        const addCustomCategory = async (name: string) => {
            const newCategories = customCategories;
            newCategories[9].apps.push({name, icon: "custom"});
            setCustomCategories(newCategories);
            store?.set("categories", newCategories);
        }

        return { loading, pinCode, createPinCode, StoreAccounts, saveStoreAccounts, customCategories, addCustomCategory};
}

export default useStorage