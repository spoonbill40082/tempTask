import { Component } from "../core/JStestCore";
import { getEmployeeDetail } from "../store/storeData";

export default class DataEdit extends Component {
  constructor() {
    super();
    this.tempData = null;
  }

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
      // 데이터가 제대로 반환되었는지 확인
      if (employeeData) {
        // 로컬 스토리지에서 데이터 불러오기
        const savedData = JSON.parse(localStorage.getItem(employeeData.Id)) || {};

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
                <input type="text" value="${savedData.Planet || employeeData.Planet}" id="planetInput"> / <input type="text" value="${savedData.Division || employeeData.Division}" id="divisionInput">
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

        // 입력된 내용을 임시 저장하는 함수
        const saveNewData = () => {
          this.tempData = {
            Name: document.getElementById('nameInput').value,
            Family: document.getElementById('familyInput').value,
            Planet: document.getElementById('planetInput').value,
            Division: document.getElementById('divisionInput').value,
            Overview: document.getElementById('overviewInput').value,
          };
        };

        // input 요소에 change 이벤트 추가하여 내용이 변경될 때마다 임시 데이터 저장
        const changeData = document.querySelectorAll('input[type="text"]');
        changeData.forEach(changeData => {
          changeData.addEventListener('change', saveNewData);
        });

        // Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
        document.getElementById('submitBtn').addEventListener('click', () => {
          if (this.tempData) {
            localStorage.setItem(employeeData.Id, JSON.stringify(this.tempData));
            this.tempData = null
          }
          alert('수정 완료!')
          window.location.reload();
        });


        // 삭제 후 첫 페이지로
        document.getElementById('deleteBtn').addEventListener('click', () => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            localStorage.setItem(employeeData.Id, '')
            alert('삭제되었습니다.');
            window.location.href = '#/'
          }
        });

        // 페이지 새로고침(F5, 새로고침 클릭) 시 작성한 내용 초기화
        window.addEventListener('beforeunload', () => {
          this.tempData = null;
        });

        //작성 내용 초기화
        document.getElementById('resetBtn').addEventListener('click', () => {
          const savedData = JSON.parse(localStorage.getItem(employeeData.Id)) || {};

          document.getElementById('nameInput').value = savedData.Name || employeeData.Name;
          document.getElementById('familyInput').value = savedData.Family || employeeData.Family;
          document.getElementById('planetInput').value = savedData.Planet || employeeData.Planet;
          document.getElementById('divisionInput').value = savedData.Division || employeeData.Division;
          document.getElementById('overviewInput').value = savedData.Overview || employeeData.Overview;
        });

      } else {
        console.log(`I cant't edit this.`);
      }
    }, 1234);
  }
}
