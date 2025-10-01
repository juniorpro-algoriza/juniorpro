import { atom } from "jotai";

export type User = {
  id: number;
  phoneNumber: null | string;
  email: string;
  firstName: string;
  lastName: string;
  image: null | string;
  userType: number;
  personaId: number;
};

export const userAtom = atom<User>({
  id: 0,
  phoneNumber: null,
  email: "",
  firstName: "",
  lastName: "",
  image: null,
  userType: 0,
  personaId: 0,
});
