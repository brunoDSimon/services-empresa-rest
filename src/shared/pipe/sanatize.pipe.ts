import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if (typeof value === 'string') {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, ''); // Remove caracteres especiais
      return sanitizedValue;
    }

    if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(key => {
        if (typeof value[key] === 'string') {
          value[key] = value[key].replace(/[^a-zA-Z0-9 ]/g, '');
        }
      });
    }

    return value;
  }
}
