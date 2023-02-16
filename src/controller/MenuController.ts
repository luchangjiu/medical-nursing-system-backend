import { Controller, Delete, Get, Post } from "../server";
import { IMenuService, MenuService } from "../service/system/MenuService";
import { Menu } from "../store/entity";

@Controller("/api/menu")
export class MenuController {
  private MenuService: IMenuService;
  constructor() {
    this.MenuService = new MenuService();
  }

  @Post("/add")
  add(m: Menu) {
    return this.MenuService.add(m);
  }

  @Post("/upd")
  upd(m: Menu) {
    return this.MenuService.upd(m);
  }

  @Delete("/del/:id")
  del({ id }) {
    return this.MenuService.del(id);
  }

  @Get("/list")
  list(params) {
    return this.MenuService.list(params);
  }
}
