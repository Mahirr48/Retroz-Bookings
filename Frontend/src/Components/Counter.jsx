import React, { useState } from 'react'

const Count = () => {
    
        const [count , setCount] = useState(1);
    
  return (
    <div>
      <div className='flex flex-col'>
              <label htmlFor="People" className='text-lg font-serif'> People</label>
              <input/>
              <div className='flex items-center gap-2'>
                <button onClick={()=>setCount(Math.max(1, count-1))}
                    className='px-3 py-1 bg-gray-200 rounded'>
                        -
                </button>
                <span className='text-xl'>{count}</span>
                <button onClick={()=>setCount(count+1)}
                className='px-3 py-1 bg-gray-200 rounded'>
                    +
                </button>
              </div>
            </div>
    </div>
  )
};
export default Count
