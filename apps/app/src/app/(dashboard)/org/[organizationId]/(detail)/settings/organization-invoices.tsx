import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { monthDayYear } from "lib/date";
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
          <Text>Created: {monthDayYear(invoice.created_at)}</Text>
          <Text>Status: {invoice.status_formatted}</Text>
          <Text>Total: {invoice.total_formatted}</Text>
          {invoice.invoice_url ? (
            <a
              className={css({ color: "text.primary", textDecoration: "underline" })}
              href={invoice.invoice_url}
              target="_blank"
              rel="noopener"
            >
              Download
            </a>
          ) : null}
        </Box>
      ))}
    </Box>
  );
};
