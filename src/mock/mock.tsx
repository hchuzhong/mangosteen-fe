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
    const {kind, page} = config.params
    const per_page = 25
    const count = 26
    const createId = () => {
        id += 1
        return id
    }
    const createPager = (page = 1) => ({
        page, per_page, count
    })
    const createBody = (n = 1, attrs?: any) => ({
        resources: createTag(n), pager: createPager(page)
    })
    const createTag = (n = 1, attrs?: any) => 
        Array.from({ length: n }).map(() => ({
            ...attrs,
            id: createId(),
            name: faker.word.noun(),
            sign: faker.internet.emoji(),
            kind
        }))
    if (kind === 'expenses') {
        if (page === 1 || !page) {
            return [200, createBody(25)]
        } else {
            return [200, createBody(1)]
        }
    } else {
        if (page === 1 || !page) {
            return [200, createBody(25)]
        } else {
            return [200, createBody(1)]
        }
    }
}