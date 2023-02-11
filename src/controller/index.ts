import APIController from '/@/controller/APIController'
import { Handler } from "../server/handlers";


export function LoaderController() {
    Handler.Controllers = [APIController];
}

