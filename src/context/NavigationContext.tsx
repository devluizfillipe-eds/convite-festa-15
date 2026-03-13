"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

type NavContextType = {
  showBack: boolean;
  setShowBack: (v: boolean) => void;
  backHandler?: () => void;
  setBackHandler: (fn?: () => void) => void;
};

const NavigationContext = createContext<NavContextType | undefined>(undefined);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showBack, setShowBack] = useState(false);
  const [backHandler, setBackHandlerState] = useState<(() => void) | undefined>(
    undefined,
  );

  const setBackHandler = useCallback((fn?: () => void) => {
    setBackHandlerState(() => fn);
  }, []);

  const value = useMemo(
    () => ({ showBack, setShowBack, backHandler, setBackHandler }),
    [showBack, backHandler, setBackHandler],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error("useNavigation must be used within NavigationProvider");
  return ctx;
}
