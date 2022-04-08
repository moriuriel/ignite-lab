import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CoursesService, EnrollmentsService, StudentsService],
  controllers: [PurchasesController],
})
export class MessagingModule {}
