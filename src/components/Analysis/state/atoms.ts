import { UnitSystemEnum } from "@/__generated__/hooks";
import { atom } from "recoil";

export const unitSystem = atom<UnitSystemEnum>({
  default: UnitSystemEnum.Imperial,
  key: "AnalysisUnitSystem",
});
