import { create } from "zustand";
import type { Outfit, ChatMessage } from "@/types";

interface OutfitStore {
  outfits: Outfit[];
  currentOutfit: Outfit | null;
  isLoading: boolean;
  setOutfits: (outfits: Outfit[]) => void;
  addOutfit: (outfit: Outfit) => void;
  setCurrent: (outfit: Outfit | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useOutfitStore = create<OutfitStore>((set) => ({
  outfits: [],
  currentOutfit: null,
  isLoading: false,
  setOutfits: (outfits) => set({ outfits }),
  addOutfit: (outfit) =>
    set((state) => ({ outfits: [outfit, ...state.outfits] })),
  setCurrent: (currentOutfit) => set({ currentOutfit }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface StylistStore {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: ChatMessage) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

export const useStylistStore = create<StylistStore>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] }),
}));

interface UIStore {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
  setDarkMode: (dark: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  isDarkMode: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
}));
