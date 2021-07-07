// Проверить остальные урлы
const hostMapping: Record<string, string> = {
    "fmjboss2.krista.ru": "fmjboss.krista.ru:12380",
    localhost: "lk.process.ifinmon.ru/123qwe/",
    "lk.process.ifinmon.ru": "lk.process.ifinmon.ru/123qwe/"
};

const getServiceUrl = (path: string, hostMap = hostMapping): string => {
    const { hostname, protocol } = location;

    return `${protocol}//${hostMap[hostname] || "lk.process.ifinmon.ru/123qwe/"}/${path}`;
};

export default getServiceUrl;
