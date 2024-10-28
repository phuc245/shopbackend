import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackDto } from 'src/mail/dto/feedback.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Post()
  sendMail(@Body() body: FeedbackDto) {
    return this.service.feedBack(body);
  }
}
