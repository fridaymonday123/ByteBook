import { NotificationSettings, UserPreferences } from "@shared/types";
import env from "@server/env";
import { User } from "@server/models";

type Options = {
  includeDetails?: boolean;
};

type UserPresentation = {
  id: string;
  name: string;
  avatarUrl: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date | null;
  color: string;
  isAdmin: boolean;
  isSuspended: boolean;
  isViewer: boolean;
  email?: string | null;
  language?: string;
  preferences?: UserPreferences | null;
  notificationSettings?: NotificationSettings;
};

export default function presentUser(
  user: User,
  options: Options = {}
): UserPresentation {
  const userData: UserPresentation = {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    color: user.color,
    isAdmin: user.isAdmin,
    isSuspended: user.isSuspended,
    isViewer: user.isViewer,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastActiveAt: user.lastActiveAt,
  };

  if (options.includeDetails) {
    userData.email = user.email;
    userData.language = user.language || env.DEFAULT_LANGUAGE;
    userData.preferences = user.preferences;
    userData.notificationSettings = user.notificationSettings;
  }

  return userData;
}
