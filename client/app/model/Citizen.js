"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Physic_1 = require("./Physic");
/**
 * Created by quentinC on 16/02/2017.
 */
var Citizen = (function (_super) {
    __extends(Citizen, _super);
    function Citizen() {
        _super.apply(this, arguments);
    }
    return Citizen;
}(Physic_1.Physic));
exports.Citizen = Citizen;
//# sourceMappingURL=Citizen.js.map