import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiTags('Health Check')
  getHealth(): string {
    return this.appService.healthCheck();
  }

  @Get('test-error')
  @ApiTags('Test Error')
  testError(): string {
    throw new BadRequestException('Test error');
  }
}
