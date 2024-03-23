import { Component } from "../core/JStestCore"
// import Data from "../store/employeeData"
import EmployeeItem from "../components/EmployeeItem"

export default class Employees extends Component {
  constructor() {
    super({
      state: {
        datas: [
          {
            Id: 'em1',
            Photo: 'https://i.namu.wiki/i/k6B_IBn5eK8adZnqwItY_jAoEk15mU6T_aiQ0_o3Tj5HrRF42nwADzWQftX3LZHwyoxbTVGx9ZAZqGFFILr5RlvEkZfvGioGSX6XdtoHOZiNvpuRxZokpzcfwP8XisJLctMmMENzicw3JPQuNn_L8Q.webp',
            Family: '—',
            Name: 'Chani Kynes',
            Planet: 'Arakis',
            Division: 'Fremen',
            Overview: "In Dune, Paul's prescience begins manifesting itself through dreams while he is still living in his ancestral home on the planet Caladan; he sees Chani in these visions, though they have not yet met. Paul and the Atreides come to the desert planet Arrakis, but Paul's father Duke Leto is soon killed by the Harkonnens and Paul and his mother Lady Jessica are forced to flee into the desert. They are reluctantly taken in by a tribe of the planet's native Fremen, and Chani is the Fremen woman put in charge of protecting and guiding Paul. They soon become lovers, and Paul rises as a religious leader among the Fremen, and is called Muad'Dib."
          },
          {
            Id: 'em2',
            Photo: 'https://i.namu.wiki/i/SC8GQt_qF-UNv8ET7R30G01VvoPWVFVBikkmKdMawHCsHggG1lJXGaCM3HOdVw02v74kkQOuuCpEx9nMKXZJQol-NU8cCEMrH79k6vkwuOnBJ4YApry0yVSIAtqL8xxBBLztfXQWr4JW2i1CRXkL3Q.webp',
            Family: 'Atreides',
            Name: 'Paul Atreides',
            Planet: 'Kaladan',
            Division: 'Royal'
          },
          {
            Id: 'em3',
            Photo: 'https://i.namu.wiki/i/gTh7Q1hGPaoBdh6xoPLFRyrLbsoGCXOUAEmxe5F5qgKAf8H31NoC1zctgdkBIGv7Onvu2eniGXTspO3C83Bm0X_K7dOmbNoJJX9UktVh2Fxn95-rpKNotJJqi1kp99EXUPVuszpqilh2qtnS3b75MQ.webp',
            Family: 'Atreides',
            Name: 'Gurney Halleck',
            Planet: 'Kaladan',
            Division: 'Bard'
          },
          {
            Id: 'em4',
            Photo: 'https://i.namu.wiki/i/wXbP4K7WwZWNTwzK6XzhzNjCS5d3YONnC8Wcn2WFYVR1gqV_lRyMcyH1pW2iL0PBMasX5nfhrlapUYBki_c-xyVK0uw038DIgZAYqCwgn6dr2wiV1V9WVAZJMYZ3OdlckyJsXB9SWjQU4-_OtyeWQw.webp',
            Family: 'Harkonnen',
            Name: 'Glossu Rabban',
            Planet: 'Giedi Prime',
            Division: 'Viceroy'
          }

        ]
      }
    })
  }
  render() {
    console.log(this.state.datas)
    this.el.classList.add('employee-list')
    this.el.innerHTML = /* html */ `
      <article></article>
    `
    const ulEl = this.el.querySelector('article')
    ulEl.append(...this.state.datas      
      .map(data => new EmployeeItem({
        props: {
          photo: data.Photo,
          id: data.Id,
          family: data.Family,
          name: data.Name,
          planet: data.Planet,
          division: data.Division,
        }
      }).el)
    )
  }
}