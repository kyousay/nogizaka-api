import 
    { 
        // all,  fork, 
        put, call, takeLatest} 
from 'redux-saga/effects'
import * as Action from '../actions/members/membersConstants'
import * as MembersAction from '../actions/members/membersActions'
import { MemberApiFactory } from '../api/MemberApiFactory'

function* addMember(action : ReturnType<typeof MembersAction.addMember>){
    const memberData = action.payload;
    
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'post' as 'post', 
            data: memberData, 
            url: '/upload'
        }
        yield put(MembersAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(MembersAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
        } else {
            yield put(MembersAction.storageMembers(data.members))
            alert(data.message)
        }
    }catch(error) {
        yield alert(error)
        yield put(MembersAction.changeLoading(false))
    }
}

function* updateMember(action : ReturnType<typeof MembersAction.updateMember>){
    const memberData = action.payload
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'put' as 'put',
            data: memberData,
            url: '/update'
        }
        yield put(MembersAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(MembersAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
        } else {
            yield alert(data.message)
            yield put(MembersAction.storageMembers(data.members))
        }
    }catch(error) {
        yield alert(error)
        yield put(MembersAction.changeLoading(false))
    }
}

function* deleteMember(action: ReturnType<typeof MembersAction.deleteMember>) {
    const memberId = action.payload;
    try {
        const api = MemberApiFactory();
        const apiOption = {
            method: 'delete' as 'delete',
            data: {memberId},
            url: '/delete'
        }
        yield put(MembersAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(MembersAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
        } else {
            yield alert(data.message)
            yield put(MembersAction.storageMembers(data.members))
        }
    }catch(error) {
        yield alert(error)
        yield put(MembersAction.changeLoading(false))
    }
}

function* getAllMembers(){
    try{
        const api = MemberApiFactory();
        const apiOption = {
            method: 'get' as 'get',
            url: '/members'
        }
        yield put(MembersAction.changeLoading(true))
        const result = yield call(api, apiOption)
        yield put(MembersAction.changeLoading(false))
        const data = result.data
        if(data.error){
            alert(data.message)
            yield localStorage.removeItem('ticket')
        } else {
            yield put(MembersAction.storageMembers(data.members))
        }
    }catch(error) {
        yield alert(error)
        yield put(MembersAction.changeLoading(false))
    }
}

export default function* memberActions() {
    yield takeLatest (Action.MEMBERS_MEMBER_ADD, addMember)
    yield takeLatest (Action.MEMBERS_MEMBER_UPDATE, updateMember)
    yield takeLatest (Action.MEMBERS_MEMBER_DELETE, deleteMember)
    yield takeLatest (Action.MEMBERS_GET_ALLMEMBERS, getAllMembers)
}