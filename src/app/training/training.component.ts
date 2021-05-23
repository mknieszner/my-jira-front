import {Component, EmbeddedViewRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatDialog, MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from "@angular/material";
import {DialogComponent} from "./dialog/dialog.component";
import {ActionSnackBarComponent} from "../shared/snack-bar/action-snack-bar.component";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  maxDate;
  shouldRun = false;
  openSidenav = false;
  progress = 0;
  timer: number;
  theme: boolean;
  snackBarRef: MatSnackBarRef<ActionSnackBarComponent>;

  constructor(private dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.shouldRun = true;
    this.openSidenav = false;
    this.restartTimer()
  }

  toggleTheme() {
    this.theme = !this.theme;
  }

  onRerunTimer(message: string) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {message: message}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restartTimer();
      }
    })
  }

  private restartTimer() {
    clearInterval(this.timer);
    this.progress = 0;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 100);
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }

  showSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.openFromComponent(ActionSnackBarComponent, {
      panelClass: ['styled-snack'],
      data: {
        message: message,
        action: action
      }
    });
    this.snackBarRef.afterDismissed().subscribe((data) => console.log(data));
    this.snackBarRef.instance.ref = this.snackBarRef;
  }
}
