import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance, AttendanceMethod } from './attendance.entity';
import { Registration } from '../registrations/registration.entity';
import { ManualAttendanceDto, QrAttendanceDto } from './dto/attendance.dto';
import { QrCode } from '../qr-codes/qr-code.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Registration)
    private readonly registrationsRepository: Repository<Registration>,
    @InjectRepository(QrCode)
    private readonly qrCodesRepository: Repository<QrCode>
  ) {}

  listByEvent(eventId: string) {
    return this.attendanceRepository.find({ where: { eventId } });
  }

  async markManual(eventId: string, dto: ManualAttendanceDto) {
    const registration = await this.registrationsRepository.findOne({
      where: { eventId, userId: dto.userId }
    });
    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }
    return this.upsertAttendance(eventId, dto.userId, dto.present, AttendanceMethod.MANUAL);
  }

  async markByQr(eventId: string, dto: QrAttendanceDto) {
    const qrCode = await this.qrCodesRepository.findOne({
      where: { qrToken: dto.qrToken }
    });
    if (!qrCode) {
      throw new NotFoundException('QR inválido');
    }
    const registration = await this.registrationsRepository.findOne({
      where: { id: qrCode.registrationId }
    });
    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }
    if (registration.eventId !== eventId) {
      throw new BadRequestException('QR no corresponde al evento');
    }
    const alreadyUsed = await this.attendanceRepository.findOne({
      where: { eventId, userId: registration.userId, present: true }
    });
    if (alreadyUsed) {
      throw new BadRequestException('QR ya utilizado');
    }
    return this.upsertAttendance(eventId, registration.userId, true, AttendanceMethod.QR);
  }

  private async upsertAttendance(eventId: string, userId: string, present: boolean, method: AttendanceMethod) {
    const existing = await this.attendanceRepository.findOne({
      where: { eventId, userId }
    });
    if (existing) {
      existing.present = present;
      existing.checkInTime = present ? new Date() : existing.checkInTime;
      existing.method = method;
      return this.attendanceRepository.save(existing);
    }
    const attendance = this.attendanceRepository.create({
      eventId,
      userId,
      present,
      method,
      checkInTime: present ? new Date() : null
    });
    return this.attendanceRepository.save(attendance);
  }
}
