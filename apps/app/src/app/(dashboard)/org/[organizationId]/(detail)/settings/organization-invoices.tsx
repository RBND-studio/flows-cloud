import { Box } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { formatDate } from "lib/date";
import { load } from "lib/load";
import { Text } from "ui";

type Props = {
  organizationId: string;
};

export const OrganizationInvoices = async (props: Props): Promise<JSX.Element> => {
  const invoices = await load(api["/organizations/:organizationId/invoices"](props.organizationId));

  return (
    <Box cardWrap="-" p="space16">
      <Text>Invoices</Text>
      {!invoices.length ? <Text>No invoices</Text> : null}
      {invoices.map((invoice) => (
        <Box key={invoice.id}>
          <Text>{formatDate(invoice.created_at)}</Text>
        </Box>
      ))}
    </Box>
  );
};
