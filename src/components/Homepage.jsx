import { useState, useEffect, useRef } from "react";
import SignInPopup from "./SignInPopup";
import AuthPopup from "./AuthPopup";


export default function HomePage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [promptCount, setPromptCount] = useState(0);
    const [showAuth, setShowAuth] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!prompt.trim()) return;

        if (!isLoggedIn && promptCount >= 3) {
            setShowSignInPopup(true);
            return;
        };

        const newUserMessage = {
            role: "user",
            text: prompt,
        };

        const newAIMessage = {
            role: "ai",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            links: [
                "https://en.wikipedia.org/wiki/Photosynthesis",
                "https://www.khanacademy.org/science/biology",
            ],
        };

        setMessages((prev) => [...prev, newUserMessage, newAIMessage]);

        setPromptCount((prev) => prev + 1);

        setPrompt("");
    };

    const handleNewVideo = () => {
    setMessages([]);
    setPrompt("");
    setPromptCount(0);
    };


    return (
        <div className="h-screen w-screen flex bg-gray-100 text-gray-900">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
                <h1 className="text-xl font-bold mb-4">BlinkEd</h1>

                <button onClick={handleNewVideo} className="bg-blue-600 text-white p-2 rounded mb-3">
                    + New Video
                </button>

                <h2 className="text-sm uppercase font-semibold text-gray-500 mb-2">
                    Chat History
                </h2>

                <div className="flex-1 overflow-y-auto space-y-2">
                    <div className="p-2 bg-gray-200 rounded cursor-pointer">Photosynthesis</div>
                    <div className="p-2 bg-gray-200 rounded cursor-pointer">What is android?</div>
                    <div className="p-2 bg-gray-200 rounded cursor-pointer">How to start sewing?</div>
                </div>
            </aside>

            {showSignInPopup && (
                <SignInPopup
                    onClose={() => setShowSignInPopup(false)}
                    onSignIn={() => {
                        setShowAuth(true);
                        setShowSignInPopup(false);
                    }}
                />
            )}

            {showAuth && (
                <AuthPopup
                    onClose={() => setShowAuth(false)}
                    onGoogle={() => console.log("Google login")}
                    onSubmit={(email, password, isLogin) => {
                        console.log("Email:", email);
                        console.log("Password:", password);
                        console.log(isLogin ? "Logging in..." : "Signing up...");
                        setShowAuth(false);
                        setIsLoggedIn(true);
                    }}
                />
            )}



            {/* Main Area */}
            <main className="flex-1 flex flex-col">

                {/* Navbar */}
                <div className="w-full h-14 border-b bg-white flex items-center justify-between px-4">
                    <h2 className="font-semibold text-lg">AI Explainer</h2>

                    {!isLoggedIn ? (
                        <button onClick={() => setShowAuth(true)} className="px-4 py-1 bg-blue-600 text-white rounded">
                            Login / Signup
                        </button>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-black cursor-pointer"></div>
                    )}
                </div>

                {/* Chat Output */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {messages.map((msg, index) => (
                        <div key={index}>

                            {msg.role === "user" && (
                                <div className="flex justify-end">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-md">
                                        {msg.text}
                                    </div>
                                </div>
                            )}

                            {msg.role === "ai" && (
                                <div className="bg-white p-4 rounded shadow max-w-xl">
                                    <h3 className="font-semibold mb-2">Generated Video</h3>

                                    <video
                                        controls
                                        className="rounded mb-4 w-full"
                                        src={msg.videoUrl}
                                    />

                                    <h4 className="font-semibold">Sources:</h4>
                                    <ul className="list-disc pl-6 text-blue-600">
                                        {msg.links.map((link, i) => (
                                            <li key={i}>
                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    ))}

                    <div ref={chatEndRef} />

                </div>


                {/* Chat Input */}
                <div className="w-full border-t bg-white p-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Ask BlinkEd anything..."
                            className="flex-1 p-3 rounded border outline-none focus:ring-2 focus:ring-blue-500"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                        />

                        <button
                            onClick={handleSend}
                            className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Generate
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
