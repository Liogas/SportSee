
interface IUser {
    id: number,
    userInfos: {
        firstName: string,
        lastName: string,
        age: number,
    },
    todayScore: number,
    score: number,
    keyData: {
        calorieCount: number,
        proteinCount: number,
        carbohydrateCount: number,
        lipidCount: number
    }
}

interface IUserActivity {
    userId: number,
    sessions: [
        {
            day: string,
            kilogram: number,
            calories: number
        }
    ]
}

interface IUserAverageSessions {
    userId: number,
    sessions : [
        {
            day: number,
            sessionLength: number
        }
    ]
}

interface IUserPerformance {
    userId: number,
    kind : {
        1: string,
        2: string,
        3: string,
        4: string,
        5: string,
        6: string
    },
    data : [
        {
            value: number,
            kind: number
        }
    ]
}