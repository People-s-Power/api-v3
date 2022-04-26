import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ReqWithUser } from 'src/typings';
import { User } from 'src/user/entity/user.schema';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation()
  registerWithEmail(@Args('input') input: User) {
    return this.authService.registerWithEmail(input);
  }
  // @UseGuards(GQLoginGuard)
  @Mutation()
  async loginWithEmail(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('phone') phone: string,
    @Context('req') req: ReqWithUser,
  ) {
    const user = await this.authService.loginWithEmail(email, phone, password);
    return user;
  }
}
