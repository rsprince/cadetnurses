import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

interface Rss2JsonResponse {
  status: string;
  items: Rss2JsonItem[];
}

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly feedUrl = 'https://news.google.com/rss/search?q=Cadet+Nurse+Corps';
  private readonly endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=';

  private toPlainText(value?: string) {
    return (value ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getNewsFeed() {
    return this.http
      .get<Rss2JsonResponse>(`${this.endpoint}${encodeURIComponent(this.feedUrl)}`)
      .pipe(
        map((response) =>
          (response.items ?? []).map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: this.toPlainText(item.description),
          }))
        ),
        catchError(() => of([] as NewsItem[]))
      );
  }
}