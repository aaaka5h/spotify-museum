import { colorizeNum, getAvgPopularity } from '../helpers';
import styles from './basic-o-meter.module.css';
import classNames from 'classnames';

export const BasicOMeter = (items) => {
  const level = getAvgPopularity(items) | 0;
  const [levelColor] = colorizeNum(level);

  return (
    <div className="mt-4 flex flex-col justify-center items-center w-full">
      <span className="mb-1 font-semibold">
        How unique is your music taste?
      </span>
      <div className={classNames(styles.meter, 'flex flex-row space-x-2')}>
        <span style={{ width: `${level}%` }}>
          <span className={styles.progress}></span>
        </span>
      </div>
      <span
        className={classNames(levelColor, 'text-sm font-light animate-fadeIn')}
      >
        {level}
      </span>
    </div>
  );
};
