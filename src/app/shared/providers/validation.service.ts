import { FormGroup } from '@angular/forms';
import { constant } from './constant';

export class ValidationService {

  /**
   * checkIfMatchingPasswords(password, confirmPassword)
   * check password and confirm passowrd match or not
   * @param password in compare with confirm password
   * @param confirmPassword in compare with password
   */
  static checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
      return passwordConfirmationInput.setErrors(null);
    };
  }

  static isChecked(control: FormGroup): any {
    if (control.value !== true) {
      return {
        notChecke: true,
      };
    }
    return null;
  }
  static inValidFormControl(formName: { controls: { [x: string]: { markAsDirty: () => void; }; }; }) {
    Object.keys(formName.controls).forEach(key => {
      formName.controls[key].markAsDirty();
    });
    return;
  }

  static numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  static checkFileImage(fileType: string) {
    if (fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png') {
      return false;
    }
    return true;
  }
}
