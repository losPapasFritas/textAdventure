document.addEventListener("DOMContentLoaded", function () {
    let fullMain = `<section>Choose a character! <br><br> <button id="paul">Paul the Knight</button><button id="hannah">Hannah the Magician</button><button id="mathew">Mathew the Tamer</button></section>`
    document.getElementById(`paul`).addEventListener(`click`,function(){
        fullMain+=`Paul is a knights apprentice, who has wored hard to get to where he is. He has `;
    });
});