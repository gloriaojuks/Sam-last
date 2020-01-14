/**@type {NodeList} */
let dropContents;
window.onload = function() {
  let els = document.querySelectorAll("[data-dropdown]");
  els.forEach(el => {
    el.setAttribute("tabindex", "-1");
    el.querySelector("[data-drop-toggle]").addEventListener("click", ev => {
      closeAllDrop();
      el.querySelector("[data-drop-content]").classList.remove("hidden");
    });
    el.addEventListener("blur", ev => {
      if (ev.relatedTarget && isDropContent(ev.relatedTarget, ev.target)) {
        return;
      }
      el.querySelector("[data-drop-content]").classList.add("hidden");
    });
  });
  dropContents = document.querySelectorAll("[data-drop-content]");
};

window.addEventListener("click", closeAllDrop);
function closeAllDrop(ev) {
  if (dropContents) {
    dropContents.forEach(drop => {
      if (ev && !ev.target.closest("[data-dropdown]")) {
        drop.classList.add("hidden");
      }
      if (!ev) {
        drop.classList.add("hidden");
      }
    });
  }
}
/**
 *
 * @param {HTMLElement} el
 */
function isDropContent(el, dropParent) {
  let p = el.closest("[data-dropdown]");
  console.log(p, dropParent);
  if (p && p.isSameNode(dropParent)) {
    return true;
  }
  return false;
}
