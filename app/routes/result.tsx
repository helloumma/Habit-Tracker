import { Form, useLoaderData } from "@remix-run/react";
import { useState, ChangeEvent, MouseEvent } from "react";

export async function loader() {
  return [
    {
      id: 1,
      firstName: "Umma",
      lastName: "Gohil",
    },
  ];
}

// THIS IS SERVER CODE - NOT NEEDED FOR ANYTHING LOCAL (DOESN'T GO TO THE BROWSER)
/*export async function action({ request }) {
  let formData = await request.formData();
  let values: any = Object.fromEntries(formData);
  return people[...values];
}*/

export default function Result() {
  const [name, setName] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(name);
    setName(e.target.value);
    console.log(name);
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(name);
  };

  let people: any = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>people</h1>
      {people.length ? (
        <ul>
          {people.map((person: any) => (
            <li key={person.id}>
              {person.firstName} {person.lastName}
            </li>
          ))}
          <li>
            <Form method="post">
              <input type="text" name="firstName" onChange={onChange} />
              <input type="text" name="lastName" onChange={onChange} />
              <button type="submit" onSubmit={onSubmit}>
                Add
              </button>
            </Form>
          </li>
        </ul>
      ) : (
        <p>Nobody here!</p>
      )}
    </main>
  );
}

/*
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const Habit = formData.get("habit");
  console.log("habit", Habit);
  return redirect("/result");
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  //const search = new URLSearchParams(url.search);
  //console.log(url);
  const habit = url.searchParams.getAll("habit");
  return json(habit);
};

export default function Index() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Form replace method="post">
        <input name="habit" type="text" />
        <button type="submit">Add Habit</button>
      </Form>
      <p>
        SHOW HABIT <button type="submit">delete habit</button>
      </p>
      {data}
    </div>
  );
}

 */
