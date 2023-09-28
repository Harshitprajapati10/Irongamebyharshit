let player = document.getElementById("player")
let player_img = document.getElementById("img")
let gamecontainer = document.getElementsByClassName("gamecontainer")[0]
let title = document.getElementById("gameinfo")
let game_title = document.getElementById("title")
let current_score = document.getElementById("scoreshow")
let buttoncontainer = document.getElementById("btncontainer")
let start_game_button = document.getElementById("start_game_button")
let enemy = document.getElementsByClassName("enemy")[0]
let btns = document.getElementsByClassName("btn")
let game_active = true
let enemy_images = ["url(static/v1.png)", "url(static/v2.png)", "url(static/v3.png)", "url(static/v4.png)"]
player.classList.add("animation")
let audio = new Audio("static/audio.mp3")


let make_forward = () => {
    playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'))
    player.style.left = playerX + 32 + "px"
    player_img.classList.remove("imgflipper")
    if (playerX > 1336) {
        player.style.left = -136 + "px"
    }
}
let make_backward = () => {
    playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'))
    player.style.left = (playerX - 32) + "px"
    player_img.classList.add("imgflipper")
    if (playerX <= -136) {
        player.style.left = 1336 + "px"
    }
}
let to_jump= () =>{
    player.classList.add("jump")
    player_img.src = "static/2.png"
    setTimeout(() => {
        player.classList.remove('jump')
        player_img.src = "static/1.png"
    }, 1000)
}
let to_upward= () =>{
    playerY = parseInt(window.getComputedStyle(player, null).getPropertyValue('bottom'))
    if (playerY < 200) {
        player.style.bottom = playerY + 74 + "px"
        image_adder(playerY)
    }
}
let to_downward= () =>{
    playerY = parseInt(window.getComputedStyle(player, null).getPropertyValue('bottom'))
    if (playerY > 30) {
        player.style.bottom = (playerY - 74) + "px"
        image_adder(playerY)
    }
}
let image_adder= (Y) =>{
    if (Y > 104) {
        player_img.src = "static/2.png"
    }
    else {
        player_img.src = "static/1.png"
    }
}
let button_adder= () =>{
    arr_of_btns = ["upward/H", "downward/B", "jump/uparrow", "right", "left"]
    for (let i = 0; i < 5; i++) {
        let button = document.createElement("button")
        button.innerHTML = `${arr_of_btns[i]}`
        button.className = "btn"
        button.id = `btn${i + 1}`
        gamecontainer.appendChild(button)
    }
}
let button_listener= () =>{
    let upward_btn = document.getElementById("btn1")
    upward_btn.addEventListener("click", to_upward)

    let downward_btn = document.getElementById("btn2")
    downward_btn.addEventListener("click", to_downward)

    let jump_btn = document.getElementById("btn3")
    jump_btn.addEventListener("click", to_jump)

    let right_btn = document.getElementById("btn4")
    right_btn.addEventListener("click", make_forward)

    let left_btn = document.getElementById("btn5")
    left_btn.addEventListener("click", make_backward)
}
let createEnemy= () =>{
    let enemy_index = Math.floor(Math.random() * enemy_images.length); 

    let img_box = document.createElement("div");
    img_box.style.backgroundImage = enemy_images[enemy_index];
    img_box.style.backgroundSize = "cover"
    img_box.classList.add("enemy");
    img_box.classList.add("enemy-animation");

    img_box.addEventListener("animationiteration", () => {
        let newIndex = (enemy_index + 1) % enemy_images.length;
        img_box.style.backgroundImage = enemy_images[newIndex];
        img_box.style.backgroundSize = "cover"
        enemy_index = newIndex;
    });

    gamecontainer.appendChild(img_box);
}
let detect_collisions = () =>{
    if (!game_active) return;
    setInterval(() => {
        let playerRect = player.getBoundingClientRect();
        let enemyRect = document.querySelector(".enemy").getBoundingClientRect();
        if (
            playerRect.right > enemyRect.left + 25 &&
            playerRect.left+ 25 < enemyRect.right &&
            playerRect.bottom > enemyRect.top+ 25 &&
            playerRect.top+ 25 < enemyRect.bottom
        ) {
            game_over()
        }
    }, 10);
    current_score.innerText = `Score ${score}`
}
let score_increaser = () =>{
    score += 1
    current_score.innerText = `Score :${score}`
}

let Main_game = () =>{
    audio.play()
    game_active = true
    document.onkeydown = (e) => {
        if(!game_active) return
        if (e.keyCode == 39) { //right arrow key
            make_forward()
        }
        if (e.keyCode == 37) { //left arrow key
            make_backward()
        }
        if (e.keyCode == 38) { //up arrow key
            to_jump()
        }
        if (e.keyCode == 72) { //h
            to_upward()
        }
        if (e.keyCode == 66) { //b
            to_downward()
        }
    
    }
    const gameLoopInterval = setInterval(() => {
        if (!game_active) {
            clearInterval(gameLoopInterval); 
            return;
        }

        score_increaser();
    }, 1000);
    if(game_active){
        button_adder();
        button_listener();
    }
    createEnemy();
    detect_collisions();
}

let game_over = () =>{
    game_active = false;
    title.innerText = "Game Over";
    current_score.innerText = `Score : ${score}`;
    let enemy = document.getElementsByClassName("enemy")[0]
    enemy.style.animation = "none"
}

score = 0
start_game_button.addEventListener("click",Main_game)



