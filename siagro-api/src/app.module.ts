import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PropriedadeModule } from './modules/propriedade/propriedade.module';
import { Service } from './propriedade/modules/.service';
import { UsersController } from './modules/users/users.controller';



@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, PropriedadeModule,],
  controllers: [AppController, UsersController],
  providers: [AppService, Service],
})
export class AppModule {}
