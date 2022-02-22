import { Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../core/article.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit{
  @Input('article') article:any;
  userName = '';
  userAvatar: string | null = null;

  constructor(private articleService: ArticleService, public afs:AngularFirestore) { }

  ngOnInit(): void {
    this.userAvatar = '/assets/avatar.png';
    this.userName ='Glen Williams'
  }

  editArticle():void {
    console.log('Edit article')
  }

  deleteArticle(id:string):void {
    this.articleService.deleteArticleByID(id);
    // console.log('Delete article')
  }
}
