/*
	用户模块
*/ 
import types from '../types'

// 定义数据
const state ={
	headerShow:true,
	footerShow:true
}

// getters 获取数据
var getters={
	headerShow(state){
		return state.headerShow;
	},
	footerShow(state){
		return state.footerShow;
	}
}

// actions 执行操作
var actions={
	hideHead:({commit})=>{
		commit(types.HEAD_SHOW_FAIL);
	},
	showHead:({commit})=>{
		commit(types.HEAD_SHOW_SUCCESS);
	},
	hidefooter:({commit})=>{
		commit(types.FOOTER_HIDE);
	},
	showfooter:({commit})=>{
		commit(types.FOOTER_SHOW);
	}
}

// mutations 状态操作
var mutations={
	[types.HEAD_SHOW_FAIL](state){
		state.headerShow=false;
	},
	[types.HEAD_SHOW_SUCCESS](state){
		state.headerShow=true;
	},
	[types.FOOTER_HIDE](state){
		state.footerShow=false;
	},
	[types.FOOTER_SHOW](state){
		state.footerShow=true;
	}
}

// 导出
export default{
	state,
	getters,
	actions,
	mutations
}