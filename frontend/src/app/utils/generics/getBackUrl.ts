const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

const getBackUrl = (): string => {
    if (backendUrl.endsWith("/")) {
        return backendUrl.slice(0, -1);
    }

    return backendUrl;
}

export default getBackUrl;