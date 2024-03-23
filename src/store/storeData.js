import { Store } from "../core/JStestCore";
import employeeData from "./employeeData.json";

const store = new Store({
  searchText: "",
  employees: employeeData,
  employee: {},
  loading: false,
  message: 'Search for the Movie Title',
  Name: "",
  Family: "",
  Planet: "",
  Division: "",
  Overview: ""
});

export default store;

// 검색 함수
export const searchEmployees = () => {
  store.state.loading = true;
  setTimeout(() => {
    try {
      if (!employeeData) {
        throw new Error('Employee data not found.');
      }

      const searchTextLowerCase = store.state.searchText.toLowerCase();
      store.state.employees = store.state.searchText === '' ?
        employeeData :
        employeeData.filter(employee => {
          return Object.keys(employee)
          .filter(key => key !== 'Overview' && key !== 'Photo')
          .some(key => {
            if (typeof employee[key] === 'string') {
              return employee[key]
              .toLowerCase()
              .includes(searchTextLowerCase);
            }
            return false;
          });
        });
    } catch (error) {
      console.log('searchEmployees error:', error);
      store.state.message = 'Error';
    } finally {
      store.state.loading = false;
    }
  }, 1000);
};

// 사원 세부 정보 가져오는 함수
export const getEmployeeDetail = id => {
  return employeeData.find(emp => emp.Id === id);
};

// 입력된 내용을 임시 저장하는 함수
export const saveEditedData = () => {
  const tempData = {
    Name: document.getElementById('nameInput').value,
    Family: document.getElementById('familyInput').value,
    Planet: document.getElementById('planetInput').value,
    Division: document.getElementById('divisionInput').value,
    Overview: document.getElementById('overviewInput').value,
  };
  return tempData;
};

// Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
export const saveAndReload = () => {
  const tempData = saveNewData();
  if (confirm('이대로 수정하시겠습니까?')) {
    if (tempData) {
      localStorage.setItem(employeeData.Id, JSON.stringify(tempData));
      alert('수정 완료!')
      window.location.reload();
    }
  }
};

// 삭제 후 첫 페이지로
export const deleteData = () => {
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
};

// 페이지 새로고침(F5, 새로고침 클릭) 시 작성한 내용 초기화
export const resetData = () => {
  const savedData = JSON.parse(localStorage.getItem(employeeData.Id)) || {};

  document.getElementById('nameInput').value = savedData.Name || employeeData.Name;
  document.getElementById('familyInput').value = savedData.Family || employeeData.Family;
  document.getElementById('planetInput').value = savedData.Planet || employeeData.Planet;
  document.getElementById('divisionInput').value = savedData.Division || employeeData.Division;
  document.getElementById('overviewInput').value = savedData.Overview || employeeData.Overview;
};

export const writeNewData = () => {
  console.log('새로 쓰기')
}
