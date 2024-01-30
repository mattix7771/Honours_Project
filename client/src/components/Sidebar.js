import React from 'react';

function Sidebar({runCategoryQuery}) {

  document.querySelectorAll('input[name="category"]').forEach((elem) => {
    elem.addEventListener('change', getProductsByCategory);
  });

  function getProductsByCategory() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    let categories = [];
    checkboxes.forEach((checkbox) => {
      categories.push(checkbox.value);
    });
    runCategoryQuery(categories);
  }


  return (
    <div className='absolute left-0 w-64 h-full border-r-4 border-b-4 border-gray-400'>
      <div>
        <a>Catergories</a><br/>
        <label htmlFor="phonesCheck">
            <input type="checkbox" id="phoneCheck" name="category" value="phones_backlog"/>
          Phones
        </label>
        <br/>

        <label htmlFor="tvsCheck">
          <input type="checkbox" id="tvsCheck" name="category" value="tvs_backlog"/>
          TVs
        </label>
        
      </div>
    </div>
  );
};

export default Sidebar;