class Space {
    constructor(id, name) {
        this.id = id,
            this.name = name
    }

    payRent(payer, renter, rent) {
        renter.receive(rent);
        payer.pay(rent);
        console.log(`${payer.name} pagou ${rent} para ${renter.name}`);
    }

    buy(player, type) {
        if(type == 'property'){
            player.properties.push(this);
        }else if(type == 'company'){
            player.companies.push(this);
        }
        player.pay(this.price);
        this.owner = player.name;
    }
}

class Property extends Space {
    constructor(id, name, price, rent, housePrice, houseHotel, multiplier, totalHouse, mortgage, color) {
        super(id, name);
        this.price = price;
        this.rent = rent;
        this.housePrice = housePrice;
        this.houseHotel = houseHotel,
        this.multiplier = multiplier;
        this.totalHouse = totalHouse;
        this.mortgage = mortgage;
        this.color = color;
        this.type = 'property';
        this.owner = '';
    }



    handleSpace(player, players) {
        if (this.owner == '') {
            setTimeout(() => {
                if (confirm(`Você quer comprar ${this.name}?`)) {
                    this.buy(player);
                }
            }, 100);
        } else if (this.owner == player.name) {
            console.log('comprar casa?');
        } else {
            players.forEach(owner => {
                if (this.owner == owner.name) {
                    const finalRent = this.rent;
                    this.payRent(player, owner, finalRent);
                }
            });
        }


    }
}

class Company extends Space {
    constructor(id, name, price, rent) {
        super(id, name),
            this.price = price,
            this.rent = rent,
            this.owner = ''
    }

    handleSpace(player, players) {
        if(this.owner == ''){
            setTimeout(() => {
                if(confirm(`Você quer comprar ${this.name}?`)){
                    this.buy(player);
                }
            }, 100);
        }else if (this.owner == player.name) {
            console.log('Essa é sua companhia');
        }else{
            players.forEach(owner => {
                if(this.owner == owner.name){
                    const finalRent = this.rent * player.rollDice();
                    this.payRent(player, owner, finalRent);
                }
            });
        }
    }
}

class LuckSetback extends Space{
    constructor(id){
        super(id);
        this.cards = luckSetback;
    }
    pickCard(){
        const randomCard = (Math.floor(Math.random()*this.cards.length)+1);
        let pickedCard;
        this.cards.forEach(card => {
            if(card.id == randomCard){
                pickedCard =  card;
            }
        })
        return pickedCard;
 
    }
    handleSpace(player) {
       const card =  this.pickCard();
       if(card.type == 'setback'){
        console.log(`${card.description} pague ${card.price}`)
        player.pay(card.price);
       }else{
        console.log(`${card.description} receba ${card.price}`);
        player.receive(card.price);
       }
        
    }
}


class Start extends Space {
    constructor(id, name) {
        super(id, name);
    }

    handleSpace(player) {
        player.receive(200);
    }
}

class VisitJail extends Space{
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() {}

}

class FreeParking extends Space{
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() {}
}