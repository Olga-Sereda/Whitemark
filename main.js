const houseOneHighlights = document.querySelectorAll(".house-side__highlight");
const tooltip = document.getElementById('tooltip');
const apartmentBlock = document.getElementById("tooltip__apartment");

//подсветка корпусов при загрузке страницы
window.addEventListener('load', () => {
    houseOneHighlights.forEach((el) => {
        el.style.opacity = "0.8";
    }); 

    setTimeout(() => {
      houseOneHighlights.forEach((el) => {
        el.style.opacity = "0";
      });
    }, 2000);
})

//подсветка корпусов при наведении, заполнение баблов контентом и отображение их
houseOneHighlights.forEach(el => {
    el.addEventListener("mouseover", () => {
        el.style.opacity = '0.8'
        tooltip.style.display = 'block';

        const nameContent = el.getAttribute("data-name");
        const apartmentCount = el.getAttribute("data-apartment-count");
        apartmentBlock.innerHTML = `
            <div id="tooltip__apartment" class="tooltip__apartment">
                <p class="tooltip__apartment-count">${apartmentCount}</p>
                <p class="tooltip__apartment-name">${nameContent}</p>
            </div>`;

        const floorNumber = el.getAttribute("data-floor");
        document.getElementById("floor").innerHTML = `<p id="floor" class="tooltip__floor">${floorNumber} этаж</p>`;

        const floorBlock = document.getElementById("floor-block");
        el.getAttribute("data-hide-floor") ? floorBlock.style.display = "none" : floorBlock.style.display = "block";
        
        const parametersBlock = document.getElementById("tooltip__parameters1");
        el.getAttribute("data-hide-parameters") ? parametersBlock.style.display = "none" : parametersBlock.style.display = "block"
        

        if (el.getAttribute("data-remove-from")) {
        const countFrom = document.querySelectorAll(
          ".tooltip__parameters-count-from"
        );
        countFrom.forEach((countEl) => {
            countEl.innerHTML = countEl.innerHTML.replace("от ", "");
        });
        }
    });

    el.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.pageX + 25}px`;
      tooltip.style.top = `${event.pageY - 200}px`;
    });

    el.addEventListener("mouseout", () => {
    el.style.opacity = "0";

    tooltip.style.display = "none";
    });
});

//переключение подсветок в зависимости от вида недвижимости 
function ChangeHighlits(pathId, radioBtn) {
  houseOneHighlights.forEach((el) => {
    el.style.display = "none";
  });

  const selectedHighlight = document.getElementById(pathId);
  selectedHighlight.style.display = "block";

  const label = radioBtn.nextElementSibling;
  const titleContainer = document.getElementById("title");
  titleContainer.textContent = label.textContent
}


//переключение сторон дома и соответствующего этому контента (поворот кнопок и пр.)
const streetImg = document.getElementById("house-streets");
const compassImg = document.getElementById("house-compass");
let currentHouseSide = 1;

document.querySelector(".change-btn").addEventListener("click", (event) => {
    event.preventDefault(); 

    const view1 = document.querySelector(".change-btn__view1");
    const view2 = document.querySelector(".change-btn__view2");

    const temp = view1.textContent;
    view1.textContent = view2.textContent;
    view2.textContent = temp;

    houseOneHighlights.forEach((el) => {
      el.style.display = "block";
    });


    const currentContainer = document.getElementById(
      `house-side-${currentHouseSide}`
    );
    const nextContainer = document.getElementById(
      `house-side-${currentHouseSide === 1 ? 2 : 1}`
    );

    currentContainer.style.display = "none"; 
    nextContainer.style.display = "block";

    currentHouseSide = currentHouseSide === 1 ? 2 : 1;


    streetImg.style.transform =
      streetImg.style.transform === "rotate(40deg)"
        ? "rotate(115deg)"
        : "rotate(40deg)";

    compassImg.style.transform =
      compassImg.style.transform === "rotate(-60deg)"
        ? "rotate(0deg)"
        : "rotate(-60deg)";
});