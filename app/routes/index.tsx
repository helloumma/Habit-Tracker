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
	redirect("/");
	return Habit;
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	//const search = new URLSearchParams(url.search);
	//console.log(url);
	const habit = url.searchParams.getAll("habit");
	return json(habit);
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
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
