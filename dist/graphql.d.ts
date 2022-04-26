export interface AffidavitInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    title?: Nullable<string>;
    religion?: Nullable<string>;
    occupation?: Nullable<string>;
    rel?: Nullable<string>;
    gender?: Nullable<string>;
    applicant?: Nullable<string>;
}
export interface ApplicantInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    gender?: Nullable<string>;
    state_origin?: Nullable<string>;
    state_residence?: Nullable<string>;
    lga?: Nullable<string>;
    address?: Nullable<string>;
    breach_type?: Nullable<string>;
    inPrison?: Nullable<boolean>;
    daysPlus?: Nullable<boolean>;
    monthsPlus?: Nullable<boolean>;
    arrested_on?: Nullable<Date>;
    arrested_at?: Nullable<string>;
    offence_suspected?: Nullable<string>;
    case_mates?: Nullable<number>;
    itinerary?: Nullable<string>;
    station?: Nullable<string>;
    station2?: Nullable<string>;
    station_duration?: Nullable<number>;
    station2_duration?: Nullable<number>;
    state_arrest?: Nullable<string>;
    beaten?: Nullable<string>;
    injured?: Nullable<string>;
    bail_amount?: Nullable<number>;
    detention_cost_explained?: Nullable<string>;
    first_accused?: Nullable<string>;
    offence_charged?: Nullable<string>;
    arraigned_on?: Nullable<Date>;
    state_arraigned?: Nullable<string>;
    adjournment_date?: Nullable<Date>;
    dpp?: Nullable<string>;
    division?: Nullable<string>;
    contact_form?: Nullable<string>;
}
export interface UploadFormInput {
    applicant_id?: Nullable<string>;
    contact_form?: Nullable<string>;
}
export interface ExhibitInput {
    name?: Nullable<string>;
    image?: Nullable<string>;
    applicant_id?: Nullable<string>;
}
export interface RelativeInput {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    phone?: Nullable<string>;
    rel?: Nullable<string>;
    applicant_id?: Nullable<string>;
}
export interface ReportInput {
    _id?: Nullable<string>;
    id?: Nullable<string>;
    title?: Nullable<string>;
    content?: Nullable<string>;
    status?: Nullable<boolean>;
    applicant_id?: Nullable<string>;
}
export interface CampaignInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    video?: Nullable<string>;
    image?: Nullable<string>;
    aim?: Nullable<string>;
    target?: Nullable<string>;
    body?: Nullable<string>;
    slug?: Nullable<string>;
    status?: Nullable<string>;
    author?: Nullable<string>;
    addedFrom?: Nullable<string>;
}
export interface EndorsementInput {
    campaign?: Nullable<string>;
    body?: Nullable<string>;
}
export interface EnvInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    value?: Nullable<string>;
    isPrivate?: Nullable<boolean>;
}
export interface UserInput {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    createdAt?: Nullable<Date>;
    isActive?: Nullable<boolean>;
    name?: Nullable<string>;
}
export interface Affidavit {
    id?: Nullable<string>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    title?: Nullable<string>;
    religion?: Nullable<string>;
    occupation?: Nullable<string>;
    rel?: Nullable<string>;
    gender?: Nullable<string>;
    applicant?: Nullable<Applicant>;
}
export interface IQuery {
    getAffidavits(): Nullable<Nullable<Affidavit>[]> | Promise<Nullable<Nullable<Affidavit>[]>>;
    getAffidavit(id?: Nullable<string>): Nullable<Affidavit> | Promise<Nullable<Affidavit>>;
    getAffidavitByApplicant(applicant_id?: Nullable<string>): Nullable<Affidavit> | Promise<Nullable<Affidavit>>;
    getApplicants(): Nullable<Nullable<Applicant>[]> | Promise<Nullable<Nullable<Applicant>[]>>;
    getApplicant(id?: Nullable<string>): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    getUserApplicants(id?: Nullable<string>): Nullable<Nullable<Applicant>[]> | Promise<Nullable<Nullable<Applicant>[]>>;
    showDraft(id?: Nullable<string>): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    findAllExhibits(applicant_id?: Nullable<string>): Nullable<Nullable<Exhibit>[]> | Promise<Nullable<Nullable<Exhibit>[]>>;
    findOneExhibit(): Nullable<Exhibit> | Promise<Nullable<Exhibit>>;
    getExhibitsByApplicant(applicant_id?: Nullable<string>): Nullable<Nullable<Exhibit>[]> | Promise<Nullable<Nullable<Exhibit>[]>>;
    findAllRelative(applicant_id?: Nullable<string>): Nullable<Nullable<Relative>[]> | Promise<Nullable<Nullable<Relative>[]>>;
    findOneRelative(_id?: Nullable<string>): Nullable<Relative> | Promise<Nullable<Relative>>;
    getRelativesByApplicant(applicant_id?: Nullable<string>): Nullable<Nullable<Relative>[]> | Promise<Nullable<Nullable<Relative>[]>>;
    getReports(): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getReport(_id?: Nullable<string>): Nullable<Report> | Promise<Nullable<Report>>;
    getRepComments(): Nullable<Nullable<RepComment>[]> | Promise<Nullable<Nullable<RepComment>[]>>;
    getRepCommentsByUser(): Nullable<Nullable<RepComment>[]> | Promise<Nullable<Nullable<RepComment>[]>>;
    getReportsByUser(): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getLawyersReport(user_id?: Nullable<string>): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getUserReports(user_id?: Nullable<string>): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getMyReports(): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getSuppervisorReport(): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getReportNoifcations(): Nullable<Nullable<ReportPayload>[]> | Promise<Nullable<Nullable<ReportPayload>[]>>;
    getApplicantsReport(applicant_id?: Nullable<string>): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    getCampaigns(limit?: Nullable<number>): Nullable<Nullable<Campaign>[]> | Promise<Nullable<Nullable<Campaign>[]>>;
    getCampaign(slug?: Nullable<string>): Nullable<Campaign> | Promise<Nullable<Campaign>>;
    myCampaign(): Nullable<Nullable<Campaign>[]> | Promise<Nullable<Nullable<Campaign>[]>>;
    getCampaignNotice(): Nullable<Nullable<CampaignNotice>[]> | Promise<Nullable<Nullable<CampaignNotice>[]>>;
    getActiveCampaigns(): Nullable<Nullable<Campaign>[]> | Promise<Nullable<Nullable<Campaign>[]>>;
    getEndorsementsByCampaign(campaign_id?: Nullable<string>): Nullable<Nullable<Endorsement>[]> | Promise<Nullable<Nullable<Endorsement>[]>>;
    getEndorsements(): Nullable<Nullable<Endorsement>[]> | Promise<Nullable<Nullable<Endorsement>[]>>;
    getEnvs(): Nullable<Nullable<Env>[]> | Promise<Nullable<Nullable<Env>[]>>;
    getEnv(id?: Nullable<string>): Nullable<Env> | Promise<Nullable<Env>>;
    getUsers(search?: Nullable<string>, limit?: Nullable<number>, skip?: Nullable<number>, accountType?: Nullable<string>, role?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getStaffs(search?: Nullable<string>, limit?: Nullable<number>, skip?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    me(token?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    auth(): Nullable<User> | Promise<Nullable<User>>;
    getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getStaff(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getLimitedUsers(limit?: Nullable<number>, skip?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    countUsers(): Nullable<number> | Promise<Nullable<number>>;
    countLawyers(): Nullable<number> | Promise<Nullable<number>>;
    countPaidCases(): Nullable<number> | Promise<Nullable<number>>;
    searchUsers(text?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getLawyers(search?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getTopLawyers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getTopReps(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getMyUsers(search?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    seedUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}
export interface IMutation {
    createAffidavit(input?: Nullable<AffidavitInput>): Nullable<Affidavit> | Promise<Nullable<Affidavit>>;
    deleteAffidavit(id?: Nullable<string>): Nullable<Affidavit> | Promise<Nullable<Affidavit>>;
    updateAffidavit(input?: Nullable<AffidavitInput>): Nullable<Affidavit> | Promise<Nullable<Affidavit>>;
    deleteManyAffidavit(): Nullable<Nullable<Affidavit>[]> | Promise<Nullable<Nullable<Affidavit>[]>>;
    createApplicant(input?: Nullable<ApplicantInput>): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    deleteApplicant(id?: Nullable<string>): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    uploadForm(input?: Nullable<UploadFormInput>): Nullable<Applicant> | Promise<Nullable<Applicant>>;
    createExhibit(input?: Nullable<ExhibitInput>): Nullable<Exhibit> | Promise<Nullable<Exhibit>>;
    deleteExhibit(_id?: Nullable<string>): Nullable<Exhibit> | Promise<Nullable<Exhibit>>;
    deleteAllExhibit(applicant_id?: Nullable<string>): Nullable<Nullable<Exhibit>[]> | Promise<Nullable<Nullable<Exhibit>[]>>;
    updateExhibit(input?: Nullable<ExhibitInput>): Nullable<Exhibit> | Promise<Nullable<Exhibit>>;
    createRelative(input?: Nullable<RelativeInput>): Nullable<Relative> | Promise<Nullable<Relative>>;
    deleteOneRelative(_id?: Nullable<string>): Nullable<Relative> | Promise<Nullable<Relative>>;
    deleteAllRelative(applicant_id?: Nullable<string>): Nullable<Relative> | Promise<Nullable<Relative>>;
    updateRelative(input?: Nullable<RelativeInput>): Nullable<Relative> | Promise<Nullable<Relative>>;
    addReport(input?: Nullable<ReportInput>): Nullable<Report> | Promise<Nullable<Report>>;
    deleteReport(_id?: Nullable<string>): Nullable<Report> | Promise<Nullable<Report>>;
    resolveReport(_id?: Nullable<string>): Nullable<Report> | Promise<Nullable<Report>>;
    addRepComment(report: string, content?: Nullable<string>): Nullable<RepComment> | Promise<Nullable<RepComment>>;
    deleteRepComment(_id?: Nullable<string>): Nullable<RepComment> | Promise<Nullable<RepComment>>;
    addCampaign(input?: Nullable<CampaignInput>): Nullable<Campaign> | Promise<Nullable<Campaign>>;
    deleteCampaign(id?: Nullable<string>): Nullable<Campaign> | Promise<Nullable<Campaign>>;
    updateCampaign(input?: Nullable<CampaignInput>): Nullable<Campaign> | Promise<Nullable<Campaign>>;
    deleteAllCampNotice(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createEndorsement(input?: Nullable<EndorsementInput>): Nullable<Endorsement> | Promise<Nullable<Endorsement>>;
    deleteEndorsement(id?: Nullable<string>): Nullable<Endorsement> | Promise<Nullable<Endorsement>>;
    createEnv(input?: Nullable<EnvInput>): Nullable<Env> | Promise<Nullable<Env>>;
    updateEnv(input?: Nullable<EnvInput>): Nullable<Env> | Promise<Nullable<Env>>;
    deleteEnv(id?: Nullable<string>): Nullable<Env> | Promise<Nullable<Env>>;
    registerWithEmail(input?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
    loginWithEmail(email?: Nullable<string>, password?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    deleteManyUser(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    updateUser(input?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
}
export interface Applicant {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<string>;
    address?: Nullable<string>;
    breach_type?: Nullable<string>;
    inPrison?: Nullable<boolean>;
    daysPlus?: Nullable<boolean>;
    monthsPlus?: Nullable<boolean>;
    arrested_on?: Nullable<string>;
    arrested_at?: Nullable<string>;
    arraigned_at?: Nullable<string>;
    arraigned_on?: Nullable<string>;
    offence_charged?: Nullable<string>;
    offence_suspected?: Nullable<string>;
    case_mates?: Nullable<number>;
    itinerary?: Nullable<string>;
    station?: Nullable<string>;
    station2?: Nullable<string>;
    station_duration?: Nullable<number>;
    station2_duration?: Nullable<number>;
    state_origin?: Nullable<string>;
    state_residence?: Nullable<string>;
    state_arrest?: Nullable<string>;
    state_arraigned?: Nullable<string>;
    adjournment_date?: Nullable<Date>;
    charge_no?: Nullable<string>;
    lga?: Nullable<string>;
    image?: Nullable<string>;
    beaten?: Nullable<string>;
    injured?: Nullable<string>;
    bail_amount?: Nullable<number>;
    dpp?: Nullable<string>;
    detention_cost_explained?: Nullable<string>;
    caseType?: Nullable<string>;
    app_id?: Nullable<string>;
    division?: Nullable<string>;
    rep?: Nullable<User>;
    lawyer?: Nullable<User>;
    affidavit?: Nullable<Affidavit>;
    relative?: Nullable<Nullable<Relative>[]>;
    exhibit?: Nullable<Nullable<Exhibit>[]>;
    first_accused?: Nullable<string>;
    amount_paid?: Nullable<number>;
    print_ready?: Nullable<boolean>;
    contact_form?: Nullable<string>;
    draft?: Nullable<string>;
    updated_by?: Nullable<User>;
    created_by?: Nullable<User>;
    deleted_by?: Nullable<User>;
    user?: Nullable<User>;
    time?: Nullable<Date>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    deletedAt?: Nullable<Date>;
}
export interface Exhibit {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    image?: Nullable<string>;
    applicant_id?: Nullable<Applicant>;
}
export interface Relative {
    id?: Nullable<string>;
    name?: Nullable<string>;
    phone?: Nullable<string>;
    rel?: Nullable<string>;
    applicant_id?: Nullable<Applicant>;
}
export interface Report {
    id?: Nullable<string>;
    title?: Nullable<string>;
    author?: Nullable<User>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    applicant_id?: Nullable<Applicant>;
    comments?: Nullable<Nullable<RepComment>[]>;
    content?: Nullable<string>;
    status?: Nullable<boolean>;
}
export interface RepComment {
    id?: Nullable<string>;
    author?: Nullable<User>;
    title?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    report?: Nullable<Report>;
    content?: Nullable<string>;
}
export interface ReportPayload {
    report?: Nullable<string>;
    time?: Nullable<Date>;
    user?: Nullable<User>;
    action?: Nullable<string>;
    author?: Nullable<string>;
}
export interface ApplicantReport {
    applicant?: Nullable<Applicant>;
    report?: Nullable<Report>;
}
export interface ISubscription {
    reportSubscription(): Nullable<Nullable<ReportPayload>[]> | Promise<Nullable<Nullable<ReportPayload>[]>>;
}
export interface Campaign {
    id?: Nullable<string>;
    title?: Nullable<string>;
    image?: Nullable<string>;
    excerpt?: Nullable<string>;
    aim?: Nullable<string>;
    target?: Nullable<string>;
    body?: Nullable<string>;
    slug?: Nullable<string>;
    status?: Nullable<string>;
    author?: Nullable<User>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    addedFrom?: Nullable<string>;
    endorsements?: Nullable<Nullable<Endorsement>[]>;
    likes?: Nullable<Nullable<string>[]>;
    promoted?: Nullable<boolean>;
    views?: Nullable<Nullable<string>[]>;
    category?: Nullable<string>;
}
export interface View {
    user?: Nullable<string>;
}
export interface CampaignNotice {
    id?: Nullable<string>;
    action?: Nullable<string>;
    author?: Nullable<User>;
    data?: Nullable<Campaign>;
    createdAt?: Nullable<Date>;
    read?: Nullable<boolean>;
}
export interface Endorsement {
    id?: Nullable<string>;
    author?: Nullable<User>;
    campaign?: Nullable<Campaign>;
    body?: Nullable<string>;
    likes?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}
export interface Env {
    id?: Nullable<string>;
    name?: Nullable<string>;
    value?: Nullable<string>;
    isPrivate?: Nullable<boolean>;
}
export interface User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    accountType?: Nullable<string>;
    image?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    otherName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    emailToken?: Nullable<string>;
    emailVerified?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    country?: Nullable<string>;
    state?: Nullable<string>;
    city?: Nullable<string>;
    role?: Nullable<string>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    reps?: Nullable<Nullable<User>[]>;
    suppervisor?: Nullable<User>;
    lastSeen?: Nullable<Date>;
    reportCount?: Nullable<number>;
    applicantCount?: Nullable<number>;
    applicants?: Nullable<Nullable<Applicant>[]>;
    bankName?: Nullable<string>;
    accountNumber?: Nullable<string>;
    accountName?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    myUsers?: Nullable<Nullable<User>[]>;
}
declare type Nullable<T> = T | null;
export {};
