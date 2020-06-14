import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector } from '@angular/core';
import { RoomPrivateChatUIService } from './room-private-chat/room-private-chat.ui.service';
import { JoinedRoomsComponent } from './joined-rooms/joined-rooms.component';
import { GameChannelLanguage } from './game-channel.language';
import { ClientCommonComponent } from '../client.common-component';
import { GameChannel } from './game-channel.dto';
import { GameChannelHttpService } from './game-channel.http.service';

@Component({
	selector: 'app-game-channel',
	templateUrl: './game-channel.component.html',
	styleUrls: ['./game-channel.component.css']
})
export class GameChannelComponent extends ClientCommonComponent implements AfterViewInit {
	@ViewChild('joinedRooms', { static: true }) joinedRoomsComponent: JoinedRoomsComponent;
	private gameChannels: GameChannel[];
	private selectedGame: GameChannel;

	constructor(
		protected injector: Injector,
		protected gameChannelHttpService: GameChannelHttpService,
		private roomPrivateChatUIService: RoomPrivateChatUIService
	) {
		super(injector);
		GameChannelLanguage.define(this.translateService);

		this.fetchGameChannels();
	}

	ngAfterViewInit() {
		this.joinedRoomsComponent.showPrivateChat = this.roomPrivateChatUIService.showPrivateChatFunc;
	}

	handleGameChannelChange(){
		console.log(this.selectedGame);
	}

	protected fetchGameChannels(){
		this.gameChannelHttpService.fetchGameChannels().subscribe(data => {
			this.gameChannels = data;
		});
	}
}
