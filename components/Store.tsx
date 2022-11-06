import create from 'zustand'

interface ensState {
    ens: string;
    setENS: (ens: string) => void;
  }

export const useStore = create<ensState>(set => ({
    ens: '',
    setENS: (ens) => set({ ens }),
}))