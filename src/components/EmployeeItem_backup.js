import { Component } from "../core/JStestCore"

export default class EmployeeItem extends Component {
  constructor(payload) {
    super({
      props: payload.props
    })
  }
  render() {
    const em = this.props
    this.el.classList.add('employee-single')
    this.el.innerHTML = /* html */ `
      <input type="checkbox" class="employee-checkbox">
      <ul>
      <li>
        <div class="photo" style="background-image: url('${em.photo}')" ></div>
      </li>
      <li>${em.family}</li>
      <li>${em.name}</li>
      <li>${em.planet}</li>
      <li>${em.division}</li>
      <li class="see-and-edit">
        <div class="see-and-edit-btn">              
          <a href="#/data?id=${em.id}">Detail</a>
          <a href="#/data/edit?id=${em.id}">Edit</a>
        </div>
      </li>
      </ul>

    `

    this.el.addEventListener('click', () => {
      console.log(this.props.name)
    })
  }
}