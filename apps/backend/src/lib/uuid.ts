import { Param, ParseUUIDPipe, Query } from "@nestjs/common";

export const UUIDParam = (name: string): ParameterDecorator =>
  Param(name, new ParseUUIDPipe({ version: "4" }));

export const UUIDQuery = (name: string, optional = false): ParameterDecorator =>
  Query(name, new ParseUUIDPipe({ version: "4", optional }));
