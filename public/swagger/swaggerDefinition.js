const moment = require('moment');
const BASE_URL = 'https://api.allexchbets.com';
const SOCKET_URL = 'https://allexchsocket.winx777.com';
const SOCKET_URL2 = 'https://centerpanelsocket.winx777.com'

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'allexchbets',
        version: '1.0.0',
        description: 'Client Testing API',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },

    servers: [
        {
            url: BASE_URL,
            description: 'Main API Server',
        },
        {
            url: SOCKET_URL,
            description: 'WebSocket Server',
        },
        {
            url: SOCKET_URL2,
            description: 'WebSocket Server2',
        },
        {
            url: '{baseUrl}',
            description: 'Input URL',
            variables: {
                baseUrl: {
                    default: BASE_URL,
                },
            },
        },
    ],

    security: [
        {
            bearerAuth: [],
        },
    ],

    paths: {
        "/v1/user/login": {
            post: {
                summary: "User Login",
                description: "Endpoint to authenticate a user.",
                requestBody: {
                    required: true,
                    content: {
                        " application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        description: "The username of the user."
                                    },
                                    password: {
                                        type: "string",
                                        description: "The password of the user."
                                    },
                                    host: {
                                        type: "string",
                                        description: "The host URL where the user is logging in."
                                    }
                                },
                                required: ["username", "password", "host"]
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "User successfully logged in.",
                        content: {
                            "application/json": {
                                "schema": {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            description: "JWT token for authenticated user."
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Bad request. Invalid username or password."
                    },
                    "401": {
                        description: "Unauthorized. Username or password is incorrect."
                    }
                }
            }
        },
        '/v1/user/userBalance': {
            post: {
                summary: 'Retrieve User Wallet Balance',
                description: 'Retrieve the current balance of the user wallet.',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Successfully retrieved user wallet balance.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve user wallet balance.',
                    },
                },
            },
        },
        '/v1/sports/matchList': {
            post: {
                summary: 'Retrieve Games List',
                description: 'Retrieve a list of games based on specified parameters such as limit and page number.',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Successfully retrieved games list.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve games list.',
                    },
                },
            },
        },
        '/v1/reports/profitLossForAllExch': {
            post: {
                summary: 'Retrieve User Profit/Loss',
                description: 'Retrieve the user profit/loss statement based on specified parameters such as date range, bet type, and pagination.',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                body: {
                                    to_date: {
                                        type: 'date',
                                        description: 'End date of the report period.',
                                        date: moment().format("YYYY-MM-DD")
                                    },
                                    from_date: {
                                        type: 'date',
                                        date: moment().format("YYYY-MM-DD"),
                                        description: 'Start date of the report period.'
                                    },
                                    gameType: {
                                        type: 'string',
                                        description: 'gameType of events to retrieve',
                                    },
                                },
                                required: ['to_date', 'from_date'],
                                example: {
                                    to_date: moment().startOf('day'),
                                    from_date: moment().subtract(7, 'days').startOf('day'),
                                    gameType: "",
                                },
                            },
                        },
                    },
                },
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Successfully retrieved profit/loss report.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve profit/loss report.',
                    },
                },
            },
        },
        '/v1/reports/exposerListForAllexch': {
            post: {
                summary: 'Retrieve Exposure List for All Exchanges',
                description: 'Retrieve the exposure list for all exchanges based on specified parameters.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userType: {
                                        type: 'string',
                                        description: 'Type of user (e.g., "client").',
                                    },
                                },
                                required: ['userType'],
                                example: {
                                    userType: 'client',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully retrieved exposure list for all exchanges.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve exposure list for all exchanges.',
                    },
                },
            },
        },
        '/v1/sports/betsList': {
            post: {
                summary: 'Retrieve List of Bets',
                description: 'Retrieve a list of bets based on specified parameters.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    fancyBet: {
                                        type: 'boolean',
                                        description: 'Whether to include fancy bets.',
                                    },
                                    oddsBet: {
                                        type: 'boolean',
                                        description: 'Whether to include odds bets.',
                                    },
                                    casinoBet: {
                                        type: 'boolean',
                                        description: 'Whether to include casino bets.',
                                    },
                                    isDeclare: {
                                        type: 'boolean',
                                        description: 'Whether the bet is declared.',
                                    },
                                    isDeleted: {
                                        type: 'integer',
                                        description: 'Whether the bet is deleted (0 for false, 1 for true).',
                                    },
                                },
                                required: ['fancyBet', 'oddsBet', 'casinoBet', 'isDeclare', 'isDeleted'],
                                example: {
                                    fancyBet: true,
                                    oddsBet: true,
                                    casinoBet: true,
                                    isDeclare: false,
                                    isDeleted: 0,
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully retrieved list of bets.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve list of bets.',
                    },
                },
            },
        },
        '/v1/user/userStatement': {
            post: {
                summary: 'Retrieve User Statement',
                description: 'Retrieve the user statement based on specified parameters such as date range and sports type. SPORT: All, Cricket, Kabaddi, Politics, Live Casino. TYPE : All, Chip, Profit/Loss',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    fromDate: {
                                        type: 'string',
                                        date: moment().format("YYYY-MM-DD"),
                                        description: 'Start date for the statement period (YYYY-MM-DD).',
                                    },
                                    toDate: {
                                        type: 'string',
                                        date: moment().format("YYYY-MM-DD"),
                                        description: 'End date for the statement period (YYYY-MM-DD).',
                                    },
                                    sportsType: {
                                        type: 'string',
                                        description: 'Type of sports for the statement (e.g., "Cricket", "Kabaddi", "Politics", "Live Casino").',
                                    },
                                    statementFor: {
                                        type: 'string',
                                        description: 'Type of statement to retrieve (e.g., "All", "Chip", "Profit/Loss").',
                                    },
                                },
                                required: ['fromDate', 'toDate', 'sportsType', 'statementFor'],
                                example: {
                                    to_date: moment().startOf('day'),
                                    from_date: moment().subtract(7, 'days').startOf('day'),
                                    sportsType: '',
                                    statementFor: '',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully retrieved user statement.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve user statement.',
                    },
                },
            },
        },
        '/v1/sports/sportByMarketId': {
            post: {
                summary: 'Retrieve Sport by Market ID',
                description: 'Retrieve the sport details based on the provided market ID.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    marketId: {
                                        type: 'string',
                                        description: 'The ID of the market.',
                                    },
                                },
                                required: ['marketId'],
                                example: {
                                    marketId: '1.229505138',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully retrieved sport details.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve sport details.',
                    },
                },
            },
        },
        '/v1/reports/groupByBetsForEventId': {
            post: {
                summary: 'Group Bets by Event ID',
                description: 'Group bets by event ID based on the provided market ID.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    marketId: {
                                        type: 'string',
                                        description: 'The ID of the market.',
                                    },
                                },
                                required: ['marketId'],
                                example: {
                                    marketId: '1.181215162121',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully grouped bets by event ID.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to group bets by event ID.',
                    },
                },
            },
        },
        '/v1/sports/userPositionByMarketId': {
            post: {
                summary: 'Retrieve User Position by Market ID',
                description: 'Retrieve the user position based on the provided market ID.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    marketId: {
                                        type: 'string',
                                        description: 'The ID of the market.',
                                    },
                                },
                                required: ['marketId'],
                                example: {
                                    marketId: '1.229448409',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully retrieved user position.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve user position.',
                    },
                },
            },
        },
        '/v2/api/oddsData': {
            get: {
                summary: 'Retrieve Odds Data',
                description: 'Retrieve odds data based on the provided market ID',
                parameters: [
                    {
                        name: 'market_id',
                        in: 'query',
                        required: true,
                        schema: {
                            type: 'string',
                            description: 'The ID of the market.',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successfully retrieved odds data for the market.',
                    },
                    '400': {
                        description: 'Bad request. Check your input parameters.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve odds data for the market.',
                    },
                },
            },
        },
        '/v2/api/dataByEventId': {
            get: {
                summary: 'Retrieve data by event ID',
                description: 'Retrieves data related to a specific event identified by its unique event ID.',
                parameters: [
                    {
                        in: 'query',
                        name: 'eventId',
                        required: true,
                        schema: {
                            type: 'integer',
                            format: 'int64',
                            description: 'The unique identifier of the event.',
                        },
                        description: 'The ID of the event for which data is to be retrieved.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                    },
                    '400': {
                        description: 'Bad request. The provided event ID is invalid or missing.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication is required to access this resource.',
                    },
                    '404': {
                        description: 'Not found. The requested event ID does not exist.',
                    },
                    '500': {
                        description: 'Internal server error. An unexpected error occurred on the server.',
                    },
                },
            }
        },
        '/v1/reports/matchOddsRunningPos': {
            post: {
                summary: 'Retrieve Match Odds Running Position',
                description: 'Retrieve the running position of match odds.',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Successfully retrieved match odds running position.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to retrieve match odds running position.',
                    },
                },
            }
        },
        '/v1/sports/oddBetPlaced': {
            post: {
                summary: 'Place Odd Bet',
                description: 'Place a bet on specific odds in a sports event.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    odds: {
                                        type: 'string',
                                        description: 'The odds value for the bet.',
                                    },
                                    amount: {
                                        type: 'number',
                                        description: 'The amount to be placed on the bet.',
                                    },
                                    selectionId: {
                                        type: 'string',
                                        description: 'The ID of the selection for which the bet is placed.',
                                    },
                                    marketId: {
                                        type: 'string',
                                        description: 'The ID of the market in which the bet is placed.',
                                    },
                                    eventId: {
                                        type: 'string',
                                        description: 'The ID of the event for which the bet is placed.',
                                    },
                                    betFor: {
                                        type: 'string',
                                        description: 'The type of bet (e.g., "matchOdds").',
                                    },
                                    run: {
                                        type: 'string',
                                        description: 'The run value for the bet.',
                                    },
                                    oddsType: {
                                        type: 'string',
                                        description: 'The type of odds (e.g., "matchOdds").',
                                    },
                                    type: {
                                        type: 'string',
                                        description: 'The type of bet (e.g., "L").',
                                    },
                                    betfairMarketId: {
                                        type: 'string',
                                        description: 'The Betfair market ID.',
                                    },
                                },
                                required: ['odds', 'amount', 'selectionId', 'marketId', 'eventId', 'betFor', 'run', 'oddsType', 'type', 'betfairMarketId'],
                                example: {
                                    odds: '4.2',
                                    amount: 0,
                                    selectionId: '144197',
                                    marketId: '1.229664120',
                                    eventId: '33327715',
                                    betFor: 'matchOdds',
                                    run: '0',
                                    oddsType: 'matchOdds',
                                    type: 'L',
                                    betfairMarketId: '1.229664120',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully placed odd bet.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to place odd bet.',
                    },
                },
            },
        },
        '/v1/sports/sessionBetPlaced': {
            post: {
                summary: 'Place Session Bet',
                description: 'Place a bet on a session in a sports event.',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    odds: {
                                        type: 'string',
                                        description: 'The odds value for the bet.',
                                    },
                                    amount: {
                                        type: 'number',
                                        description: 'The amount to be placed on the bet.',
                                    },
                                    selectionId: {
                                        type: 'string',
                                        description: 'The ID of the selection for which the bet is placed.',
                                    },
                                    marketId: {
                                        type: 'string',
                                        description: 'The ID of the market in which the bet is placed.',
                                    },
                                    eventId: {
                                        type: 'string',
                                        description: 'The ID of the event for which the bet is placed.',
                                    },
                                    betFor: {
                                        type: 'string',
                                        description: 'The type of bet (e.g., "fancy").',
                                    },
                                    run: {
                                        type: 'string',
                                        description: 'The run value for the bet.',
                                    },
                                    oddsType: {
                                        type: 'string',
                                        description: 'The type of odds (e.g., "fancy").',
                                    },
                                    type: {
                                        type: 'string',
                                        description: 'The type of bet (e.g., "N").',
                                    },
                                },
                                required: ['odds', 'amount', 'selectionId', 'marketId', 'eventId', 'betFor', 'run', 'oddsType', 'type'],
                                example: {
                                    odds: '1',
                                    amount: 0,
                                    selectionId: '59eb16554ea2622de0d2f8582cef536b60866177',
                                    marketId: '1.229664120',
                                    eventId: '33327715',
                                    betFor: 'fancy',
                                    run: '30',
                                    oddsType: 'fancy',
                                    type: 'N',
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successfully placed session bet.',
                    },
                    '401': {
                        description: 'Unauthorized. Authentication token is missing or invalid.',
                    },
                    '500': {
                        description: 'Internal server error. Failed to place session bet.',
                    },
                },
            },
        },
    },
};


