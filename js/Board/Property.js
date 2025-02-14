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
        const baseValor = `ho${th}`; // Referência baseada no número de casas - considerando que, internamente, hotel = 5 casas;
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
        const colorLength = $(`.top-bar.${this.color}`).length; // Verifica quantas propriedades da mesma cor existem
        const playerTotalColor = player.properties.filter(property => property.color == this.color).length; // Filtra as propriedades do player que tem a mesma cor da propriedade onde ele está - guarda na constante o número de propriedades daquela cor.
        return colorLength == playerTotalColor ? true : false; //Se o número de propriedades é o total da mesma cor, pode construir casa.
    }

    buyHouse(player) {
        if (player.hasMoney(this.hotel_housePrice, `uma casa aqui`)) { // Função hasMoney() está em player.js
            player.pay(this.hotel_housePrice); // Função pay() está em player.js e tem como parâmetro "value"
            createHouse(this) // Função createHouse(property) está em index.js e tem como parâmetro "property"
            this.totalHouse += 1;
        }
    }

    buyHotel(player) {
        if (player.hasMoney(this.hotel_housePrice, `um hotel aqui`)) {
            player.pay(this.hotel_housePrice);
            createHotel(this);
            this.totalHouse = 0;
            this.totalHotel += 1;
        }
    }

    handleSpace(player, players) {
        if (this.owner == '') { // Verifica se propriedade possui dono

            if (this.confirmAction('new')) { // Verifica se deseja comprar a propriedade
                this.buy(player, 'property') // Se sim, chama a função "buy", que está em space.js
            }

        } else if (this.owner == player.name) { // Se propriedade é do jogador/player que está na propriedade
            if (this.canBuyHouse(player)) { // Verifica se pode comprar uma casa (função acima)
                if (this.totalHouse < 4 && this.confirmAction('house')) { // Se tem menos de 4 casas, pergunta se quer construir uma casa
                    this.buyHouse(player); // Se sim, constrói +1 casa (função acima)
                } else if (this.totalHouse == 4 && this.confirmAction('hotel')) { // Se tem 4 casas, pergunta se quer construir hotel
                    deleteHouses(this); // Se sim, deleta as casas
                    this.buyHotel(player); // ...e constrói o hotel (função acima)
                }
            } else { // Se não pode construir casa (é proprietário, mas não tem todas propriedades daquela cor)
                alert('Voce precisa ter todas as propriedades com mesma cor para construir uma casa!')
           }

        } else {
            players.forEach(owner => { // Para cada jogador, itera para ver se é o proprietário do imóvel
                if (this.owner == owner.name) { // Se o nome de proprietário do imóvel é o "proprietário do teste", tem-se o "owner" para receber
                    this.payRent(player, owner, this.getFinalRent()); // já tinha o player; agora tem proprietário e roda função p/ saber valor do aluguel.
                }
            });
        }

    }
}