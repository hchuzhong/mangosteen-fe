import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

export const mockSession: Mock = (config) => {
    return [200, {
        jwt: faker.word.adjective(128)
    }]
}

export const mockTagIndex: Mock = (config) => {
    let id = 0
    const createId = () => {
        id += 1
        return id
    }
    const createTag = (n = 1, attrs?: any) => 
        Array.from({ length: n }).map(() => ({
            ...attrs,
            id: createId(),
            name: faker.word.noun(),
            sign: faker.internet.emoji(),
            kind: config.params.kind
        }))
    if (config.params.kind === 'expenses') {
        return [200, { resources: createTag(7) }]
    } else {
        return [200, { resources: createTag(20) }]
    }
}