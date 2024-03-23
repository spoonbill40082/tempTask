import { Component } from "../core/JStestCore";
import { getEmployeeDetail, saveEditedData, saveAndReload, deleteData, resetData } from "../store/storeData";

export default class DataEdit extends Component {
   render() {
    this.el.classList.add('container', 'the-employee');

    this.el.innerHTML = /*html*/ `
      <div class="employee-info edit-title">Edit Profile</div>
      <div class="photo skeleton">
        <div class="in-skeleton"></div>   
      </div>
      <div class="specs skeleton"></div>
    `;

    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id);

    setTimeout(() => {
  
        // 화면에 사원 정보를 출력합니다.
        this.el.innerHTML = /*html*/ `
          <div class="employee-info edit-title">Edit Profile</div>
          <div class="employee-info edit">
            <div class="photo" style="background-image: url(${employeeData.Photo})"></div>
            <div class="specs edit">
              <div class="name edit">${savedData.Name || employeeData.Name}
                <input type="text" value="${savedData.Name || employeeData.Name}" id="nameInput">
              </div>
              <div class="family edit">${savedData.Family || employeeData.Family}
                <input type="text" value="${savedData.Family || employeeData.Family}" id="familyInput">
              </div>
              <div class="planet edit">${savedData.Planet || employeeData.Planet} / ${savedData.Division || employeeData.Division}
                <input type="text" value="${savedData.Planet || employeeData.Planet}" id="planetInput">&nbsp
                /&nbsp<input type="text" value="${savedData.Division || employeeData.Division}" id="divisionInput">
              </div>
              <div class="overview edit">${savedData.Overview || employeeData.Overview}
                <input type="text" value="${savedData.Overview || employeeData.Overview}" id="overviewInput">
              </div>
            </div>
          </div>
          <div class="btn-area">
            <div class="delete-area">
              <button class="delete" id="deleteBtn">Delete</button>
            </div>
            <div class="submit-and-reset-area">
              <button type="submit" class="reset" id="submitBtn">Submit</button>
              <button type="reset" id="resetBtn">Reset</button >
            </div>
          </div>
        `;
      
    }, 1234);
  }
}


