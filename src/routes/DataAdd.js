import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeData";
import { writeNewData } from "../store/storeData";


// 새 데이터 추가
export default class DataAdd extends Component {

  render() {
    this.el.classList.add('container', 'add');


    // getEmployeeDetail 함수를 호출하고 데이터를 기다림
    const employeeData = getEmployeeDetail(history.state.id)

    // 데이터가 제대로 반환되었는지 확인
    if (employeeData) {
      // 화면에 사원 정보를 출력합니다.
      this.el.innerHTML = /*html*/ `
        <div class="employee-info edit-title">Edit Profile</div>
        <div class="employee-info edit">
          <div class="photo" placeholder = "이미지 url" id="addPhotoInput"></div>
          <div class="specs edit">
            <input type="text" placeholder = "이름" id="addNameInput">            
            <input type="text" placeholder = "패밀리" id="addFamilyInput">            
            <input type="text" placeholder = "행성" id="addPlanetInput"> / <input type="text" value="${employeeData.Division}" id="divisionInput">
            <input type="text" placeholder = "설명" id="addOverviewInput">
            </div>
          </div>
        </div>
        <div class="btn-area">
          <div class="add-area">
            <button class="add" id="addButton">Add</button>
          </div>
        </div>
      `;

      // 수정된 내용을 로컬 스토리지에 저장
      document.getElementById('addButton').addEventListener('click', () => {
        const savedData = {
          "Id": history.state.id,
          "Photo": document.getElementById('phtotoInput').value,
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
        alert('추가 완료')
      });
    } else {
      alert('추가 실패')
    }
  }
}
