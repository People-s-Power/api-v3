import { ApplicantService } from 'src/applicant/services/applicant.service';
import { AccountTypeEnum, StaffRoleEnum } from './dto/user.dto';
import { User, UserDocument } from './entity/user.schema';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    private readonly applicantService;
    constructor(userService: UserService, applicantService: ApplicantService);
    getUsers(user: UserDocument, role: StaffRoleEnum, accountType: AccountTypeEnum): Promise<UserDocument[]>;
    deleteUser(id: string): Promise<User>;
    deleteManyUser(): Promise<UserDocument[]>;
    getUser(id: string): Promise<UserDocument>;
    getUserApplicants(id: string): Promise<import("../applicant/schema/applicant.shema").ApplicantDocument[]>;
    seedUsers(): Promise<UserDocument>;
}
