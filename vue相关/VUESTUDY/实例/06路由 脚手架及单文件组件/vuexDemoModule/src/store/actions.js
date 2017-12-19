import types from './types.js'
const actions={
    IncreamentAsync({commit,state}) {
        // 异步操作
        var p = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve();
            },3000);
        });
        p.then(()=>{
            commit(types.INCREAMENT);
        });
    }
}

export default actions;