import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  customNumberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 12,
    allowNegative: false,
    allowLeadingZeroes: true,
  });
  amount = '';
  goods = '';
  works = '';
  services = '';
  // public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.disableLastRow();
  }

  createForm(item: any = {}) {
    this.form = this.fb.group({
      arr: this.fb.array(
        (() => {
          if (!item.arr) {
            return [
              this.addFormArray(),
              this.addFormArray(),
              this.addFormArray(),
            ];
          } else {
            return item.arr.map((data: any) => this.addFormArray(data));
          }
        })()
      ),
    });
  }

  reset() {
    this.Arr.reset();
  }

  calculateFundsRemainingOfEachControlssTATIC() {
    const goodsRow0 = this.Arr.at(0).get('goods')?.value;
    const goodsRow1 = this.Arr.at(1).get('goods')?.value;

    const difference =
      parseFloat(goodsRow0.replace(/,/g, '')) -
      parseFloat(goodsRow1.replace(/,/g, ''));
    this.Arr.at(this.Arr.length - 1)
      .get('goods')
      ?.setValue(difference);
  }

  calculateFundsRemainingOfEachControls(controlName: string) {
    const Row0 = this.Arr.at(0).get(controlName)?.value;
    const Row1 = this.Arr.at(1).get(controlName)?.value;

    if (Row0 === '') {
      this.Arr.at(0).get(controlName)?.setValue('0');
    }
    if (Row1 === '') {
      this.Arr.at(1).get(controlName)?.setValue('0');
    }

    const difference =
      parseFloat(Row0.replace(/,/g, '')) - parseFloat(Row1.replace(/,/g, ''));

    const checkDifference = isNaN(difference) ? 0 : difference;
    this.Arr.at(this.Arr.length - 1)
      .get(controlName)
      ?.setValue(checkDifference);
  }

  addFormArray(item: any = {}) {
    return this.fb.group({
      goods: [''],
      works: [''],
      services: [''],
    });
  }

  get Arr() {
    return this.form.get('arr') as FormArray;
  }

  disableLastRow() {
    this.Arr.at(this.Arr.length - 1).disable();
  }
}
