import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor() { }

    @Output() getloggedUser: EventEmitter<any> = new EventEmitter();
    @Output() getCartDetail: EventEmitter<any> = new EventEmitter();

    login(): void {
        this.getloggedUser.emit();
    }
}
