const inchesToMeters = 0.0254;
const lbsToKg = 0.45359237;

export enum massUnits {
  Kg,
  Lb
}

export enum lengthUnits {
  m,
  cm,
  inch,
  ft
}

/**
 * BMI Calculator model
 */
export class BmiCalcModel {
  meter: number = -1;
  kg: number = 0;
  bmi: number = 0;

  constructor() {
  }

  public getBmi(): number {
    return this.bmi;
  }

  public getWt(units: massUnits = massUnits.Kg): number {
    if (units === massUnits.Lb) {
      return BmiCalcModel.convertKgToLb(this.kg);
    } else {
      return this.kg;
    }
  }

  public setWt(value: number, units: massUnits = massUnits.Kg): void {
    if (value <= 0) {
      this.kg = 0;
      return;
    }

    switch (units) {
      case massUnits.Lb:
        this.kg = BmiCalcModel.convertLbToKg(value);
        break;
      default:
        this.kg = value;
        break;
    }

    this.bmi = BmiCalcModel.calculateBmi(this.meter, this.kg);
  }

  public getHt(units: lengthUnits = lengthUnits.m): number {
    switch (units) {
      case lengthUnits.cm:
        return this.meter * 100;
      case lengthUnits.inch:
        return BmiCalcModel.convertMeterToInch(this.meter);
      case lengthUnits.ft:
        return BmiCalcModel.convertMeterToInch(this.meter) / 12;
      default:
        return this.meter;
    }
  }

  public setHt(value: number, units: lengthUnits = lengthUnits.m) {
    switch (units) {
      case lengthUnits.cm:
        this.meter = value / 100;
        break;
      case lengthUnits.inch:
        this.meter = BmiCalcModel.convertInchToMeter(value);
        break;
      case lengthUnits.ft:
        this.meter = BmiCalcModel.convertInchToMeter(value * 12);
        break;
      default:
        this.meter = value;
    }

    this.bmi = BmiCalcModel.calculateBmi(this.meter, this.kg);
  }

  public setBmi(value: number): void {
    this.bmi = value;

    if (this.meter <= 0) return;

    this.kg = Math.pow(this.meter, 2) * this.bmi;
  }

  static calculateBmi(meters: number, kg: number): number {
    if (meters <= 0) {
      return NaN;
    }

    return kg / Math.pow(meters, 2);
  }

  static convertInchToMeter(inches: number): number {
    return inches * inchesToMeters;
  }

  static convertMeterToInch(meters: number): number {
    return meters / inchesToMeters;
  }

  static convertLbToKg(lb: number): number {
    return lb * lbsToKg;
  }

  static convertKgToLb(kg: number): number {
    return kg / lbsToKg;
  }
}
