import { Injectable } from '@nestjs/common';
import { PrismaService } from './infra/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
     return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async createUser() {
    return await this.prisma.user.create({
      data: {
        email: 'teste@email.com',
        password: '123456789',
        name: 'teste',
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
