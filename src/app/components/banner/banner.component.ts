import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {BannerDataService} from '../../entities/services/banner-data.service';
import {BannerInterface} from '../../entities/interfaces/banner.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('banner') banner: ElementRef;
  @ViewChild('title') title: ElementRef;

  constructor(
    public bannerDataService: BannerDataService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this._bannerDataHandler();
  }

  public goToPage(): void {
    const bannerLink = this.bannerDataService.bannerData.value.bannerLink;
    if (bannerLink) {
      window.open(bannerLink);
    }
  }

  private _bannerDataHandler(): void {
    this.bannerDataService.bannerData.subscribe((_: BannerInterface) => {
      this._getHtml();
    });
  }

  private _getHtml(): void {
    const html: HTMLElement = this.banner.nativeElement;
    this.bannerDataService.bannerHTMLData.next(html);
  }

  changeUrl(): void {
    this.bannerDataService.bannerData.next(
      {
          ...this.bannerDataService.bannerData.value,
          imageLink: '/assets/default.png'
      }
    );
  }
}
