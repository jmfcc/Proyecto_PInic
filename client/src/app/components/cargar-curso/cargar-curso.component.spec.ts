import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCursoComponent } from './cargar-curso.component';

describe('CargarCursoComponent', () => {
  let component: CargarCursoComponent;
  let fixture: ComponentFixture<CargarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
