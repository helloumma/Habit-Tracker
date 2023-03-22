import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { db } from "~/utils/db.server";
import type { Habit } from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const habit = data.get("habit");
  const id = data.get("id");

  if (typeof habit !== "string") throw Error("Please enter a habit");
  if (typeof id !== "string") throw Error("Please enter valid id");

  const item = await db.habit.create({
    data: {
      id: id,
      habit: habit,
    },
  });

  return json(item);
};

export const loader: LoaderFunction = async () => {
  const items = await db.habit.findMany();

  return json(items);
};

export default function Index() {
  const data = useLoaderData<Habit[]>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form replace method="post">
        <label htmlFor="Name">Name</label>
        <input
          name="habit"
          type="habit"
          id="habit"
          className="rounded-md border shadow-sm bg-white px-2 py-1"
          required
        />
        <button
          type="submit"
          className="rounded-md border border-blue-500 bg-blue-500 text-white px-2 py-1"
        >
          Add habit
        </button>
      </Form>
      {data.map((habits) => (
        <li key={habits.id}>
          <p>{habits.habit}.</p>
          <form method="delete" action={`/habits/${habits.id}`}>
            <button
              type="submit"
              className="rounded-md border border-red-500 bg-red-500 text-white px-1 py-1"
            >
              Delete habit
            </button>
          </form>
        </li>
      ))}
    </div>
  );
}
