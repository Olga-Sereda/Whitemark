const houseOneHighlights = document.querySelectorAll(".highlight");
const tooltip = document.getElementById('tooltip1');
const apartmentBlock = document.getElementById("apartment-block");


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

houseOneHighlights.forEach(el => {
    el.addEventListener("mouseover", () => {
        el.style.opacity = '0.8'
        tooltip.style.display = 'block';

        const nameContent = el.getAttribute("data-name");
        const apartmentCount = el.getAttribute("data-apartment-count");
        apartmentBlock.innerHTML = `
            <div id="apartment-block" class="apartment-block">
                <p class="apartment-count">${apartmentCount}</p>
                <p class="apartment-name">${nameContent}</p>
            </div>`;

        const floorNumber = el.getAttribute("data-floor");
        document.getElementById('floor').innerHTML = `<p class="floor">${floorNumber} этаж</p>`;

        const floorBlock = document.getElementById("floor-block");
        el.getAttribute("data-hide-floor") ? floorBlock.style.display = "none" : floorBlock.style.display = "block";
        
        const parametersBlock = document.getElementById("parameters-block1");
        el.getAttribute("data-hide-parameters") ? parametersBlock.style.display = "none" : parametersBlock.style.display = "block"
        

        if (el.getAttribute("data-remove-from")) {
        const countFrom = document.querySelectorAll(".count-from");
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



const streetImg = document.getElementById("house-streets");
const compassImg = document.getElementById("house-compass");
let currentHouseSide = 1;

document.querySelector(".change-btn").addEventListener("click", (event) => {
    event.preventDefault(); 

    const view1 = document.querySelector(".change-view1");
    const view2 = document.querySelector(".change-view2");

    const temp = view1.textContent;
    view1.textContent = view2.textContent;
    view2.textContent = temp;

    houseOneHighlights.forEach((el) => {
      el.style.display = "block";
    });


    const currentContainer = document.getElementById(
      `houseSide${currentHouseSide}-block`
    );
    const nextContainer = document.getElementById(
      `houseSide${currentHouseSide === 1 ? 2 : 1}-block`
    );

    currentContainer.style.display = "none"; 
    nextContainer.style.display = "block";

    currentHouseSide = currentHouseSide === 1 ? 2 : 1;


    streetImg.style.transform =
      streetImg.style.transform === "rotate(-115deg)"
        ? "rotate(-40deg)"
        : "rotate(-115deg)";

    compassImg.style.transform =
      compassImg.style.transform === "rotate(-60deg)"
        ? "rotate(0deg)"
        : "rotate(-60deg)";
});