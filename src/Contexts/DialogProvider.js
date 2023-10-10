import React, {createContext, useContext, useState} from 'react';


const DialogContext = createContext();

export function useDialog(){
    return useContext(DialogContext);
}

export function DialogProvider({children}){
    const [open, setOpen] = useState(false);
    return(
        <DialogContext.Provider value={{open, setOpen}}>
            {children}
        </DialogContext.Provider>
    );
}