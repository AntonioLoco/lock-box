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
    const [accounts, setAccounts] = useState<AccountItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: "lockboxDB"
            });
            const store = await newStore.create();
            setStore(store);

            const storedAccounts = await store.get("accounts") || [];
            setAccounts(storedAccounts);
        }

        initStorage();
        }, [])

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

        return { accounts, createAccount, deleteAccount };
}

export default useStorage