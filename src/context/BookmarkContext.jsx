import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
    const [bookmarks, setBookmarks] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("devpulse_bookmarks")) || [];
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem("devpulse_bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (user) => {
        setBookmarks((prev) =>
            prev.find((b) => b.login === user.login) ? prev : [...prev, user]
        );
    };

    const removeBookmark = (login) =>
        setBookmarks((prev) => prev.filter((b) => b.login !== login));

    const isBookmarked = (login) => bookmarks.some((b) => b.login === login);

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export const useBookmarks = () => useContext(BookmarkContext);