export class Auth {
    token: string;
    email: string;
}

export class SignIn {
    signupType: string;
    token: string;
    email: string;
    name: string;
}
export class SignUp {
    token: string;
    email: string;
}
export class UploadProfile {
    attachmentId: number;
    message: string;
}
