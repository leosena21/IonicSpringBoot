import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickaddressPage } from './pickaddress.page';

describe('PickaddressPage', () => {
  let component: PickaddressPage;
  let fixture: ComponentFixture<PickaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickaddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
