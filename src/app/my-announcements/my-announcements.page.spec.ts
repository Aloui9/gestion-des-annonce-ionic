import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAnnouncementsPage } from './my-announcements.page';

describe('MyAnnouncementsPage', () => {
  let component: MyAnnouncementsPage;
  let fixture: ComponentFixture<MyAnnouncementsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyAnnouncementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
