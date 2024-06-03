import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from './shared/services/alert.service';
import { AlertData } from './shared/interfaces/alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

 
  title = 'alerts';
  alertState: boolean = false;
  message: string = '';
  alertType: string = '';

  private unsubscribe$ = new Subject<void>();
  
  constructor(private alertService: AlertService) { }

 
  ngOnInit(): void {
    this.alertService.alert$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: AlertData) => {
        this.message = res.message;
        this.alertType = res.alertType;
        this.alertState = true;
        setTimeout(() => {
          this.alertState = false;
        }, res.timeDuration);
      }); 
  }

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
