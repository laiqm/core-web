import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DotContentletEditorService } from '../../services/dot-contentlet-editor.service';

/**
 * Allow user to add a contentlet to DotCMS instance
 *
 * @export
 * @class DotCreateContentletComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'dot-create-contentlet',
    templateUrl: './dot-create-contentlet.component.html',
    styleUrls: ['./dot-create-contentlet.component.scss']
})
export class DotCreateContentletComponent implements OnInit {
    @Output() load: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    url: Observable<string>;

    constructor(private dotContentletEditorService: DotContentletEditorService) {}

    ngOnInit() {
        this.url = this.dotContentletEditorService.createUrl$;
    }

    /**
     * Handle close dialog event
     *
     * @memberof DotCreateContentletComponent
     */
    onClose(): void {
        this.dotContentletEditorService.clear();
        this.close.emit();
    }

    /**
     * Handle the custome events from the DotDialogIframe component
     *
     * @param {any} $event
     * @memberof DotCreateContentletComponent
     */
    onCustomEvent($event) {
        if ($event.detail.name === 'close') {
            this.onClose();
        }
    }

    /**
     * Call the keyDown method from the service if exist
     *
     * @param {any} $event
     * @memberof DotCreateContentletComponent
     */
    onKeyDown($event: KeyboardEvent): void {
        this.dotContentletEditorService.keyDown($event);
    }

    /**
     * Call the load method from the service if exist
     *
     * @param {any} $event
     * @memberof DotCreateContentletComponent
     */
    onLoad($event): void {
        this.dotContentletEditorService.load($event);
    }
}