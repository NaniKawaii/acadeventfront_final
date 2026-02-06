import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from '../events/event.entity';
import { Registration, RegistrationStatus } from '../registrations/registration.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Certificate } from '../certificates/certificate.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Registration)
    private readonly registrationsRepository: Repository<Registration>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>
  ) {}

  async eventReport(eventId: string) {
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    const registered = await this.registrationsRepository.count({
      where: { eventId, status: RegistrationStatus.INSCRITO }
    });
    const waiting = await this.registrationsRepository.count({
      where: { eventId, status: RegistrationStatus.LISTA_ESPERA }
    });
    const cancelled = await this.registrationsRepository.count({
      where: { eventId, status: RegistrationStatus.CANCELADO }
    });

    const present = await this.attendanceRepository.count({
      where: { eventId, present: true }
    });
    const absent = await this.attendanceRepository.count({
      where: { eventId, present: false }
    });

    return {
      eventId,
      capacity: event.capacity,
      registered,
      waiting,
      cancelled,
      present,
      absent,
      attendanceRate: registered > 0 ? Math.round((present / registered) * 100) : 0
    };
  }

  async summary(filters: { facultyId?: string; start?: string; end?: string }) {
    const eventsQb = this.eventsRepository.createQueryBuilder('event');
    if (filters.facultyId) {
      eventsQb.andWhere('event.facultyId = :facultyId', { facultyId: filters.facultyId });
    }
    if (filters.start) {
      eventsQb.andWhere('event.startAt >= :start', { start: new Date(filters.start) });
    }
    if (filters.end) {
      eventsQb.andWhere('event.startAt <= :end', { end: new Date(filters.end) });
    }

    const events = await eventsQb.getMany();
    const eventIds = events.map((e) => e.id);

    if (eventIds.length === 0) {
      return {
        totalEvents: 0,
        totalRegistrations: 0,
        totalAttendance: 0,
        totalCertified: 0
      };
    }

    const totalRegistrations = await this.registrationsRepository.count({
      where: { eventId: In(eventIds) }
    });
    const totalAttendance = await this.attendanceRepository.count({
      where: { eventId: In(eventIds), present: true }
    });
    const certificates = await this.certificatesRepository.find({
      where: { eventId: In(eventIds) }
    });

    return {
      totalEvents: eventIds.length,
      totalRegistrations,
      totalAttendance,
      totalCertified: certificates.length
    };
  }
}
