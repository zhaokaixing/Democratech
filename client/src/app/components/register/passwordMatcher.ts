import { AbstractControl } from "@angular/forms";

export const passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const password = control.get('password');
    const confirm = control.get('confirmation');
    if (!password || !confirm) return null;
    if (password.value === confirm.value) {
      return null;
    }
    return { nomatch: true };
  };
