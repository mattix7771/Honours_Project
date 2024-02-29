import React from "react";

/**
 * Slider component
 * Responsible for creating a slider based on configurations
 */
function Slider(props) {

	// slider properties
	const id = props.id;
	const title = props.title;
	const min = props.min;
	const max = props.max;
	const step = props.step;
	const defaultValue = props.defaultValue;
	const setVariable = props.setVariable;
	const saveChangeToFile = props.saveChangeToFile;


  return (
    <div>

			{/* Slider */}
      <h2 className='mx-10 my-5'>{title}</h2>
      <div className='mx-10'>
        <input 
					type="range" 
					min={min} 
					max={max} 
					step={step} 
					defaultValue={defaultValue} 
					class="range" 
					id='slider' 
					onChange={(e) => {
						setVariable(e.target.value); 
						saveChangeToFile(id, e.target.value)
					}}
				/>
        <label for="slider">{defaultValue}</label>
      </div>

    </div>
  );
}

export default Slider;