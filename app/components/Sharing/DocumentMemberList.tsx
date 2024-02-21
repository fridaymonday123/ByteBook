import { t } from "i18next";
import orderBy from "lodash/orderBy";
import { observer } from "mobx-react";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "sonner";
import { Pagination } from "@shared/constants";
import Document from "~/models/Document";
import UserMembership from "~/models/UserMembership";
import LoadingIndicator from "~/components/LoadingIndicator";
import useCurrentUser from "~/hooks/useCurrentUser";
import usePolicy from "~/hooks/usePolicy";
import useRequest from "~/hooks/useRequest";
import useStores from "~/hooks/useStores";
import { homePath } from "~/utils/routeHelpers";
import MemberListItem from "./MemberListItem";

type Props = {
  /** Document to which team members are supposed to be invited */
  document: Document;
  /** Children to be rendered before the list of members */
  children?: React.ReactNode;
  /** List of users that have been invited to the document during the current editing session */
  invitedInSession: string[];
};

function DocumentMembersList({ document, invitedInSession }: Props) {
  const { users, userMemberships } = useStores();
  const user = useCurrentUser();
  const history = useHistory();
  const can = usePolicy(document);

  const { loading: loadingTeamMembers, request: fetchTeamMembers } = useRequest(
    React.useCallback(
      () => users.fetchPage({ limit: Pagination.defaultLimit }),
      [users]
    )
  );

  const { loading: loadingDocumentMembers, request: fetchDocumentMembers } =
    useRequest(
      React.useCallback(
        () =>
          userMemberships.fetchDocumentMemberships({
            id: document.id,
            limit: Pagination.defaultLimit,
          }),
        [userMemberships, document.id]
      )
    );

  React.useEffect(() => {
    void fetchTeamMembers();
    void fetchDocumentMembers();
  }, [fetchTeamMembers, fetchDocumentMembers]);

  const handleRemoveUser = React.useCallback(
    async (item) => {
      try {
        await userMemberships.delete({
          documentId: document.id,
          userId: item.id,
        } as UserMembership);

        if (item.id === user.id) {
          history.push(homePath());
        } else {
          toast.success(
            t(`{{ userName }} was removed from the document`, {
              userName: item.name,
            })
          );
        }
      } catch (err) {
        toast.error(t("Could not remove user"));
      }
    },
    [history, userMemberships, user, document]
  );

  const handleUpdateUser = React.useCallback(
    async (user, permission) => {
      try {
        await userMemberships.create({
          documentId: document.id,
          userId: user.id,
          permission,
        });
        toast.success(
          t(`Permissions for {{ userName }} updated`, {
            userName: user.name,
          })
        );
      } catch (err) {
        toast.error(t("Could not update user"));
      }
    },
    [userMemberships, document]
  );

  // Order newly added users first during the current editing session, on reload members are
  // ordered by name
  const members = React.useMemo(
    () =>
      orderBy(
        document.members,
        (user) =>
          (invitedInSession.includes(user.id) ? "_" : "") +
          user.name.toLocaleLowerCase(),
        "asc"
      ),
    [document.members, invitedInSession]
  );

  if (loadingTeamMembers || loadingDocumentMembers) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {members.map((item) => (
        <MemberListItem
          key={item.id}
          user={item}
          membership={item.getMembership(document)}
          onRemove={() => handleRemoveUser(item)}
          onUpdate={
            can.manageUsers
              ? (permission) => handleUpdateUser(item, permission)
              : undefined
          }
          onLeave={
            item.id === user.id ? () => handleRemoveUser(item) : undefined
          }
        />
      ))}
    </>
  );
}

export default observer(DocumentMembersList);
