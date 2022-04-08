import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

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
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: IPurchaseCreatePayload) {
    console.log(payload);
  }
}
