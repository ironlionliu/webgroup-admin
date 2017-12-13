import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprimeComponent } from './testprime.component';

describe('TestprimeComponent', () => {
  let component: TestprimeComponent;
  let fixture: ComponentFixture<TestprimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestprimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
