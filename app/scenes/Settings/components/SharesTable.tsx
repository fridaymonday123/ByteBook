import { observer } from "mobx-react";
import { CheckmarkIcon } from "outline-icons";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import Share from "~/models/Share";
import Avatar from "~/components/Avatar";
import Flex from "~/components/Flex";
import TableFromParams from "~/components/TableFromParams";
import Time from "~/components/Time";
import Tooltip from "~/components/Tooltip";
import ShareMenu from "~/menus/ShareMenu";

type Props = Omit<React.ComponentProps<typeof TableFromParams>, "columns"> & {
  data: Share[];
  canManage: boolean;
};

function SharesTable({ canManage, data, ...rest }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const hasDomain = data.some((share) => share.domain);

  const columns = React.useMemo(
    () =>
      [
        {
          id: "documentTitle",
          Header: t("Document"),
          accessor: "documentTitle",
          disableSortBy: true,
          Cell: observer(({ value }: { value: string }) => <>{value}</>),
        },
        {
          id: "who",
          Header: t("Shared by"),
          accessor: "createdById",
          disableSortBy: true,
          Cell: observer(
            ({ row }: { value: string; row: { original: Share } }) => (
              <Flex align="center" gap={4}>
                {row.original.createdBy && (
                  <Avatar model={row.original.createdBy} />
                )}
                {row.original.createdBy.name}
              </Flex>
            )
          ),
        },
        {
          id: "createdAt",
          Header: t("Date shared"),
          accessor: "createdAt",
          Cell: observer(({ value }: { value: string }) =>
            value ? <Time dateTime={value} addSuffix /> : null
          ),
        },
        {
          id: "lastAccessedAt",
          Header: t("Last accessed"),
          accessor: "lastAccessedAt",
          Cell: observer(({ value }: { value: string }) =>
            value ? <Time dateTime={value} addSuffix /> : null
          ),
        },
        {
          id: "includeChildDocuments",
          Header: t("Shared nested"),
          accessor: "includeChildDocuments",
          Cell: observer(({ value }: { value: string }) =>
            value ? (
              <Flex align="center">
                <Tooltip content={t("Nested documents are publicly available")}>
                  <CheckmarkIcon color={theme.accent} />
                </Tooltip>
              </Flex>
            ) : null
          ),
        },
        hasDomain
          ? {
              id: "domain",
              Header: t("Domain"),
              accessor: "domain",
              disableSortBy: true,
            }
          : undefined,
        {
          id: "views",
          Header: t("Views"),
          accessor: "views",
        },
        canManage
          ? {
              Header: " ",
              accessor: "id",
              className: "actions",
              disableSortBy: true,
              Cell: observer(
                ({ row }: { value: string; row: { original: Share } }) => (
                  <Flex align="center">
                    <ShareMenu share={row.original} />
                  </Flex>
                )
              ),
            }
          : undefined,
      ].filter((i) => i),
    [t, theme.accent, hasDomain, canManage]
  );

  return <TableFromParams columns={columns} data={data} {...rest} />;
}

export default SharesTable;
