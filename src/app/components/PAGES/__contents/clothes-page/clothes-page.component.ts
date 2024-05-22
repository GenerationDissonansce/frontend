import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PageModel} from "../../../../models/page.model";
import {ServiceService} from "../../../../services/service.service";
import {UpdatePageService} from "../../../../services/update-page.service";

@Component({
  selector: 'app-clothes-page',
  standalone: true,
  imports: [],
  templateUrl: './clothes-page.component.html',
  styleUrl: './clothes-page.component.css'
})
export class ClothesPageComponent implements AfterViewInit {
  @ViewChild('grid') grid: any;
  @Input() page!: PageModel;

  constructor(
    public service: ServiceService,
    public screen: UpdatePageService,
  ) {
    this.screen.subscribers$.subscribe((resp: any)=>{
      if (resp.type == 'resize' && resp.pageId == this.page.id)
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
