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
                const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}link`, {
                    code: code
                });
                console.log(result.data.link);
                window.location.href = result.data.link;
            } catch (err) {
                setError("Failed to fetch the link");
            }
            finally {
                setLoading(false);
            }
        };
        if (code)
            fetchData().then((response) => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return null; // No need to render anything after redirect
}
