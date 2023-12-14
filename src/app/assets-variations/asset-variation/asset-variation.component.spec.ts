import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVariationComponent } from './asset-variation.component';

describe('AssetVariationComponent', () => {
  let component: AssetVariationComponent;
  let fixture: ComponentFixture<AssetVariationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetVariationComponent]
    });
    fixture = TestBed.createComponent(AssetVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
