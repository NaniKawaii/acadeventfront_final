import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FacultiesModule } from './faculties/faculties.module';
import { CareersModule } from './careers/careers.module';
import { EventsModule } from './events/events.module';
import { SpeakersModule } from './speakers/speakers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AttendanceModule } from './attendance/attendance.module';
import { CertificatesModule } from './certificates/certificates.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { QrCodesModule } from './qr-codes/qr-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const sslMode = config.get<string>('DB_SSLMODE');
        const databaseUrl = config.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url: databaseUrl,
          host: databaseUrl ? undefined : config.get<string>('DB_HOST'),
          port: databaseUrl ? undefined : Number(config.get<number>('DB_PORT')),
          username: databaseUrl ? undefined : config.get<string>('DB_USER'),
          password: databaseUrl ? undefined : config.get<string>('DB_PASSWORD'),
          database: databaseUrl ? undefined : config.get<string>('DB_NAME'),
          ssl: sslMode === 'require' ? { rejectUnauthorized: false } : false,
          synchronize: false,
          autoLoadEntities: true
        };
      }
    }),
    UsersModule,
    FacultiesModule,
    CareersModule,
    EventsModule,
    SpeakersModule,
    RegistrationsModule,
    AttendanceModule,
    CertificatesModule,
    ReportsModule,
    NotificationsModule,
    QrCodesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
