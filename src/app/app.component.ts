import { Component, OnInit, Inject } from '@angular/core';
import {
  User,
  GravatarService,
  Thesaurus,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';
import { AppService, AppQuery } from '@myrmidon/cadmus-state';

@Component({
  selector: 'ingra-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public user?: User;
  public logged?: boolean;
  public itemBrowsers?: ThesaurusEntry[] | null;

  constructor(
    private _authService: AuthService,
    private _gravatarService: GravatarService,
    private _appService: AppService,
    private _appQuery: AppQuery
  ) {
    this.user = undefined;
    this.logged = false;
    this.itemBrowsers = [];
  }

  ngOnInit(): void {
    this.user = this._authService.currentUserValue;
    this.logged = this.user !== null;

    this._authService.currentUser$.subscribe((user: User) => {
      this.logged = this._authService.isAuthenticated(true);
      this.user = user;
      // load the general app state just once
      if (user) {
        this._appService.load();
      }
    });

    this._appQuery
      .selectItemBrowserThesaurus()
      .subscribe((thesaurus: Thesaurus) => {
        this.itemBrowsers = thesaurus ? thesaurus.entries : null;
      });
  }

  public getGravatarUrl(email?: string, size = 80): string {
    if (!email) {
      return '';
    }
    return this._gravatarService.buildGravatarUrl(email, size);
  }

  public logout(): void {
    if (!this.logged) {
      return;
    }
    this._authService.logout();
  }
}
