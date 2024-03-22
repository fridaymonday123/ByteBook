import copy from "copy-to-clipboard";
import { CopyIcon, ToolsIcon, TrashIcon, UserIcon } from "outline-icons";
import * as React from "react";
import { toast } from "sonner";
import { createAction } from "~/actions";
import { DeveloperSection } from "~/actions/sections";
import env from "~/env";
import { client } from "~/utils/ApiClient";
import Logger from "~/utils/Logger";
import { deleteAllDatabases } from "~/utils/developer";

export const copyId = createAction({
  name: ({ t }) => t("Copy ID"),
  icon: <CopyIcon />,
  keywords: "uuid",
  section: DeveloperSection,
  children: ({
    currentTeamId,
    currentUserId,
    activeCollectionId,
    activeDocumentId,
  }) => {
    function copyAndToast(text: string | null | undefined) {
      if (text) {
        copy(text);
        toast.success("Copied to clipboard");
      }
    }

    return [
      createAction({
        name: "Copy User ID",
        section: DeveloperSection,
        icon: <CopyIcon />,
        visible: () => !!currentUserId,
        perform: () => copyAndToast(currentUserId),
      }),
      createAction({
        name: "Copy Team ID",
        section: DeveloperSection,
        icon: <CopyIcon />,
        visible: () => !!currentTeamId,
        perform: () => copyAndToast(currentTeamId),
      }),
      createAction({
        name: "Copy Collection ID",
        icon: <CopyIcon />,
        section: DeveloperSection,
        visible: () => !!activeCollectionId,
        perform: () => copyAndToast(activeCollectionId),
      }),
      createAction({
        name: "Copy Document ID",
        icon: <CopyIcon />,
        section: DeveloperSection,
        visible: () => !!activeDocumentId,
        perform: () => copyAndToast(activeDocumentId),
      }),
      createAction({
        name: "Copy Team ID",
        icon: <CopyIcon />,
        section: DeveloperSection,
        visible: () => !!currentTeamId,
        perform: () => copyAndToast(currentTeamId),
      }),
      createAction({
        name: "Copy Release ID",
        icon: <CopyIcon />,
        section: DeveloperSection,
        visible: () => !!env.RELEASE,
        perform: () => copyAndToast(env.RELEASE),
      }),
    ];
  },
});

export const clearIndexedDB = createAction({
  name: ({ t }) => t("Delete IndexedDB cache"),
  icon: <TrashIcon />,
  keywords: "cache clear database",
  section: DeveloperSection,
  perform: async ({ t }) => {
    await deleteAllDatabases();
    toast.message(t("IndexedDB cache deleted"));
  },
});

export const createTestUsers = createAction({
  name: "Create 10 test users",
  icon: <UserIcon />,
  section: DeveloperSection,
  visible: () => env.ENVIRONMENT === "development",
  perform: async () => {
    const count = 10;
    await client.post("/developer.create_test_users", { count });
    toast.message(`${count} test users created`);
  },
});

export const createToast = createAction({
  name: "Create toast",
  section: DeveloperSection,
  visible: () => env.ENVIRONMENT === "development",
  perform: async () => {
    toast.message("Hello world", {
      duration: 30000,
    });
  },
});

export const toggleDebugLogging = createAction({
  name: ({ t }) => t("Toggle debug logging"),
  icon: <ToolsIcon />,
  section: DeveloperSection,
  perform: async ({ t }) => {
    Logger.debugLoggingEnabled = !Logger.debugLoggingEnabled;
    toast.message(
      Logger.debugLoggingEnabled
        ? t("Debug logging enabled")
        : t("Debug logging disabled")
    );
  },
});

export const developer = createAction({
  name: ({ t }) => t("Development"),
  keywords: "debug",
  icon: <ToolsIcon />,
  iconInContextMenu: false,
  section: DeveloperSection,
  children: [
    copyId,
    clearIndexedDB,
    toggleDebugLogging,
    createToast,
    createTestUsers,
  ],
});

export const rootDeveloperActions = [developer];
