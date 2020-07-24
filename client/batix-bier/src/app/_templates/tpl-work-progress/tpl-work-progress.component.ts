import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/_services/loading/loading.service';

@Component({
  selector: 'bx-tpl-work-progress',
  templateUrl: './tpl-work-progress.component.html',
  styleUrls: ['./tpl-work-progress.component.less']
})
export class TplWorkProgressComponent implements OnInit {

  constructor(public _loadingService: LoadingService) { }

  ngOnInit() {
  }

}
