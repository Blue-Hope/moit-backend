import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { TestConnectionModule } from '@config/test/test.config';
import {
  BadRequestInterceptor,
  NotFoundInterceptor,
} from '@interceptor/typeorm.interceptor';
import { UniversityController } from '../university.controller';
import { UniversityService } from '../university.service';
import { createUser } from '@util/fixtures/create_user_fixture';
import { AppModule } from '@app/app.module';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secretOrKey, options, callback) => {
    callback(null, {
      email: 'any@email.com',
      sub: 1,
    });
  }),
}));

describe('UniversityController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new BadRequestInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.init();
    await createUser(moduleFixture);
  });

  describe('/api/v1/university', () => {
    it('readAll - Success', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/university')
        .expect(HttpStatus.OK);
    });
  });
});
