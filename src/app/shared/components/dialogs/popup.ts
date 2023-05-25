import { MatDialog } from "@angular/material/dialog";

export class Popup {
    
    constructor(private dialog: MatDialog) {}
    
    create(component: any, callback: any) {
        if (typeof callback === 'function') {            
            const dialogRef = this.dialog.open(component);
            dialogRef.afterClosed()
            .subscribe((result) => {
                if (!result) return;
                callback();            
            });
        }
    }
}



