import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover-svg',
  templateUrl: './cover-svg.component.html',
  template: `
`,
  styleUrls: ['./cover-svg.component.scss']
})
export class CoverSvgComponentComponent {
  @Input() class = '';
}
