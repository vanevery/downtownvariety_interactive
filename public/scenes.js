// scene logic code

let enter = {
    reset: function () {
        this.fillc = 0;
    },
    run: function () {
        background(bg, bga);
        fill(this.fillc);
        noStroke();
        for (const u in users) {
            fill(users[u].r, users[u].g, users[u].b);
            ellipse(users[u].x, users[u].y, users[u].s, users[u].s);
        }
        this.fillc--;
    }
}

let coffee = {
    reset: function () {
        this.redCircleDefaultOpacity = 128; //178 = 255 * 0.7
        this.redCircleOpacity = this.redCircleDefaultOpacity;
        this.flameX = width / 2;
        this.flameY = height / 2;
        this.flameRadius = min(this.flameX, this.flameY); //this is used to map the redCircleOpacity
    },
    run: function () {
        background(0);
        let flameDist = dist(mouseX, mouseY, this.flameX, this.flameY);
        this.redCircleOpacity = map(flameDist, this.flameRadius, 0, this.redCircleDefaultOpacity, 255);
        fill(220, 10, 10, this.redCircleOpacity);
        ellipse(mouseX, mouseY, 20, 20);
    }
}

let postcrash = {
    reset: function () {
        this.whiteCircleOpacity = random(100, 255);
    },
    run: function () {
        background(0);
        fill(255, this.whiteCircleOpacity);
        ellipse(mouseX, mouseY, 20, 20);
    }
}

let club = {
    reset: function () {

    },
    run: function () {
        background(bg, bga);
    },
    blink: function () {
        console.log("blink");
        bg = 128;
        bga = 128;
        setTimeout(function () {
            bg = 0;
            bga = 20;
        }, 20);
    }
}

let climax = {
    reset: function () {

    },
    run: function () {
    }
}

let scenes = [enter, coffee, postcrash, club, climax];