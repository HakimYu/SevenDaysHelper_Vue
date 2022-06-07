class Tools{
    static getUrl(host, path) {
        switch (host) {
            case "my":
                return "https://szone-my.7net.cc" + path;
            case "score":
                return "https://szone-score.7net.cc" + path;
            default:
                break;
        }
    }
    static handleError(theVue, error) {
        switch (error) {
            default:// May I should do something there. :-)
        }
    }
}
export {Tools};