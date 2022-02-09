import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html',
  styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent implements OnInit {
  userName = '';
  userAvatar: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.userAvatar = '/assets/avatar.png';
    this.userName ='Glen Williams'
  }

  editArticle():void {
    console.log('Edit article')
  }

  deleteArticle():void {
    console.log('Delete article')
  }
}
