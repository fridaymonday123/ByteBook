import { observer } from "mobx-react";
import { PlusIcon } from "outline-icons";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { s } from "@shared/styles";
import { DocumentPermission } from "@shared/types";
import User from "~/models/User";
import UserMembership from "~/models/UserMembership";
import Avatar from "~/components/Avatar";
import { AvatarSize } from "~/components/Avatar/Avatar";
import InputMemberPermissionSelect from "~/components/InputMemberPermissionSelect";
import ListItem from "~/components/List/Item";
import { hover } from "~/styles";
import { EmptySelectValue, Permission } from "~/types";

type Props = {
  user: User;
  membership?: UserMembership | undefined;
  onAdd?: () => void;
  onRemove?: () => void;
  onLeave?: () => void;
  onUpdate?: (permission: DocumentPermission) => void;
};

const MemberListItem = ({
  user,
  membership,
  onRemove,
  onLeave,
  onUpdate,
}: Props) => {
  const { t } = useTranslation();

  const handleChange = React.useCallback(
    (permission: DocumentPermission | typeof EmptySelectValue) => {
      if (permission === EmptySelectValue) {
        onRemove?.();
      } else {
        onUpdate?.(permission);
      }
    },
    [onRemove, onUpdate]
  );

  const permissions: Permission[] = [
    {
      label: t("View only"),
      value: DocumentPermission.Read,
    },
    {
      label: t("Can edit"),
      value: DocumentPermission.ReadWrite,
    },
    {
      label: t("No access"),
      value: EmptySelectValue,
    },
  ];

  const currentPermission = permissions.find(
    (p) => p.value === membership?.permission
  );
  if (!currentPermission) {
    return null;
  }
  const disabled = !onUpdate && !onLeave;
  const MaybeLink = membership?.source ? StyledLink : React.Fragment;

  return (
    <StyledListItem
      title={user.name}
      image={
        <Avatar model={user} size={AvatarSize.Medium} showBorder={false} />
      }
      subtitle={
        membership?.sourceId ? (
          <Trans>
            Has access through{" "}
            <MaybeLink
              // @ts-expect-error to prop does not exist on React.Fragment
              to={membership.source?.document?.path ?? ""}
            >
              parent
            </MaybeLink>
          </Trans>
        ) : user.isSuspended ? (
          t("Suspended")
        ) : user.email ? (
          user.email
        ) : user.isInvited ? (
          t("Invited")
        ) : user.isViewer ? (
          t("Viewer")
        ) : (
          t("Editor")
        )
      }
      actions={
        disabled ? null : (
          <div style={{ marginRight: -8 }}>
            <InputMemberPermissionSelect
              permissions={
                onLeave
                  ? [
                      currentPermission,
                      {
                        label: `${t("Leave")}…`,
                        value: EmptySelectValue,
                      },
                    ]
                  : permissions
              }
              value={membership?.permission}
              onChange={handleChange}
            />
          </div>
        )
      }
    />
  );
};

export const InviteIcon = styled(PlusIcon)`
  opacity: 0;
`;

export const StyledListItem = styled(ListItem).attrs({
  small: true,
  border: false,
})`
  margin: 0 -16px;
  padding: 6px 16px;
  border-radius: 8px;

  &: ${hover} ${InviteIcon} {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  color: ${s("textTertiary")};
  text-decoration: underline;
`;

export default observer(MemberListItem);
