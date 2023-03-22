import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import type { Habit } from "@prisma/client";
/*export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const Habit = formData.get("habit");
  //console.log("habit", Habit);
  // redirect("/");
  return Habit;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  //const search = new URLSearchParams(url.search);
  //console.log(url);
  const habit = url.searchParams.getAll("habit");
  //console.log(habit);
  return json(habit);
};*/

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

  console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form replace method="post">
        <label htmlFor="Name">Name</label>
        <input name="habit" type="habit" id="habit" required />
        <button type="submit">Add habit</button>
      </Form>
      {data.map((habits) => (
        <li key={habits.id}>
          <p>{habits.habit}.</p>
          <form method="delete" action={`/habits/${habits.id}`}>
            <button type="submit">Delete habit</button>
          </form>
        </li>
      ))}
    </div>
  );
}
