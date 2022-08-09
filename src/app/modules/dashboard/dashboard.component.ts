import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../core/article.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allArticles$ =  this.getAllArticles();

  constructor( private articleService:ArticleService) { }

  ngOnInit(): void {}

  getAllArticles() {
    return this.articleService.getAllArticles();
  }
}
