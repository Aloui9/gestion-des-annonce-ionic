import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAnnouncementPage } from './add-announcement.page';

describe('AddAnnouncementPage', () => {
  let component: AddAnnouncementPage;
  let fixture: ComponentFixture<AddAnnouncementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAnnouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
