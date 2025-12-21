import { atom } from "jotai";

export type User = {
  id?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
  userType?: number;
  personaId?: number | null;
};

export const userAtom = atom<User>({
  id: null,
  phoneNumber: null,
  email: null,
  firstName: null,
  lastName: null,
  image: null,
  userType: 0,
  personaId: null,
});
