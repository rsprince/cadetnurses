import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.html',
  styleUrl: './news.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class News {
  private readonly newsService = inject(NewsService);

  readonly newsFeed = toSignal(this.newsService.getNewsFeed(), {
    initialValue: [],
  });

  readonly logNewsFeed = effect(() => {
    console.log('News feed result:', this.newsFeed());
  });

  readonly hasNews = computed(() => this.newsFeed().length > 0);
}
