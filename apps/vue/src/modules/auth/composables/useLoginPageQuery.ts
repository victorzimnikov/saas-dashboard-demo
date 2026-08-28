import { firstQueryParam } from "@/utils";
import { computed } from "vue";
import { useRoute } from "vue-router";
import z from "zod";

export const useLoginPageQuery = () => {
  const querySchema = z.object({
    redirect: z.string().optional(),
  });

  const route = useRoute();

  return computed(() =>
    querySchema.parse({
      redirect: firstQueryParam(route.query.redirect),
    }),
  );
};
