let key_sets = [];

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
        return true
    }
    return false

}

const parent = document.getElementById('load')
export function loadData(data) {
    let score = 0;

    data.map((chunk, index) => {

        const selector = `data-cell${index}`;
        const ans = chunk.answer;

        parent.innerHTML += `<div class="covers">
        <h3 class="question" id="question">
        Que:${index + 1} ➔ ${chunk.question}?            
        </h3>
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



    function len(id) {
        let Option_length = 0;
        options.forEach((option) => {
            if (option.classList.contains(id)) {
                Option_length++;
            }
        })
        return Option_length;
    }



    options.forEach((option) => {

        option.addEventListener("click", () => {

            key_sets.forEach((key) => {
                if (!key.locked) {

                    if (option.classList.contains(key.id)) {

                        if (check(options, option.innerText, key.answer, key.id, len(key.id))) {
                            score++
                            console.log(`${score} out of ${cards}`)

                        } else {
                            console.log(`${score} out of ${cards}`)
                        }

                        key.locked = true;
                    }


                }
            })
        })
    })

}


// console.log(key_sets)
