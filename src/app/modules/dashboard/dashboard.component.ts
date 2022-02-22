import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../core/article.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  articles:any;

  allArticles$ = this.articleService.$articles;

  constructor( private articleService:ArticleService) { }

  ngOnInit(): void {

    // this.articleService.deleteAllArticles().subscribe();

    // this.articleService.getAllArticles().subscribe();
    // this.articleService.$articles.subscribe(data=> {
    //
    //   console.log('Articles in component', data);
    //   this.articles = data;
    //
    // })
  }

}
