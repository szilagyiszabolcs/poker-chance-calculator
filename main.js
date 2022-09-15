function newPlayer() {
    xd = document.getElementById("hands")
    xd.innerHTML += 
    `<span class="hand">
        <h6>Player 3</h6>
        <span class="cards">
            <card-t cid="As" class="card"></card-t>
            <card-t cid="Kh" class="card"></card-t>
        </span>
        <h6>5%</h6>
    </span>`
}