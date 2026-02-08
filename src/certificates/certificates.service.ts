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
    return this.certificatesRepository.find({
      where: { userId },
      relations: ['event']
    });
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

  async getPdfPath(id: string) {
    const certificate = await this.certificatesRepository.findOne({
      where: { id },
      relations: ['event', 'user']
    });
    if (!certificate) {
      throw new NotFoundException('Certificado no encontrado');
    }
    const pdfUrl = await this.generatePdf(
      certificate.event,
      certificate.user,
      certificate.verificationCode
    );
    certificate.pdfUrl = pdfUrl;
    await this.certificatesRepository.save(certificate);
    const relative = pdfUrl.replace(/^\/uploads\//, '');
    const filePath = path.join(__dirname, '../../uploads', relative);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('PDF no disponible');
    }
    return filePath;
  }

  private async generatePdf(event: Event, user: User, verificationCode: string): Promise<string> {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 48 });
    const fileName = `certificate-${verificationCode}.pdf`;
    const filePath = path.join(__dirname, '../../uploads/certificates', fileName);

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const { width, height } = doc.page;
    const ribbonWidth = 190;
    const contentWidth = width - ribbonWidth;
    const contentLeft = 60;
    const contentRight = contentWidth - 60;
    const headerY = 90;
    const mainCenter = contentWidth / 2;
    const dateText = event.startAt.toLocaleDateString('es-ES');
    const timeText = `${event.startAt.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })} - ${event.endAt.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    doc.rect(0, 0, width, height).fill('#fbfaf7');
    doc.rect(width - ribbonWidth, 0, ribbonWidth, height).fill('#edeaf6');
    doc.rect(22, 22, width - 44, height - 44).lineWidth(2).stroke('#6f63ff');
    doc.rect(32, 32, width - 64, height - 64).lineWidth(1).stroke('#d4cff7');

    doc.save();
    doc.opacity(0.08);
    doc.strokeColor('#b3a9ea').lineWidth(1.2);
    doc.circle(170, 270, 140).stroke();
    doc.circle(300, 420, 120).stroke();
    doc.circle(120, 470, 90).stroke();
    doc.restore();

    doc.fillColor('#2d2a8c');
    doc.fontSize(42).text('AcadEvent', contentLeft, headerY, {
      width: contentRight - contentLeft,
      align: 'left'
    });
    doc.fillColor('#3a3a5c');
    doc.fontSize(16).text('Certificado de asistencia', contentLeft, headerY + 48, {
      width: contentRight - contentLeft,
      align: 'left'
    });

    doc.fillColor('#1f1f2e');
    doc.fontSize(16).text('Se certifica que', 0, 210, { align: 'center', width: contentWidth });
    doc.fontSize(28).fillColor('#2d2a8c').text(user.fullName, 0, 238, {
      align: 'center',
      width: contentWidth
    });
    doc.fillColor('#1f1f2e');
    doc.fontSize(15).text('ha asistido al evento', 0, 285, {
      align: 'center',
      width: contentWidth
    });
    doc.fontSize(20).fillColor('#1f1f2e').text(`"${event.title}"`, 90, 312, {
      align: 'center',
      width: contentWidth - 180
    });
    doc.fontSize(13).fillColor('#3a3a5c').text(
      `Realizado el ${dateText} · ${timeText}`,
      0,
      350,
      { align: 'center', width: contentWidth }
    );

    doc.fillColor('#1f1f2e');
    doc.lineWidth(1).moveTo(contentLeft, height - 170).lineTo(contentLeft + 240, height - 170).stroke('#5b4fe9');
    doc.fontSize(12).fillColor('#3a3a5c').text('Autoridad académica', contentLeft, height - 155);

    doc.fillColor('#3a3a5c');
    doc.fontSize(11).text(`Código de verificación: ${verificationCode}`, 0, height - 140, {
      align: 'center',
      width: contentWidth
    });
    doc.fontSize(11).text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`, 0, height - 120, {
      align: 'center',
      width: contentWidth
    });

    const ribbonX = width - ribbonWidth;
    const ribbonCenter = ribbonX + ribbonWidth / 2;
    doc.fillColor('#4b4b5e');
    doc.fontSize(11).text('CERTIFICADO', ribbonX, 90, {
      width: ribbonWidth,
      align: 'center'
    });
    doc.fontSize(11).text('DE ASISTENCIA', ribbonX, 106, {
      width: ribbonWidth,
      align: 'center'
    });
    doc.lineWidth(1).strokeColor('#b3aecf');
    doc.moveTo(ribbonX + 26, 130).lineTo(ribbonX + ribbonWidth - 26, 130).stroke();

    doc.lineWidth(2).strokeColor('#6b6b80');
    doc.circle(ribbonCenter, height / 2, 58).stroke();
    doc.circle(ribbonCenter, height / 2, 48).stroke();
    doc.fillColor('#6b6b80');
    doc.fontSize(10).text('ACAD', ribbonX, height / 2 - 14, {
      width: ribbonWidth,
      align: 'center'
    });
    doc.fontSize(10).text('EVENT', ribbonX, height / 2 + 2, {
      width: ribbonWidth,
      align: 'center'
    });

    doc.fillColor('#4b4b5e');
    doc.fontSize(10).text('Verifica en', ribbonX, height - 140, {
      width: ribbonWidth,
      align: 'center'
    });
    doc.fontSize(9).text('/verify?code=' + verificationCode, ribbonX, height - 124, {
      width: ribbonWidth,
      align: 'center'
    });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`/uploads/certificates/${fileName}`));
      stream.on('error', reject);
    });
  }
}
