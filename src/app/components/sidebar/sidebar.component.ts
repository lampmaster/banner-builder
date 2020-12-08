import {Component, OnInit} from '@angular/core';
import {BannerDataService} from '../../entities/services/banner-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BannerInterface} from '../../entities/interfaces/banner.interface';
import domtoimage from 'dom-to-image';
import {saveAs} from '../../entities/utils/utils';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public formModel: FormGroup;
  public backgroundColor: string;

  constructor(
    public bannerDataService: BannerDataService,
    private _fb: FormBuilder,
    private _messageBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._createFormGroup();
    this._patchData();
    this._formHandler();
  }

  private _createFormGroup(): void {
    this.formModel = this._fb.group({
      title: this._fb.control(''),
      imageLink: this._fb.control(''),
      bannerLink: this._fb.control(''),
      backgroundColor: this._fb.control('')
    });
  }

  private _patchData(): void {
    this.formModel.patchValue(this.bannerDataService.bannerData.value);
  }

  private _formHandler(): void {
    this.formModel.valueChanges.subscribe((value: BannerInterface) => {
      this.bannerDataService.bannerData.next(value);
    });
  }

  public colorChange(event): void {
    this.formModel.get('backgroundColor').patchValue(event.color);
  }

  public copyJSON(): void {
    const jsonString: string = JSON.stringify(this.bannerDataService.bannerData.value);
    navigator.clipboard.writeText(jsonString).then(_ => {
      this._callMessageBar('JSON copied');
    });
  }

  public copyHTML(): void {
    const html = this._makeHTMLClickable();
    navigator.clipboard.writeText(html.outerHTML).then(_ => {
      this._callMessageBar('HTML copied');
    });
  }

  public savePNG(): void {
    domtoimage.toPng(this.bannerDataService.bannerHTMLData.value).then((dataUrl) => {
        saveAs(dataUrl, 'banner.png');
      });
  }

  private _callMessageBar(messageText: string): void {
    this._messageBar.open(messageText, 'close', {duration: 2000});
  }

  private _makeHTMLClickable(): HTMLElement {
    const html = this.bannerDataService.bannerHTMLData.value.cloneNode(true);
    const link = document.createElement('a');
    link.href = this.bannerDataService.bannerData.value.bannerLink;
    link.appendChild(html);
    return link;
  }
}
