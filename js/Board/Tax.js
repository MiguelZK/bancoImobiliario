class Tax extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace(player) {
        alert('Pague 200 de Impostos');
        player.pay(200);
    }

}