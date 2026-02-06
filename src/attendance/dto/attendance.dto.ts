import { ApiProperty } from '@nestjs/swagger';

export class ManualAttendanceDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  present!: boolean;
}

export class QrAttendanceDto {
  @ApiProperty()
  qrToken!: string;
}
