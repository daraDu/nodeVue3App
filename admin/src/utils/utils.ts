import { ComponentInternalInstance, getCurrentInstance } from "vue";

export function globalCurrentInstance(){
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const globalConfig = appContext.config.globalProperties
    return{
        globalConfig   
    }
}