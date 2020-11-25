import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InitialBannerConfig} from './banner.config';
import {BannerInterface} from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {
  public bannerData: BehaviorSubject<BannerInterface> = new BehaviorSubject(InitialBannerConfig);
  public bannerHTMLData: BehaviorSubject<HTMLElement> = new BehaviorSubject(null);
}
