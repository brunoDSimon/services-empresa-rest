import { ValueTransformer } from "typeorm";

export class ReplaceString implements ValueTransformer{
    to(value: string) {
        return value;
    }
    from(value: any) {
        return value?.replace(/[^\d]+/g,'')
    }
}
