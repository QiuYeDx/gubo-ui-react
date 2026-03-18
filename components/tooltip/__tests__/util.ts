export const isTooltipOpen = () => {
  const tooltipEle = document.querySelector('.g-tooltip');
  return tooltipEle && !tooltipEle.classList.contains('g-tooltip-hidden');
};
