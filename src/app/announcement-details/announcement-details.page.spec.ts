import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementDetailsPage } from './announcement-details.page';

describe('AnnouncementDetailsPage', () => {
  let component: AnnouncementDetailsPage;
  let fixture: ComponentFixture<AnnouncementDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnnouncementDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
