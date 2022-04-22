import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLGuard } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { EnvDocument } from './env.schema';
import { EnvService } from './env.service';

@Resolver('Env')
export class EnvResolver {
  constructor(private readonly envService: EnvService) {}
  @Query()
  getEnvs() {
    return this.envService.getEnvs();
  }
  @Query()
  getEnv(@Args('id') id: string) {
    return this.envService.getEnv(id);
  }
  @Mutation()
  createEnv(@Args('input') input: EnvDocument) {
    return this.envService.createEnv(input);
  }
  @UseGuards(GQLGuard)
  @Mutation()
  updateEnv(
    @Args('input') input: EnvDocument,
    @CurrentUser() user: UserDocument,
  ) {
    return this.envService.updateEnv(input, user);
  }
  @UseGuards(GQLGuard)
  @Mutation()
  deleteEnv(@Args('id') id: string, @CurrentUser() user: UserDocument) {
    return this.envService.deleteEnv(id, user);
  }
}
