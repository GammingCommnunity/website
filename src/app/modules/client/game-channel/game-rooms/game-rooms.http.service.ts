import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GameRoom } from './game-rooms.dto';
import { ClientCommonService } from '../../client.common-service';

const GAME_ROOMS = gql`
  	query{
		getRoomByGame(limit:100, page:1, gameID:"5e5b5c16709ead0ab05369a5"){
			roomName
			_id
			roomLogo
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GameRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchGameRooms() {
		return this.apollo.use('mainService').query<any>({
			query: GAME_ROOMS,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): GameRoom[] => {
				let rooms: GameRoom[] = [];

				data.getRoomByGame.forEach(room => {
					rooms.push(new GameRoom(room));
				})

				return rooms;
			}
		));
	}
}
