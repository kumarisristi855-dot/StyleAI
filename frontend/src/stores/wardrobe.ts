import { create } from "zustand";
import type { WardrobeItem } from "@/types";

interface WardrobeStore {
  items: WardrobeItem[];
  isLoading: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  setItems: (items: WardrobeItem[]) => void;
  addItem: (item: WardrobeItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, data: Partial<WardrobeItem>) => void;
  setLoading: (loading: boolean) => void;
  setCategory: (category: string | null) => void;
  setSearch: (query: string) => void;
}

export const useWardrobeStore = create<WardrobeStore>((set) => ({
  items: [],
  isLoading: false,
  selectedCategory: null,
  searchQuery: "",
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateItem: (id, data) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setSearch: (searchQuery) => set({ searchQuery }),
}));
