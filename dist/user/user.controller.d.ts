import { ReqWithUser } from 'src/typings';
import { AssignUserAdminDTO, ChangeUserAccountTypeDTO, ChangeUserRoleDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: any;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        accountType: import("./dto/user.dto").AccountTypeEnum;
        role: import("./dto/user.dto").StaffRoleEnum;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<import("./entity/user.schema").UserDocument>;
    updateUser(data: UpdateUserDTO): Promise<any>;
    assign(data: AssignUserAdminDTO): Promise<any>;
    changeRole(data: ChangeUserRoleDTO): Promise<{
        id: any;
        role: import("./dto/user.dto").StaffRoleEnum;
    }>;
    changeAccountType(data: ChangeUserAccountTypeDTO): Promise<{
        id: any;
        accountType: import("./dto/user.dto").AccountTypeEnum;
    }>;
    upload(data: {
        image: string;
    }, req: ReqWithUser): Promise<string>;
    uploadImage(data: {
        image: string;
        id: string;
    }): Promise<import("./entity/user.schema").UserDocument>;
    activateUser(data: {
        id: string;
    }): Promise<{
        isActive: boolean;
        id: any;
    }>;
    deleteUser(id: string): Promise<any>;
    blockUser(data: {
        id: string;
    }): Promise<import("./entity/user.schema").UserDocument>;
    seedUser(): Promise<import("./entity/user.schema").UserDocument>;
}
