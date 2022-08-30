import { getAvgPopularity } from '../helpers';
import styles from './basic-o-meter.module.css';

export const BasicOMeter = (items) => {
  const level = getAvgPopularity(items) | 0;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <span className="font-semibold">How Unique is your music taste?</span>
      <div className={styles.meter}>
        <span style={{ width: `${level}%` }}>
          <span className={styles.progress}></span>
        </span>
      </div>
    </div>
  );
};
