import { useEffect, useState } from "react";

export const useAsyncData = <T extends any>(url: string, defaultValue = []): [boolean, T, boolean | null] => {
    const [isLoading, setLoading] = useState(false);
    const [list, setList] = useState<T>(defaultValue as T);
    const [error, setError] = useState<boolean | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(url, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization:
                    "Basic MjQwNmU1NTMtNzkxZS00MmVlLWFjYjYtYWNmYzRhYjcwYWM2OmJlOTA5MjY2LWIzY2UtNDA2Ny05OTUwLTE5NDBiZDI5NzQwNw=="
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setLoading(false);
                setList(result);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);

    return [isLoading, list, error];
};
