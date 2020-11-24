import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {BannerDataService} from '../../entities/services/banner-data.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule],
      declarations: [ SidebarComponent ],
      providers: [BannerDataService]
    });

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('component should be created', () => {
    expect(component).toBeDefined();
  });

  it('should create forms width 4 controls', () => {
    component.ngOnInit();
    expect(component.formModel.contains('title')).toBeTruthy();
    expect(component.formModel.contains('imageLink')).toBeTruthy();
    expect(component.formModel.contains('bannerLink')).toBeTruthy();
    expect(component.formModel.contains('backgroundColor')).toBeTruthy();
  });
});
