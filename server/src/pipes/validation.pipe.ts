import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidatorException } from "../exception/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);

    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map((error) => ({
        [error.property]: Object.values(error.constraints).join(", "),
      }));
      throw new ValidatorException(messages);
    }
    return value;
  }
}
