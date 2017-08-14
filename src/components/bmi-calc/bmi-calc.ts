import {Component, forwardRef, OnInit} from '@angular/core';
import {BmiCalcModel, lengthUnits, massUnits} from './bmi-calc.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const noop = () => {};

export const BMI_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BmiCalcComponent),
  multi: true
};

/**
 * Generated class for the BmiCalcComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'bmi-calc',
  templateUrl: 'bmi-calc.html',
  providers: [BMI_CONTROL_VALUE_ACCESSOR]
})
export class BmiCalcComponent implements ControlValueAccessor {
  bmiModel = new BmiCalcModel();

  cm: string = '';
  kg: string = '';
  ft: string = '';
  inch: string = '';
  lb: string = '';
  bmi: string;
  useCalculator: Boolean = false;

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // TODO Set some defaults
  // ngOnInit() {
  //   this.bmiModel.setWt(65);
  //   this.bmiModel.setHt(1.6);
  //
  //   this.updateBmi();
  //   this.updateMetricLength();
  //   this.updateStdLength();
  //   this.updateMetricWt();
  //   this.updateStdWt();
  // }

  onUpdate(value: string): void {
    let initialBmi = this.bmiModel.getBmi();

    switch (value) {
      case 'inch':
      case 'ft':
        let totalInches: number = (Number(this.ft) || 0) * 12 + (Number(this.inch) || 0);
        this.bmiModel.setHt(totalInches, lengthUnits.inch);
        this.updateMetricLength();
        this.updateBmi();
        break;
      case 'cm':
        this.bmiModel.setHt(Number(this.cm) || 0, lengthUnits.cm);
        this.updateStdLength();
        this.updateBmi();
        break;
      case 'lb':
        this.bmiModel.setWt(Number(this.lb) || 0, massUnits.Lb);
        this.updateMetricWt();
        this.updateBmi();
        break;
      case 'kg':
        this.bmiModel.setWt(Number(this.kg) || 0, massUnits.Kg);
        this.updateStdWt();
        this.updateBmi();
        break;
      case 'bmi':
        this.bmiModel.setBmi(Number(this.bmi));
        this.updateStdWt();
        this.updateMetricWt();
    }

    if (initialBmi !== this.bmiModel.getBmi()) {
      this.onChangeCallback(this.bmiModel.getBmi());
    }

  }

  updateBmi(): void {
    this.bmi = String(Math.round(this.bmiModel.getBmi() * 10) / 10);
  }

  updateMetricLength(): void {
    this.cm = String(Math.round(this.bmiModel.getHt(lengthUnits.cm) * 10) / 10);
  }

  updateStdLength(): void {
    let inches = this.bmiModel.getHt(lengthUnits.inch);
    let ft = Math.floor(inches / 12);

    this.ft = String(ft);
    this.inch = String(Math.round((inches - ft * 12) * 10) / 10);
  }

  updateMetricWt(): void {
    this.kg = String(Math.round(this.bmiModel.getWt(massUnits.Kg) * 10) / 10);
  }

  updateStdWt(): void {
    this.lb = String(Math.round(this.bmiModel.getWt(massUnits.Lb) * 10) / 10);
  }

  calculate(useCalc: Boolean) {
    this.useCalculator = useCalc;
  }

  writeValue(value: any): void {
    if (value !== this.bmiModel.getBmi()) {
      this.bmiModel.setBmi(value);
      this.updateMetricWt();
      this.updateStdWt();
      this.updateBmi();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
