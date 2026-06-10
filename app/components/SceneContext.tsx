"use client";
import { createContext, useContext } from "react";

export const SceneLoadedContext = createContext(false);

export function useSceneLoaded() {
  return useContext(SceneLoadedContext);
}
