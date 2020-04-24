import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsdisplayPage } from './newsdisplay.page';

describe('NewsdisplayPage', () => {
  let component: NewsdisplayPage;
  let fixture: ComponentFixture<NewsdisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsdisplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsdisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
