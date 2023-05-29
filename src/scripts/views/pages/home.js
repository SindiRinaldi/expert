import WartegDbSource from '../../data/wartegdb-source';
import { createWartegItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
      <h2 class="content__heading">Review Warteg Dunia</h2>
      <div id="warteg" class="warteg">
      
      </div>
    </div>

    `;
  },

  async afterRender() {
    const wartegs = await WartegDbSource.listWarteg();
    const wartegContainer = document.querySelector('#warteg');
    wartegs.forEach((warteg) => {
      wartegContainer.innerHTML += createWartegItemTemplate(warteg);
    });
  },
};

export default Home;
