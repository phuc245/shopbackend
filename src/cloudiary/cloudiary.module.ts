import { Module } from '@nestjs/common';
import { CloudiaryService } from './cloudiary.service';
import { CloudinaryConfig } from './cloudiary.config';

@Module({
  providers: [CloudiaryService, CloudinaryConfig],
})
export class CloudiaryModule {}
