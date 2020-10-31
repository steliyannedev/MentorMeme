import { TestBed } from '@angular/core/testing';

import { CommentboxService } from './commentbox.service';

describe('CommentboxService', () => {
  let service: CommentboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
