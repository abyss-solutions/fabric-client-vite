import { SnackbarMessage } from "@/types";
import { atom } from "recoil";

export const snackbarMessage = atom<SnackbarMessage>({
  key: "SnackbarMessage",
  default: { shouldShow: false },
});

export const selectedStructureId = atom<string | undefined>({
  default: undefined,
  key: "SelectedStructureId",
});
