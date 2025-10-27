import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../service';
import { Serie } from '../serie';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class SeriesListComponent implements OnInit {

  series: Serie[] = [];
  averageSeasons = 0;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(data => {
      this.series = data;
      this.updateAverage();
    });
  }

  updateAverage(): void {
    if (this.series.length === 0) {
      this.averageSeasons = 0;
      return;
    }

    const total = this.series
      .map(s => s.seasons)
      .reduce((sum, n) => sum + n, 0);

    this.averageSeasons = total / this.series.length;
  }
}
