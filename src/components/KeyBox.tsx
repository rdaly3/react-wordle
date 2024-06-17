interface KeyBoxProps {
  letter: string;
  letterBgStyle?: string;
}

const KeyBox = ({ letter, letterBgStyle }: KeyBoxProps) => {
  if (letter === "") {
    return <div className="hidden"></div>;
  }
  if (letter === "Enter") {
    return (
      <div className="flex items-center justify-center bg-gray-300 w-[78px] h-16 rounded text-xs font-semibold">
        {letter}
      </div>
    );
  }

  if (letter === "Backspace") {
    return (
      <div className="flex items-center justify-center bg-gray-300 w-[70px] h-16 rounded">
        {backspace}
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center w-12 h-16 rounded uppercase ${letterBgStyle}`}
    >
      {letter}
    </div>
  );
};

export default KeyBox;

const backspace = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
    ></path>
  </svg>
);
