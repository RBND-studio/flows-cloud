import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { monthDayYear } from "lib/date";
import { load } from "lib/load";
import { Text } from "ui";

type Props = {
  organizationId: string;
};

//TODO: sort invoices by newest first
export const OrganizationInvoices = async (props: Props): Promise<JSX.Element> => {
  const invoices = await load(api["/organizations/:organizationId/invoices"](props.organizationId));

  return (
    <Flex
      alignItems="flex-start"
      cardWrap="-"
      flexDirection="column"
      padding="space16"
      mb="space16"
    >
      <Flex flexDirection="column" mb="space16">
        <Text variant="titleL">Invoices</Text>
      </Flex>
      {!invoices.length ? <Text color="subtle">No invoices</Text> : null}
      {invoices.map((invoice) => (
        <Flex
          py="space4"
          key={invoice.id}
          gap="space24"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            className={css({
              minWidth: "100px",
            })}
          >
            {monthDayYear(invoice.created_at)}
          </Text>
          <Text
            className={css({
              minWidth: "100px",
            })}
          >
            {invoice.status_formatted}
          </Text>
          <Text
            className={css({
              minWidth: "100px",
            })}
          >
            {invoice.total_formatted}
          </Text>
          {invoice.invoice_url ? (
            <a
              className={css({
                color: "text.primary",
                textDecoration: "underline",
                textStyle: "bodyS",
              })}
              href={invoice.invoice_url}
              target="_blank"
              rel="noopener"
            >
              Download
            </a>
          ) : null}
        </Flex>
      ))}
    </Flex>
  );
};
