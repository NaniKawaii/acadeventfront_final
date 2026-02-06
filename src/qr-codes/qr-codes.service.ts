import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';
import { RegistrationsService } from '../registrations/registrations.service';
import { randomBytes } from 'crypto';

@Injectable()
export class QrCodesService {
  constructor(
    @InjectRepository(QrCode)
    private readonly qrCodeRepository: Repository<QrCode>,
    private readonly registrationsService: RegistrationsService,
  ) {}

  async generateForRegistration(registrationId: string): Promise<QrCode> {
    const registration = await this.registrationsService.findOne(registrationId);
    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    // Check if QR already exists
    const existing = await this.qrCodeRepository.findOne({
      where: { registrationId },
    });
    if (existing) {
      return existing;
    }

    const qrToken = randomBytes(16).toString('hex');
    const qrCode = this.qrCodeRepository.create({
      registrationId,
      qrToken,
    });
    return this.qrCodeRepository.save(qrCode);
  }

  async findByToken(qrToken: string): Promise<QrCode | null> {
    return this.qrCodeRepository.findOne({
      where: { qrToken },
      relations: ['registration', 'registration.event', 'registration.user'],
    });
  }

  async findByRegistration(registrationId: string): Promise<QrCode | null> {
    return this.qrCodeRepository.findOne({
      where: { registrationId },
    });
  }
}