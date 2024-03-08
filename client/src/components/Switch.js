import React from "react";

/**
 * Switch component
 * Responsible for creating a switch based on configurations
 */
function Switch(props) {

	// switch properties
	const id = props.id;
	const title = props.title;
	const variable = props.variable;
	const setVariable = props.setVariable;
	const saveChangeToFile = props.saveChangeToFile;


  return (
    <div>

	    {/* Switch */}
			<div className='m-10'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={variable}
            onChange={() => {
              setVariable(!variable);
              saveChangeToFile(id, !variable);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">{title}</span>
        </label>
        <br/>
      </div>

    </div>
  );
}

export default Switch;