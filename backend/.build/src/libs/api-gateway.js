export const formatJSONResponse = (statusCode = 200, response) => {
    return {
        statusCode,
        body: JSON.stringify(response),
    };
};
//# sourceMappingURL=api-gateway.js.map