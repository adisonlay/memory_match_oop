

class Card{
    constructor(paramOptions, clickCallback){
        //bind callbacks
        this.handleClick = this.handleClick.bind(this);

        //store any passed in properties (parameters)
        this.options = {
            frontImage: paramOptions.frontImage,
            backImage: paramOptions.backImage,
            id: paramOptions.id,
            sounds: paramOptions.sounds
        }
        this.clickCallback = clickCallback;

        //store any required initial state for later use
        this.domElements = {
            cardContainer: null,
            card: null,
            frontFace: null,
            backFace: null
        }
    }

    render() {
        this.domElements.cardContainer = $('<div>').addClass('cardContainer');
        this.domElements.card = $('<div>').addClass('card');
        this.domElements.frontFace = $('<div>').addClass('front').css('background-image', 'url(' + this.options.frontImage + ')');
        this.domElements.backFace = $('<div>').addClass('back').css('background-image', 'url(' + this.options.backImage + ')');

        this.domElements.card.append(this.domElements.frontFace, this.domElements.backFace);
        this.domElements.cardContainer.append(this.domElements.card);

        this.domElements.cardContainer.on('click', this.handleClick);

        return this.domElements.cardContainer;
    }

    handleClick() {
        this.clickCallback(this);
    }

    revealFront() {
        this.domElements.backFace.hide();
    }

    revealBack() {
        this.domElements.backFace.show();
    }

    getID() {
        return this.options.id;
    }

    playSound(key) {
        if (this.options.sounds[key]) {
            var soundURL = this.options.sounds[key];
            var soundToPlay = new Audio(soundURL);
            soundToPlay.oncanplaythrough = soundToPlay.play();
        }
    }
}
