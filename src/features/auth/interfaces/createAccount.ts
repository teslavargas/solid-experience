import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';

export interface CreateAccountApi
{
    message: string;
}

export type CreateAccountResponse = IBodyApi & {
    data: CreateAccountApi;
};

export type RegisterPayload =
{
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    country: string;
    password: string;
    passwordConfirmation: string;
};
