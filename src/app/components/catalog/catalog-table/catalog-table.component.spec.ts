import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTableComponent } from './catalog-table.component';

describe('CatalogTableComponent', () => {
  let component: CatalogTableComponent;
  let fixture: ComponentFixture<CatalogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
