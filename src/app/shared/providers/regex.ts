export enum RegexEnum {
    name = '^[a-zA-Z ]*$',
    email =
    '^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)' +
    '@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})+$',
    password_validation = '^(?!.* )(?=.*?[A-Z])(?=.*?[a-z]).{6,12}$',
}
