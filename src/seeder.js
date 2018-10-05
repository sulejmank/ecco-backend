const Promise = require('bluebird');
const {sequelize} = require('./models');

const {
    User,
    Plan,
    Client,
    Picklist,
    Passanger,
    Destination,
    Ticket,
    Company,
    PassangersTicket,
    Agent,
    Hotel,
    PassangersArrangement,
    Arrangement,
    Memorandum

} = require('./models');

const UserData = [
    {
        name: 'Armin',
        surname: 'Gicic',
        username: 'armin',
        password: 'arminarmin',
        role: 'admin'
    },
    {
        name: 'Jasmin',
        surname: 'Gicic',
        username: 'jasmin',
        password: 'jasminjasmin',
        role: 'admin'
    },
    {
        name: 'Ali-Riza',
        surname: 'Hamidovic',
        username: 'rizo',
        password: 'rizorizo',
        role: 'admin'
    }
];

const ClientData = [
    {
        id: 1,
        ime: 'Haris',
        prezime: 'Zenovic',
        email: 'zenovicharis@live.com',
        datumRodjenja: '1993-09-21',
        brojTelefona: '0654261211',
        adresa: 'Sutenovacka 26/a',
        brojPasosa: '2323480293948',
        struka: 'Programer'
    },
    {
        id: 2,
        ime: 'Dzenan',
        prezime: 'Imamovic',
        email: 'imamovicdze@gmail.com',
        datumRodjenja: '1996-05-25',
        brojTelefona: '061234545',
        adresa: 'Dede Sehovic 11/a',
        brojPasosa: '129310293102',
        struka: 'Programer'
    }
];

const PassangerData = [
    {
        id: 1,
        ime: 'Haris',
        prezime: 'Zenovic',
        email: 'zenovicharis@live.com',
        datumRodjenja: '1993-09-21',
        brojTelefona: '0654261211',
        adresa: 'Sutenovacka 26/a',
        brojPasosa: '2323480293948',
        struka: 'Programer'
    },
    {
        id: 2,
        ime: 'Armin',
        prezime: 'Gicic',
        email: 'gicicarmin@gmail.com',
        datumRodjenja: '1993-11-10',
        brojTelefona: '0649744667',
        adresa: 'Dede Sehovica',
        brojPasosa: '23234812312312',
        struka: 'Lingvista'
    },
    {
        id: 3,
        ime: 'Dzenan',
        prezime: 'Imamovic',
        email: 'imamovicdz@gmail.com',
        datumRodjenja: '1996-11-10',
        brojTelefona: '0641234554',
        adresa: 'Dede Sehovica',
        brojPasosa: '23234812312312312',
        struka: 'Programer'
    }
];

const Destinations = [
    {
        id: 1,
        destinacija: 'Novi Pazar, Serbia',
        google_id: '92527e44028d1972c53ccabbd40e9e186d448cdd'
    },
    {
        id: 2,
        destinacija: 'Dortmund, Germany',
        google_id: '19297a3ba60b5cf1db69817f893a00604be74be1'
    },
    {
        id: 3,
        destinacija: 'Paris, Francuska',
        google_id: '691b237b0322f28988f3ce03e321ff72a12167fd'
    },
    {
        id: 4,
        destinacija: 'Kairo, Egipat',
        google_id: 'a0e1b9bbf82400da1813eb0880ebc39efd3ad15a'
    },
    {
        id: 5,
        destinacija: 'Beograd, Srbija',
        google_id: '2e976779fde080fa97b7410e4bea596f9e5bc065'
    }
];

const AgentsData = [
    {
        id: 1,
        name: 'Fibula'
    }
];

const HotelsData = [
    {
        id: 1,
        name: 'Westminister'
    }
];

const PicklistData = [
    {
        id: 1,
        title: 'All Inclusive',
        description: '',
        delimeter: 'service',
        value: 'all-inclusve'
    },
    {
        id: 2,
        title: 'Punpansion',
        description: '',
        delimeter: 'service',
        value: 'punpansion'
    },
    {
        id: 3,
        title: 'Polupansion',
        description: '',
        delimeter: 'service',
        value: 'polupansion'
    },
    {
        id: 4,
        title: 'Nocenje + Dorucak',
        description: 'Angazman ukljucuje nocenje i dorucak u odabranom hotelu',
        delimeter: 'service',
        value: 'nocenje-dorucak'
    },
    {
        id: 5,
        title: 'Avionski',
        description: '',
        delimeter: 'arrangement',
        value: 'avionski'
    },
    {
        id: 6,
        title: 'Autobuski',
        description: '',
        delimeter: 'arrangement',
        value: 'autobuski'
    },
    {
        id: 7,
        title: 'Sopstveni Prevoz/Najam',
        description: '',
        delimeter: 'arrangement',
        value: 'sopstveni'
    },
    {
        id: 8,
        title: '1/2 soba',
        description: '',
        delimeter: 'room-type',
        value: '2'
    },
    {
        id: 9,
        title: '1/2 + 1  dodatni lezaj',
        description: '',
        delimeter: 'room-type',
        value: '3'
    },
    {
        id: 10,
        title: '1/3 soba',
        description: '',
        delimeter: 'room-type',
        value: '3'
    },
    {
        id: 11,
        title: '1/4 soba',
        description: '',
        delimeter: 'room-type',
        value: '4'
    },
    {
        id: 12,
        title: 'Family Room',
        description: '',
        delimeter: 'room-type',
        value: '10'
    },
    {
        id: 13,
        title: 'Economy Room',
        description: '',
        delimeter: 'room-content',
        value: 'Economy Room'
    },
    {
        id: 14,
        title: 'Standard Room',
        description: '',
        delimeter: 'room-content',
        value: 'Standard Room'
    },
    {
        id: 15,
        title: 'Land View Room',
        description: '',
        delimeter: 'room-content',
        value: 'Land View Room'
    },
    {
        id: 16,
        title: 'Sea Side View',
        description: '',
        delimeter: 'room-content',
        value: 'Sea Side View'
    },
    {
        id: 17,
        title: 'Admin',
        description: '',
        delimeter: 'role',
        value: 'admin'
    },
    {
        id: 18,
        title: 'Radnik',
        description: '',
        delimeter: 'role',
        value: 'seller'
    }
];

const CompanyData = [
    {
        id: 1,
        name: 'Wizair'
    },
    {
        id: 2,
        name: 'Ozlem'
    }
];

const PlanData = [
    {
        id: 1,
        ClientId: 1,
        neto: 210,
        bruto: 200,
        avans: null,
        dueDate: null,
        status: true,
        notes: ''
    },
    {
        id: 2,
        ClientId: 2,
        neto: 110,
        bruto: 90,
        avans: null,
        dueDate: null,
        status: true,
        notes: ''
    },
    {
        id: 3,
        ClientId: 1,
        avans: 500.00,
        neto: 1200.00,
        bruto: 900.00,
        status: false,
        rokUplate: '2018-12-31T00:00:00.000Z',
        notes: null
    }
];

const TicketData = [
    {
        id: 1,
        avioKompanija: 'Wizair',
        datumDolaska: '2018-09-13',
        datumPolaska: '2018-09-30',
        putovanjeDo: 'Dortmund, Nemačka',
        putovanjeOd: 'Novi Pazar, Srbija',
        DestinationId: 1,
        ArrivalId: 2,
        ClientId: 1,
        CompanyId: 1,
        datumRezervacije: '2018-09-02',
        PlanId: 1,
        type: 'flight'
    },
    {
        id: 2,
        avioKompanija: 'Ozlem',
        datumPolaska: '2018-09-21',
        putovanjeDo: 'Paris, Francuska',
        putovanjeOd: 'Novi Pazar, Srbija',
        DestinationId: 1,
        ArrivalId: 3,
        ClientId: 2,
        CompanyId: 2,
        datumRezervacije: '2018-09-02',
        PlanId: 2,
        type: 'bus'
    }
];

const ArrangementsData = [
    {
        id: 1,
        destinacija: 'Kairo, Egipat',
        datumPocetka: '2018-09-21T00:00:00.000Z',
        datumZavrsetka: '2018-09-30T00:00:00.000Z',
        brojPutnika: 0,
        brojDana: '9',
        mestoPolaska: 'Beograd, Srbija',
        createdAt: '2018-09-17T21:24:26.000Z',
        updatedAt: '2018-09-17T21:24:26.000Z',
        ClientId: 1,
        PlanId: 3,
        DestinationId: 4,
        DepartId: 5,
        HotelId: 1,
        AgentId: 1,
        ServiceId: 1,
        TypeId: 5,
        MemorandumId: 1
    }
];

const ArrangementsPassangerData = [
    {
        id: 1,
        ArrangementId: 1,
        ClientPassangerId: 1
    },
    {
        id: 2,
        ArrangementId: 1,
        PassangerId: 2
    }
];

const PassangerTicketsData = [
    {
        brojRezervacije: '123123123',
        ClientPassangerId: 1,
        TicketId: 1
    },
    {
        brojRezervacije: '123123123',
        PassangerId: 2,
        TicketId: 1
    },
    {
        brojRezervacije: '123123123',
        ClientPassangerId: 2,
        TicketId: 2
    }
];

const MemorandumData = [
    {
        id: 1,
        driveId: '1AuUv7_k2w1TsUfXqE9AzdMLSUn48d5rz',
        name: 'memorandum-3-24_Sep_2018.docx',
    }
];

sequelize.sync()
    .then(() => {
        console.log('db is up, clean and synced');
    })

    .then(() => {
        return Promise.map(UserData, user => User.create(user));
    })

    .then(() => {
        return Promise.map(ClientData, client => Client.create(client));
    })

    .then(() => {
        return Promise.map(PassangerData, passanger => Passanger.create(passanger));
    })

    .then(() => {
        return Promise.map(PicklistData, pick => Picklist.create(pick));
    })

    .then(() => {
        return Promise.map(CompanyData, company => Company.create(company));
    })

    .then(() => {
        return Promise.map(Destinations, destination => Destination.create(destination));
    })

    .then(() => {
        return Promise.map(PlanData, plan => Plan.create(plan));
    })

    .then(() => {
        return Promise.map(TicketData, ticket => Ticket.create(ticket));
    })

    .then(async () => {
        return Promise.map(PassangerTicketsData, relation => PassangersTicket.create(relation));
    })

    .then(async () => {
        return Promise.map(HotelsData, hotel => Hotel.create(hotel));
    })

    .then(async () => {
        return Promise.map(AgentsData, agent => Agent.create(agent));
    })

    .then(async () => {
        return Promise.map(MemorandumData, memorandum => Memorandum.create(memorandum));
    })

    .then(async () => {
        return Promise.map(ArrangementsData, arrangement => Arrangement.create(arrangement));
    })

    .then(async () => {
        return Promise.map(ArrangementsPassangerData, arrangementsPassanger => PassangersArrangement.create(arrangementsPassanger));
    })

    .then(() => {
        console.log('seeding finished');
    })

    .catch(err => {
        console.log(err, err.stack);
    })

    .finally(() => {
        // sequelize.close();
        // console.log('db closed');
        return null;
    });
