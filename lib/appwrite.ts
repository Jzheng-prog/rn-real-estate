import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser';
import {Account, Avatars, Client, OAuthProvider, Databases, Query} from 'react-native-appwrite'
export const config = {
    platform: 'com.rn.realState',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT,

    databasesId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsColelctionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client()

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)


export async function logout(){
    try {
        await account.deleteSession('current')
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}
export async function login(){
    try {
        const redirectUri = Linking.createURL('/')
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)

        if(!response) throw new Error('Failed to Login using Google')

        const browserRes = await openAuthSessionAsync(response.toString(), redirectUri)

        if(browserRes.type !== 'success') throw new Error('Failed to Login using Google')
        
        const url = new URL(browserRes.url)

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId) throw new Error('Failed to Login')
        const session = await account.createSession(userId, secret)
        if(!session) throw new Error('Failed to create session')
        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
export async function getUser() {
    try {
        const user = await account.get();
        if(user.$id){
            const userAvatar = avatar.getInitials(user.name)
            return {
                ...user,
                avatar:userAvatar.toString()
            }
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getLatestProperties(){
    try {
        const result = await databases.listDocuments(
            config.databasesId!,
            config.propertiesCollectionId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )
        return result.documents;
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getProperties(
    {filter,query, limit}:
    {filter:string; query:string, limit?:number}){

        try {
            const buildQuery = [Query.orderDesc('$createdAt')]
            if(filter && filter !== 'All'){
                buildQuery.push(Query.equal('type', filter))
            } 

            if(query){
                buildQuery.push(
                    Query.or([
                        Query.search('name',query),
                        Query.search('address',query),
                        Query.search('type',query),
                    ])
                )
            }
            if(limit) buildQuery.push(Query.limit(limit))

            const result = await databases.listDocuments(
                config.databasesId!,
                config.propertiesCollectionId!,
                buildQuery
            )
            return result.documents;
        } catch (error) {
            console.log(error)
            return []
        }
}