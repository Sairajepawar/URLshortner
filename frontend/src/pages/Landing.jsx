import React, { useState } from 'react';
import axios from 'axios';
import './Landing.css'
export default function Landing() {
    const [url, setUrl] = useState('');  // To store the user's input
    const [shortUrl, setShortUrl] = useState('');  // To store the generated short URL
    const [loading, setLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call your backend API to get the shortened URL
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}create`, { link: url });
            setShortUrl(window.location.origin+"/"+response.data.code);  // Update the state with the new short URL
            setLoading(false);
        } catch (error) {
            console.error("Error shortening URL:", error);
        }
    };

    // Function to copy the short URL to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        alert("Shortened URL copied to clipboard!");
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>

            {/* Form for inputting long URL */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a long URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type="submit">Shorten</button>
            </form>

            {/* Display the shortened URL */}
            {loading && (
                <div>Loading ....</div>
            )}
            {shortUrl && (
                <div className="short-url-display">
                    <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                    <button onClick={handleCopy}>Copy</button>
                </div>
            )}
        </div>
    );
}

