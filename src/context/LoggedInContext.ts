import { createContext } from 'react';

export const LoggedInContext = createContext({
    loggedInUser: null as string | null,
    setLoggedInUser: (_: string | null) => { }
});