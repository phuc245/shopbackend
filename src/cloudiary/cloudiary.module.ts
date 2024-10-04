import { Module } from '@nestjs/common';
import { CloudiaryService } from './cloudiary.service';
import { CloudinaryConfig } from './cloudiary.config';

@Module({
  providers: [CloudiaryService, CloudinaryConfig],
  exports: [CloudiaryService],
})
export class CloudiaryModule {}
