import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { favService } from '../../services/favorites.service';
import { ProductData } from 'types';

class Favorites extends Component {
    products!: ProductData[];

    private async _clearFav() {
        await favService.clear()
        await this.render()
    }

    async render() {
        this.products = await favService.get();

        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
            const productComp = new Product(product, { isHorizontal: false });
            productComp.render();
            productComp.attach(this.view.favList);
        });

        const btn: any = document.querySelector('.favorites__btn')
        btn.onclick = this._clearFav.bind(this);
    }
}

export const favoritesComp = new Favorites(html);