import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {BehaviorSubject, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {SocialUser} from "angularx-social-login";
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles = new BehaviorSubject<any | null>([]);
  $articles = this.articles.asObservable();

  constructor(private http:HttpClient) { }

  addArticle(article:any) {
    const url = 'https://promotion-project-d76e8-default-rtdb.firebaseio.com/articles.json'
    return this.http.post(url, article).pipe(
      map((data: any) => {
        this.getAllArticles();
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }

  getAllArticles() {
    const url = 'https://promotion-project-d76e8-default-rtdb.firebaseio.com/articles.json';
    const articles:any = [];
    return this.http.get(url).pipe(
      map((data: any) => {
        for (var key in data) {
          data[key].id = key;
          articles.push(data[key])
        }
        this.articles.next(articles);
        return articles;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    ).subscribe()
  }

  deleteAllArticles(){
    const url = 'https://promotion-project-d76e8-default-rtdb.firebaseio.com/articles.json';
    return this.http.delete(url);
  }

  deleteArticleByID(id:string){
    const db = getDatabase();
    set(ref(db, 'articles/' + id), null)
      .then(() => {
        console.log('Article id: '+id+' deleted');
        this.getAllArticles();
      })
      .catch((error) => {
        return throwError( 'Something went wrong!' );
      });
    // console.log(db)
    // const url = 'https://promotion-project-d76e8-default-rtdb.firebaseio.com/articles.json';
    // return this.http.delete(url + `/${id}`);
  }
}
