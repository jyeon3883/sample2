"use client";

import { useState } from "react";
import { useTabState } from "@repo/ui/layout/mdi";
import { routes } from "@/shared/config/routes";
import {
  INITIAL_USER_MANAGE_STATE,
  type User,
  type UserManageState,
  type UserRole,
} from "./types";

export interface UseUserManageReturn {
  filteredUsers: User[];
  search: string;
  roleFilter: string;
  dialogOpen: boolean;
  editTarget: User | null;
  setSearch: (value: string) => void;
  setRoleFilter: (value: string) => void;
  handleEditOpen: (user: User) => void;
  handleEditSave: () => void;
  handleEditClose: () => void;
  handleEditTargetChange: (patch: Partial<User>) => void;
  handleToggleStatus: (id: number) => void;
}

/**
 * 사용자 관리 상태 훅.
 * 검색/필터/목록은 useTabState로 탭 전환 후에도 유지됩니다.
 */
export function useUserManage(): UseUserManageReturn {
  const [state, setState] = useTabState<UserManageState>(
    routes.users,
    INITIAL_USER_MANAGE_STATE,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);

  const filteredUsers = state.users.filter((user) => {
    const matchSearch = user.name.includes(state.search) || user.email.includes(state.search);
    const matchRole = state.roleFilter === "all" || user.role === state.roleFilter;
    return matchSearch && matchRole;
  });

  const setSearch = (search: string) => setState((prev) => ({ ...prev, search }));

  const setRoleFilter = (roleFilter: string) =>
    setState((prev) => ({ ...prev, roleFilter }));

  const handleEditOpen = (user: User) => {
    setEditTarget({ ...user });
    setDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!editTarget) return;
    setState((prev) => ({
      ...prev,
      users: prev.users.map((user) => (user.id === editTarget.id ? editTarget : user)),
    }));
    setDialogOpen(false);
    setEditTarget(null);
  };

  const handleEditClose = () => {
    setDialogOpen(false);
    setEditTarget(null);
  };

  const handleEditTargetChange = (patch: Partial<User>) => {
    setEditTarget((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const handleToggleStatus = (id: number) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user,
      ),
    }));
  };

  return {
    filteredUsers,
    search: state.search,
    roleFilter: state.roleFilter,
    dialogOpen,
    editTarget,
    setSearch,
    setRoleFilter,
    handleEditOpen,
    handleEditSave,
    handleEditClose,
    handleEditTargetChange,
    handleToggleStatus,
  };
}

export type { User, UserRole };
