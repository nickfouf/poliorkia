import { Class, JsonValue } from "type-fest";
type CustomType = {
    klass: Class;
    typeName: string;
    serializer: (data: any) => JsonValue;
    deserializer: (data: JsonValue) => any;
};
export declare const CUSTOM_TYPES: Array<CustomType>;
export declare function registerCustomType<T>(klass: Class<T>, typeName: string, serializer: (value: T) => JsonValue, deserializer: (data: any) => T): void;
export declare function serialize(data: any): any;
export declare function deserialize(data: JsonValue): any;
export {};
