import { Component } from "../core/JStestCore";

export default class EmployeeItem extends Component {
  constructor(payload) {
    super({
      props: payload.props
    });
  }

  render() {
    const em = this.props;
    const savedData = JSON.parse(localStorage.getItem(em.id)) || {};

    if (em.id && !isEmpty(savedData) && savedData.Id !== "") { // "Id": ""이 아니고, 빈 데이터가 아닌 경우에만 렌더링
      this.el.classList.add('employee-single');
      this.el.innerHTML = /* html */ `
        <input type="checkbox" class="employee-checkbox">
        <ul>
          <li>
            <div class="photo" style="background-image: url('${em.photo}')" ></div>
          </li>
          <li>${savedData.Family || em.family}</li>
          <li>${savedData.Name || em.name}</li>
          <li>${savedData.Planet || em.planet}</li>
          <li>${savedData.Division || em.division}</li>
          <li class="see-and-edit">
            <div class="see-and-edit-btn">              
              <a href="#/data?id=${em.id}">Detail</a>
              <a href="#/data/edit?id=${em.id}">Edit</a>
            </div>
          </li>
        </ul>
      `;
    }

    this.el.addEventListener('click', () => {
      console.log(em.name);
    });

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }



    //__________체크박스__________//

    // 이벤트 연결 함수
    function connectEvents() {
      const selectAll = document.getElementById('all-employees');
      const checkboxes = document.querySelectorAll('input[class=employee-checkbox]');

      // 모두 선택에 체크
      selectAll.addEventListener('change', function () {
        checkboxes.forEach(checkbox => {
          checkbox.checked = selectAll.checked;
          bgColorChange(checkbox);
        });
      });

      // 개별 선택에 체크
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
          bgColorChange(checkbox);
          selectAll.checked = [...checkboxes].every(c => c.checked);
        });
      });

      // 체크할 때 색상 변경
      function bgColorChange(checkbox) {
        if (checkbox.checked) {
          checkbox.parentNode.classList.add('checked');
        } else {
          checkbox.parentNode.classList.remove('checked');
        }
      }
    }

    // 페이지 로드 시 이벤트 연결
    document.addEventListener('DOMContentLoaded', connectEvents);

    // 페이지 내용 변경 감지
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          connectEvents(); // 변경 감지 시 이벤트 연결 함수 호출
        }
      }
    });

    // MutationObserver 설정
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}


// 로컬 스토리지나 json 데이터 파일에 빈 데이터가 있으면 그것은
// 브라우저에 출력해서는 안 된다.