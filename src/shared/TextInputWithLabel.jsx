/* eslint-disable react/prop-types */
import styled from 'styled-components';

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <StyledTextLabel htmlFor={elementId}>{labelText}:</StyledTextLabel>
      <StyledTextInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

const StyledTextLabel = styled.label`
  font-weight: bold;
`;

const StyledTextInput = styled.input`
  border-radius: 5px;
  color: #e0e1dd;
`;

export default TextInputWithLabel;
