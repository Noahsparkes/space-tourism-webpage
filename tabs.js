const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const mainContainer = document.querySelector('main');

let currentTabIndex = 0;

// Add event listeners
tabList.addEventListener('keydown', handleKeydown);
tabs.forEach((tab) => {
  tab.addEventListener('click', handleTabClick);
});

// Function to handle keydown events
function handleKeydown(event) {
  const { keyCode } = event;
  const isLeftArrow = keyCode === 37;
  const isRightArrow = keyCode === 39;

  if (isLeftArrow || isRightArrow) {
    tabs[currentTabIndex].setAttribute("tabindex", -1);
  }

  if (isRightArrow) {
    currentTabIndex = (currentTabIndex + 1) % tabs.length;
  } else if (isLeftArrow) {
    currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
  }

  tabs[currentTabIndex].setAttribute("tabindex", 0);
  tabs[currentTabIndex].focus();
}

// Function to handle tab clicks
function handleTabClick(event) {
  const clickedTab = event.target;
  const targetPanelId = clickedTab.getAttribute("aria-controls");
  const targetImageId = clickedTab.getAttribute("data-image");

  // Hide all tab panels and reveal the selected one
  const tabPanels = mainContainer.querySelectorAll('article');
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });
  mainContainer.querySelector(`#${targetPanelId}`).hidden = false;

  // Hide all images and reveal the one associated with the clicked tab
  const tabImages = mainContainer.querySelectorAll('picture');
  tabImages.forEach((img) => {
    img.hidden = true;
  });
  mainContainer.querySelector(`#${targetImageId}`).hidden = false;

  // Update aria-selected for accessibility
  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", false);
  });
  clickedTab.setAttribute("aria-selected", true);
}