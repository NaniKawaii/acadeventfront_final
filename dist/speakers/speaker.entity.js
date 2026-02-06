"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speaker = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../events/event.entity");
let Speaker = class Speaker {
};
exports.Speaker = Speaker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], Speaker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], Speaker.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Speaker.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Speaker.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (event) => event.speakers),
    __metadata("design:type", Array)
], Speaker.prototype, "events", void 0);
exports.Speaker = Speaker = __decorate([
    (0, typeorm_1.Entity)('speakers')
], Speaker);
//# sourceMappingURL=speaker.entity.js.map