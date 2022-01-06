class Property extends Space {

// Substitui os cálculos em cima do aluguel básico por valores fixos conforme nº de casas.
// O valor do aluguel do imóvel sem casas será tratado como ho0 (zero houses/hotel)
// Hotel aqui será tratado como ho5 (5 casas).
// A hipoteca (mortgage) será calculada em cima do valor dos imóveis.
// O arquivo data.js deverá ser alterado em cada item para conter os valores finais conforme as cartas do Banco Imobiliário
    constructor(id, name, price, ho0, ho1, ho2, ho3, ho4, ho5, hotel_housePrice, totalHouse, color) {
        super(id, name),
            this.price = price,
            this.ho0 = ho0,
            this.ho1 = ho1,
            this.ho2 = ho2,
            this.ho3 = ho3,
            this.ho4 = ho4,
            this.ho5 = ho5,
            this.hotel_housePrice = hotel_housePrice,
            this.totalHouse = totalHouse,
            this.mortgage = price/2,
            this.color = color,
            this.type = 'property',
            this.owner = ''
    }
/*    
    constructor(id, name, price, rent, housePrice, hotelPrice, multiplier, totalHouse, mortgage, color) {
        super(id, name),
            this.price = price,
            this.rent = rent,
            this.housePrice = housePrice,
            this.hotelPrice = hotelPrice,
            this.multiplier = multiplier,
            this.totalHouse = totalHouse,
            this.totalHotel = 0,
            this.mortgage = mortgage,
            this.color = color,
            this.type = 'property',
            this.owner = ''
    }
*/
 // Apliquei template literals para buscar o valor do aluguel com casas ou hotel

    getFinalRent() {
        const th = this.totalHouse;
        const baseValor = `ho${th}`;
        const result = this[baseValor];
        // alert(`O valor da diária aqui será ${result}`);
        return result;
    }
/*
    getFinalRent() {
        const th = this.totalHouse;
        const r = this.rent;
        const m = this.multiplier;
        const tHotel = this.totalHotel;
        const result = (r + ((m*th)*r));
        if(tHotel > 0){
            return Math.floor(result + ((100*m)*(tHotel)));
        }else{
            return Math.floor(result);
           
        }
        
    }
*/
    hasHouse() {
        return this.totalHouse > 0;
    }

    canBuyHouse(player) {
        const colorLength = $(`.top-bar.${this.color}`).length;
        const playerTotalColor = player.properties.filter(property => property.color == this.color).length;
        return colorLength == playerTotalColor ? true : false;
    }

    buyHouse(player) {
        if (player.hasMoney(this.housePrice)) {
            player.pay(this.housePrice);
            createHouse(this)
            this.totalHouse += 1;
        }
    }

    buyHotel(player) {
        if (player.hasMoney(this.hotelPrice)) {
            player.pay(this.hotelPrice);
            createHotel(this);
            this.totalHouse = 0;
            this.totalHotel += 1;
        }
    }

    handleSpace(player, players) {
        if (this.owner == '') {

            if (this.confirmAction('new')) {
                this.buy(player, 'property')
            }

        } else if (this.owner == player.name) {
            if (this.canBuyHouse(player)) {
                if (this.totalHouse < 4 && this.confirmAction('house')) {
                    this.buyHouse(player);
                } else if (this.totalHouse == 4 && this.confirmAction('hotel')) {
                    deleteHouses(this);
                    this.buyHotel(player);
                }
            } else {
                alert('Voce precisa ter todas as propriedades com mesma cor para construir uma casa!')
           }

        } else {            
            players.forEach(owner => {
                if (this.owner == owner.name) {
                    this.payRent(player, owner, this.getFinalRent());
                }
            });
        }

    }
}