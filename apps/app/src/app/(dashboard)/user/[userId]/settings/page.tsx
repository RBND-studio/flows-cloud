import { ConnectedAccounts } from "./connected-accounts";
import { OrganizationsList } from "./organizations-list";
import PersonalSettingsHeader from "./personal-settings-header";

export default function PersonalSettingsPage(): JSX.Element {
  return (
    <>
      <PersonalSettingsHeader />
      <ConnectedAccounts />
      <OrganizationsList />
    </>
  );
}
