import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {BannerDataService} from '../../entities/services/banner-data.service';
import {BannerInterface} from '../../entities/interfaces/banner.interface';
import * as styles from '../../entities/variables/styles';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('banner') banner: ElementRef;

  constructor(
    public bannerDataService: BannerDataService,
    private _cdr: ChangeDetectorRef
  ) { }

  public BANNER = styles.BANNER;
  public TITLE = styles.TITLE;
  public PARAGRAPH = styles.PARAGRAPH;

  ngAfterViewInit(): void {
    this._bannerDataHandler();
  }

  private _bannerDataHandler(): void {
    this.bannerDataService.bannerData.subscribe((bannerData: BannerInterface) => {
      const html = this._getHtml();
      html.style.backgroundImage = `url(${bannerData.imageLink})`;
      this.bannerDataService.bannerHTMLData.next(html);
    });
  }

  private _getHtml(): HTMLElement {
    return this.banner.nativeElement;
  }

  // changeUrl(): void {
  //   this.bannerDataService.bannerData.next(
  //     {
  //         ...this.bannerDataService.bannerData.value,
  //         imageLink: '/assets/default.png'
  //     }
  //   );
  // }
}
