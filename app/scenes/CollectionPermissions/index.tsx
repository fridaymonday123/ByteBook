import invariant from "invariant";
import { observer } from "mobx-react";
import { PlusIcon } from "outline-icons";
import * as React from "react";
import { useTranslation, Trans } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { CollectionPermission } from "@shared/types";
import Group from "~/models/Group";
import User from "~/models/User";
import Button from "~/components/Button";
import Divider from "~/components/Divider";
import Flex from "~/components/Flex";
import InputSelectPermission from "~/components/InputSelectPermission";
import Labeled from "~/components/Labeled";
import Modal from "~/components/Modal";
import PaginatedList from "~/components/PaginatedList";
import Switch from "~/components/Switch";
import Text from "~/components/Text";
import useBoolean from "~/hooks/useBoolean";
import useCurrentUser from "~/hooks/useCurrentUser";
import useStores from "~/hooks/useStores";
import AddGroupsToCollection from "./AddGroupsToCollection";
import AddPeopleToCollection from "./AddPeopleToCollection";
import CollectionGroupMemberListItem from "./components/CollectionGroupMemberListItem";
import MemberListItem from "./components/MemberListItem";

type Props = {
  collectionId: string;
};

function CollectionPermissions({ collectionId }: Props) {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const {
    collections,
    memberships,
    collectionGroupMemberships,
    users,
    groups,
    auth,
  } = useStores();
  const collection = collections.get(collectionId);
  invariant(collection, "Collection not found");

  const [addGroupModalOpen, handleAddGroupModalOpen, handleAddGroupModalClose] =
    useBoolean();

  const [
    addMemberModalOpen,
    handleAddMemberModalOpen,
    handleAddMemberModalClose,
  ] = useBoolean();

  const handleRemoveUser = React.useCallback(
    async (user) => {
      try {
        await memberships.delete({
          collectionId: collection.id,
          userId: user.id,
        });
        toast.success(
          t(`{{ userName }} was removed from the collection`, {
            userName: user.name,
          })
        );
      } catch (err) {
        toast.error(t("Could not remove user"));
      }
    },
    [memberships, collection, t]
  );

  const handleUpdateUser = React.useCallback(
    async (user, permission) => {
      try {
        await memberships.create({
          collectionId: collection.id,
          userId: user.id,
          permission,
        });
        toast.success(
          t(`{{ userName }} permissions were updated`, {
            userName: user.name,
          })
        );
      } catch (err) {
        toast.error(t("Could not update user"));
      }
    },
    [memberships, collection, t]
  );

  const handleRemoveGroup = React.useCallback(
    async (group) => {
      try {
        await collectionGroupMemberships.delete({
          collectionId: collection.id,
          groupId: group.id,
        });
        toast.success(
          t(`The {{ groupName }} group was removed from the collection`, {
            groupName: group.name,
          })
        );
      } catch (err) {
        toast.error(t("Could not remove group"));
      }
    },
    [collectionGroupMemberships, collection, t]
  );

  const handleUpdateGroup = React.useCallback(
    async (group, permission) => {
      try {
        await collectionGroupMemberships.create({
          collectionId: collection.id,
          groupId: group.id,
          permission,
        });
        toast.success(
          t(`{{ groupName }} permissions were updated`, {
            groupName: group.name,
          })
        );
      } catch (err) {
        toast.error(t("Could not update user"));
      }
    },
    [collectionGroupMemberships, collection, t]
  );

  const handleChangePermission = React.useCallback(
    async (permission: CollectionPermission) => {
      try {
        await collection.save({
          permission,
        });
        toast.success(t("Default access permissions were updated"));
      } catch (err) {
        toast.error(t("Could not update permissions"));
      }
    },
    [collection, t]
  );

  const fetchOptions = React.useMemo(
    () => ({
      id: collection.id,
    }),
    [collection.id]
  );

  const handleSharingChange = React.useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      try {
        await collection.save({
          sharing: ev.target.checked,
        });
        toast.success(t("Public document sharing permissions were updated"));
      } catch (err) {
        toast.error(t("Could not update public document sharing"));
      }
    },
    [collection, t]
  );

  const collectionName = collection.name;
  const collectionGroups = groups.inCollection(collection.id);
  const collectionUsers = users.inCollection(collection.id);
  const isEmpty = !collectionGroups.length && !collectionUsers.length;
  const sharing = collection.sharing;
  const teamSharingEnabled = !!auth.team && auth.team.sharing;

  return (
    <Flex column>
      <InputSelectPermission
        onChange={handleChangePermission}
        value={collection.permission || ""}
      />
      <PermissionExplainer size="small">
        {collection.isPrivate && (
          <Trans
            defaults="The <em>{{ collectionName }}</em> collection is private. Workspace members have no access to it by default."
            values={{
              collectionName,
            }}
            components={{
              em: <strong />,
            }}
          />
        )}
        {collection.permission === CollectionPermission.ReadWrite && (
          <Trans
            defaults="Workspace members can view and edit documents in the <em>{{ collectionName }}</em> collection by default."
            values={{
              collectionName,
            }}
            components={{
              em: <strong />,
            }}
          />
        )}
        {collection.permission === CollectionPermission.Read && (
          <Trans
            defaults="Workspace members can view documents in the <em>{{ collectionName }}</em> collection by
          default."
            values={{
              collectionName,
            }}
            components={{
              em: <strong />,
            }}
          />
        )}
      </PermissionExplainer>
      <Switch
        id="sharing"
        label={t("Public document sharing")}
        onChange={handleSharingChange}
        checked={sharing && teamSharingEnabled}
        disabled={!teamSharingEnabled}
        note={
          teamSharingEnabled ? (
            <Trans>
              When enabled, documents can be shared publicly on the internet.
            </Trans>
          ) : (
            <Trans>
              Public sharing is currently disabled in the workspace security
              settings.
            </Trans>
          )
        }
      />
      <Labeled label={t("Additional access")}>
        <Actions gap={8}>
          <Button
            type="button"
            onClick={handleAddGroupModalOpen}
            icon={<PlusIcon />}
            neutral
          >
            {t("Add groups")}
          </Button>
          <Button
            type="button"
            onClick={handleAddMemberModalOpen}
            icon={<PlusIcon />}
            neutral
          >
            {t("Add people")}
          </Button>
        </Actions>
      </Labeled>
      <Divider />
      {isEmpty && (
        <Empty>
          <Trans>Add additional access for individual members and groups</Trans>
        </Empty>
      )}
      <PaginatedList
        items={collectionGroups}
        fetch={collectionGroupMemberships.fetchPage}
        options={fetchOptions}
        renderItem={(group: Group) => (
          <CollectionGroupMemberListItem
            key={group.id}
            group={group}
            collectionGroupMembership={collectionGroupMemberships.find({
              collectionId: collection.id,
              groupId: group.id,
            })}
            onRemove={() => handleRemoveGroup(group)}
            onUpdate={(permission) => handleUpdateGroup(group, permission)}
          />
        )}
      />
      {collectionGroups.length ? <Divider /> : null}
      <PaginatedList
        key={`collection-users-${collection.permission || "none"}`}
        items={collectionUsers}
        fetch={memberships.fetchPage}
        options={fetchOptions}
        renderItem={(item: User) => (
          <MemberListItem
            key={item.id}
            user={item}
            membership={memberships.find({
              collectionId: collection.id,
              userId: item.id,
            })}
            canEdit={item.id !== user.id || user.isAdmin}
            onRemove={() => handleRemoveUser(item)}
            onUpdate={(permission) => handleUpdateUser(item, permission)}
          />
        )}
      />
      <Modal
        title={t(`Add groups to {{ collectionName }}`, {
          collectionName: collection.name,
        })}
        onRequestClose={handleAddGroupModalClose}
        isOpen={addGroupModalOpen}
      >
        <AddGroupsToCollection collection={collection} />
      </Modal>
      <Modal
        title={t(`Add people to {{ collectionName }}`, {
          collectionName: collection.name,
        })}
        onRequestClose={handleAddMemberModalClose}
        isOpen={addMemberModalOpen}
      >
        <AddPeopleToCollection collection={collection} />
      </Modal>
    </Flex>
  );
}

const Empty = styled(Text)`
  margin-top: 8px;
`;

const PermissionExplainer = styled(Text)`
  margin-top: -8px;
  margin-bottom: 24px;
`;

const Actions = styled(Flex)`
  margin-bottom: 12px;
`;

export default observer(CollectionPermissions);
