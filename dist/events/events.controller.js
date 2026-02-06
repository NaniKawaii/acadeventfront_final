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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const event_dto_1 = require("./dto/event.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    findAll(facultyId, careerId, modality, startFrom, startTo, organizerId, title) {
        return this.eventsService.findAll({
            facultyId,
            careerId,
            modality,
            startFrom,
            startTo,
            organizerId,
            title
        });
    }
    findOne(id) {
        return this.eventsService.findOne(id);
    }
    create(dto) {
        return this.eventsService.create(dto);
    }
    update(id, dto) {
        return this.eventsService.update(id, dto);
    }
    remove(id) {
        return this.eventsService.remove(id);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'facultyId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'careerId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'modality', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startFrom', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startTo', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'organizerId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('facultyId')),
    __param(1, (0, common_1.Query)('careerId')),
    __param(2, (0, common_1.Query)('modality')),
    __param(3, (0, common_1.Query)('startFrom')),
    __param(4, (0, common_1.Query)('startTo')),
    __param(5, (0, common_1.Query)('organizerId')),
    __param(6, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.CreateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map