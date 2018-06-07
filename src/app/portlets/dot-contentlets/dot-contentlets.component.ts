import { Component, AfterViewInit } from '@angular/core';
import { DotContentletEditorService } from '../../view/components/dot-contentlet-editor/services/dot-contentlet-editor.service';
import { DotNavigationService } from '../../view/components/dot-navigation/dot-navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    providers: [],
    selector: 'dot-contentlets',
    template: '<dot-edit-contentlet (close)="onCloseEditor($event)"></dot-edit-contentlet>'
})
export class DotContentletsComponent implements AfterViewInit {

    constructor(
        private dotContentletEditorService: DotContentletEditorService,
        private dotNavigationService: DotNavigationService,
        private route: ActivatedRoute,
    ) {}

    ngAfterViewInit(): void {
        this.dotContentletEditorService.edit({
            data: {
                inode: this.route.snapshot.params.inode
            }
        });
    }

    onCloseEditor($event): void {
        this.dotNavigationService.goToFirstPortlet();
    }
}
