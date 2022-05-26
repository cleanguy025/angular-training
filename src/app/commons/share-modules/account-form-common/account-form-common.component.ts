import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/core/model/account.model';
import { FormGroupControls } from 'src/app/core/model/form-group-control';

@Component({
  selector: 'app-account-form-common',
  templateUrl: './account-form-common.component.html',
  styleUrls: ['./account-form-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFormCommonComponent implements OnInit {

  @Input() isEditAccount!: boolean;
  @Output() submitFormValue = new EventEmitter()

  accountForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AccountFormCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Account>) { }

  ngOnInit() {
    this.initAccountForm();
  }

  private buildBlankAccountForm() : FormGroup {
    return this.fb.group({
      accountNumber: [null],
      balance: [null],
      firstName: [null],
      lastName: [null],
      age: [null],
      gender: ['F'],
      address: [null],
      employer: [null],
      email: [null],
      city: [null],
      state: [null]
    })
  }

  private patchFormValue(accountFormData: Partial<Account>): void {
    this.accountForm.patchValue({
      accountNumber: accountFormData?.account_number,
      balance: accountFormData?.balance,
      firstName: accountFormData?.firstname,
      lastName: accountFormData?.lastname,
      age: accountFormData?.age,
      gender: accountFormData?.gender,
      address: accountFormData?.address,
      employer: accountFormData?.employer,
      email: accountFormData?.email,
      city: accountFormData?.city,
      state: accountFormData?.state
    })
  }

  getControls(): FormGroupControls {
    return {
      accountNumber: this.accountForm.get('accountNumber') as FormControl,
      balance: this.accountForm.get('balance') as FormControl,
      firstName: this.accountForm.get('firstName') as FormControl,
      lastName: this.accountForm.get('lastName') as FormControl,
      age: this.accountForm.get('age') as FormControl,
      gender: this.accountForm.get('gender') as FormControl,
      address: this.accountForm.get('address') as FormControl,
      employer: this.accountForm.get('employer') as FormControl,
      email: this.accountForm.get('email') as FormControl,
      city: this.accountForm.get('city') as FormControl,
      state: this.accountForm.get('state') as FormControl
    }
  }

  private initAccountForm(): void {
    this.accountForm = this.buildBlankAccountForm();
    if (this.data) {
      this.patchFormValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.submitFormValue.emit(this.accountForm.value);
  }

}
