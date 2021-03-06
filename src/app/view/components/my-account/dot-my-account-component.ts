import { BaseComponent } from '../_common/_base/base-component';
import { AccountService, AccountUser } from '../../../api/services/account-service';
import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { LoginService, User, Auth } from 'dotcms-js/dotcms-js';
import { DotMessageService } from '../../../api/services/dot-messages-service';
import { StringFormat } from '../../../api/util/stringFormat';
import { DotcmsConfig } from 'dotcms-js/dotcms-js';

@Component({
    encapsulation: ViewEncapsulation.None,

    selector: 'dot-my-account',
    styleUrls: ['./dot-my-account-component.scss'],
    templateUrl: 'dot-my-account-component.html'
})
export class MyAccountComponent extends BaseComponent {
    @Output() close = new EventEmitter<any>();
    @Input() visible: boolean;

    emailRegex: string;
    passwordMatch: boolean;

    accountUser: AccountUser = {
        currentPassword: '',
        email: '',
        givenName: '',
        surname: '',
        userId: ''
    };

    passwordConfirm: string;
    message = null;
    changePasswordOption = false;

    constructor(
        dotMessageService: DotMessageService,
        private accountService: AccountService,
        private dotcmsConfig: DotcmsConfig,
        private loginService: LoginService,
        private stringFormat: StringFormat
    ) {
        super(
            [
                'my-account',
                'modes.Close',
                'save',
                'error.form.mandatory',
                'errors.email',
                'First-Name',
                'Last-Name',
                'email-address',
                'new-password',
                're-enter-new-password',
                'error.forgot.password.passwords.dont.match',
                'message.createaccount.success',
                'Error-communicating-with-server-Please-try-again',
                'change-password',
                'current-password'
            ],
            dotMessageService
        );

        this.passwordMatch = false;
        this.changePasswordOption = false;
        this.loginService.watchUser(this.loadUser.bind(this));
        this.dotcmsConfig.getConfig().subscribe((res) => {
            this.emailRegex = res.emailRegex;
        });
    }

    checkPasswords(): void {
        if (this.message) {
            this.message = null;
        }
        this.passwordMatch =
            this.accountUser.newPassword !== '' &&
            this.passwordConfirm !== '' &&
            this.accountUser.newPassword === this.passwordConfirm;
    }

    toggleChangePasswordOption(): void {
        this.changePasswordOption = !this.changePasswordOption;
    }

    getRequiredMessage(item): string {
        return this.stringFormat.formatMessage(this.i18nMessages['error.form.mandatory'], item);
    }

    save(): void {
        this.accountService.updateUser(this.accountUser).subscribe(
            (response) => {
                // TODO: replace the alert with a Angular components
                alert(this.i18nMessages['message.createaccount.success']);
                this.close.emit();

                if (response.entity.reauthenticate) {
                    this.loginService.logOutUser().subscribe(() => {});
                } else {
                    this.loginService.setAuth({
                        loginAsUser: null,
                        user: response.entity.user
                    });
                }
            },
            (response) => {
                // TODO: We have to define how must be the user feedback in case of error
                this.message = response.errorsMessages;
            }
        );
    }

    private loadUser(auth: Auth): void {
        const user: User = auth.user;
        this.accountUser.email = user.emailAddress;
        this.accountUser.givenName = user.firstName;
        this.accountUser.surname = user.lastName;
        this.accountUser.userId = user.userId;
        this.accountUser.newPassword = null;
        this.passwordConfirm = null;
    }
}
