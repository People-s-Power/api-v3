import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import {
  AssignUserAdminDTO,
  ChangeUserAccountTypeDTO,
  ChangeUserRoleDTO,
  UpdateUserDTO,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v3/user')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.getUsers();
    const mapped = users.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        accountType: user?.accountType,
        role: user?.role,
        isActive: user?.isActive,
      };
    });
    return mapped;
  }
  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Body() data: UpdateUserDTO) {
    const user = await this.userService.updateUser(data);
    return user.id;
  }
  @UseGuards(JwtAuthGuard)
  @Post('assign')
  async assign(@Body() data: AssignUserAdminDTO) {
    const user = await this.userService.assignUser(data);
    return user.id;
  }
  @UseGuards(JwtAuthGuard)
  @Put('changerole')
  async changeRole(@Body() data: ChangeUserRoleDTO) {
    const user = await this.userService.changeRole(data);
    return { id: user.id, role: user.role };
  }
  @UseGuards(JwtAuthGuard)
  @Put('changeaccount')
  async changeAccountType(@Body() data: ChangeUserAccountTypeDTO) {
    const user = await this.userService.accountType(data);
    return { id: user.id, accountType: user.accountType };
  }
  @UseGuards(RestAuthGuard)
  @Post('upload')
  async upload(@Body() data: { image: string }, @Req() req: ReqWithUser) {
    const user = await this.userService.uploadImage(data.image, req?.user);
    return user.image;
  }
  @Post('image-upload')
  async uploadImage(@Body() data: { image: string; id: string }) {
    return this.userService.uploadProfileImage(data);
  }
  @Post('activate')
  async activateUser(@Body() data: { id: string }) {
    const user = await this.userService.activateUser(data.id);
    return { isActive: user.isActive, id: user.id };
  }
  @Delete('single/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.delete(id);
    return user?.id;
  }
  @Post('block')
  async blockUser(@Body() data: { id: string }) {
    return await this.userService.blockUser(data.id);
  }
  @Post('seed')
  async seedUser() {
    return await this.userService.seedUsers();
  }
}
