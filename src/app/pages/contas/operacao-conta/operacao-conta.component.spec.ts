import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoContaComponent } from './operacao-conta.component';

describe('OperacaoContaComponent', () => {
  let component: OperacaoContaComponent;
  let fixture: ComponentFixture<OperacaoContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperacaoContaComponent]
    });
    fixture = TestBed.createComponent(OperacaoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
