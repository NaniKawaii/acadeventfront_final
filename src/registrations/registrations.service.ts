import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration, RegistrationStatus } from './registration.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { randomUUID } from 'crypto';
import { QrCode } from '../qr-codes/qr-code.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationsRepository: Repository<Registration>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(QrCode)
    private readonly qrCodesRepository: Repository<QrCode>
  ) {}

  async listByEvent(eventId: string) {
    return this.registrationsRepository.find({
      where: { eventId },
      relations: { event: true, user: true }
    });
  }

  async listByUser(userId: string) {
    return this.registrationsRepository.find({
      where: { userId },
      relations: { event: true }
    });
  }

  async register(eventId: string, userId: string) {
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const existing = await this.registrationsRepository.findOne({
      where: { eventId, userId }
    });
    if (existing && existing.status !== RegistrationStatus.CANCELADO) {
      throw new BadRequestException('El usuario ya está inscrito');
    }

    const registeredCount = await this.registrationsRepository.count({
      where: { eventId, status: RegistrationStatus.INSCRITO }
    });

    const status =
      registeredCount >= event.capacity
        ? RegistrationStatus.LISTA_ESPERA
        : RegistrationStatus.INSCRITO;

    if (existing) {
      existing.status = status;
      return this.registrationsRepository.save(existing);
    }

    const registration = this.registrationsRepository.create({
      eventId,
      userId,
      status
    });
    const saved = await this.registrationsRepository.save(registration);
    const qrCode = this.qrCodesRepository.create({
      registrationId: saved.id,
      qrToken: randomUUID()
    });
    await this.qrCodesRepository.save(qrCode);
    return saved;
  }

  async cancel(eventId: string, userId: string) {
    const registration = await this.registrationsRepository.findOne({
      where: { eventId, userId }
    });
    if (!registration) {
      throw new NotFoundException('Inscripción no encontrada');
    }
    registration.status = RegistrationStatus.CANCELADO;
    return this.registrationsRepository.save(registration);
  }

  async findOne(id: string) {
    return this.registrationsRepository.findOne({ where: { id } });
  }
}
