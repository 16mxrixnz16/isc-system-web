import { create } from "zustand";
import { Seminar } from "../models/studentProcess";

interface IProcessStore {
  process: Seminar | null;
  setProcess: (newProcess: Seminar) => void;
}

interface IUser {
  userId: number;
  name?: string;
  email?: string;
  role_name?: string;
  token: string;
}
interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useProcessStore = create<IProcessStore>((set) => ({
  process: null,
  setProcess: (newProcess: Seminar) => set({ process: newProcess }),
}));
