import { useContext } from "react";
import { StoreContext } from "./store-context";

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore outside StoreProvider");
  return context;
}
