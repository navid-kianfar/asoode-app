class RainbowService {
    _repository = {};
    colors = [
        "#344563",
        "#ff78cb",
        "#51e898",
        "#00c2e0",
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf"
    ];
    get(id) {
        if (!this._repository[id]) {
            const random = Math.round((Math.random() * 1000 * this.colors.length) / 1000);
            this._repository[id] = this.colors[random];
        }
        return this._repository[id];
    }
}
const instance = new RainbowService();
export default instance;
