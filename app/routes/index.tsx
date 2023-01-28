import { Form } from "@remix-run/react";

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<Form method="post">
				<input type="text" />
				<button type="submit">Add Habit</button>
			</Form>
			<p>
				SHOW HABIT <button type="submit">delete habit</button>
			</p>
		</div>
	);
}
