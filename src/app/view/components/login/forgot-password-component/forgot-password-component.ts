import {Component, EventEmitter , Input, Output, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../../api/services/login-service';
import {LoggerService} from '../../../../api/services/logger.service';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    selector: 'dot-forgot-password-component',
    templateUrl: 'forgot-password-component.html',
})

export class ForgotPasswordComponent {

    @Input() message: string;
    @Output() cancel = new EventEmitter<any>();
    @Output() recoverPassword  = new EventEmitter<string>();

    private forgotPasswordLogin: string;
    private language = '';

    // labels
    private cancelButton = '';
    private forgotPasswordButton = '';
    private forgotPasswordLabel = '';
    private userIdOrEmailLabel = '';

    // Messages
    private emailMandatoryFieldError = '';
    private forgotPasswordConfirmationMessage = '';

    private i18nMessages: Array<string> = [  'error.form.mandatory', 'user-id', 'email-address', 'forgot-password',
        'get-new-password', 'cancel', 'an-email-with-instructions-will-be-sent'];

    constructor( private loginService: LoginService, private loggerService: LoggerService) {

    }

    ngOnInit(): void {
        this.loadLabels();
    }

    /**
     * Executes the recover password service
     */
    ok(): void {
        if (confirm(this.forgotPasswordConfirmationMessage)) {
            this.recoverPassword.emit(this.forgotPasswordLogin);
        }
    }

    /**
     * Update the color and or image according to the values specified
     */
    private loadLabels(): void {

        this.loginService.getLoginFormInfo(this.language, this.i18nMessages).subscribe((data) => {

            // Translate labels and messages
            let dataI18n = data.i18nMessagesMap;
            let entity = data.entity;

            if ('emailAddress' === entity.authorizationType) {
                this.userIdOrEmailLabel = dataI18n['email-address'];
            } else {
                this.userIdOrEmailLabel = dataI18n['user-id'];
            }

            this.forgotPasswordLabel = dataI18n['forgot-password'];
            this.forgotPasswordButton = dataI18n['get-new-password'];
            this.cancelButton = dataI18n.cancel;
            this.forgotPasswordConfirmationMessage = dataI18n['an-email-with-instructions-will-be-sent'];
            this.emailMandatoryFieldError = (dataI18n['error.form.mandatory']).replace('{0}', this.userIdOrEmailLabel);
        }, (error) => {
            this.loggerService.error(error);
        });
    }
}