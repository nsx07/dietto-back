import { CreateUserDto } from '@/application/entities/user/dto/create-user.dto';
import { IUserService } from '@/application/services/contract/iuser.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  // @Post()
  // async create(@Body() dto: CreateUserDto): Promise<string> {
  //   return this.userService.create(dto);
  // }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
