let key_sets = [];
const scorecard = document.getElementById("scorecard")
const circleContainer = document.querySelector("#circleContainer")

function setScoreCard(Score, Outof) {
    scorecard.querySelector('h2').innerText = `${Score}/${Outof} are Correct`;
    const percentage = Math.floor((Score / Outof) * 100)
    scorecard.querySelector('h3').innerText = `Score: ${percentage}%`;
}

const parent = document.getElementById('load')
export function loadData(data) {
    let score = 0;

    data.map((chunk, index) => {

        const selector = `data-cell${index}`;
        const ans = chunk.answer;
        let image = "<div></div>";
        if (chunk.imageLink !== "") {
            image = `<img src="${chunk.imageLink}" alt="  Please Provide Valid URL">`
        }



        circleContainer.innerHTML += `<a href="#circ${index}"><div class="circles">U</div></a>`
        parent.innerHTML += `<div class="covers" id="circ${index}">
        <h3 class="question_no">Que: ${index + 1} </h3>
        <h3 class="question">${chunk.question}?            
        </h3>
        ${image}
        <div>
            <button  class="options ${index}" ${selector}>
            ${chunk.option1} 
            </button>
        </div>
        <div>
            <button  class="options ${index}" ${selector}>
            ${chunk.option2} 
            </button>
        </div>
        <div>
            <button  class="options ${index}" ${selector}>
            ${chunk.option3} 
            </button>
        </div>
        <div>
            <button  class="options ${index}" ${selector}>
            ${chunk.option4} 
            </button>
        </div>

        </div>`

        const key = {
            answer: ans,
            id: index,
            locked: false
        }
        key_sets.push(key)
    })
    const options = document.querySelectorAll(".options");
    const Card_list = document.querySelectorAll('.covers')
    const cards = Card_list.length
    const question_no = document.querySelectorAll(".question_no");
    const Circles = document.querySelectorAll(".circles")
    function check(options, picked, answer, id, length) {
        picked = picked.toLowerCase();
        answer = answer.toLowerCase();

        options.forEach((option) => {
            if (option.classList.contains(id)) {
                if (option.innerText.toLowerCase() == answer) {
                    option.classList.add('true')
                }
                else {
                    option.classList.add('false')

                }
            }
        })

        if (picked == answer) {
            question_no[id].classList.add("true")
            Circles[id].classList.add("true")
            Circles[id].innerText = "C"
            return true
        }
        question_no[id].classList.add("falsacy")
        Circles[id].classList.add("falsacy")
        Circles[id].innerText = "W"


        return false

    }

    // to initialise scoreboard 
    setScoreCard(0, cards)

    function len(id) {
        let Option_length = 0;
        options.forEach((option) => {
            if (option.classList.contains(id)) {
                Option_length++;
            }
        })
        return Option_length;
    }



    options.forEach((option, index) => {

        option.addEventListener("click", () => {

            key_sets.forEach((key) => {
                if (!key.locked) {

                    if (option.classList.contains(key.id)) {

                        if (check(options, option.innerText, key.answer, key.id, len(key.id))) {
                            score++
                            console.log(`${score} out of ${cards}`)
                        }
                        option.style.border = "4px solid #44cd44"

                        setScoreCard(score, cards)
                        key.locked = true;
                    }


                }
            })
        })
    })

}


// console.log(key_sets)
