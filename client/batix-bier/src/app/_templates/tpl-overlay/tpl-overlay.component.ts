import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bx-tpl-overlay',
  templateUrl: './tpl-overlay.component.html',
  styleUrls: ['./tpl-overlay.component.less']
})
export class TplOverlayComponent implements OnInit {


  @Input() public statusUploadBox:boolean;
  @Input() public statusDeleteBox:boolean;

  constructor() {

   }

  ngOnInit() {

  }

}
