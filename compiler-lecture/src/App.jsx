import { useMemo, useCallback, memo } from 'react'
import './App.css'
// Testing React Compiler Example

function ExpensiveComponent({ data, onclick}) {
  const processedData = expensiveProcessing(data);
  

const handleClick = useCallback = (item) => {
  onclick(item.id);
}

return (
  <div>
    {processedData.map(item => {
      <Item key={item.id} onclick={() => handleClick(item)} />
    })}
  </div>
)
}
export default ExpensiveComponent;
