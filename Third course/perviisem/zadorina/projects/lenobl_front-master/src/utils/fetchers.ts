export const RestApi = {
    process: "/processoffice/rest/",
    reference: "/referencebook/rest/",
    auth: "/auth/rest/"
};

export const fetcher = async <T extends any>(url: string, init?: RequestInit): Promise<T> => {
    const base64Tokens = localStorage.getItem("base64Tokens");
    let authHeader = "Basic " + base64Tokens;

    const externalHeaders = init?.headers ?? {};

    const fetcher = fetch(url, {
        ...init,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: authHeader,
            ...externalHeaders
        }
    });

    if (init?.method === "DELETE") {
        return fetcher as Promise<any>;
    }

    return fetcher.then((res) => {
        if ([401, 403].includes(res.status) && location.pathname !== "/login") {
            location.href = "/login";
            throw new Error("Auth exception");
        }
        if ([404].includes(res.status)) {
            throw new Error("404 Not found");
        }
        return res.json();
    });
};

export const processFetch = async <T extends any>(url: string, init?: RequestInit): Promise<T> => {
    return fetcher<T>(`${RestApi.process}${url}`, init);
};

export const referenceFetch = async <T extends any>(url: string, init?: RequestInit): Promise<T> => {
    return fetcher<T>(`${RestApi.reference}${url}`, init);
};

export const authFetch = async <T extends any>(url: string, init?: RequestInit): Promise<T> => {
    return fetcher<T>(`${RestApi.auth}${url}`, init).then((result: any) => {
        if (result.status === 500) {
            throw new Error("SERVER ERROR");
        }
        return result;
    });
};
