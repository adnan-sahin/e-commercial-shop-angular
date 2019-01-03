import { TestBed } from '@angular/core/testing';

import { ShoppingCardService } from './shopping-card.service';

describe('ShoppingCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCardService = TestBed.get(ShoppingCardService);
    expect(service).toBeTruthy();
  });
});
