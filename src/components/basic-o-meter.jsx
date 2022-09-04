import { getAvgPopularity } from '../helpers';
import styles from './basic-o-meter.module.css';
import classNames from 'classnames';

export const BasicOMeter = (items) => {
  const level = getAvgPopularity(items) | 0;

  return (
    <div className="mt-4 flex flex-col justify-center items-center w-full">
      <span className="mb-1 font-semibold">
        How Unique is your music taste?
      </span>
      <div className={classNames(styles.meter, 'flex flex-row space-x-2')}>
        <span style={{ width: `${level}%` }}>
          <span className={styles.progress}></span>
        </span>
        <span className="text-sm font-light animate-fadeIn">{level}</span>
      </div>
    </div>
  );
};
