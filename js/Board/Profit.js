class Profit extends Space{
    constructor(id, name) {
        super(id, name);
    }
    handleSpace(player) {
        alert('Receba 200 de Lucro');
        player.receive(200);
    }
}