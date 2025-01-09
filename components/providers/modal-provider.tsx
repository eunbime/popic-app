"use client";

import { useEffect, useState } from "react";
import PostUploadModal from "../modals/post-upload-modal";
import PostViewModal from "../modals/post-view-modal";
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
    </>
  );
}
