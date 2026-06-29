import { applyCors } from "../_lib/cors.js";

export default async function handler(req, res) {
	if (applyCors(req, res)) return;

	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { nickname } = req.query;
	if (!nickname) {
		return res.status(400).json({ error: "Missing required parameter: nickname" });
	}

	try {
		const response = await fetch(
			`https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
				},
			},
		);

		if (!response.ok) {
			const errorBody = await response.text();
			console.error("Faceit error", response.status, errorBody);
			return res.status(response.status).json({
				error: "Faceit API request failed",
			});
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (_err) {
		return res.status(500).json({ error: "Internal server error" });
	}
}
