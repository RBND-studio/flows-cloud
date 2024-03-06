import { ConnectedAccounts } from "app/(dashboard)/user/[userId]/settings/connected-accounts";
import { OrganizationsList } from "app/(dashboard)/user/[userId]/settings/organizations-list";
import { PasswordChangeForm } from "app/(dashboard)/user/[userId]/settings/password-change-form";
import React from "react";

export default function PersonalSettingsPage(): JSX.Element {
  return (
    <div>
      <PasswordChangeForm />
      <ConnectedAccounts />
      <OrganizationsList />
    </div>
  );
}
