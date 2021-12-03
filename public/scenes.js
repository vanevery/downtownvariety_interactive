// scene logic code for viewers

let enter = {
    reset: function () {
    },
    run: function () {
        clear();

        if (isViewer) {
            fill(r, g, b);
            ellipse(mouseX, mouseY, size, size);
        } else {
            for (const u in users) {
                fill(users[u].r, users[u].g, users[u].b);
                ellipse(users[u].x, users[u].y, users[u].s, users[u].s);
            }
        }
    }
}

let coffee = {
    reset: function () {
        this.redCircleDefaultOpacity = 100;
        this.redCircleOpacity = this.redCircleDefaultOpacity;
        this.flameX = width / 2;
        this.flameY = height / 2;
        this.flameRadius = min(this.flameX, this.flameY); //this is used to map the redCircleOpacity
    },
    run: function () {
        clear();

        if (isViewer) {
            let flameDist = dist(mouseX, mouseY, this.flameX, this.flameY);
            this.redCircleOpacity = map(flameDist, this.flameRadius, 0, this.redCircleDefaultOpacity, 200);
            fill(220, 10, 10, this.redCircleOpacity);
            ellipse(mouseX, mouseY, 20, 20);
        } else {

            for (const u in users) {
                let flameDist = dist(users[u].x, users[u].x, this.flameX, this.flameY);
                let userRedCircleOpacity = map(flameDist, this.flameRadius, 0, this.redCircleDefaultOpacity, 200);
                fill(220, 10, 10, userRedCircleOpacity);
                ellipse(users[u].x, users[u].y, 20, 20);
            }
        }
    }
}

let postcrash = {
    reset: function () {
        this.whiteCircleOpacity = random(100, 200);
    },
    run: function () {
        clear();

        if (isViewer) {
            fill(255, this.whiteCircleOpacity);
            ellipse(mouseX, mouseY, 20, 20);
        } else {
            // console.log("drawing")
            for (const u in users) {
                let whiteCircleOpacity = (users[u].r + users[u].g + users[u].b)/3;
                fill(255, whiteCircleOpacity);
                ellipse(users[u].x, users[u].y, 20, 20);
            }
        }
    }
}

let club = {
    reset: function () {

    },
    run: function () {
        clear();
        background(bg, bga);
        if (bga > 0) bga--;
    },
    blink: function () {
        console.log("blink");
        bga = 128;
    }
}

let climax = {
    reset: function () {

    },
    run: function () {
        if (isViewer) {
            clear();
            fill(255, 150);
            ellipse(mouseX, mouseY, 20, 20);
        } else {
            background(0, 30);
            for (const u in users) {
                fill(255, 150);
                ellipse(users[u].x, users[u].y, 60, 60);
            }
        }
    }
}

let scenes = [enter, coffee, postcrash, club, climax];
