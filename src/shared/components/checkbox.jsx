import React, { useState } from 'react';

export function CheckBox(props){
    return(
        <>
    <div class="custom-control custom-checkbox">
  <input 
    // {...props.rest}
    onChange={props.handleCheckboxChange}
    checked = {props.checked}
    type="checkbox" 
    class="custom-control-input" 
    id={props.id}
    // id={props.id}

    />
  <label class="custom-control-label" for={props.id}>{props.name}</label>
</div>
        </>
    )
}

// const MultiSelectCheckbox = (props) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleCheckboxChange = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   return (
//     <div className="form-group">
//       <label>Select multiple options:</label>
//       <div className="custom-control custom-checkbox">
//         <input
//           type="checkbox"
//           className="custom-control-input"
//           id="option1"
//           checked={selectedOptions.includes('option1')}
//           onChange={() => handleCheckboxChange('option1')}
//         />
//         <label className="custom-control-label" htmlFor="option1">Option 1</label>
//       </div>
//     </div>
//   );
// };

// export default MultiSelectCheckbox;
