import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategoria } from './lista-categoria';

describe('ListaCategoria', () => {
  let component: ListaCategoria;
  let fixture: ComponentFixture<ListaCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCategoria],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
