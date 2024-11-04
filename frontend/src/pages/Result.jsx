import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Result() {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(code);
        const fetchData = async () => {
            try {
                const result = await axios.post("http://localhost:3000/link", {
                    code: code
                });
                console.log(result.data);

                // Open the result URL in a new tab
                const newTab = window.open(result.data.link, '_blank');

                // Attempt to close the current tab
                if (newTab) {
                    window.close();
                } else {
                    // Fallback for when the tab can't be closed
                    console.log("Unable to close the current tab.");
                }
            } catch (err) {
                setError("Failed to fetch the link");
            }
            finally {
                setLoading(false);
            }
        };

        if (code) fetchData();
    }, [code]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return null; // No need to render anything after redirect
}
