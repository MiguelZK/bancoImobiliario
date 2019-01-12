class Jail extends Space {
    constructor(id, name) {
        super(id, name);
    }

    moveToJail(player) {
        player.position = 10;
        movePawn(player, 10)
    }


    handleSpace(player) {
        player.arrested = true;
        this.moveToJail(player);
    }
}