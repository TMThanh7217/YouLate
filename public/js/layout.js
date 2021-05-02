/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
let dropdown = document.getElementsByClassName("dropdown-btn")
let dropdownDisplayList = [ "none", "block"]
let dropdownDisplayTrigger = 0;
for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active")
    var dropdownContent = this.nextElementSibling;
    dropdownDisplayTrigger = (dropdownDisplayTrigger + 1) % 2
    dropdownContent.style.display = dropdownDisplayList[dropdownDisplayTrigger]
  });
}
