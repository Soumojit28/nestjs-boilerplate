import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Success status', example: true })
  success: boolean;
  @ApiProperty({ description: 'Message', example: 'Request successful' })
  message: string;
  @ApiPropertyOptional({ description: 'Data' })
  data?: T;
  @ApiProperty({
    description: 'Error',
    example: {
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      path: '/',
      timestamp: '2021-01-01T00:00:00.000Z',
    },
  })
  error?: {
    code: string;
    statusCode: number;
    path?: string;
    timestamp?: string;
  };
}
