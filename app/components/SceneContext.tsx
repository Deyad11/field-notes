"use client";
import { createContext, useContext } from "react";

interface SceneContextType {
  loaded: boolean;
  journalOpen: boolean;
  setJournalOpen: (val: boolean) => void;
}

export const SceneLoadedContext = createContext<SceneContextType>({
  loaded: false,
  journalOpen: false,
  setJournalOpen: () => {},
});

export function useSceneLoaded() {
  return useContext(SceneLoadedContext);
}
