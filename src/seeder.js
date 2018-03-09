const Promise = require('bluebird');
const {sequelize} = require('./models');

const {Customer} = require('./models');
const {AvioKarta} = require('./models');
const {Plan} = require('./models');
const {Rata} = require('./models');


const CustomerData = [
    {
        ime:"Sulejman",
        prezime:"Karisik",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"21342",
        adresa:"paliha",
        brojPasosa:"12312314214"
    },
    {
        ime:"Haris",
        prezime:"Zenovic",
        email:"sssada@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"21213342",
        adresa:"paliha",
        brojPasosa:"1231112314214"
    },
    {
        ime:"Dzeno",
        prezime:"neznam",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"21341112",
        adresa:"paliha",
        brojPasosa:"1231414142314214"
    },
    {
        ime:"neko",
        prezime:"nesto",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"213411132",
        adresa:"paliha",
        brojPasosa:"123123142213114"
    },
    {
        ime:"Adem",
        prezime:"Mehmedovic",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"21341111332",
        adresa:"palsdasdiha",
        brojPasosa:"12312314211213114"
    },
    {
        ime:"vaha",
        prezime:"konicijus",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"2134113411132",
        adresa:"palih sada",
        brojPasosa:"1231231533442213114"
    },
    {
        ime:"sadza",
        prezime:"hodjic",
        email:"sss@gmail.com",
        datumRodjenja:"1994-12-1",
        brojTelefona:"213411112332",
        adresa:"palisadaha",
        brojPasosa:"123123142123213114"
    }
];

const AvioKartaData = [
    { 
        putovanjeOd:"Novi Pazar",
        putovanjeDo:"Amsetrdam",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1"
    },
    { 
        putovanjeOd:"Novi Pazar",
        putovanjeDo:"tutin",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1"
    },
    { 
        putovanjeOd:"Novi Pazar",
        putovanjeDo:"Sjenica",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1"
    },
    { 
        putovanjeOd:"Novi Pazar",
        putovanjeDo:"Berlin",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1",
        CustomerId:3
    },
    { 
        putovanjeOd:"Sarajevo",
        putovanjeDo:"Amsetrdam",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1",
        CustomerId:4
    },
    { 
        putovanjeOd:"Sarajevo",
        putovanjeDo:"Sjenica",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1",
        CustomerId:2
    },
    { 
        putovanjeOd:"Sarajevo",
        putovanjeDo:"Berlin",
        jedanPravac: true,
        datumPolaska: "2018-1-1",
        datumDolaska: "2018-2-3",
        brojRezervacije: "1231322",
        avioKompanija: "Nikola Tesla",
        potvrdjeno: true,
        cena: 200.3,
        datumRezervacije: "2018-3-1",
        CustomerId:1
    }
    
];

const PlanData = [
    {
        avans:100,
        totalnaCena:400,
        CustomerId:1
    },
    {
        avans:150,
        totalnaCena:500,
        CustomerId:2
    },
    {
        avans:200,
        totalnaCena:400,
        CustomerId:3
    },
    {
        avans:1000,
        totalnaCena:4000,
        CustomerId:4
    }
];

const RataData = [
    {
        datum:"2018-2-3",
        iznos:50,
        PlanId:1
    },
    {
        datum:"2018-1-3",
        iznos:30,
        PlanId:1
    },
    {
        datum:"2018-3-3",
        iznos:100,
        PlanId:1
    },
    {
        datum:"2018-5-3",
        iznos:250,
        PlanId:2
    },
    {
        datum:"2018-1-3",
        iznos:50,
        PlanId:2
    },
    {
        datum:"2018-3-3",
        iznos:350,
        PlanId:3
    },
    {
        datum:"2018-2-3",
        iznos:50,
        PlanId:3
    },
    {
        datum:"2018-9-3",
        iznos:50,
        PlanId:3
    },
    {
        datum:"2018-2-3",
        iznos:50,
        PlanId:1
    },
    {
        datum:"2018-2-3",
        iznos:50,
        PlanId:1
    }
];


sequelize.sync({force:true})
    .then(() => {
        console.log("db is up, clean and synced");
    })

    .then(() => {
        return Promise.map(CustomerData, customer => Customer.create(customer));
    })

    .then(() => {
        return Promise.map(AvioKartaData, avio => AvioKarta.create(avio));
    })

    .then(() => {
        return Promise.map(PlanData, plan => Plan.create(plan));
    })

    .then(() => {
        return Promise.map(RataData, rata => Rata.create(rata));
    })
    
    .then(() => {
        console.log('seeding finished');
    })

    .catch(err => {
        console.log(err,err.stack);
    })

    .finally(() => {
        sequelize.close();
        console.log("db closed");
        return null;
    });
    