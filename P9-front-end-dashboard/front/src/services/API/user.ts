
export function getDataUserById(id:string) {
    return fetch('http://localhost:5678/user/'+id).then(response => response.json())
}

export function getDataWeightById(id: string) {
    return fetch('http://localhost:5678/user/'+id+'/activity').then(response => response.json())
}

export function getDataAverageSessionsById(id: string) {
    return fetch('http://localhost:5678/user/'+id+'/average-sessions').then(response => response.json())
}

export function getDataPerformanceById(id: string) {
    return fetch('http://localhost:5678/user/'+id+'/performance').then(response => response.json())
}