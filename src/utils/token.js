export const storeItem = ( itemName, Item ) => localStorage.setItem( itemName, Item );
export const clearItem = ( itemName ) => localStorage.removeItem( itemName );
export const getItem = ( itemName ) => localStorage.getItem( itemName );