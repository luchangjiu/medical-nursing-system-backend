import { Controller, Delete, Get, Post } from "../server";
import { DeptService, IDeptService } from "../service/system/DeptService";
import { Dept } from "../store/entity/system/Dept";

@Controller("/api/dept")
export class DeptController {
  private DeptService: IDeptService;
  constructor() {
    this.DeptService = new DeptService();
  }

  @Post("/add")
  add(d: Dept) {
    return this.DeptService.add(d);
  }
  @Post("/upd")
  upd(d: Dept) {
    return this.DeptService.upd(d);
  }

  @Delete("/del/:id")
  del({ id }) {
    return this.DeptService.del(id);
  }

  @Get("/list")
  list(params) {
    return this.DeptService.list(params);
  }
}
