import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { favService } from "./services/favorites.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
userService.init();
favService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
