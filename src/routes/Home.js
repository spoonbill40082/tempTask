// import { Component } from "../core/JStestCore";
// import Headline from "../components/Headline";
// import Search from "../components/Search";
// import Category from "../components/Category";
// import Employees from "../components/Employees";
// import employeeData from "../store/storeData"; 

// export default class Home extends Component {
//   constructor() {
//     super();

//     employeeData.subscribe('employees', () => {
//       this.render();

//       this.setupCheckboxes();
//     });
//   }

//   render() {
//     const headline = new Headline().el;
//     const search = new Search().el;
//     const category = new Category().el;
//     const employeesComponent = new Employees();
//     const employees = employeesComponent.el;

//     this.el.classList.add('container');
//     this.el.innerHTML = ''; // 컨테이너 초기화
//     this.el.append(
//       headline,
//       search,
//       category,
//       employees
//     );

//     // Employees 컴포넌트 렌더링
//     employeesComponent.render();
//   }

//   // 체크박스 설정 메서드
//   setupCheckboxes() {
//     const selectAll = document.getElementById('all-employees');
//     const checkboxes = document.querySelectorAll('input[class=employee-checkbox]');

//     // 모두 선택에 체크
//     selectAll.addEventListener('change', function () {
//       checkboxes.forEach(checkbox => {
//         checkbox.checked = selectAll.checked;
//         bgColorChange(checkbox);
//       });
//     });

//     // 개별 선택에 체크
//     checkboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', function () {
//         bgColorChange(checkbox);
//         selectAll.checked = [...checkboxes].every(c => c.checked);
//       });
//     });

//     //체크할 때 색상 변경. 개별 선택 함수 안에서 작동함.
//     function bgColorChange(checkbox) {
//       if (checkbox.checked) {
//         checkbox.parentNode.classList.add('checked');
//       } else {
//         checkbox.parentNode.classList.remove('checked');
//       }
//     }
//   }
// }





import { Component } from "../core/JStestCore";
import Headline from "../components/Headline";
import Search from "../components/Search";
import Category from "../components/Category";
import Employees from "../components/Employees";


export default class Home extends Component {
  render() {
    const headline = new Headline().el
    const search = new Search().el
    const category = new Category().el
    const employees = new Employees().el

    this.el.classList.add('container')
    this.el.append(
      headline,
      search,      
      category,
      employees
    )   

    

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