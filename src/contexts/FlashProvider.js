import { createContext, useContext, useState } from 'react';

export const FlashContext = createContext();
let flashClock;

export default function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({});
  const [visible, setVisible] = useState(false);

  const flash = (message, type, duration = 10) => {
    if (flashClock) {
      clearTimeout(flashClock);
      flashClock = undefined;
    }
    setFlashMessage({message, type});
    setVisible(true);
    if (duration) {
      flashClock = setTimeout(hideFlash, duration * 1000);
    }
  };

  const hideFlash = () => setVisible(false);

  return (
    <FlashContext.Provider value={{flash, hideFlash, flashMessage, visible}}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  return useContext(FlashContext).flash;
}
