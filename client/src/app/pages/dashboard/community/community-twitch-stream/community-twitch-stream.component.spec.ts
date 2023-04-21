import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityTwitchStreamComponent } from './community-twitch-stream.component';
import { NbCardModule, NbStatusService } from '@nebular/theme';
import { TwitchAPIService } from '../../../../@core/data/twitch-api.service';
import { of } from 'rxjs';
import { TwitchStream } from '../../../../@core/models/twitch-stream.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CommunityTwitchStreamComponent', () => {
  let component: CommunityTwitchStreamComponent;
  let fixture: ComponentFixture<CommunityTwitchStreamComponent>;

  let twitchAPIStub: Partial<TwitchAPIService>;
  const twitchStream: TwitchStream = {
    title: 'This is a test stream!',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    user_name: 'Testy',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    viewer_count: 1000,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    started_at: new Date().toString(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    thumbnail_url: ''
  };

  beforeEach(waitForAsync(() => {
    twitchAPIStub = {
      getGameStreams: () => {
        return of({
          data: [twitchStream]
        });
      }
    };
    TestBed.configureTestingModule({
      imports: [NbCardModule],
      declarations: [CommunityTwitchStreamComponent],
      providers: [
        NbStatusService,
        { provide: TwitchAPIService, useValue: twitchAPIStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTwitchStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
