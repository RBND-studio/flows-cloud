import { ConnectedAccounts } from "app/(dashboard)/user/[userId]/settings/connected-accounts";
import { DeleteAccountDialog } from "app/(dashboard)/user/[userId]/settings/delete-account-dialog";
import { OrganizationsList } from "app/(dashboard)/user/[userId]/settings/organizations-list";
import { PasswordChangeForm } from "app/(dashboard)/user/[userId]/settings/password-change-form";
import React from "react";

export default function PersonalSettingsPage(): JSX.Element {
  return (
    <div>
      <PasswordChangeForm />
      <ConnectedAccounts />
      <OrganizationsList />
      <DeleteAccountDialog />
    </div>
  );
}
