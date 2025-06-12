import { useMemo } from "react";
import { StorageKeys, PersistentStorage } from "@/utils";
import { User } from "@/models";

export const useAuth = () => {
  const token = PersistentStorage.getData(StorageKeys.INNOV_TOKEN_KEY, false);
  const account = PersistentStorage.getData(StorageKeys.INNOV_STORAGE_KEY);
  return useMemo<{ account?: User; token: string }>(
    () => ({ account: account?.user, token }),
    [account, token],
  );
};
