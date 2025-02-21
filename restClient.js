const request = require("sync-request");

/**
 * Rest client
 */
class RestClient {

    constructor() {
        this.headers = {}

    }


    /**
     * Validate config values
     *
     * @param options
     * @param name
     * @private
     */
    _validate(options, name) {
        if (options == null) {
            throw new Error("Missing options");
        }
        if (options[name] == null) {
            throw new Error(`Missing ${name} value. Please update option in environment variables`);
        }
    }

    /**
     * Form the url for api
     *
     * @param path
     * @returns {string}
     * @private
     */
    _url(path) {
        return `${this.base}${path}`;
    }

    /**
     * Post request formation
     *
     * @param api
     * @param body
     * @param error
     * @returns {*}
     * @private
     */
    _post(api, body, error = undefined, headers = this.headers) {
        return this._request("POST", api, body, error, headers);
    }

    /**
     * Post request formation
     *
     * @param api
     * @param body
     * @param error
     * @returns {*}
     * @private
     */
    _put(api, body, error = undefined) {
        return this._request("PUT", api, body, error);
    }

    /**
     * get request formation
     *
     * @param api
     * @param error
     * @returns {*}
     * @private
     */
    _get(api, error = undefined) {
        return this._request("GET", api);
    }

    /**
     * Patch request formation
     *
     * @param api
     * @param error
     * @returns {*}
     * @private
     */
    _patch(api, body, error = undefined, headers = this.headers) {
        return this._request("PATCH", api, body, error, headers);
    }

    /**
     * Api request sending to the corresponding url
     *
     * @param method
     * @param api
     * @param body
     * @param error
     * @returns {*}
     * @private
     */
    _request(method, api, body = undefined, error = undefined, headers = this.headers) {
        const option = {
            headers: headers
        };
        if (body) {
            option["json"] = body
        }
        let count = 0;
        let maxTries = process.env.MAX_RETRY || 3;
        while (true) {
            try {
                let result = request(method, this._url(api), option);
                return JSON.parse(result.getBody('utf8'));
            } catch (error) {
                if (++count === maxTries) throw {
                    "method": method,
                    "api": this._url(api),
                    "body": body,
                    "error": error,
//                     "env_variables": process.env
                };
            }
        }
    }


}

module.exports = RestClient;
