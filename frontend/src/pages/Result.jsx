import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Landing.css'
export default function Result() {
    const { code } = useParams();
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}link`, {
                    code: code
                });
                setLink(result.data.link);
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
    if (link){
        return (
            <div className="App">
                <p>Redirecting to following link</p>
                <a href={link}>{link}</a>
            </div>
        )
    }

    return null; // No need to render anything after redirect
}
