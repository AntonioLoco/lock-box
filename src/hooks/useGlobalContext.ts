import { createContext, useContext } from "react"
import { AccountItem } from "./useStorage"

export type GlobalContent = {
    AccountsState: {
        accounts: AccountItem[]
        setAccounts:(updatedAccounts: AccountItem[]) => void
    }
}

export const MyGlobalContext = createContext<GlobalContent>({
    AccountsState: {
        accounts: [],
        setAccounts: () => {}
    }
})


export const useGlobalContext = () => useContext(MyGlobalContext)