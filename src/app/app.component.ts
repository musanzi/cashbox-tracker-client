import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/shared/ui/loading-bar/loading-bar.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoadingBarComponent, LoaderComponent]
})
export class AppComponent {}
