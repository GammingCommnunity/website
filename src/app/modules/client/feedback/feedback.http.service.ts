import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FeedbackServiceResponse, Feedback } from './feedback.dto';
import { ServiceUrls } from 'src/environments/environment';

const MY_FRIENDS = gql`
  	query 
	{
		getFriends{ friend{ id, name, avatar_url }}
	}
`;

@Injectable({
	providedIn: "root"
})
export class FeedbackHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;
	readonly feedbackUrl: string;

	constructor(
		private http: HttpClient,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
		this.feedbackUrl = ServiceUrls.feedback;
	}

	sendFeedback(feedback: Feedback) {
		return this.http.post<FeedbackServiceResponse>(this.feedbackUrl + '/send', feedback);
	}
}