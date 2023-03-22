import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) => {
  const { habitId } = params;

  await db.habit.delete({
    where: {
      id: habitId,
    },
  });

  return redirect("/");
};
