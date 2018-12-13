class Space{
    constructor(id, name){
        this.id = id,
        this.name = name
    }
}

class Property extends Space{
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
        this.type= 'property';
        this.owner = '';
    }

    payRent(payer, renter) {
            renter.receive(this.rent);
            payer.pay(this.rent);
            console.log(`${payer.name} pagou ${this.rent} para ${renter.name}`);
    }

    buy(player) {
        player.properties.push(this);
        player.pay(this.price);
        this.owner = player.name;
        console.log(player.balance);
    }

    handleSpace(player, players){
        if(this.owner == ''){
            setTimeout(() => {
                if(confirm(`Você quer comprar ${this.name}?`)){
                    this.buy(player);
                }
            }, 100);
        }else if(this.owner == player.name){
            console.log('comprar casa?');
        }else{
            players.forEach(owner => {
                if(this.owner == owner.name){
                    this.payRent(player, owner);
                }
            });
        }
       
        
    }
}

class Company extends Space{
    constructor(){

    }
}


class Start extends Space{
    constructor(id, name){
        super(id, name);
    }

    handleSpace(player){
        player.receive(200);
    }
}
