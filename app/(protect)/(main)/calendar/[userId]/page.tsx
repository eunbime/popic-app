import { auth } from "@/lib/auth";
import CalendarComponent from "../_components/CalendarComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPostsByUserId } from "@/api/posts";

export default async function CalendarPage() {
  const session = await auth();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", session?.user?.id],
    queryFn: () => getPostsByUserId(session?.user?.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CalendarComponent />
    </HydrationBoundary>
  );
}
