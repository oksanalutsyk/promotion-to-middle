import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  addArticleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmitAddArticle() {
    console.log(this.addArticleForm.value)
  }
}
