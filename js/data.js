const luckSetback = [{
    id: 1,
    type: 'luck',
    price: 100,
    description: 'O seu cachorro policial tirou o 1º prêmio na exposição do Kennel Club'
},
{
    id: 2,
    type: 'setback',
    price: 100,
    description: 'Parabéns! Você convidou seus amigos para festejar o aniversário'
},
{
    id: 3,
    type: 'setback',
    price: 100,
    description: 'Você é papai outra vez! Despesas de maternidade'
},
{
    id: 4,
    type: 'luck',
    price: 45,
    description: 'Você saiu de férias e se hospedou na casa de um amigo. Você economizou o hotel'
},
{
    id: 5,
    type: 'luck',
    price: 45,
    description: 'Você saiu de férias e se hospedou na casa de um amigo. Você economizou o hotel'
},
{
    id: 6,
    type: 'luck',
    price: 200,
    description: 'Você está com sorte. Suas ações na Bolsa de Valores estão em alta'
},
{
    id: 7,
    type: 'setback',
    price: 45,
    description: 'Seus parentes do interior vieram passar umas "férias" na sua casa'
},
{
    id: 8,
    type: 'luck',
    price: 150,
    description: 'Seus parentes do interior vieram passar umas "férias" na sua casa'
},
{
    id: 9,
    type: 'luck',
    price: 150,
    description: 'Inesperadamente você recebeu uma herança que já estava esquecida'
}
]

const board = [
    new Start(0, 'start'),
    new Property(1, 'Leblon', 100, 6, 50, 50, 3, 0, 50, 'pink'),
    new LuckSetback(2),
    new Property(3, 'Av. Presidente Vargas', 60, 2, 50, 50, 2, 0, 50, 'pink'),
    new Property(4, 'Av. Nossa Senhora de Copacabana', 60, 4, 50, 50, 2.2, 0, 30, 'pink'),
    new Company(5, 'Companhia Ferroviaria', 200, 50),
    new Property(6, 'Av. Brigadeiro Faria Lima', 240, 20, 150, 150, 4.3, 0, 120, 'blue'),
    new Company(7, 'Companhia de Viação', 200, 50),
    new Property(8, 'Av. Rebouças', 220, 18, 150, 150, 4, 0, 110, 'blue'),
    new Property(9, 'Av. 9 de Julho', 220, 18, 150, 150, 4, 0, 110, 'blue'),
    new VisitJail(10, 'Visit Jail'),
    new Property(11, 'Av. Europa', 200, 16, 100, 100, 3.7, 0, 100, 'purple'),
    new LuckSetback(12),
    new Property(13, 'Augusta', 180, 14, 100, 100, 3.5, 0, 90, 'purple'),
    new Property(14, 'Pacaembu', 180, 14, 100, 100, 3.5, 0, 100, 'purple'),
    new Company(15, 'Companhia de Táxi', 150, 40),
    new LuckSetback(16),
    new Property(17, 'Interlagos', 350, 35, 200, 200, 6, 0, 175, 'orange'),
    new Start(18, 'start'),
    new Property(19, 'Morumbi', 400, 50, 200, 200, 6.5, 0, 200, 'orange'),
    new FreeParking(20, 'Free Parking')

];


// {id: 12, 'FLAMENGO', 120, 8, 50, 50, 3.2, 0, 60, 'red'},
// {id: 13, 'BOTAFOGO', 100, 6, 0, 50, 3, 0, 50, 'red'},
// {id: 14, 'BRASIL', 160, 12, 100, 100, 3.5,  0, 80, 'yellow'},
// {id: 15, 'PAULISTA', 140, 10, 100, 100, 3.2, 0, 70, 'yellow'},
// {id: 16, 'JARDIM EUROPA', 140, 10, 100, 100, 3.2, 0, 70, 'yellow'},
// {id: 17, 'COPACABANA', 260, 22, 150, 150, 4.5, 0, 130, 'green'},
// {id: 18, 'VIEIRA SOUTO', 320, 28, 200, 200, 5.8, 0, 160, green'},
// {id: 19, 'ATLÂNTICA', 300, 26, 200, 200, 5, 0, 150, 'green'},
// {id: 20, 'IPANEMA', 300, 26, 200, 200, 5, 0, 150, 'green'},
// {id: 21, 'JARDIM PAULISTA', 280, 24, 150, 150, 4.8, 0, 140, 'dark-blue'},
// {id: 22, 'BROOKLIN', 260, 22, 150, 150, 4.5, 0, 130, 'dark-blue'},

// const properties = [
//     {id: 1, name: 'leblon', price:100, rent: 6, housePrice:50, houseHotel:50, 
//     multiplier: 3, totalHouse: 0, mortgage:50, color:'pink'},
//     {id: 2, name: 'presidente vargas', price:60, rent: 2, housePrice:50, houseHotel:50, 
//     multiplier: 2, totalHouse: 0, mortgage:30, color:'pink'},
//     {id: 3, name: 'nossa senhora de copacabana', price:60, rent: 4, housePrice:50, houseHotel:50, 
//     multiplier: 2.2, totalHouse: 0, mortgage:30, color:'pink'},
//     {id: 4, name: 'REBOUÇAS', price:220, rent: 18, housePrice:150, houseHotel:150, 
//     multiplier: 4, totalHouse: 0, mortgage:110, color:'blue'},
//     {id: 5, name: '9 DE JULHO', price:220, rent: 18, housePrice:150, houseHotel:150, 
//     multiplier: 4, totalHouse: 0, mortgage:110, color:'blue'},
//     {id: 6, name: 'BRIGADEIRO FARIA LIMA', price:240, rent: 20, housePrice:150, houseHotel:150, 
//     multiplier: 4.3, totalHouse: 0, mortgage:120, color:'blue'},
//     {id: 7, name: 'AUGUSTA', price:180, rent: 14, housePrice:100, houseHotel:100, 
//     multiplier: 3.5, totalHouse: 0, mortgage:90, color:'purple'},
//     {id: 8, name: 'EUROPA', price:200, rent: 16, housePrice:100, houseHotel:100, 
//     multiplier: 3.7, totalHouse: 0, mortgage:100, color:'purple'},
//     {id: 9, name: 'PACAEMBU', price:180, rent: 14, housePrice:100, houseHotel:100, 
//     multiplier: 3.5, totalHouse: 0, mortgage:100, color:'purple'},
//     {id: 10, name: 'INTERLAGOS', price:350, rent: 35, housePrice:200, houseHotel:200, 
//     multiplier: 6, totalHouse: 0, mortgage:175, color:'orange'},
//     {id: 11, name: 'MORUMBI', price:400, rent: 50, housePrice:200, houseHotel:200, 
//     multiplier: 6.5, totalHouse: 0, mortgage:200, color:'orange'},
//     {id: 12, name: 'FLAMENGO', price:120, rent: 8, housePrice:50, houseHotel:50, 
//     multiplier: 3.2, totalHouse: 0, mortgage:60, color:'red'},
//     {id: 13, name: 'BOTAFOGO', price:100, rent: 6, housePrice:50, houseHotel:50, 
//     multiplier: 3, totalHouse: 0, mortgage:50, color:'red'},
//     {id: 14, name: 'BRASIL', price:160, rent: 12, housePrice:100, houseHotel:100, 
//     multiplier: 3.5, totalHouse: 0, mortgage:80, color:'yellow'},
//     {id: 15, name: 'PAULISTA', price:140, rent: 10, housePrice:100, houseHotel:100, 
//     multiplier: 3.2, totalHouse: 0, mortgage:70, color:'yellow'},
//     {id: 16, name: 'JARDIM EUROPA', price:140, rent: 10, housePrice:100, houseHotel:100, 
//     multiplier: 3.2, totalHouse: 0, mortgage:70, color:'yellow'},
//     {id: 17, name: 'COPACABANA', price:260, rent: 22, housePrice:150, houseHotel:150, 
//     multiplier: 4.5, totalHouse: 0, mortgage:130, color:'green'},
//     {id: 18, name: 'VIEIRA SOUTO', price:320, rent: 28, housePrice:200, houseHotel:200, 
//     multiplier: 5.8, totalHouse: 0, mortgage:160, color:'green'},
//     {id: 19, name: 'ATLÂNTICA', price:300, rent: 26, housePrice:200, houseHotel:200, 
//     multiplier: 5, totalHouse: 0, mortgage:150, color:'green'},
//     {id: 20, name: 'IPANEMA', price:300, rent: 26, housePrice:200, houseHotel:200, 
//     multiplier: 5, totalHouse: 0, mortgage:150, color:'green'},
//     {id: 21, name: 'JARDIM PAULISTA', price:280, rent: 24, housePrice:150, houseHotel:150, 
//     multiplier: 4.8, totalHouse: 0, mortgage:140, color:'dark-blue'},
//     {id: 22, name: 'BROOKLIN', price:260, rent: 22, housePrice:150, houseHotel:150, 
//     multiplier: 4.5, totalHouse: 0, mortgage:130, color:'dark-blue'},

// ];