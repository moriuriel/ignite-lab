import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

interface Customer {
  authUserId: string;
}

interface Product {
  id: string;
  slug: string;
  title: string;
}

interface IPurchaseCreatePayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: IPurchaseCreatePayload) {
    const { product, customer } = payload;

    let student = await this.studentsService.getStudentByAuthUserId(
      customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(product.slug);
    console.log(course);
    if (!course) {
      course = await this.coursesService.createCourse({ title: product.title });
    }

    await this.enrollmentsService.createEnrollement({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
