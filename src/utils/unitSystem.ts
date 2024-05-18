import { UnitSystemEnum } from "@/__generated__/hooks";

export const METERS_TO_INCHES_FACTOR = 39.37007874;
export const INCHES_TO_METERS_FACTOR = 0.0254;
export const METERS_TO_MILLIMETERS_FACTOR = 1000;
export const MILLIMETERS_TO_METERS_FACTOR = 0.001;
export const SQFEET_TO_SQMETERS_FACTOR = 10.7639;

export const convertMetresToFeetDisplay = (metres?: number | null): string | undefined | null => {
  if (metres === null || metres === undefined) {
    return metres;
  }

  // Convert to feet
  const feet = metres * 3.28084;
  const feetDisplay = `${feet.toFixed(2)}`;

  // const feetDisplay = `${Math.floor(feet)}'`;
  // Convert any decimal to inches
  // const feetDecimal = feet % 1;
  // const inches = feetDecimal * 12;
  // const inchesDisplay = `${inches.toFixed(1)}"`;

  // return `${feetDisplay} ${inchesDisplay}`;
  return `${feetDisplay}ft`;
};

export const convertMetresSqToFeetSqDisplay = (
  metres?: number | null
): string | undefined | null => {
  if (metres === null || metres === undefined) {
    return metres;
  }

  // Convert to feet sq
  const feet = metres * 10.764;
  const feetDisplay = `${feet.toFixed(2)}`;
  return `${feetDisplay}`;
};

export const convertMetresToInchesDisplay = (metres?: number | null): string | undefined | null => {
  if (metres === null || metres === undefined) {
    return metres;
  }

  const inches = metres * METERS_TO_INCHES_FACTOR;
  const inchesDisplay = `${inches.toFixed(3)}"`;

  return `${inchesDisplay}`;
};

export const convertMillimetersToInchesDisplay = (
  millimeters?: number | null
): string | undefined | null => {
  if (millimeters === null || millimeters === undefined) {
    return millimeters;
  }

  // Convert to Inch
  const inch = millimeters * 0.0393701;
  const inchesDisplay = `${inch.toFixed(3)}"`;

  return `${inchesDisplay}`;
};

export const getMetresSquareDisplay = (metres?: number | null): string | undefined | null => {
  if (metres === null || metres === undefined) {
    return metres;
  }

  return `${metres.toFixed(2)}`;
};

export const convertMetresToMillimeterDisplay = (
  meter?: number | null
): string | undefined | null => {
  if (meter === null || meter === undefined) {
    return meter;
  }

  // Convert to millimeter
  const millimeter = meter * METERS_TO_MILLIMETERS_FACTOR;
  const millimeterDisplay = `${millimeter.toFixed(2)}mm`;

  return `${millimeterDisplay}`;
};

export const convertInchestoMetresDisplay = (inch?: number): number => {
  if (!inch) {
    return 0;
  }

  const metres = inch * 0.0254; // 1 inch = 0.0254 meters
  return metres;
};

export const convertInchestoFeetDisplay = (inch?: number): number => {
  if (!inch) {
    return 0;
  }

  const feet = inch / 12; // 1 inch = 1/12 feet
  return feet;
};

export const getMetresDisplay = (metres?: number | null): string | undefined | null => {
  if (metres === null || metres === undefined) {
    return metres;
  }

  return `${metres.toFixed(2)}m`;
};

export const getMillimetresDisplay = (millimetres?: number | null): string | undefined | null => {
  if (millimetres === null || millimetres === undefined) {
    return millimetres;
  }

  return `${millimetres.toFixed(2)}mm`;
};

export const localiseMillimetreMeasurement = (
  unitSystem: UnitSystemEnum,
  measurement?: number | null
): string | undefined | null => {
  if (measurement === null || measurement === undefined) {
    return measurement;
  }
  if (unitSystem === UnitSystemEnum.Imperial) {
    return convertMillimetersToInchesDisplay(measurement);
  }
  if (unitSystem === UnitSystemEnum.Metric) {
    return getMillimetresDisplay(measurement);
  }
  return undefined;
};

export const localiseAreaMeasurement = (
  unitSystem: UnitSystemEnum,
  measurement?: number | null,
  errorValue?: string
): string | undefined | null => {
  if (measurement === null || measurement === undefined) {
    return measurement;
  }

  // check if measurement is actually a number
  if (Number.isNaN(measurement)) {
    return errorValue || 'N/A';
  }

  if (unitSystem === UnitSystemEnum.Imperial) {
    return convertMetresSqToFeetSqDisplay(measurement);
  }
  if (unitSystem === UnitSystemEnum.Metric) {
    return getMetresSquareDisplay(measurement);
  }
  return undefined;
};

export const localiseBlisterHeight = (
  unitSystem: UnitSystemEnum,
  measurement?: number | null
): string | undefined | null => {
  if (measurement === null || measurement === undefined) {
    return measurement;
  }
  if (measurement === 0) {
    return undefined;
  }
  if (unitSystem === UnitSystemEnum.Imperial) {
    return convertMetresToInchesDisplay(measurement);
  }
  if (unitSystem === UnitSystemEnum.Metric) {
    return convertMetresToMillimeterDisplay(measurement);
  }
  return undefined;
};

export const localiseLineDistanceMeasurement = (
  unitSystem: UnitSystemEnum,
  measurement?: number | null
): string | undefined | null => {
  if (measurement === null || measurement === undefined) {
    return measurement;
  }
  if (measurement === 0) {
    return undefined;
  }
  if (unitSystem === UnitSystemEnum.Imperial) {
    return convertMetresToFeetDisplay(measurement);
  }
  if (unitSystem === UnitSystemEnum.Metric) {
    return getMetresDisplay(measurement);
  }
  return undefined;
};
