import { Param, ParseUUIDPipe, Query } from "@nestjs/common";

export const UUIDParam = (name: string): ParameterDecorator =>
  Param(name, new ParseUUIDPipe({ version: "4" }));

export const UUIDQuery = (name: string): ParameterDecorator =>
  Query(name, new ParseUUIDPipe({ version: "4" }));

export const isUUID = async (value: string): Promise<boolean> => {
  try {
    await new ParseUUIDPipe({ version: "4" }).transform(value, { type: "custom" });
    return true;
  } catch {
    return false;
  }
};
