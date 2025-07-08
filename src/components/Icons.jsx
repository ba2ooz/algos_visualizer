// Color utility function
const getIconColor = (isActive) => isActive ? 'white' : 'rgba(159, 159, 159, 0.89)';

// Back Arrow Icon
export const BackIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={15} 
    height={15} 
    viewBox="0 0 320 512" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      fill={getIconColor(isActive)} 
      d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
    />
  </svg>
);

// Forward Arrow Icon
export const ForwardIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={15} 
    height={15} 
    viewBox="0 0 320 512" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      fill={getIconColor(isActive)} 
      d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
    />
  </svg>
);

// Play Icon
export const PlayIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={28} 
    height={28} 
    viewBox="0 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      fill={getIconColor(isActive)} 
      d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" 
    />
  </svg>
);

// Pause Icon
export const PauseIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={28} 
    height={28} 
    viewBox="0 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      fill={getIconColor(isActive)} 
      d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"
    />
  </svg>
);

// Random Bars Icon
export const RandomBarsIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={50} 
    height={45} 
    viewBox="-0.15 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(-0.00332239,-0.015878)">
      <path
        d="M 15.634692,3.8183833 H 12.562826 V 14.61777 h 3.071866 z"
        stroke={getIconColor(isActive)}
        strokeWidth="0.645667"
        fill="none"
      />
      <path
        d="M 4.4355448,1.413964 H 7.5074579 V 14.617792 H 4.4355448 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="0.645667"
        fill="none"
      />
      <path
        d="M 8.4992485,6.9800193 H 11.571009 V 14.617721 H 8.4992485 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="0.645667"
        fill="none"
      />
      <path
        d="M 3.4437964,4.7407497 H 0.37195278 V 14.617761 H 3.4437964 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="0.645667"
        fill="none"
      />
    </g>
  </svg>
);

// Ascending Bars Icon
export const AscendingBarsIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={50} 
    height={45} 
    viewBox="-0.15 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="matrix(0.20631415,0,0,0.17485675,-11.905395,-28.994176)">
      <path
        d="M 113.69984,187.07989 H 98.975758 v 62.14812 h 14.724082 z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.30209"
        fill="none"
      />
      <path
        d="m 118.35994,173.61998 h 14.72583 v 75.897 h -14.72583 z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.30035"
        fill="none"
      />
      <path
        d="m 59.77428,223.68488 h 14.92971 v 25.69176 H 59.77428 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.09647"
        fill="none"
      />
      <path
        d="M 93.784756,196.26167 H 79.23835 v 52.81523 h 14.546406 z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.46911"
        fill="none"
      />
    </g>
  </svg>
);

// Descending Bars Icon
export const DescendingBarsIcon = ({ isActive = true, ...props }) => (
  <svg 
    width={50} 
    height={45} 
    viewBox="-0.15 0 16 16" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="matrix(0.20631415,0,0,0.17485675,-11.905395,-28.994176)">
      <path
        d="m 79.262154,187.07989 h 14.724083 v 62.14812 H 79.262154 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.30209"
        fill="none"
      />
      <path
        d="m 74.602051,173.61998 h -14.72583 v 75.897 h 14.72583 z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.30035"
        fill="none"
      />
      <path
        d="M 133.18771,223.68488 H 118.258 v 25.69176 h 14.92971 z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.09647"
        fill="none"
      />
      <path
        d="M 99.177239,196.26167 H 113.72364 V 249.0769 H 99.177239 Z"
        stroke={getIconColor(isActive)}
        strokeWidth="3.46911"
        fill="none"
      />
    </g>
  </svg>
);