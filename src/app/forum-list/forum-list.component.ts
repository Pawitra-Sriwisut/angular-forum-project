import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author, Forum, ForumService, Post } from '../forum.service';

@Component({
  selector: 'app-forum-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css'],
})
export class ForumListComponent implements OnInit {
  public formList: Forum[] = [];
  constructor(readonly forumService: ForumService) {
    this.formList = forumService.posts.map((x) => {
      const find = this.forumService.authors?.find((y) => y.id === x.author_id);
      const createdDate = new Date(x.created_at);
      const createdDisplay = `posted on ${createdDate.toLocaleString('en-us', {
        weekday: 'long',
      })}, ${createdDate.toLocaleString('en-us', {
        month: 'long',
      })} ${createdDate.getDate()}, ${createdDate.getFullYear()}, ${createdDate.toLocaleString(
        'en-us',
        {
          hourCycle: 'h23',
          hour: '2-digit',
          minute: '2-digit',
        }
      )}`;
      return {
        ...x,
        avatar_url: find?.avatar_url || '',
        name: find?.name || '',
        createdDisplay: createdDisplay,
      };
    });
  }

  ngOnInit(): void {}
}
