import { getAvgPopularity } from '../helpers';
import { useState } from 'react';

export const BasicOMeter = (items) => {
  console.log(items);
  const level = getAvgPopularity(items);
  const [progress, setProgress] = useState('0%');
  return (
    <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
        {level}
      </div>
    </div>
  );
};
