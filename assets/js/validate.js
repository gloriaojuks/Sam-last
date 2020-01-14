window.onload = function app() {
  let forms = document.querySelectorAll("form[data-validate]");
  forms.forEach(form => {
    let inputs = form.querySelectorAll("input[data-validate]");
    let isValid = {};
    inputs.forEach((/**@type {HTMLInputElement}*/ input) => {
      isValid[input.name] = false;
      input.addEventListener("blur", () => {
        isValid[input.name] = validate(input);
        /**@type {HTMLButtonElement} */
        let p = input.nextElementSibling;
        p.textContent = input.dataset.error;
        if (!isValid[input.name]) {
          p.classList.remove("hidden");
        } else {
          p.classList.add("hidden");
        }
        /**@type {HTMLButtonElement} */
        let submitButton = form.querySelector("button[type=submit]");
        if (Object.values(isValid).every(v => v)) {
          submitButton.removeAttribute("disabled");
        } else {
          submitButton.setAttribute("disabled", "disabled");
        }
      });
    });
  });
  let plans = document.querySelectorAll(".plan");

  plans.forEach(
    /**@type {HTMLInputElement}*/ plan => {
      plan.addEventListener(
        "click",
        () => {
          plans.forEach(p => {
            p.classList.remove("bg-white", "bg-gray-200");
            if (p.isSameNode(plan)) {
              p.classList.add("bg-white");
              document
                .querySelector(p.dataset.target)
                .classList.remove("hidden");
            } else {
              p.classList.add("bg-gray-200");
              if (
                !document
                  .querySelector(p.dataset.target)
                  .classList.contains("hidden")
              ) {
                document
                  .querySelector(p.dataset.target)
                  .classList.add("hidden");
              }
            }
          });
        },
        false
      );
    }
  );
  document.querySelectorAll("[data-file] input").forEach(
    /**@type {HTMLInputElement}*/ file => {
      file.addEventListener("change", () => {
        file.parentElement.querySelector(".info").textContent =
          file.files[0].name;
      });
    }
  );
};
function validate(/**@type {HTMLInputElement}*/ input) {
  console.log(input.type);
  if (input.required) {
    if (!input.value.trim()) return false;
    if (
      input.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
    )
      return false;
  }
  return true;
}
