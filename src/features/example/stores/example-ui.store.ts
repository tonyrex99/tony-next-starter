import { create } from "zustand";
import type { Item } from "../types";

export interface ExampleUIState {
  selectedItem: Item | null;
  isCreateModalOpen: boolean;
  isDetailsDrawerOpen: boolean;
  setSelectedItem: (item: Item | null) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openDetailsDrawer: (item: Item) => void;
  closeDetailsDrawer: () => void;
}

export const useExampleUIStore = create<ExampleUIState>((set) => ({
  selectedItem: null,
  isCreateModalOpen: false,
  isDetailsDrawerOpen: false,
  setSelectedItem: (item) => set({ selectedItem: item }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  openDetailsDrawer: (item) => set({ selectedItem: item, isDetailsDrawerOpen: true }),
  closeDetailsDrawer: () => set({ selectedItem: null, isDetailsDrawerOpen: false }),
}));
