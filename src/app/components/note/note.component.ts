/**
 * @author [daoNguyen]
 * @email [daonds@vinorsoft.com ]
 * @create date 2022-09-20 16:27:30
 * @modify date 2022-09-20 16:27:30
 * @desc [description]
 */
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NotarizeCompositeService } from 'src/app/@core/mock/notarize-composite.service';
import { UserService } from 'src/app/@core/mock/user.service';
import { Note } from 'src/app/model/note';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  createrName = '';
  createdDate = '';
  constructor(
    private notarizeCompositeService: NotarizeCompositeService,
    private userService: UserService,
    private iconService: NzIconService
  ) {}
  ngOnInit(): void {
    this.fetchCreater();
  }

  fetchCreater() {
    if (this.note) {
      this.userService.fetchUser(this.note.ownerUserId).subscribe((res) => {
        res = JSON.parse(res, (key, value) => {
          if (key.includes('Id') || key.includes('id')) {
            return value !== null ? BigInt(value).toString() : null;
          }
          return value;
        });
        this.createrName = res.fullname;
      });
    } else {
    }
  }
}
