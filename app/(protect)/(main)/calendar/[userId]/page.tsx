import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { prefetchPostsByUserId } from "@/hooks/posts/usePostsByUserId";
import CalendarComponent from "../_components/CalendarComponent";

export default async function CalendarPage() {
  const session = await auth();
  const queryClient = new QueryClient();
  await prefetchPostsByUserId(session?.user?.id, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CalendarComponent />
    </HydrationBoundary>
  );
}
