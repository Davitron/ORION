import * as SendGrid from '@sendgrid/mail';
import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Mail } from './mail.interface';
import { threadId } from 'worker_threads';

@Injectable()
export class MailService {
sendgrid: any;
sgMail: any;
constructor(private config: ConfigService) {
  this.sendgrid  = SendGrid;
  this.sendgrid.setApiKey(this.config.get('SENDGRID_API_KEY'));
}

async sendMail(mail: Mail): Promise<any> {
  return await this.sendgrid.send(mail);
 }

}
