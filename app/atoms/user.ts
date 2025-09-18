import { atom } from "jotai";

type User = {
  id: string;
  phoneNumber: null | string;
  email: string;
  firstName: string;
  lastName: string;
  image: null | string;
  userType: number;
  personaId: number;
};

export const userAtom = atom<User>({
  id: "",
  phoneNumber: null,
  email: "",
  firstName: "",
  lastName: "",
  image: null,
  userType: 0,
  personaId: 0,
});
