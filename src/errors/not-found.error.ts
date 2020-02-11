import {HttpStatus} from '@nestjs/common';
import { CommonError } from './common.error';

export class NotFoundError extends CommonError {
    public static readonly CODE_DEFAULT: string = 'NOT_FOUND';

    public status: number = HttpStatus.NOT_FOUND;

    constructor(validationDetails: any) {
        super(
            null,
            NotFoundError.CODE_DEFAULT,
            null,
            validationDetails
        );
    }
}