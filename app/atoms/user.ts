import { atom } from "jotai";

export type User = {
  id?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
  userType?: 2 | 1 | 3 | 4;
  personaId?: number | null;
  isGuided?: boolean | null;
};

export const userAtom = atom<User>({
  id: null,
  phoneNumber: null,
  email: null,
  firstName: null,
  lastName: null,
  image: null,
  userType: 1,
  personaId: null,
});
