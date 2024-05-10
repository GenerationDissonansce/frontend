import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ServiceService} from "../../../services/service.service";
import {ScreenSizeService} from "../../../services/screen-size.service";
import {PageModel} from "../../../models/page.model";
import {UpdatePageService} from "../../../services/update-page.service";

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent implements AfterViewInit {
  @ViewChild('grid') grid: any;
  @Input() page!: PageModel;

  constructor(
    public service: ServiceService,
    public screen: UpdatePageService,
  ) {
    this.screen.subscribers$.subscribe((resp: any)=>{
      if (resp.type == 'resize')
        this.Resize(resp.page_size);
    });
  }

  ngAfterViewInit() {
    this.Resize([this.page.width!, this.page.height!]);
  }

  Resize(page_size: number[]) {
    const width = page_size[2] == 1? 1000 : page_size[0];
    if (width < 360)
      this.grid.nativeElement.style.gridTemplateColumns = '50% 50%';
    else if (width < 450)
      this.grid.nativeElement.style.gridTemplateColumns = '33% 33% 33%';
    else
      this.grid.nativeElement.style.gridTemplateColumns = '25% 25% 25% 25%';
  }

}
