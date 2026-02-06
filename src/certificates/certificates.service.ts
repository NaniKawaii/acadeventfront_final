import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { GenerateCertificateDto } from './dto/certificate.dto';
import { randomUUID } from 'crypto';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificatesRepository: Repository<Certificate>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async listByUser(userId: string) {
    return this.certificatesRepository.find({ where: { userId } });
  }

  async generate(eventId: string, userId: string, dto: GenerateCertificateDto) {
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const existing = await this.certificatesRepository.findOne({
      where: { eventId, userId }
    });
    if (existing) {
      return existing;
    }

    const presentCount = await this.attendanceRepository.count({
      where: { eventId, userId, present: true }
    });
    if (presentCount === 0) {
      throw new BadRequestException('No cumple asistencia para certificado');
    }

    const verificationCode = randomUUID();
    const pdfUrl = await this.generatePdf(event, user, verificationCode);

    const certificate = this.certificatesRepository.create({
      eventId,
      userId,
      verificationCode,
      pdfUrl
    });
    return this.certificatesRepository.save(certificate);
  }

  async verify(code: string) {
    const certificate = await this.certificatesRepository.findOne({
      where: { verificationCode: code },
      relations: ['event', 'user']
    });
    if (!certificate) {
      throw new NotFoundException('Certificado no encontrado');
    }
    return certificate;
  }

  private async generatePdf(event: Event, user: User, verificationCode: string): Promise<string> {
    const doc = new PDFDocument();
    const fileName = `certificate-${verificationCode}.pdf`;
    const filePath = path.join(__dirname, '../../uploads/certificates', fileName);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Certificate layout
    doc.fontSize(24).text('CERTIFICADO DE ASISTENCIA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text('Acadevent - Universidad', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).text(`Se certifica que ${user.fullName}`, { align: 'center' });
    doc.moveDown();
    doc.text(`ha asistido al evento "${event.title}"`, { align: 'center' });
    doc.moveDown();
    doc.text(`realizado el ${event.startAt.toLocaleDateString('es-ES')}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12).text(`Código de verificación: ${verificationCode}`, { align: 'center' });
    doc.moveDown();
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`, { align: 'center' });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`/certificates/${fileName}`));
      stream.on('error', reject);
    });
  }
}
