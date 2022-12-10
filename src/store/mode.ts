import { ActionCreator } from "redux";

export const CHANGE_MODE = 'CHANGE_MODE'

export type ChangeModeAction = {
    type: typeof CHANGE_MODE
    mode?: string
}

export const modeSwitch: ActionCreator<ChangeModeAction> = (mode) => ({
    type: CHANGE_MODE,
    mode
})