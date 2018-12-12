class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 1808,
            this.properties = [],
            this.companies = []
    }

    findProperty(property) {
        let p;
        this.properties.forEach(a => {
            if (a === property) {
                p = a;
            }
        });
        return p;
    }

    pay(value) {
        this.balance -= value;
    }
    receive(value) {
        this.balance += value;
    }

}