"use client";

import { useEffect, useState } from "react";
import PostUploadModal from "@/components/modals/post-upload-modal";
import PostViewModal from "@/components/modals/post-view-modal";
import ConfirmModal from "../modals/confirm-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <PostUploadModal />
      <PostViewModal />
      <ConfirmModal />
    </>
  );
}
