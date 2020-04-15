import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainListComponent } from './villain-list.component';

describe('VillainListComponent', () => {
  let component: VillainListComponent;
  let fixture: ComponentFixture<VillainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
