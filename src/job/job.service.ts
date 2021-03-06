import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateJobDto) {
    const job = await this.prisma.job.create({
      data,
    });
    await this.prisma.company.update({
      where: { id: data.companyId },
      data: {
        jobs: {
          connect: { id: job.id },
        },
        employees: {
          connect: { id: data.userId },
        },
      },
    });
    return job;
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
