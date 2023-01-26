import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
