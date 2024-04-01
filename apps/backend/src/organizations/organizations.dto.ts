import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class GetOrganizationsDto {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export class GetOrganizationDetailDto extends GetOrganizationsDto {
  usage: number;
  limit: number;
}

export class CreateOrganizationDto {
  @IsString()
  @MinLength(3)
  name: string;
}

export class CompleteUpdateOrganizationDto extends CreateOrganizationDto {
  @IsNumber()
  start_limit: number;
}

export class UpdateOrganizationDto extends PartialType(CompleteUpdateOrganizationDto) {}

export class InviteUserDto {
  @IsEmail()
  email: string;
}

export class OrganizationMemberDto {
  id: string;
  email: string;
}
export class OrganizationInviteDto {
  id: string;
  email: string;
  expires_at: Date;
}

export class GetOrganizationMembersDto {
  members: OrganizationMemberDto[];
  pending_invites: OrganizationInviteDto[];
}

export class SubscriptionPriceTierDto {
  last_unit: string;
  unit_price_decimal: string | null;
}

export class GetOrganizationSubscriptionDto {
  id: string;
  name: string;
  status: string;
  status_formatted: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  renews_at: Date;
  ends_at?: Date | null;
  is_paused: boolean;
  price_tiers: SubscriptionPriceTierDto[];
}

export class GetOrganizationInvoiceDto {
  id: string;
  status_formatted: string;
  invoice_url?: string | null;
  created_at: Date;
  updated_at: Date;
  total_formatted: string;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  refunded_at?: Date | null;
}
