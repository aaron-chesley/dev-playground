import { Component, OnInit } from '@angular/core';
import { PlayModalService } from '@dev-playground/play-ui';

@Component({
  selector: 'dev-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const ref = this.playModalService.alert();

    // setTimeout(() => ref.close(), 5000);
  }
  constructor(private playModalService: PlayModalService) {}
}
