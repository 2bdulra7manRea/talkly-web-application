export const ButtonTab = ({ value, tabCurrentValue, handleTabs }) => {
  return (
    <button
      className={tabCurrentValue === value ? "current-tab" : ""}
      onClick={() => handleTabs(value)}
    >
      {value}
    </button>
  );
};
