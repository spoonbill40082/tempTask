import { Store } from "../core/JStestCore";
import employeeData from "./employeeData.json";

const store = new Store({
  searchText: "",
  employees: employeeData,
  employee: {},
  loading: false,
  message: 'Search for the Movie Title'
})

export default store;

export const searchEmployees = () => {
  store.state.loading = true;
  setTimeout(() => {
    try {
      if (employeeData) {
        if (store.state.searchText === '') {
          store.state.employees = employeeData;
        } else {
          const searchTextLowerCase = store.state.searchText.toLowerCase(); // 검색어를 소문자로 변환
          store.state.employees = employeeData.filter(employee => {
            // 'Overview'와 'Photo' 필드를 제외하고 검색
            return Object.keys(employee).filter(key => key !== 'Overview' && key !== 'Photo').some(key => {
              if (typeof employee[key] === 'string') {
                return employee[key].toLowerCase().includes(searchTextLowerCase);
              }
              return false;
            });
          });
        }
      } else {
        store.state.message = 'Error';
      }
    } catch (error) {
      console.log('searchEmployees error:', error);
    } finally {
      store.state.loading = false;
    }
  }, 1000);
}



// 데이터별로 페이지 출력
export const getEmployeeDetail = id => {
  const employee = employeeData.find(emp => emp.Id === id);
  return employee;
}


// 아래 try catch 함수는 어떤 쓰임이 있는지 다시 고민해 보기

// export const getEmployeeDetail = id => {
//   try {
//     // JSON 데이터에서 해당 ID에 맞는 사원 데이터 찾기
//     const employee = employeeData.find(emp => emp.Id === id);

//     // 찾은 사원 데이터 반환
//     return employee;
//   } catch (error) {
//     console.log('getEmployeeDetail error:', error);
//     return null;
//   }
// }


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
  if (confirm('이대로 수정하시겠습니까?')) {
    if (this.tempData) {
      localStorage.setItem(employeeData.Id, JSON.stringify(this.tempData));
      this.tempData = null
    }
    alert('수정 완료!')
    window.location.reload();
  }

});

// 삭제 후 첫 페이지로
export const deleteEmployee = () => {
  document.getElementById('deleteBtn').addEventListener('click', () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      const emptyData = {
        "Id": "",
        "Photo": "",
        "Family": "",
        "Name": "",
        "Planet": "",
        "Division": ""
      };
      localStorage.setItem(employeeData.Id, JSON.stringify(emptyData));
      alert('삭제되었습니다.');
      window.location.href = '#/';
    }
  });
}

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