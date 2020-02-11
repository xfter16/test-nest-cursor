import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {sanitize} from 'class-sanitizer';
import * as _ from 'lodash';
import * as util from 'util';
import {ValidationError} from '../errors/validation.error';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, this.prepareObjectForValidation(value), {
            targetMaps: []
        });

        // TODO class sanitizer do not working ok with arrays, temp fix

        const objWithoutArrays = _.pickBy(object, (val) => !util.isArray(val));

        sanitize(objWithoutArrays);

        Object.assign(object, objWithoutArrays);

        const errors = await validate(
            object,
            {skipMissingProperties: true, forbidUnknownValues: true}
        );
        if (errors.length > 0) {
            throw new ValidationError(errors);
        }
        return object;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }

    private prepareObjectForValidation(obj: any): any {
        if (util.isNull(obj)) {
            return obj;
        }

        if (obj instanceof Date) {
            return obj.toISOString();
        }

        if (util.isArray(obj)) {
            return obj;
        }

        if (typeof obj !== 'object') {
            return obj.toString();
        }

        return _.mapValues(obj, (prop) => this.prepareObjectForValidation(prop));
    }
}
