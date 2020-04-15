import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainCardComponent } from './villain-card.component';
import { VillainService } from '../villain.service';
import { HttpClientModule } from '@angular/common/http';

describe('VillainCardComponent', () => {
  let component: VillainCardComponent;
  let fixture: ComponentFixture<VillainCardComponent>;
  let villainServiceMock: jasmine.SpyObj<VillainService>;

  beforeEach(async(() => {
    villainServiceMock = jasmine.createSpyObj<VillainService>(
      'VillainService',
      ['randomVillains', 'cachedVillains']
    );

    TestBed.configureTestingModule({
      declarations: [VillainCardComponent],
      providers: [{ provide: VillainService, useValue: villainServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
