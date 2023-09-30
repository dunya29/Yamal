// vacancy extra items
function vacSelect() {
    let location = document.querySelector(".vacancy__info").getAttribute("data-location")
    let position = document.querySelector(".vacancy__info").getAttribute("data-pos")
    const locSelect = document.querySelector(".select-custom.location")
    const posSelect = document.querySelector(".select-custom.position")
    if (locSelect) {
      setActiveOption(locSelect.querySelector(`[data-location="${location}"]`),locSelect)
      locSelect.querySelector(`[data-location="${location}"]`).querySelector("input").checked = true
    } 
    if (posSelect) {
      setActiveOption(posSelect.querySelector(`[data-pos="${position}"]`),posSelect)
      posSelect.querySelector(`[data-pos="${position}"]`).querySelector("input").checked = true
    }
  }

  // contact validate
function contactValidate() {
    let error = false;
    document.querySelectorAll("input[name=contact").forEach(function(inp) {
      if (inp.value.length > 0) {
        if (/@/.test(inp.value)) {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inp.value)) {
            error = true
            inp.parentNode.classList.add("error")
          } 
        } else {         
          if (!/^((\+7|7|8)([\s\-])?)?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(inp.value)) {
            error = true
            inp.parentNode.classList.add("error")
          }
        }
      }
    })
    return error
  }