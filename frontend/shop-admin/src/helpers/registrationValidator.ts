import { IRegistrationForm } from "../components/regist-form/registrationForm";

export interface IValidInfo {
    isValid: boolean,

}

export class RegistrationValidator {

    static validate(form: IRegistrationForm): boolean {
        return this.isValidName(form.name)
            && this.isValidSurname(form.surname)
            && this.isValidPatronymic(form.patronymic)
            && this.isValidEmail(form.email)
            && this.isValidPhone(form.phone)
            && this.isValidPassword(form.password)
            && this.isValidConfimPaswword(form.password, form.confimPassword);
    }

    static isEmpty = (value: string) => {

        return value.replace(/\s/g, '').length < 1;
    }

    static isValidName = (name: string) => {
        return !RegistrationValidator.isEmpty(name);
    }

    static isValidSurname = (surname: string) => {
        return !RegistrationValidator.isEmpty(surname);
    }

    static isValidPatronymic = (patronymic: string) => {
        return !RegistrationValidator.isEmpty(patronymic);
    }

    static isValidEmail = (mail: string) => {
        var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return !RegistrationValidator.isEmpty(mail) && pattern.test(mail.toLowerCase());
    }

    static isValidPhone = (phone: string) => {
        var pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return pattern.test(phone);
    }

    static isValidPassword = (password: string) => {
        return password.length > 6 && password.length < 30;
    }

    static isValidConfimPaswword = (password: string, confimPassword: string) => {
        return !RegistrationValidator.isEmpty(confimPassword) && password === confimPassword;
    }

}