import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { News } from './news';
import { NewsService } from './news.service';

describe('News', () => {
  let component: News;
  let fixture: ComponentFixture<News>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [News],
      providers: [
        {
          provide: NewsService,
          useValue: {
            getNewsFeed: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(News);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
