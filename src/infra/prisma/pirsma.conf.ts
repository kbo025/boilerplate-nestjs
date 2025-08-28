import { PrismaClient, Prisma } from '@prisma/client';

const FIND_OPERATIONS = ['findUnique', 'findFirst', 'findMany', 'findUniqueOrThrow', 'findFirstOrThrow'];

const auditoryFieldsExt = Prisma.defineExtension({
  name: 'auditoryFields',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        args: Prisma.Args<M, 'delete'>,
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          ...args.where,
          data: {
            deletedAt: new Date(),
            active: false,
          },
        });
      },
      async deleteMany<M, A>(
        this: M,
        args: Prisma.Args<M, 'deleteMany'>,
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);
        return (context as any).updateMany({
          ...args.where,
          data: {
            deletedAt: new Date(),
            active: false,
          },
        });
      },

      async update<M, A>(
        this: M,
        args: Prisma.Args<M, 'update'>,
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          ...args.where,
          data: {
            ...args.data,
            updatedAt: new Date(),
          },
        });
      },

      async updateMany<M, A>(
        this: M,
        args: Prisma.Args<M, 'updateMany'>,
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          ...args.where,
          data: {
            ...args.data,
            updatedAt: new Date(),
          },
        });
      },
    },
  },
  query: {
    // $allModels: {
    //   async $allOperations({ model, operation, args, query }) {

    //     if (FIND_OPERATIONS.includes(operation)) {
    //       args.where = {
    //         ...(args.where as object),
    //         deletedAt: null,
    //         active: true,
    //       };
    //     } else if (operation === 'update' || operation === 'updateMany') {
    //       args.data = {
    //         ...(args.data as object),
    //         updatedAt: new Date(),
    //       };
    //     }

    //     return query(args);
    //   },
    // },
  },
});

//function to give us a prismaClient with extensions we want
const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(auditoryFieldsExt);
};

//Create a type to our funtion
type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

//Our Custom Prisma Client with the client set to the customPrismaClient with extension
export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}
