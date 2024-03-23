import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeData";
import { writeNewData } from "../store/storeData";


// 새 데이터 추가
export default class DataAdd extends Component {

  render() {
    this.el.classList.add('container', 'the-employee');


    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id)

    // 데이터가 제대로 반환되었는지 확인
    if (employeeData) {
      // 화면에 사원 정보를 출력합니다.
      this.el.innerHTML = /*html*/ `
        <div class="employee-info edit-title">Edit Profile</div>
        <div class="employee-info edit">
          <div class="photo" style="background-image: url(${employeeData.Photo})"></div>
          <div class="specs edit">
            <div class="name edit">${employeeData.Name}</div>
            <input type="text" value="${employeeData.Name}" id="nameInput" autocapitalize="on">
            <div class="family edit">${employeeData.Family}</div>
            <input type="text" value="${employeeData.Family}" id="familyInput">
            <div class="planet edit">${employeeData.Planet} / ${employeeData.Division}</div>
            <input type="text" value="${employeeData.Planet}" id="planetInput"> / <input type="text" value="${employeeData.Division}" id="divisionInput">
            <div class="overview edit">${employeeData.Overview}
              <input type="text" value="${employeeData.Overview}" id="overviewInput">
            </div>
          </div>
        </div>
        <div class="btn-area">
          <div class="delete-area">
            <button class="delete">Delete</button>
          </div>
          <div class="submit-and-reset-area">
            <button type= "submit" class="reset" id="submitButton">Submit</button>
            <button type="reset" id="resetButton">Reset</button >
          </div>
        </div>
      `;

      // 수정된 내용을 로컬 스토리지에 저장
      document.getElementById('submitButton').addEventListener('click', () => {
        const savedData = {
          "Id": history.state.id,
          "Name": document.getElementById('nameInput').value,
          "Family": document.getElementById('familyInput').value,
          "Planet": document.getElementById('planetInput').value,
          "Division": document.getElementById('divisionInput').value,
          "Overview": document.getElementById('overviewInput').value,
        };
        localStorage.setItem(history.state.id, JSON.stringify(savedData));

        // 웹페이지에 반영
        // const newData = JSON.parse(localStorage.getItem)

        //새로 고침(반영 확인)
        window.location.href = window.location.href;
        alert('수정 완료')
      });
    } else {
      alert('수정 실패')
    }
  }
}
